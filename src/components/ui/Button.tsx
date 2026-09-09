import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "text";
type Size = "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

const variantClass: Record<Variant, string> = {
  solid: "btn btn-solid",
  outline: "btn btn-outline",
  text: "btn btn-text",
};

export default function Button({
  children,
  variant = "solid",
  size = "md",
  href,
  onClick,
  type = "button",
  disabled = false,
  className,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(variantClass[variant], size === "lg" && variant !== "text" && "btn-lg", className);

  if (href) {
    const external = href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http");
    if (external) {
      return (
        <a
          href={href}
          aria-label={ariaLabel}
          className={classes}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} aria-label={ariaLabel} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} aria-label={ariaLabel} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
