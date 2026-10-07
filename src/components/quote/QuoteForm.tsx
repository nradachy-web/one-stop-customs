"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { BRAND, FORM, QUOTE_SERVICES } from "@/lib/constants";
import { canonicalUrl } from "@/lib/seo";

/**
 * Read once at build time; Next inlines NEXT_PUBLIC_ variables into the
 * bundle. A dead key cannot be detected here (Web3Forms answers success for
 * dead keys too), so the launch checklist includes one real submission that
 * Nick confirms arrived before the form counts as live.
 */
const ACCESS_KEY = (process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "").trim();
const HAS_KEY = ACCESS_KEY.length > 0;

type Status = "idle" | "sending" | "failed" | "not-connected";

interface QuoteFormProps {
  /** A QUOTE_SERVICES id, preselected on that service's page. */
  service?: string;
  /** The path the form was sent from, included in the email. */
  source: string;
}

/**
 * The free quote form. With JavaScript it posts by fetch, reads "Sending"
 * while it waits and moves to the thank you page only on the API's own
 * success: true. Without JavaScript it is a native POST with a redirect.
 * A lead is never dropped silently: if the key is missing or the send
 * fails, the visitor is told so and given the phone number.
 */
export default function QuoteForm({ service, source }: QuoteFormProps) {
  const router = useRouter();
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const id = (name: string) => `${uid}-${name}`;
  const formRef = useRef<HTMLFormElement>(null);

  // With JavaScript the messages below replace the browser's own bubbles.
  // Without it the required attributes still hold, so this stays off the server render.
  useEffect(() => {
    if (formRef.current) formRef.current.noValidate = true;
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);

    const next: { name?: string; phone?: string } = {};
    if (!String(fd.get("name") ?? "").trim()) next.name = FORM.errors.name;
    if (!String(fd.get("phone") ?? "").trim()) next.phone = FORM.errors.phone;
    setErrors(next);
    const firstInvalid = (["name", "phone"] as const).find((k) => next[k]);
    if (firstInvalid) {
      form.querySelector<HTMLInputElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    if (!HAS_KEY) {
      setStatus("not-connected");
      return;
    }

    setStatus("sending");
    try {
      const payload: Record<string, string> = {};
      for (const [key, value] of fd.entries()) {
        if (key === "redirect" || typeof value !== "string") continue;
        payload[key] = value;
      }
      const res = await fetch(FORM.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      // Web3Forms can answer 200 with success: false, so the body decides, not the status.
      const data: { success?: unknown } | null = await res.json().catch(() => null);
      if (!res.ok || !data || data.success !== true) throw new Error("send failed");
      router.push(FORM.thankYouPath);
    } catch {
      setStatus("failed");
    }
  };

  const sending = status === "sending";
  const notice = status === "failed" ? FORM.failed : status === "not-connected" ? FORM.notConnected : null;

  return (
    <form
      ref={formRef}
      className="form"
      acceptCharset="UTF-8"
      onSubmit={onSubmit}
      // No key, no native post: without JavaScript the form would otherwise send an empty key to the API.
      {...(HAS_KEY ? { method: "POST", action: FORM.endpoint } : {})}
    >
      <input type="hidden" name="access_key" value={ACCESS_KEY} />
      <input type="hidden" name="subject" value={FORM.subject} />
      <input type="hidden" name="from_name" value={FORM.fromName} />
      <input type="hidden" name="page" value={source} />
      <input type="hidden" name="redirect" value={canonicalUrl(FORM.thankYouPath)} />
      {/* Honeypot: a bot that ticks every box gets dropped by Web3Forms. Never shown, never focusable. */}
      <input type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" autoComplete="off" style={{ display: "none" }} />

      <div className="form__group">
        <p className="form__legend">Your vehicle</p>
        <div className="form__grid form__grid--2">
          <div>
            <label htmlFor={id("vehicle")} className="form__label">
              Year, make and model
            </label>
            <input id={id("vehicle")} name="vehicle" type="text" className="field" placeholder="2021 Dodge Charger" autoComplete="off" autoCapitalize="words" />
          </div>
          <div>
            <label htmlFor={id("service")} className="form__label">
              What you want done
            </label>
            <select id={id("service")} name="service" className="field" defaultValue={QUOTE_SERVICES.find((s) => s.id === service)?.label ?? ""}>
              <option value="">Choose one</option>
              {QUOTE_SERVICES.map((s) => (
                <option key={s.id} value={s.label}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="form__group">
        <p className="form__legend">How to reach you</p>
        <div className="form__grid form__grid--2">
          <div>
            <label htmlFor={id("name")} className="form__label">
              Name
            </label>
            <input
              id={id("name")}
              name="name"
              type="text"
              className="field"
              required
              autoComplete="name"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? id("name-error") : undefined}
            />
            {errors.name ? (
              <p id={id("name-error")} className="form__error">
                {errors.name}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor={id("phone")} className="form__label">
              Phone
            </label>
            <input
              id={id("phone")}
              name="phone"
              type="tel"
              inputMode="tel"
              className="field"
              required
              autoComplete="tel"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? id("phone-error") : undefined}
            />
            {errors.phone ? (
              <p id={id("phone-error")} className="form__error">
                {errors.phone}
              </p>
            ) : null}
          </div>
        </div>
        <div className="form__grid">
          <div>
            <label htmlFor={id("email")} className="form__label">
              Email <span>optional</span>
            </label>
            <input id={id("email")} name="email" type="email" inputMode="email" className="field" autoComplete="email" />
          </div>
          <div>
            <label htmlFor={id("message")} className="form__label">
              Anything else <span>optional</span>
            </label>
            <textarea id={id("message")} name="message" className="field" rows={4} placeholder="The color or film you have in mind, timing, anything we should know." />
          </div>
        </div>
      </div>

      <div className="form__group">
        {notice ? (
          <div role="alert" className="notice mb-4">
            <strong>{notice.heading}</strong>
            {notice.body}
          </div>
        ) : null}
        <button type="submit" className="btn btn--primary btn--block" disabled={sending} aria-busy={sending || undefined}>
          {sending ? FORM.sending : FORM.submit}
        </button>
        <p className="form__note">
          Rather text? Send photos of your vehicle to{" "}
          <a href={BRAND.phoneSms} className="link num">
            {BRAND.phoneDisplay}
          </a>
          . We only use your details to reply about this request.
        </p>
      </div>
    </form>
  );
}
