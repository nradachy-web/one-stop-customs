import { SERVICES } from "@/lib/services";

export interface NavItem {
  label: string;
  href: string;
  /** Paths that light this item up. Defaults to its own href. */
  match?: string[];
  menu?: { label: string; note: string; href: string }[];
}

const sub = (id: keyof typeof SERVICES) => ({ label: SERVICES[id].name, note: SERVICES[id].navNote, href: SERVICES[id].path });

/** The header navigation. Two groups open a menu; the rest are plain links. */
export const NAV: readonly NavItem[] = [
  {
    label: "Wraps",
    href: SERVICES.wraps.path,
    match: [SERVICES.wraps.path, SERVICES.commercial.path],
    menu: [sub("wraps"), sub("commercial")],
  },
  {
    label: "Tint",
    href: SERVICES.tint.path,
    match: [SERVICES.tint.path, SERVICES.buildings.path],
    menu: [sub("tint"), sub("buildings")],
  },
  { label: "Paint protection film", href: SERVICES.ppf.path },
  { label: "Powder coating", href: SERVICES.powder.path },
  { label: "Our work", href: "/gallery/" },
  { label: "About", href: "/about/" },
] as const;

/** The phone menu lists every page flat, in the order a customer would look for them. */
export const MENU_LINKS: readonly { label: string; href: string }[] = [
  { label: SERVICES.wraps.name, href: SERVICES.wraps.path },
  { label: SERVICES.tint.name, href: SERVICES.tint.path },
  { label: SERVICES.ppf.name, href: SERVICES.ppf.path },
  { label: SERVICES.commercial.name, href: SERVICES.commercial.path },
  { label: SERVICES.buildings.name, href: SERVICES.buildings.path },
  { label: SERVICES.powder.name, href: SERVICES.powder.path },
  { label: "Our work", href: "/gallery/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
] as const;
