import Link from "next/link";
import { MessageIcon, PhoneIcon } from "@/components/ui/Icons";
import { BRAND } from "@/lib/constants";

/** The fixed action bar on phones and tablets: call, text, free quote. Hidden at 1024 and up. */
export default function MobileBar() {
  return (
    <nav className="mbar" aria-label="Contact the shop">
      <a href={BRAND.phoneHref} className="mbar__cell" aria-label={`Call ${BRAND.phoneDisplay}`}>
        <PhoneIcon />
        Call
      </a>
      <a href={BRAND.phoneSms} className="mbar__cell" aria-label={`Text ${BRAND.phoneDisplay}`}>
        <MessageIcon />
        Text
      </a>
      <Link href="/contact/#quote" className="mbar__cell mbar__cell--primary">
        Free quote
      </Link>
    </nav>
  );
}
