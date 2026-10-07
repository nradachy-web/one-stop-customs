import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href: string;
  children: ReactNode;
  tone?: "primary" | "ghost";
  size?: "md" | "sm";
  block?: boolean;
  className?: string;
  ariaLabel?: string;
}

function isPlainAnchor(href: string) {
  return /^(tel:|sms:|mailto:|https?:|#)/.test(href);
}

/** A link drawn as a button. Internal routes go through next/link; tel, sms, mail, external and hash links are plain anchors. */
export default function Button({ href, children, tone = "primary", size = "md", block, className, ariaLabel }: ButtonProps) {
  const classes = cn("btn", `btn--${tone}`, size === "sm" && "btn--sm", block && "btn--block", className);
  if (isPlainAnchor(href)) {
    const external = href.startsWith("http");
    return (
      <a href={href} className={classes} aria-label={ariaLabel} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

/** A text action with an arrow: "See vinyl wraps". */
export function ArrowLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const inner = (
    <>
      <span>{children}</span>
      <ArrowIcon />
    </>
  );
  if (isPlainAnchor(href)) {
    const external = href.startsWith("http");
    return (
      <a href={href} className={cn("arrow-link", className)} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cn("arrow-link", className)}>
      {inner}
    </Link>
  );
}
