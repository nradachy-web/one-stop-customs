import type { ReactNode } from "react";
import { emphasise } from "@/components/landing/LandingHero";

/** The title band on pages without a photo hero: gallery, about, contact, thank you. */
export default function PageHead({ label, title, lead, children }: { label: string; title: string; lead?: string; children?: ReactNode }) {
  return (
    <section className="pagehead plane-dark">
      <div className="wrap">
        <p className="label">{label}</p>
        <h1 className="display display-lg mt-4 max-w-4xl">{emphasise(title)}</h1>
        {lead ? <p className="lead mt-5 max-w-2xl">{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}
