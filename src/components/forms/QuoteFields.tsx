import ChipBox from "@/components/forms/ChipBox";
import { FORM, QUOTE_OPTIONS, SERVICE_TEMPLATE } from "@/lib/constants";
import { canonicalUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";

/** Read at build time. Empty means QuoteForm renders the notice and never mounts this. */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

export type QuoteFieldErrors = Partial<Record<"name" | "phone", string>>;

interface QuoteFieldsProps {
  /** A QUOTE_OPTIONS.services id (a service page's quotePreset). Checks that chip in the static HTML. */
  preset?: string;
  /** Set by QuoteForm after a submit with a missing name or phone. */
  errors?: QuoteFieldErrors;
}

/** "Color flip" becomes "color-flip": a stable field name for each chip. */
function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Field name prefixes. Each chip posts under its own name (service_wrap,
 * finish_gloss, and so on) so the native, JavaScript-off POST carries every
 * choice as a readable line in the email. QuoteForm folds them into one line
 * per group for the fetch path.
 */
export const FIELD_GROUPS = {
  services: "service_",
  finish: "finish_",
  coverage: "coverage_",
  windows: "windows_",
} as const;

/**
 * The ticket body (docs/DESIGN.md 5.4): the four sections (titles in .t-h3,
 * field labels and the hint in .t-label) and every field,
 * the hidden Web3Forms fields, the honeypot, and the redirect to the thank-you
 * page for the no-JavaScript path. No hooks and no state, so the whole form
 * is in the static HTML. The Finish or shade rows are revealed by CSS :has()
 * on the Vinyl wrap (#svc-wrap) and Window tint (#svc-tint) checkboxes, and
 * the whole section hides while neither is checked, all without JavaScript.
 */
export default function QuoteFields({ preset, errors }: QuoteFieldsProps) {
  const presetService = preset ? QUOTE_OPTIONS.services.find((s) => s.id === preset) : undefined;

  return (
    <>
      {/* Web3Forms fields. The redirect only applies to the native POST; the fetch path drops it. */}
      <input type="hidden" name="access_key" value={ACCESS_KEY} />
      <input type="hidden" name="subject" value={FORM.subject} />
      <input type="hidden" name="from_name" value={FORM.fromName} />
      <input type="hidden" name="redirect" value={canonicalUrl(FORM.thankYouPath)} />
      {/* Honeypot: a bot that ticks every box gets dropped by Web3Forms. Never shown, never focusable. */}
      <input type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" autoComplete="off" style={{ display: "none" }} />

      {presetService && <p className="t-label">{SERVICE_TEMPLATE.quoteTitle(presetService.label)}</p>}

      {/* Vehicle */}
      <div className={cn(presetService && "ticket-section")}>
        <h3 className="t-h3">{FORM.sections.vehicle}</h3>
        <div className="mt-4">
          <label htmlFor="q-vehicle" className="t-label mb-2 block">
            {FORM.fields.vehicle.label}
          </label>
          <input
            id="q-vehicle"
            name="vehicle"
            type="text"
            className="field"
            placeholder={FORM.fields.vehicle.placeholder}
            autoComplete="off"
            autoCapitalize="words"
          />
        </div>
      </div>

      {/* What you want */}
      <fieldset className="ticket-section min-w-0">
        <legend className="t-h3">{FORM.sections.what}</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {QUOTE_OPTIONS.services.map((s) => (
            <ChipBox
              key={s.id}
              id={`svc-${s.id}`}
              name={`${FIELD_GROUPS.services}${s.id}`}
              value={s.label}
              label={s.label}
              defaultChecked={s.id === preset}
            />
          ))}
        </div>
      </fieldset>

      {/* Finish or shade: present in the HTML, shown by :has() while Vinyl wrap or Window tint is checked. */}
      <div className="ticket-section [.ticket:not(:has(#svc-wrap:checked)):not(:has(#svc-tint:checked))_&]:hidden">
        <h3 className="t-h3">{FORM.sections.finish}</h3>
        <div className="mt-4 grid gap-6">
          <div className="rows-wrap gap-6">
            <fieldset className="min-w-0">
              <legend className="t-label">{FORM.fields.finish.label}</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {QUOTE_OPTIONS.finishes.map((f) => (
                  <ChipBox key={f} id={`finish-${slug(f)}`} name={`${FIELD_GROUPS.finish}${slug(f)}`} value={f} label={f} />
                ))}
              </div>
            </fieldset>
            <fieldset className="min-w-0">
              <legend className="t-label">{FORM.fields.coverage.label}</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {QUOTE_OPTIONS.coverage.map((c) => (
                  <ChipBox key={c} id={`coverage-${slug(c)}`} name={`${FIELD_GROUPS.coverage}${slug(c)}`} value={c} label={c} />
                ))}
              </div>
            </fieldset>
          </div>
          <div className="rows-tint gap-6">
            <fieldset className="min-w-0">
              <legend className="t-label">{FORM.fields.film.label}</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {QUOTE_OPTIONS.films.map((f) => (
                  <ChipBox key={f} id={`film-${slug(f)}`} name="film" value={f} label={f} type="radio" />
                ))}
              </div>
            </fieldset>
            <fieldset className="min-w-0">
              <legend className="t-label">{FORM.fields.windows.label}</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {QUOTE_OPTIONS.windows.map((w) => (
                  <ChipBox key={w} id={`windows-${slug(w)}`} name={`${FIELD_GROUPS.windows}${slug(w)}`} value={w} label={w} />
                ))}
              </div>
            </fieldset>
            <div className="flex flex-wrap gap-2">
              <ChipBox id="mobile-tint" name="mobile_tint" value="Yes" label={QUOTE_OPTIONS.mobile} />
            </div>
          </div>
        </div>
      </div>

      {/* How to reach you */}
      <div className="ticket-section">
        <h3 className="t-h3">{FORM.sections.reach}</h3>
        <div className="mt-4 grid gap-5">
          <div>
            <label htmlFor="q-name" className="t-label mb-2 block">
              {FORM.fields.name.label}
            </label>
            <input
              id="q-name"
              name="name"
              type="text"
              className={cn("field", errors?.name && "field-error")}
              required
              autoComplete="name"
              aria-invalid={errors?.name ? true : undefined}
              aria-describedby={errors?.name ? "q-name-error" : undefined}
            />
            {errors?.name && (
              <p id="q-name-error" className="error-text t-small mt-2">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="q-phone" className="t-label mb-2 block">
              {FORM.fields.phone.label}
            </label>
            <input
              id="q-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              className={cn("field", errors?.phone && "field-error")}
              required
              autoComplete="tel"
              aria-invalid={errors?.phone ? true : undefined}
              aria-describedby={errors?.phone ? "q-phone-error" : undefined}
            />
            {errors?.phone && (
              <p id="q-phone-error" className="error-text t-small mt-2">
                {errors.phone}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="q-email" className="t-label mb-2 block">
              {FORM.fields.email.label}
            </label>
            <input id="q-email" name="email" type="email" className="field" autoComplete="email" inputMode="email" />
          </div>
          <div>
            <label htmlFor="q-message" className="t-label mb-2 block">
              {FORM.fields.message.label}
            </label>
            <textarea id="q-message" name="message" className="field" rows={4} />
          </div>
          <p className="t-label">{FORM.hint}</p>
        </div>
      </div>
    </>
  );
}
