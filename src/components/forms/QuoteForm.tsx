"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import FormNotice from "@/components/forms/FormNotice";
import QuoteFields, { FIELD_GROUPS, type QuoteFieldErrors } from "@/components/forms/QuoteFields";
import { FORM, QUOTE_OPTIONS, SERVICE_PAGES, type ServiceId } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Read once at build time. Next inlines NEXT_PUBLIC_ variables into the
 * client bundle, so a build without the repo variable ships no form at all,
 * only the honest notice. A dead key cannot be detected here: Web3Forms
 * answers success for dead keys too, so the launch checklist includes one
 * real submission that Nick confirms arrived before the form counts as live.
 */
const ACCESS_KEY = (process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "").trim();
const HAS_KEY = ACCESS_KEY.length > 0;

interface QuoteFormProps {
  /** A QUOTE_OPTIONS.services id (a service page's quotePreset). Pre-checks that chip server side. */
  preset?: string;
  className?: string;
}

type Status = "idle" | "sending" | "error";

/** "?service=wrap" (a chip id) or "?service=wraps" (a ServiceId) both resolve to the chip id. */
function presetFromQuery(): string | undefined {
  const value = new URLSearchParams(window.location.search).get("service");
  if (!value) return undefined;
  if (QUOTE_OPTIONS.services.some((s) => s.id === value)) return value;
  const spec = SERVICE_PAGES[value as ServiceId];
  return spec ? spec.quotePreset : undefined;
}

/**
 * Folds the posted fields into the JSON Web3Forms receives on the fetch path:
 * every chip group becomes one comma separated line (services, finish,
 * coverage, windows), the redirect field is dropped because the API answers
 * with JSON here, and the page the ticket was sent from is added.
 */
function buildPayload(fd: FormData): Record<string, string> {
  const payload: Record<string, string> = {};
  const groups: Record<string, string[]> = {};
  const prefixes = Object.entries(FIELD_GROUPS) as [keyof typeof FIELD_GROUPS, string][];

  for (const [key, raw] of fd.entries()) {
    const value = typeof raw === "string" ? raw : "";
    if (key === "redirect") continue;
    const group = prefixes.find(([, prefix]) => key.startsWith(prefix));
    if (group) {
      (groups[group[0]] ??= []).push(value);
      continue;
    }
    payload[key] = value;
  }
  for (const [name, values] of Object.entries(groups)) payload[name] = values.join(", ");
  payload.page = window.location.pathname;
  return payload;
}

/**
 * The quote ticket (docs/DESIGN.md 5.17). Without a Web3Forms key at build
 * time it renders the notice and no form, so a lead is never silently dropped.
 * With a key it renders a native POST form (redirect to the thank-you page for
 * the JavaScript-off path) and, with JavaScript, submits by fetch, reads
 * "Sending" while it waits, and navigates to /thank-you/ only on the API's
 * own success: true. Anything else shows the error notice above the ticket
 * with every field kept.
 */
export default function QuoteForm({ preset, className }: QuoteFormProps) {
  if (!HAS_KEY) return <FormNotice className={className} />;
  return <Ticket preset={preset} className={className} />;
}

function Ticket({ preset, className }: QuoteFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<QuoteFieldErrors>({});

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    // With JavaScript the messages below replace the browser's own bubbles.
    // Without it the required attributes still hold, so this stays off the server render.
    form.noValidate = true;
    // A service page passes its preset in the HTML; the contact page reads ?service= here instead.
    if (preset) return;
    const id = presetFromQuery();
    if (!id) return;
    const box = form.querySelector<HTMLInputElement>(`#svc-${id}`);
    if (box && !box.checked) box.checked = true;
  }, [preset]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);

    const next: QuoteFieldErrors = {};
    if (!String(fd.get("name") ?? "").trim()) next.name = FORM.errors.name;
    if (!String(fd.get("phone") ?? "").trim()) next.phone = FORM.errors.phone;
    setErrors(next);
    const firstInvalid = (["name", "phone"] as const).find((k) => next[k]);
    if (firstInvalid) {
      form.querySelector<HTMLInputElement>(`#q-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORM.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(buildPayload(fd)),
      });
      // Web3Forms can answer 200 with success: false, so the body decides, not the status.
      const data: { success?: unknown } | null = await res.json().catch(() => null);
      if (!res.ok || !data || data.success !== true) throw new Error("send failed");
      // Stay in the sending state while the thank-you page loads; the input is still here if it fails.
      router.push(FORM.thankYouPath);
    } catch {
      setStatus("error");
    }
  };

  const sending = status === "sending";

  return (
    <div className={cn("min-w-0", className)}>
      {status === "error" && (
        <div role="alert" className="mb-6">
          <FormNotice heading={FORM.notice.errorHeading} />
        </div>
      )}
      <form ref={formRef} className="ticket" method="POST" action={FORM.endpoint} acceptCharset="UTF-8" onSubmit={onSubmit}>
        <QuoteFields preset={preset} errors={errors} />
        <div className="ticket-section">
          <button type="submit" className="btn btn-solid btn-lg w-full md:w-auto" disabled={sending} aria-busy={sending || undefined}>
            {sending ? FORM.sending : FORM.submit}
          </button>
        </div>
      </form>
    </div>
  );
}
