import Link from "next/link";
import { canonicalUrl } from "@/lib/seo";

interface Crumb {
  label: string;
  href: string;
}

/** A slim trail under the header on inner pages, with its BreadcrumbList schema. Home is implied. */
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const all = [{ label: "Home", href: "/" }, ...trail];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: canonicalUrl(c.href),
    })),
  };

  return (
    <nav className="crumbs plane-dark" aria-label="Breadcrumb">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <div className="wrap">
        <ol>
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page">{c.label}</span>
                ) : (
                  <>
                    <Link href={c.href}>{c.label}</Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
