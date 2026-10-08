import Link from "next/link";
import { asset } from "@/lib/asset";
import { BRAND, CITIES, CREDIT, QUOTE_CTA, cityPath } from "@/lib/constants";
import { SERVICE_LIST } from "@/lib/services";

const YEAR = 2026;

/** The site's last band: the full logo, how to reach the shop, every service, every town. */
export default function Footer() {
  return (
    <footer className="site-footer plane-dark">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/logo-transparent.png")} width={1024} height={1024} alt={`${BRAND.name} Auto Spa logo`} className="footer__logo" loading="lazy" decoding="async" />
            <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed">
              Wraps, window tint, paint protection film, detailing and custom work. One shop, on Eight Mile in Warren, by appointment.
            </p>
            <dl className="kv mt-6 max-w-sm">
              <div className="kv__row">
                <dt>Call or text</dt>
                <dd>
                  <a href={BRAND.phoneHref} className="link num">
                    {BRAND.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="kv__row">
                <dt>Shop</dt>
                <dd>
                  <a href={BRAND.address.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    {BRAND.address.street}
                    <br />
                    {BRAND.address.city}, {BRAND.address.state} {BRAND.address.zip}
                  </a>
                </dd>
              </div>
              {BRAND.hours.map((h) => (
                <div key={h.days} className="kv__row">
                  <dt>{h.days}</dt>
                  <dd>{h.hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <div className="footer__title">
              <p className="label">Services</p>
            </div>
            <ul className="footer__list">
              {SERVICE_LIST.map((s) => (
                <li key={s.id}>
                  <Link href={s.path}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer__title">
              <p className="label">Service area</p>
            </div>
            <ul className="footer__list grid grid-cols-2 gap-x-4">
              {CITIES.map((c) => (
                <li key={c.slug}>
                  <Link href={cityPath(c)}>{c.name}</Link>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-400">{BRAND.countiesLine}, Michigan.</p>
          </div>

          <div>
            <div className="footer__title">
              <p className="label">More</p>
            </div>
            <ul className="footer__list">
              <li>
                <Link href="/gallery/">Our work</Link>
              </li>
              <li>
                <Link href="/about/">About</Link>
              </li>
              <li>
                <Link href="/contact/" style={{ color: "#5bd66f" }}>
                  {QUOTE_CTA}
                </Link>
              </li>
              <li>
                <a href={BRAND.bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book online
                </a>
              </li>
              <li>
                <a href={BRAND.social.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href={BRAND.social.tiktok} target="_blank" rel="noopener noreferrer">
                  TikTok
                </a>
              </li>
              <li>
                <a href={BRAND.social.facebook} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__base">
          <p>
            © {YEAR} {BRAND.legalName}. {BRAND.name} {BRAND.byline}.
          </p>
          <p>
            <a href={CREDIT.href} target="_blank" rel="noopener noreferrer">
              {CREDIT.text}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
