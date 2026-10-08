import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowLink } from "@/components/ui/Button";
import { ArrowIcon, CheckIcon } from "@/components/ui/Icons";
import Pic from "@/components/ui/Pic";
import QuoteForm from "@/components/quote/QuoteForm";
import { BRAND, CITIES, REVIEW_SUMMARY, STEPS, cityPath, reviewBy, type City, type FaqItem } from "@/lib/constants";
import { photo } from "@/lib/photos";
import { SERVICE_LIST, type Service } from "@/lib/services";
import { STAR_ART } from "@/lib/stars";
import { cn } from "@/lib/utils";

/* ============================================================================
   The landing page vocabulary. Each block is one idea, reads its colours
   from the plane it sits on, and needs no JavaScript to be read.
   ========================================================================== */

/** The services on the shop's own photography. Each card is one link to its page. */
export function ServiceCards({ services = SERVICE_LIST, className }: { services?: readonly Service[]; className?: string }) {
  return (
    <ul className={cn("cards cards--rows", className)}>
      {services.map((s, i) => (
        <li key={s.id}>
          <Link href={s.path} className="card">
            <div className="card__media">
              {s.cardPhoto ? (
                <Pic id={s.cardPhoto} bare alt="" pos={s.cardPos} sizes="(min-width: 1024px) 384px, (min-width: 640px) 46vw, 34vw" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={STAR_ART.card.src} width={STAR_ART.card.w} height={STAR_ART.card.h} alt="" loading="lazy" decoding="async" />
              )}
            </div>
            <div className="card__body">
              <span className="card__num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="card__title">{s.name}</h3>
              <p className="card__text">{s.blurb}</p>
              <span className="arrow-link">
                <span>See {s.name.toLowerCase()}</span>
                <ArrowIcon />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** What you get: plain sentences, each with a check. */
export function Checks({ items, className }: { items: readonly { title: string; body: string }[]; className?: string }) {
  return (
    <ul className={cn("checks", className)}>
      {items.map((c) => (
        <li key={c.title} className="check">
          <span className="check__mark" aria-hidden="true">
            <CheckIcon />
          </span>
          <div className="min-w-0">
            <h3 className="check__title">{c.title}</h3>
            <p className="check__body">{c.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** A short list of ticked lines inside a tile. */
export function Ticks({ items }: { items: readonly string[] }) {
  return (
    <ul className="ticks">
      {items.map((t) => (
        <li key={t}>
          <CheckIcon />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export interface PriceItem {
  name: string;
  /** "$175", "+ $500". */
  price: string;
  /** The small label over the price: "Starting at", "Installed", "Add on". */
  kicker?: string;
  /** Printed beside the price: "car", "installed", "per month". */
  unit?: string;
  /** A second price line under the first: "SUV or truck $210". */
  sub?: string;
  body?: string;
  ticks?: readonly string[];
  tag?: string;
  pick?: boolean;
}

/** Priced options as tiles: a package, a coverage level, a setup. Only prices the shop gave us. */
export function PriceTiles({ items, cols = 3, className }: { items: readonly PriceItem[]; cols?: 2 | 3; className?: string }) {
  return (
    <ul className={cn("tiles", `tiles--${cols}`, className)}>
      {items.map((p) => (
        <li key={p.name}>
          <div className={cn("tile tile--price", p.pick && "tile--pick")}>
            {p.tag ? <span className="tile__tag">{p.tag}</span> : null}
            <h3 className="tile__title">{p.name}</h3>
            <p className="price">
              {p.kicker ? <span className="price__kicker">{p.kicker}</span> : null}
              <strong className="price__num">{p.price}</strong>
              {p.unit ? <span className="price__unit">{p.unit}</span> : null}
            </p>
            {p.sub ? <p className="price__sub">{p.sub}</p> : null}
            {p.body ? <p className="tile__text">{p.body}</p> : null}
            {p.ticks ? <Ticks items={p.ticks} /> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Add ons and extras: a name and its price on a hairline. */
export function PriceList({ items, className }: { items: readonly { name: string; price: string }[]; className?: string }) {
  return (
    <ul className={cn("pricelist", className)}>
      {items.map((p) => (
        <li key={p.name}>
          <span>{p.name}</span>
          <strong>{p.price}</strong>
        </li>
      ))}
    </ul>
  );
}

/** The three steps, the same on every page. */
export function Steps({ items = STEPS, four }: { items?: readonly { title: string; body: string }[]; four?: boolean }) {
  return (
    <ol className={cn("steps", four && "steps--4")}>
      {items.map((s) => (
        <li key={s.title} className="step">
          <h3 className="step__title">{s.title}</h3>
          <p className="step__body">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** Questions as native details, so they open with JavaScript off. */
export function Faq({ items }: { items: readonly FaqItem[] }) {
  return (
    <ul className="faq">
      {items.map((f) => (
        <li key={f.q}>
          <details className="faq__item">
            <summary className="faq__q">{f.q}</summary>
            <p className="faq__a">{f.a}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}

/** One real Google review, verbatim. Renders nothing if the name is not on the quotable list. */
export function ReviewQuote({ name, className }: { name: string; className?: string }) {
  const r = reviewBy(name);
  if (!r) return null;
  return (
    <blockquote className={cn("quote", className)}>
      <span className="stars" style={{ "--stars-fill": "100%" } as CSSProperties} role="img" aria-label="5 out of 5 stars" />
      <p className="quote__text">{r.text}</p>
      <footer className="quote__by">
        <strong>{r.name}</strong>
        <span>Google review, {r.when}</span>
      </footer>
    </blockquote>
  );
}

/** A row of the shop's own photos, each with its caption. */
export function WorkGrid({ ids, four, ratio = "4 / 3", className }: { ids: readonly string[]; four?: boolean; ratio?: string; className?: string }) {
  return (
    <ul className={cn("work", four && "work--4", className)}>
      {ids.map((id) => (
        <li key={id}>
          <figure>
            <Pic id={id} ratio={ratio} sizes={four ? "(min-width: 768px) 24vw, 46vw" : "(min-width: 768px) 31vw, 46vw"} />
            <figcaption className="caption">{photo(id).caption}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

/** The towns the shop serves, each a link to its page. */
export function TownChips({ except }: { except?: City }) {
  return (
    <ul className="chips">
      {CITIES.filter((c) => c.slug !== except?.slug).map((c) => (
        <li key={c.slug}>
          <Link href={cityPath(c)} className="chip">
            {c.name}
            <span className="chip__meta">{c.county}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** The close: the phone beside the form. Sits at the end of every landing page. */
export function QuoteClose({ service, source }: { service?: string; source: string }) {
  return (
    <div className="split split--57">
      <div className="close__aside">
        <h2 className="display display-lg">Get your free quote.</h2>
        <p className="prose mt-5">
          Tell us about your vehicle and what you want done. We will get back to you fast with a free, no pressure quote. Prefer to talk? Call or text.
        </p>
        <a href={BRAND.phoneHref} className="callbox">
          <span className="min-w-0">
            <span className="callbox__k">Call or text</span>
            <span className="callbox__n">{BRAND.phoneDisplay}</span>
          </span>
          <ArrowIcon />
        </a>
        <p className="meta">
          {BRAND.hoursShort}, by appointment
          <br />
          {BRAND.address.full}
        </p>
        <p className="mt-3">
          <ArrowLink href={BRAND.bookingUrl}>Know what you want? Book online</ArrowLink>
        </p>
      </div>
      <div>
        <QuoteForm service={service} source={source} />
      </div>
    </div>
  );
}

/** The rating line used beside a review. */
export function RatingLine() {
  return (
    <p className="mt-5 text-[0.875rem]" style={{ color: "var(--key)" }}>
      Rated {REVIEW_SUMMARY.rating} from {REVIEW_SUMMARY.count} reviews on Google as of {REVIEW_SUMMARY.asOf}.{" "}
      <a href={REVIEW_SUMMARY.url} target="_blank" rel="noopener noreferrer" className="link">
        Read them on Google
      </a>
      .
    </p>
  );
}
