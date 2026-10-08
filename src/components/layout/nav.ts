import { SERVICES } from "@/lib/services";

export interface NavItem {
  label: string;
  href: string;
  /** Paths that light this item up. Defaults to its own href. */
  match?: string[];
  menu?: { label: string; note: string; href: string }[];
}

const sub = (id: keyof typeof SERVICES) => ({ label: SERVICES[id].name, note: SERVICES[id].navNote, href: SERVICES[id].path });

/** The header navigation. Five groups open a menu; the rest are plain links. */
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
  {
    label: "Protection",
    href: SERVICES.ppf.path,
    match: [SERVICES.ppf.path, SERVICES.ceramic.path, SERVICES.killswitch.path],
    menu: [sub("ppf"), sub("ceramic"), sub("killswitch")],
  },
  {
    label: "Custom",
    href: SERVICES.starlight.path,
    match: [SERVICES.starlight.path, SERVICES.powder.path],
    menu: [sub("starlight"), sub("powder")],
  },
  {
    label: "Detailing",
    href: SERVICES.detailing.path,
    match: [SERVICES.detailing.path, SERVICES.correction.path],
    menu: [sub("detailing"), sub("correction")],
  },
  { label: "Our work", href: "/gallery/" },
  { label: "About", href: "/about/" },
] as const;

/** The phone menu lists every page flat, in the order a customer would look for them. */
export const MENU_LINKS: readonly { label: string; href: string }[] = [
  { label: SERVICES.wraps.name, href: SERVICES.wraps.path },
  { label: SERVICES.tint.name, href: SERVICES.tint.path },
  { label: SERVICES.ppf.name, href: SERVICES.ppf.path },
  { label: SERVICES.detailing.name, href: SERVICES.detailing.path },
  { label: SERVICES.ceramic.name, href: SERVICES.ceramic.path },
  { label: SERVICES.correction.name, href: SERVICES.correction.path },
  { label: SERVICES.starlight.name, href: SERVICES.starlight.path },
  { label: SERVICES.killswitch.name, href: SERVICES.killswitch.path },
  { label: SERVICES.commercial.name, href: SERVICES.commercial.path },
  { label: SERVICES.buildings.name, href: SERVICES.buildings.path },
  { label: SERVICES.powder.name, href: SERVICES.powder.path },
  { label: "Our work", href: "/gallery/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
] as const;
