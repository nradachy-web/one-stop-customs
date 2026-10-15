import { InstagramIcon, TikTokIcon } from "@/components/ui/Icons";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: BRAND.social.instagram, name: "Instagram", handle: BRAND.social.instagramHandle, Icon: InstagramIcon },
  { href: BRAND.social.tiktok, name: "TikTok", handle: BRAND.social.tiktokHandle, Icon: TikTokIcon },
] as const;

/**
 * The shop's two socials, Instagram and TikTok, and no others (Ricky,
 * October 12, 2026). Icons alone in the top bar; `labels` prints the name
 * and the handle beside each icon.
 */
export default function Social({ labels, className }: { labels?: boolean; className?: string }) {
  return (
    <ul className={cn("social", labels && "social--labels", className)}>
      {LINKS.map(({ href, name, handle, Icon }) => (
        <li key={name}>
          <a href={href} target="_blank" rel="noopener noreferrer" className="social__link" aria-label={labels ? undefined : `${name}, ${handle}`}>
            <Icon />
            {labels ? (
              <span className="min-w-0">
                <span className="social__name">{name}</span>
                <span className="social__handle">{handle}</span>
              </span>
            ) : null}
          </a>
        </li>
      ))}
    </ul>
  );
}
