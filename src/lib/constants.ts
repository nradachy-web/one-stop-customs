// ============================================================
// One Stop Customs by Ricky Wraps. Site data (single source of truth)
// 13417 E Eight Mile Rd, Warren, Michigan. Vinyl wraps, window tint,
// paint protection film, powder coating. By appointment.
//
// Rules baked in (docs/BRIEF.md sections 1, 2 and 5; docs/DESIGN.md section 6):
// every fact below traces to the brief; no prices, no years in business, no
// counts of cars, no guarantees, no invented reviews; no em or en dashes
// anywhere; sentence case; labels state only what is visible in the photo.
// Spelling is American in customer-facing copy (color, gray). Code keys keep
// the shared type contract names (colour) so every lane compiles.
// ============================================================

import { REVIEWS } from "@/lib/reviews";

export { REVIEWS };

/**
 * The one as-of line for the Google figure. Built from the generated reviews
 * file so the hero facts, the shop sheet and the reviews section can never
 * drift from it when scripts/fetch-reviews.mjs is re-run.
 */
export const REVIEW_LINE = `${REVIEWS.rating} from ${REVIEWS.count} reviews, as of ${REVIEWS.asOf}`;

// ---------------- Types (shared contract, BUILD_PLAN.md) ----------------

export type ChipHex = `#${string}` | "clear";
export type ServiceTag = "wraps" | "commercial" | "tint" | "buildings" | "ppf" | "powder" | "other";
export type FinishTag = "gloss" | "satin" | "matte" | "printed" | "stripes" | "none";
export type ColourTag = "black" | "white" | "grey" | "colour" | "none";

export interface WorkPhoto {
  id: string;
  src: string;
  width: number;
  height: number;
  /** Describes the vehicle and the setting. Never the service performed. */
  alt: string;
  /** Sampled from the lit body panel. Starting value, checked by eye before launch. */
  chip: ChipHex;
  /** Chip strip, left: "{Finish}, {color}{, detail}. {Vehicle}". */
  label: string;
  /** Chip strip, right: "{Setting}{, NN/NN}". The counter is text here on purpose. */
  setting: string;
  service: ServiceTag;
  finish: FinishTag;
  colour: ColourTag;
  set?: { id: string; index: number; count: number };
  /** CSS object-position. Default 50% 50%. */
  position?: string;
}

export type CardAspect = "4/5" | "4/3" | "1/1" | "2/1" | "9/16" | "native";

export type DoorId = "call" | "text" | "book" | "quote";
export interface Door {
  id: DoorId;
  label: string;
  short: string;
  href: string;
  external?: boolean;
  note?: string;
}

export interface LinkItem {
  href: string;
  label: string;
}

export interface Fact {
  key: string;
  value: string;
  href?: string;
  external?: boolean;
}

export interface FaqItem {
  q: string;
  a: string;
}

export type ServiceId = "wraps" | "commercial" | "tint" | "ppf" | "buildings" | "powder";

export type ChooseSpec =
  | { kind: "finishes"; note: string; types: readonly string[]; other: { photoIds: readonly string[]; line: string } }
  | { kind: "fleet"; pairIds: readonly string[]; rows: readonly string[] }
  | { kind: "tint"; chipPhotoId: string; rows: readonly string[]; also: LinkItem }
  | { kind: "ppf"; films: readonly { name: string; body: string }[]; coverage: readonly { name: string; body: string }[] }
  | { kind: "buildings"; photoId: string; rows: readonly { name: string; body: string }[] }
  | { kind: "powder"; rows: readonly string[] };

export interface ServiceSpec {
  id: ServiceId;
  path: string;
  href: string;
  name: string;
  h1: string;
  /** The one-line descriptor printed under the "Service" tab. */
  descriptor: string;
  oneLine: string;
  lede: string;
  intro: string;
  included: readonly string[];
  cover: { photoId: string; kind: "chip" | "band" };
  choose: ChooseSpec;
  timing: readonly string[];
  faqs: readonly FaqItem[];
  photoIds: readonly string[];
  quotePreset: string;
  metaTitle: string;
  metaDescription: string;
}

export interface City {
  slug: string;
  name: string;
  county: "Macomb" | "Oakland" | "Wayne";
  coverPhotoId: string;
  /** One sentence of real geography relative to the shop. No drive times. */
  note: string;
}

export interface TintTiers {
  columns: readonly [string, string, string];
  keys: readonly ["standard", "carbon", "ceramic"];
  defaultActive: "standard" | "carbon" | "ceramic";
  rows: readonly { label: string; values: readonly [string, string, string] }[];
  footnote: string;
  confirm: boolean;
}

export interface Shade {
  label: string;
  opacity: number;
}

// ---------------- Site ----------------

/** Stays on the Ricky Wraps domain until Nick buys a One Stop Customs domain (open question). Never link the hijacked rickywraps dot com domain. */
export const SITE_URL = "https://rickywrapsllc.com";

export const BASE_TITLE = "One Stop Customs by Ricky Wraps";
export const HOME_TITLE = "One Stop Customs by Ricky Wraps, vinyl wraps and window tint in Warren";

export const BRAND = {
  name: "One Stop Customs",
  byline: "by Ricky Wraps",
  legalName: "One Stop Customs LLC",
  alternateName: "Ricky Wraps",
  /** Allowed once on the home page and once on About. Never more. */
  knownAs: "the shop you know as Ricky Wraps",
  /** "Auto Spa" lives inside the logo mark; it may appear as this descriptor only. */
  descriptor: "Auto Spa",
  owner: "Carlton Spencer",
  ownerKnownAs: "Ricky",
  phoneDisplay: "(248) 259-1617",
  phoneTel: "+12482591617",
  phoneHref: "tel:+12482591617",
  phoneSms: "sms:+12482591617",
  callOrText: "Call or text (248) 259-1617",
  email: "rickwraps101@gmail.com",
  emailHref: "mailto:rickwraps101@gmail.com",
  address: {
    street: "13417 E Eight Mile Rd",
    city: "Warren",
    state: "MI",
    zip: "48089",
    full: "13417 E Eight Mile Rd, Warren, MI 48089",
    short: "13417 E Eight Mile Rd in Warren",
    mapUrl: "https://maps.google.com/?cid=7698645542302137521",
    lat: 42.4497,
    lng: -82.9877,
  },
  /** Google Business Profile hours, September 2026. */
  hours: [
    { day: "Monday", open: "12 pm", close: "7 pm", label: "12 to 7 pm", closed: false },
    { day: "Tuesday", open: "10 am", close: "6 pm", label: "10 am to 6 pm", closed: false },
    { day: "Wednesday", open: "10 am", close: "6 pm", label: "10 am to 6 pm", closed: false },
    { day: "Thursday", open: "10 am", close: "6 pm", label: "10 am to 6 pm", closed: false },
    { day: "Friday", open: "10 am", close: "6 pm", label: "10 am to 6 pm", closed: false },
    { day: "Saturday", open: "10 am", close: "6 pm", label: "10 am to 6 pm", closed: false },
    { day: "Sunday", open: "", close: "", label: "Closed", closed: true },
  ],
  hoursGrouped: [
    { days: "Monday", hours: "12 to 7 pm" },
    { days: "Tuesday to Saturday", hours: "10 am to 6 pm" },
    { days: "Sunday", hours: "Closed" },
  ],
  hoursShort: "Mon 12 to 7 pm, Tue to Sat 10 am to 6 pm, Sun closed",
  /** schema.org openingHoursSpecification, 24 hour clock. */
  hoursSchema: [
    { dayOfWeek: ["Monday"], opens: "12:00", closes: "19:00" },
    { dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "18:00" },
  ],
  byAppointment: "By appointment",
  byAppointmentLine: "By appointment only. Book online or text to set a time.",
  booking: "https://rickywraps.square.site/",
  bookingUrl: "https://rickywraps.square.site/",
  reviewUrl: "https://maps.google.com/?cid=7698645542302137521",
  googlePlaceId: "ChIJoalNF4PJJIgRsTyQ4FQV12o",
  social: {
    instagram: "https://www.instagram.com/rickywraps",
    instagramHandle: "@rickywraps",
    instagram2Handle: "@onestopcustoms.autospa",
    tiktok: "https://www.tiktok.com/@rickywraps",
    tiktokHandle: "@rickywraps",
    facebook: "https://www.facebook.com/Rickywraps1",
    google: "https://maps.google.com/?cid=7698645542302137521",
  },
  /** The products sense only. Never a film brand in a chip label. */
  films: "Avery Dennison and 3M films, XPEL paint protection film",
  filmBrands: ["Avery Dennison", "3M", "XPEL"],
  serviceArea: "Warren, Detroit and Metro Detroit",
  serviceAreaList: [
    "Warren",
    "Detroit",
    "Royal Oak",
    "Sterling Heights",
    "Eastpointe",
    "Roseville",
    "Madison Heights",
    "Hazel Park",
    "Ferndale",
    "Troy",
    "Southfield",
    "Grosse Pointe",
  ],
  counties: ["Macomb", "Oakland", "Wayne"],
  countiesLine: "Macomb, Oakland and Wayne counties",
  mobileTint: "Mobile tint is available by appointment, ask when you book.",
  addOns: "Wash and detail add-ons are available, ask when you book.",
} as const;

export const BUSINESS_DESCRIPTION =
  "One Stop Customs, by Ricky Wraps, is a by-appointment vinyl wrap, window tint, paint protection film and powder coating shop at 13417 E Eight Mile Rd in Warren, Michigan. Avery Dennison and 3M films, XPEL paint protection film, commercial and fleet wraps, window film for storefronts, offices and homes, and powder coated wheels, quoted per vehicle. Serving Warren, Detroit and Metro Detroit across Macomb, Oakland and Wayne counties.";

// ---------------- Doors and navigation ----------------

export const CTA = {
  call: "Call (248) 259-1617",
  callOrText: "Call or text (248) 259-1617",
  text: "Text (248) 259-1617",
  book: "Book online",
  quote: "Get a quote",
  send: "Send quote request",
  sending: "Sending",
  seeWork: "See the work",
  seeAll: "See all",
  backToGallery: "Back to the gallery",
  /** v2 structural words (docs/DESIGN.md 6): the menu button, stepper and lightbox controls. */
  menu: "Menu",
  close: "Close",
  previous: "Previous",
  next: "Next",
  directions: "Get directions",
} as const;

/** The four doors, in this order everywhere: strip, mobile bar, menu, quote section. */
export const DOORS: readonly Door[] = [
  { id: "call", label: "Call (248) 259-1617", short: "Call", href: BRAND.phoneHref },
  { id: "text", label: "Text (248) 259-1617", short: "Text", href: BRAND.phoneSms },
  { id: "book", label: "Book online", short: "Book", href: BRAND.bookingUrl, external: true, note: "opens Square" },
  { id: "quote", label: "Get a quote", short: "Quote", href: "/contact/" },
] as const;

export const NAV_LINKS: readonly LinkItem[] = [
  { href: "/vinyl-wraps/", label: "Wraps" },
  { href: "/window-tinting/", label: "Tint" },
  { href: "/paint-protection-film/", label: "Paint protection film" },
  { href: "/powder-coating/", label: "Powder coating" },
  { href: "/gallery/", label: "Gallery" },
  { href: "/about/", label: "About" },
] as const;

export const MENU_LINKS: readonly LinkItem[] = [
  ...NAV_LINKS,
  { href: "/commercial-wraps/", label: "Commercial wraps" },
  { href: "/commercial-residential-tinting/", label: "Building tint" },
  { href: "/contact/", label: "Contact" },
] as const;

export const FOOTER_LINKS: readonly LinkItem[] = [
  { href: "/vinyl-wraps/", label: "Vinyl wraps" },
  { href: "/commercial-wraps/", label: "Commercial wraps" },
  { href: "/window-tinting/", label: "Window tinting" },
  { href: "/paint-protection-film/", label: "Paint protection film" },
  { href: "/commercial-residential-tinting/", label: "Commercial and residential tinting" },
  { href: "/powder-coating/", label: "Powder coating" },
  { href: "/gallery/", label: "Gallery" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
] as const;

export const CREDIT = {
  text: "Website & marketing by Modern Apex Strategies",
  href: "https://modernapexstrategies.com",
} as const;

// ---------------- Hero ----------------

export const HERO = {
  headline: "The wrap and tint shop on Eight Mile in Warren.",
  /**
   * The same headline split where the v2 hero breaks it at lg, one span per
   * line, so the page-load rise can stagger the lines (docs/DESIGN.md 3.1).
   * Joined with a space they equal `headline` exactly.
   */
  headlineLines: ["The wrap and tint shop", "on Eight Mile in Warren."] as readonly string[],
  /** Three lines at the desktop measure (v2). The films and hours moved to the facts row beneath the buttons. */
  sub: "One Stop Customs, the shop you know as Ricky Wraps. Vinyl wraps, window tint, XPEL paint protection film and powder coating at 13417 E Eight Mile Rd in Warren, by appointment and quoted per vehicle.",
  /** v2 hero photos: the side view fills the right of the screen at lg, the portrait fills the top of a phone. Both are the same truck. */
  photoId: "trx-yellow-side",
  mobilePhotoId: "trx-yellow-portrait",
  facts: [
    { key: "Films", value: "Avery Dennison and 3M films, XPEL paint protection film" },
    { key: "Shop", value: "13417 E Eight Mile Rd, Warren, MI 48089, by appointment", href: BRAND.address.mapUrl, external: true },
    { key: "Hours", value: "Mon 12 to 7 pm, Tue to Sat 10 am to 6 pm, Sun closed" },
    { key: "Google", value: REVIEW_LINE, href: BRAND.reviewUrl, external: true },
  ] as readonly Fact[],
} as const;

// ---------------- Photos (the book) ----------------
// Gallery order. Labels state only what is visible: finish where unambiguous,
// color, detail, vehicle; setting on the right with the walk-around counter.
// Settings never say "outside the shop", "in front of the shop" or "Eight Mile":
// the street frames stand at three different buildings and only the bay is the shop.

const P = "/photos/";

export const WORK: readonly WorkPhoto[] = [
  // The TRX set
  { id: "trx-yellow-wide", src: `${P}trx-yellow-wide.webp`, width: 1440, height: 648, alt: "Yellow Ram TRX with a black hood, side view on the lot", chip: "#F4B30C", label: "Gloss, yellow, black hood. Ram TRX", setting: "On the lot, 01/04", service: "wraps", finish: "gloss", colour: "colour", set: { id: "trx", index: 1, count: 4 } },
  { id: "trx-yellow-side", src: `${P}trx-yellow-side.webp`, width: 1440, height: 1080, alt: "Yellow Ram TRX with a black hood, side view under a blue sky", chip: "#F2B10C", label: "Gloss, yellow, black hood. Ram TRX", setting: "On the lot, 02/04", service: "wraps", finish: "gloss", colour: "colour", set: { id: "trx", index: 2, count: 4 } },
  { id: "trx-yellow-front", src: `${P}trx-yellow-front.webp`, width: 1440, height: 1085, alt: "Yellow Ram TRX with a black hood, front view on the lot", chip: "#F2BD1A", label: "Gloss, yellow, black hood. Ram TRX", setting: "On the lot, 03/04", service: "wraps", finish: "gloss", colour: "colour", set: { id: "trx", index: 3, count: 4 } },
  { id: "trx-yellow-portrait", src: `${P}trx-yellow-portrait.webp`, width: 1299, height: 1600, alt: "Yellow Ram TRX with a black hood under a dramatic sky, front three quarter view", chip: "#E4AE14", label: "Gloss, yellow, black hood. Ram TRX", setting: "On the lot, 04/04", service: "wraps", finish: "gloss", colour: "colour", set: { id: "trx", index: 4, count: 4 }, position: "50% 60%" },
  // Color changes
  { id: "rangerover-purple", src: `${P}rangerover-purple.webp`, width: 1206, height: 1080, alt: "Satin purple Range Rover, rear three quarter view inside the shop", chip: "#52296E", label: "Satin, purple. Range Rover", setting: "Inside the shop", service: "wraps", finish: "satin", colour: "colour" },
  { id: "audi-rosegold-front", src: `${P}audi-rosegold-front.webp`, width: 1440, height: 1081, alt: "Satin rose gold Audi A6, front view on the street", chip: "#946A68", label: "Satin, rose gold. Audi A6", setting: "On the street, 01/02", service: "wraps", finish: "satin", colour: "colour", set: { id: "audi", index: 1, count: 2 } },
  { id: "audi-rosegold-wide", src: `${P}audi-rosegold-wide.webp`, width: 1439, height: 648, alt: "Satin rose gold Audi A6, front view, wide crop", chip: "#96696A", label: "Satin, rose gold. Audi A6", setting: "On the street, 02/02", service: "wraps", finish: "satin", colour: "colour", set: { id: "audi", index: 2, count: 2 } },
  { id: "bmw-lime", src: `${P}bmw-lime.webp`, width: 1440, height: 1080, alt: "Lime green BMW 3 series coupe, side view on the street", chip: "#B5D608", label: "Gloss, lime. BMW 3 series", setting: "On the street", service: "wraps", finish: "gloss", colour: "colour" },
  { id: "bmw-mint-front", src: `${P}bmw-mint-front.webp`, width: 1440, height: 1085, alt: "Mint green BMW 3 series, front view inside the shop", chip: "#27D6D0", label: "Satin, mint. BMW 3 series", setting: "Inside the shop", service: "wraps", finish: "satin", colour: "colour" },
  { id: "charger-pink", src: `${P}charger-pink.webp`, width: 1440, height: 1080, alt: "Gloss pink Dodge Charger, front three quarter view on the street", chip: "#D92C80", label: "Gloss, pink. Dodge Charger", setting: "On the street", service: "wraps", finish: "gloss", colour: "colour" },
  { id: "huracan-red-square", src: `${P}huracan-red-square.webp`, width: 1200, height: 1200, alt: "Red Lamborghini Huracan in front of a House of Wax wall", chip: "#D33430", label: "Gloss, red. Lamborghini Huracan", setting: "On the lot", service: "wraps", finish: "gloss", colour: "colour" },
  { id: "bmw-camo-blue", src: `${P}bmw-camo-blue.webp`, width: 1440, height: 790, alt: "BMW 4 series in a blue camouflage printed wrap", chip: "#2356B8", label: "Printed, blue camo. BMW 4 series", setting: "On the lot", service: "wraps", finish: "printed", colour: "colour" },
  { id: "maserati-blue-side", src: `${P}maserati-blue-side.webp`, width: 1440, height: 1080, alt: "Light blue Maserati GranTurismo, side view on the street", chip: "#5FB0DC", label: "Blue. Maserati GranTurismo", setting: "On the street, 01/02", service: "wraps", finish: "none", colour: "colour", set: { id: "maserati", index: 1, count: 2 }, position: "40% 50%" },
  { id: "maserati-blue-rear", src: `${P}maserati-blue-rear.webp`, width: 1440, height: 1080, alt: "Light blue Maserati GranTurismo, rear three quarter view on the street", chip: "#2F8AC0", label: "Blue. Maserati GranTurismo", setting: "On the street, 02/02", service: "wraps", finish: "none", colour: "colour", set: { id: "maserati", index: 2, count: 2 } },
  { id: "challenger-blue", src: `${P}challenger-blue.webp`, width: 1440, height: 1080, alt: "Blue Dodge Challenger, front three quarter view on the lot", chip: "#2A3FA6", label: "Gloss, blue. Dodge Challenger", setting: "On the lot", service: "wraps", finish: "gloss", colour: "colour" },
  { id: "modely-satin-grey", src: `${P}modely-satin-grey.webp`, width: 1600, height: 970, alt: "Satin gray Tesla Model Y, front three quarter view", chip: "#565A66", label: "Satin, gray. Tesla Model Y", setting: "On the lot", service: "wraps", finish: "satin", colour: "grey" },
  { id: "urus-grey-front", src: `${P}urus-grey-front.webp`, width: 1440, height: 1085, alt: "Satin gray Lamborghini Urus, front view", chip: "#4F555B", label: "Satin, gray. Lamborghini Urus", setting: "On the lot", service: "wraps", finish: "satin", colour: "grey" },
  { id: "crown-grey-rear", src: `${P}crown-grey-rear.webp`, width: 1440, height: 1080, alt: "Gray Toyota Crown, rear three quarter view inside the shop at night", chip: "#6B6259", label: "Gray. Toyota Crown", setting: "Inside the shop, at night", service: "wraps", finish: "none", colour: "grey" },
  { id: "camaro-red-front", src: `${P}camaro-red-front.webp`, width: 1440, height: 1080, alt: "Red Chevy Camaro SS, front three quarter view on the lot", chip: "#A5162A", label: "Gloss, red. Chevy Camaro SS", setting: "On the lot", service: "wraps", finish: "gloss", colour: "colour" },
  { id: "camaro-red-convertible", src: `${P}camaro-red-convertible.webp`, width: 1440, height: 1080, alt: "Red Chevy Camaro convertible, rear three quarter view", chip: "#B01F2E", label: "Gloss, red. Chevy Camaro convertible", setting: "On the lot", service: "wraps", finish: "gloss", colour: "colour" },
  // Stripes and partials
  { id: "charger-red-stripes", src: `${P}charger-red-stripes.webp`, width: 1440, height: 1080, alt: "Red Dodge Charger with gloss black racing stripes, rear view inside the shop", chip: "#E01420", label: "Gloss, red, black stripes. Dodge Charger", setting: "Inside the shop", service: "wraps", finish: "stripes", colour: "colour", position: "50% 55%" },
  { id: "charger-white-red", src: `${P}charger-white-red.webp`, width: 1440, height: 1080, alt: "White Dodge Charger with red stripes, front three quarter view in the evening", chip: "#E9EAEC", label: "Gloss, white, red stripes. Dodge Charger", setting: "On the lot, 01/02", service: "wraps", finish: "stripes", colour: "white", set: { id: "charger-white", index: 1, count: 2 } },
  { id: "durango-black-red-front", src: `${P}durango-black-red-front.webp`, width: 1440, height: 1319, alt: "Black Dodge Durango with red pinstripes, front view", chip: "#161A1E", label: "Gloss, black, red pinstripes. Dodge Durango", setting: "On the lot, 01/02", service: "wraps", finish: "stripes", colour: "black", set: { id: "durango", index: 1, count: 2 } },
  { id: "durango-black-rear", src: `${P}durango-black-rear.webp`, width: 1440, height: 1317, alt: "Black Dodge Durango with red accents, rear view inside the shop", chip: "#151517", label: "Gloss, black, red accents. Dodge Durango", setting: "Inside the shop, 02/02", service: "wraps", finish: "stripes", colour: "black", set: { id: "durango", index: 2, count: 2 } },
  { id: "camaro-orange-hood", src: `${P}camaro-orange-hood.webp`, width: 1104, height: 621, alt: "Orange Chevy Camaro SS with a gloss black wrapped hood inside the shop", chip: "#C8533F", label: "Gloss, orange, black hood. Chevy Camaro SS", setting: "Inside the shop", service: "wraps", finish: "stripes", colour: "colour" },
  // Black cars
  { id: "corvette-black-wide", src: `${P}corvette-black-wide.webp`, width: 1200, height: 1600, alt: "Black Chevy Corvette C8, wide view on the lot with a storefront behind", chip: "#151718", label: "Gloss, black. Chevy Corvette C8", setting: "On the lot, 01/04", service: "wraps", finish: "gloss", colour: "black", set: { id: "corvette", index: 1, count: 4 }, position: "50% 55%" },
  { id: "corvette-black-front", src: `${P}corvette-black-front.webp`, width: 1200, height: 1600, alt: "Black Chevy Corvette C8, front three quarter view on the lot", chip: "#151718", label: "Gloss, black. Chevy Corvette C8", setting: "On the lot, 02/04", service: "wraps", finish: "gloss", colour: "black", set: { id: "corvette", index: 2, count: 4 }, position: "50% 55%" },
  { id: "corvette-black-side", src: `${P}corvette-black-side.webp`, width: 1200, height: 1600, alt: "Black Chevy Corvette C8, side view on the lot", chip: "#151718", label: "Gloss, black. Chevy Corvette C8", setting: "On the lot, 03/04", service: "wraps", finish: "gloss", colour: "black", set: { id: "corvette", index: 3, count: 4 }, position: "50% 55%" },
  { id: "corvette-black-rear", src: `${P}corvette-black-rear.webp`, width: 1200, height: 1600, alt: "Black Chevy Corvette C8, rear three quarter view on the lot", chip: "#151718", label: "Gloss, black. Chevy Corvette C8", setting: "On the lot, 04/04", service: "wraps", finish: "gloss", colour: "black", set: { id: "corvette", index: 4, count: 4 }, position: "50% 55%" },
  { id: "porsche-911-black", src: `${P}porsche-911-black.webp`, width: 1440, height: 1082, alt: "Black Porsche 911, rear three quarter view on the lot", chip: "#101319", label: "Gloss, black. Porsche 911", setting: "On the lot, 01/02", service: "wraps", finish: "gloss", colour: "black", set: { id: "porsche", index: 1, count: 2 } },
  { id: "porsche-911-black-front", src: `${P}porsche-911-black-front.webp`, width: 1080, height: 810, alt: "Black Porsche 911, front three quarter view by a garage door", chip: "#0F1218", label: "Gloss, black. Porsche 911", setting: "On the lot, 02/02", service: "wraps", finish: "gloss", colour: "black", set: { id: "porsche", index: 2, count: 2 } },
  { id: "denali-black-front", src: `${P}denali-black-front.webp`, width: 1440, height: 1080, alt: "Gloss black GMC Denali pickup, front three quarter view", chip: "#17191C", label: "Gloss, black. GMC Denali", setting: "On the lot, 01/02", service: "wraps", finish: "gloss", colour: "black", set: { id: "denali", index: 1, count: 2 } },
  { id: "denali-black-wide", src: `${P}denali-black-wide.webp`, width: 1440, height: 500, alt: "Gloss black GMC Denali pickup, wide crop on the lot", chip: "#17191C", label: "Gloss, black. GMC Denali", setting: "On the lot, 02/02", service: "wraps", finish: "gloss", colour: "black", set: { id: "denali", index: 2, count: 2 } },
  { id: "silverado-black", src: `${P}silverado-black.webp`, width: 1440, height: 1082, alt: "Gloss black GMC Denali pickup inside the shop", chip: "#0F1218", label: "Gloss, black. GMC Denali", setting: "Inside the shop", service: "wraps", finish: "gloss", colour: "black" },
  { id: "urus-black-rear", src: `${P}urus-black-rear.webp`, width: 1440, height: 1080, alt: "Satin black Lamborghini Urus, rear view on the street", chip: "#2A2B2C", label: "Satin, black. Lamborghini Urus", setting: "On the street", service: "wraps", finish: "satin", colour: "black" },
  { id: "x6-black-front", src: `${P}x6-black-front.webp`, width: 1440, height: 1083, alt: "Black BMW X6, front view on the lot", chip: "#1B1E20", label: "Gloss, black. BMW X6", setting: "On the lot, 01/02", service: "wraps", finish: "gloss", colour: "black", set: { id: "x6", index: 1, count: 2 } },
  { id: "x6-black-rear", src: `${P}x6-black-rear.webp`, width: 1440, height: 1080, alt: "Black BMW X6, rear view on the street", chip: "#1E2124", label: "Gloss, black. BMW X6", setting: "On the street, 02/02", service: "wraps", finish: "gloss", colour: "black", set: { id: "x6", index: 2, count: 2 } },
  { id: "chrysler300-black-portrait", src: `${P}chrysler300-black-portrait.webp`, width: 1280, height: 1600, alt: "Black Chrysler 300 with bronze wheels, front three quarter view", chip: "#141617", label: "Gloss, black, bronze wheels. Chrysler 300", setting: "On the lot, 01/02", service: "wraps", finish: "gloss", colour: "black", set: { id: "chrysler300", index: 1, count: 2 }, position: "50% 60%" },
  { id: "chrysler300-black-side", src: `${P}chrysler300-black-side.webp`, width: 1280, height: 1600, alt: "Black Chrysler 300 with bronze wheels, side view on the street", chip: "#121419", label: "Gloss, black, bronze wheels. Chrysler 300", setting: "On the street, 02/02", service: "wraps", finish: "gloss", colour: "black", set: { id: "chrysler300", index: 2, count: 2 }, position: "50% 60%" },
  { id: "camaro-black-rear", src: `${P}camaro-black-rear.webp`, width: 1440, height: 1080, alt: "Black Chevy Camaro, rear view in front of a car wash", chip: "#141618", label: "Gloss, black. Chevy Camaro", setting: "On the lot", service: "wraps", finish: "gloss", colour: "black" },
  { id: "cybertruck-black", src: `${P}cybertruck-black.webp`, width: 1600, height: 961, alt: "Matte black Tesla Cybertruck inside a showroom", chip: "#15181A", label: "Matte, black. Tesla Cybertruck", setting: "In a showroom", service: "wraps", finish: "matte", colour: "black" },
  { id: "wagoneer-grey-front", src: `${P}wagoneer-grey-front.webp`, width: 1440, height: 1083, alt: "Gray Jeep Grand Wagoneer, front view on the lot", chip: "#3A3F45", label: "Gray. Jeep Grand Wagoneer", setting: "On the lot, 01/02", service: "wraps", finish: "none", colour: "grey", set: { id: "wagoneer", index: 1, count: 2 } },
  { id: "wagoneer-grey-side", src: `${P}wagoneer-grey-side.webp`, width: 1440, height: 1080, alt: "Gray Jeep Grand Wagoneer, side view", chip: "#3C4147", label: "Gray. Jeep Grand Wagoneer", setting: "On the lot, 02/02", service: "wraps", finish: "none", colour: "grey", set: { id: "wagoneer", index: 2, count: 2 } },
  // White cars
  { id: "sclass-white-front", src: `${P}sclass-white-front.webp`, width: 1440, height: 1080, alt: "White Mercedes S class, front three quarter view on the lot", chip: "#E7E9EC", label: "Gloss, white. Mercedes S class", setting: "On the lot, 01/02", service: "wraps", finish: "gloss", colour: "white", set: { id: "sclass", index: 1, count: 2 } },
  { id: "sclass-white-side", src: `${P}sclass-white-side.webp`, width: 1440, height: 1080, alt: "White Mercedes S class, side view under a cloudy sky", chip: "#E3E6E8", label: "Gloss, white. Mercedes S class", setting: "On the lot, 02/02", service: "wraps", finish: "gloss", colour: "white", set: { id: "sclass", index: 2, count: 2 } },
  { id: "escalade-white-front", src: `${P}escalade-white-front.webp`, width: 1440, height: 1083, alt: "White Cadillac Escalade, front view in the shop doorway", chip: "#E6E6E8", label: "Gloss, white. Cadillac Escalade", setting: "In the shop doorway", service: "wraps", finish: "gloss", colour: "white" },
  { id: "grandcherokee-white", src: `${P}grandcherokee-white.webp`, width: 1440, height: 1080, alt: "White Jeep Grand Cherokee L, side view on the lot", chip: "#E4E7E6", label: "Gloss, white. Jeep Grand Cherokee L", setting: "On the lot", service: "wraps", finish: "gloss", colour: "white" },
  { id: "charger-white-side", src: `${P}charger-white-side.webp`, width: 1440, height: 1080, alt: "White Dodge Charger, side view at dusk", chip: "#DCDDE0", label: "Gloss, white. Dodge Charger", setting: "On the lot at dusk, 02/02", service: "wraps", finish: "gloss", colour: "white", set: { id: "charger-white", index: 2, count: 2 } },
  { id: "mustang-white-shop", src: `${P}mustang-white-shop.webp`, width: 1200, height: 1600, alt: "White Ford Mustang inside the shop bay", chip: "#E2E0D8", label: "White. Ford Mustang", setting: "Inside the shop", service: "wraps", finish: "none", colour: "white", position: "50% 60%" },
  // Commercial
  { id: "commercial-tesla-homes-front", src: `${P}commercial-tesla-homes-front.webp`, width: 1600, height: 1136, alt: "Tesla Model 3 in a white and orange Homes.com printed wrap, front three quarter view inside the shop", chip: "#D2661A", label: "Printed. Tesla Model 3, Homes.com", setting: "Inside the shop, 01/02", service: "commercial", finish: "printed", colour: "colour", set: { id: "tesla-homes", index: 1, count: 2 } },
  { id: "commercial-tesla-homes", src: `${P}commercial-tesla-homes.webp`, width: 1600, height: 1200, alt: "Tesla Model 3 in a white and orange Homes.com printed wrap inside the shop", chip: "#CD6117", label: "Printed. Tesla Model 3, Homes.com", setting: "Inside the shop, 02/02", service: "commercial", finish: "printed", colour: "colour", set: { id: "tesla-homes", index: 2, count: 2 } },
  { id: "commercial-blazer-pink", src: `${P}commercial-blazer-pink.webp`, width: 1600, height: 745, alt: "Pink Chevy Blazer EV in a WeDriveFor printed wrap inside the shop", chip: "#E38CD6", label: "Printed. Chevy Blazer EV, WeDriveFor", setting: "Inside the shop", service: "commercial", finish: "printed", colour: "colour" },
  // Tint
  { id: "escalade-black-window", src: `${P}escalade-black-window.webp`, width: 1440, height: 1082, alt: "Tinted rear door glass on a black GMC Denali pickup, close up", chip: "#23272B", label: "Tinted glass. GMC Denali", setting: "Close up", service: "tint", finish: "none", colour: "black", position: "55% 50%" },
  { id: "tint-hands", src: `${P}tint-hands.webp`, width: 1600, height: 1053, alt: "Window film being trimmed by hand on a door glass, close up", chip: "#1A1F23", label: "Window film, trimmed by hand. Door glass", setting: "Close up", service: "tint", finish: "none", colour: "black" },
  { id: "home-deck-tint", src: `${P}home-deck-tint.webp`, width: 1248, height: 448, alt: "Sliding glass doors with window film on a back deck", chip: "#5A6B70", label: "Window film. Sliding glass doors", setting: "On a back deck", service: "buildings", finish: "none", colour: "grey" },
  { id: "home-front-tint", src: `${P}home-front-tint.webp`, width: 600, height: 450, alt: "House with film on the front windows", chip: "#6D8A9B", label: "Window film. Front windows", setting: "A house", service: "buildings", finish: "none", colour: "grey" },
  // Paint protection film, powder coating, other
  { id: "ppf-headlight-wide", src: `${P}ppf-headlight-wide.webp`, width: 1600, height: 581, alt: "Paint protection film being laid over a headlight, close up", chip: "clear", label: "Clear. Film going onto a headlight", setting: "Close up", service: "ppf", finish: "none", colour: "none" },
  { id: "powdercoat-wheel-spray", src: `${P}powdercoat-wheel-spray.webp`, width: 1600, height: 431, alt: "Powder coating gun spraying a wheel in a cloud of blue powder", chip: "#1F8FD8", label: "Powder, blue. Wheel in the booth", setting: "Close up", service: "powder", finish: "none", colour: "colour", position: "35% 50%" },
  { id: "kitchen-wrap", src: `${P}kitchen-wrap.webp`, width: 900, height: 509, alt: "Kitchen cabinets wrapped in a wood grain vinyl", chip: "#8A7D72", label: "Printed, wood grain. Kitchen cabinets", setting: "In a kitchen", service: "other", finish: "printed", colour: "none" },
  { id: "wall-wrap", src: `${P}wall-wrap.webp`, width: 1290, height: 746, alt: "Blue floral printed vinyl wall wrap in a hallway", chip: "#6E9BD1", label: "Printed, blue floral. Hallway wall", setting: "In a hallway", service: "other", finish: "printed", colour: "colour" },
] as const;

export const WORK_BY_ID: Readonly<Record<string, WorkPhoto>> = Object.fromEntries(WORK.map((p) => [p.id, p]));

/** Throws at build time if a component asks for a photo that is not in the book. */
export function photo(id: string): WorkPhoto {
  const p = WORK_BY_ID[id];
  if (!p) throw new Error(`Unknown photo id: ${id}`);
  return p;
}

/** The owner's own timelapse. Not in WORK; the poster is not in the gallery. */
export const TIMELAPSE = {
  id: "wrap-timelapse",
  src: "/video/wrap-timelapse.mp4",
  poster: `${P}wrap-timelapse-poster.webp`,
  width: 900,
  height: 1600,
  alt: "Ricky laying satin gray vinyl on a black Range Rover quarter panel in a driveway",
  chip: "#6B7075" as ChipHex,
  label: "Satin, gray. Range Rover quarter panel",
  setting: "In a driveway",
  caption: "Ricky laying satin gray vinyl on a Range Rover, 12 seconds, real footage.",
  seconds: 12,
} as const;

// ---------------- Gallery ----------------

export const GALLERY = {
  tab: "Gallery",
  h1: "Every photo in the book.",
  countLine: (n: number) => `${n} photos, all the shop's own.`,
  counter: (shown: number, total: number) => `${shown} of ${total}`,
  filterAll: "All",
} as const;

/** Every one of the sixty photos, grouped by service, in gallery order within each group. */
export const GALLERY_GROUPS: readonly { id: ServiceTag; label: string; photoIds: readonly string[] }[] = [
  { id: "wraps", label: "Wraps", photoIds: WORK.filter((p) => p.service === "wraps").map((p) => p.id) },
  { id: "commercial", label: "Commercial", photoIds: WORK.filter((p) => p.service === "commercial").map((p) => p.id) },
  { id: "tint", label: "Tint", photoIds: WORK.filter((p) => p.service === "tint").map((p) => p.id) },
  { id: "buildings", label: "Building tint", photoIds: WORK.filter((p) => p.service === "buildings").map((p) => p.id) },
  { id: "ppf", label: "Paint protection film", photoIds: WORK.filter((p) => p.service === "ppf").map((p) => p.id) },
  { id: "powder", label: "Powder coat", photoIds: WORK.filter((p) => p.service === "powder").map((p) => p.id) },
  { id: "other", label: "Other", photoIds: WORK.filter((p) => p.service === "other").map((p) => p.id) },
] as const;

/** Filter chips in row order. `key` is the data attribute, `value` the tag. */
export const GALLERY_FILTERS: readonly { id: string; label: string; key: "service" | "finish" | "colour" | "all"; value: string }[] = [
  { id: "all", label: "All", key: "all", value: "" },
  { id: "wraps", label: "Wraps", key: "service", value: "wraps" },
  { id: "commercial", label: "Commercial", key: "service", value: "commercial" },
  { id: "tint", label: "Tint", key: "service", value: "tint" },
  { id: "ppf", label: "Paint protection film", key: "service", value: "ppf" },
  { id: "powder", label: "Powder coat", key: "service", value: "powder" },
  { id: "other", label: "Other", key: "service", value: "other" },
  { id: "gloss", label: "Gloss", key: "finish", value: "gloss" },
  { id: "satin", label: "Satin", key: "finish", value: "satin" },
  { id: "matte", label: "Matte", key: "finish", value: "matte" },
  { id: "printed", label: "Printed", key: "finish", value: "printed" },
  { id: "stripes", label: "Stripes", key: "finish", value: "stripes" },
  { id: "black", label: "Black", key: "colour", value: "black" },
  { id: "white", label: "White", key: "colour", value: "white" },
  { id: "colour", label: "Color", key: "colour", value: "colour" },
] as const;

/** Never on a content page; gallery only. The lime and mint BMWs are never beside a green state mark. */
export const GALLERY_ONLY: readonly string[] = [
  "bmw-lime", "bmw-mint-front", "audi-rosegold-wide", "camaro-red-convertible", "charger-white-side",
  "durango-black-red-front", "durango-black-rear", "corvette-black-wide", "corvette-black-side", "corvette-black-rear",
  "porsche-911-black-front", "denali-black-front", "denali-black-wide", "x6-black-front", "x6-black-rear",
  "chrysler300-black-portrait", "chrysler300-black-side", "camaro-black-rear", "wagoneer-grey-front", "wagoneer-grey-side",
  "sclass-white-side", "escalade-white-front", "grandcherokee-white", "crown-grey-rear", "maserati-blue-rear", "trx-yellow-side",
] as const;

// ---------------- Finishes (the wrap vocabulary) ----------------

/** The six finish cards, in row order. Each label leads with the finish word. */
export const FINISHES: readonly { name: string; photoId: string; href: string }[] = [
  { name: "Gloss", photoId: "charger-pink", href: "/vinyl-wraps/#finishes" },
  { name: "Satin", photoId: "rangerover-purple", href: "/vinyl-wraps/#finishes" },
  { name: "Matte", photoId: "cybertruck-black", href: "/vinyl-wraps/#finishes" },
  { name: "Printed", photoId: "bmw-camo-blue", href: "/vinyl-wraps/#finishes" },
  { name: "Stripes", photoId: "charger-red-stripes", href: "/vinyl-wraps/#finishes" },
  { name: "Partial", photoId: "camaro-orange-hood", href: "/vinyl-wraps/#finishes" },
] as const;

export const FINISH_NOTE = "Metallic, chrome and color flip are in the book too. Ask to see them.";

/** Every finish the shop names, with one line each. Rows for the wraps page ledger. */
export const WRAP_FINISHES: readonly { name: string; body: string; photoId?: string }[] = [
  { name: "Gloss", body: "Shines like paint. The pink Charger and the yellow TRX.", photoId: "charger-pink" },
  { name: "Satin", body: "A soft sheen with no mirror in it. The purple Range Rover and the gray Model Y.", photoId: "rangerover-purple" },
  { name: "Matte", body: "Flat, no shine at all. The black Cybertruck.", photoId: "cybertruck-black" },
  { name: "Metallic", body: "Flake in the color that catches the light. Ask to see the swatches." },
  { name: "Chrome", body: "A mirror finish. Ask to see the swatches." },
  { name: "Color flip", body: "A color that shifts as you walk around the car. Ask to see the swatches." },
  { name: "Printed", body: "Camo, Bape style and custom designs, drawn in house and printed on the film. The blue camo BMW.", photoId: "bmw-camo-blue" },
] as const;

export const WRAP_TYPES: readonly string[] = [
  "Full color change",
  "Partial wraps and half wraps",
  "Stripes and decals",
  "Hoods and roofs",
  "Printed camo, Bape style and custom designs with in-house graphic design",
  "Wrap removal",
] as const;

export const OTHER_WRAPS = {
  id: "other",
  title: "Other things we wrap",
  photoIds: ["kitchen-wrap", "wall-wrap"] as readonly string[],
  line: "Helmets, appliances, cabinets and walls.",
} as const;

export const PAINT_SAFETY = "A wrap applied correctly can be removed by a professional without damaging the original paint.";

// ---------------- Tint ----------------

/** The three films the shop sells. Values only where the brief has one; "Ask" where it does not. No prices. */
export const TINT_TIERS: TintTiers = {
  columns: ["Standard", "Black carbon", "Ceramic"],
  keys: ["standard", "carbon", "ceramic"],
  defaultActive: "carbon",
  rows: [
    { label: "Film", values: ["Dyed film", "Carbon film", "Ceramic film"] },
    { label: "Heat rejection", values: ["Ask", "About 60 percent", "About 80 percent"] },
    { label: "UV", values: ["Ask", "99 percent", "Ask"] },
    { label: "Warranty", values: ["1 year", "3 year", "5 year"] },
    { label: "Price", values: ["Quoted per vehicle", "Quoted per vehicle", "Quoted per vehicle"] },
  ],
  footnote: "Warranty terms are confirmed at your quote.",
  confirm: true,
};

/** The shade ladder. Black overlay opacity per pane. No percentages printed until Ricky confirms stocked shades. */
// Light to dark, left to right: the slider thumb moves right as the glass gets darker
// (0 is no film, 92 is the darkest pane), so the ticks and the ladder read the same way.
export const SHADES: readonly Shade[] = [
  { label: "No film", opacity: 0 },
  { label: "Light", opacity: 0.36 },
  { label: "Medium", opacity: 0.52 },
  { label: "Dark", opacity: 0.72 },
  { label: "Darkest", opacity: 0.92 },
] as const;

export const SHADE_SCENE_ID = "maserati-blue-side";
export const SHADE_SLIDER = { label: "Drag to compare", min: 0, max: 92, step: 4, value: 60 } as const;
export const SHADE_LEGAL = "Michigan sets a limit per window. We will tell you what is allowed on yours.";

export const TINT_ROWS: readonly string[] = [
  "Windshield and sunroof film",
  "Tint removal",
  "Colored film",
  "Mobile tint, available by appointment, ask when you book",
] as const;

// ---------------- Paint protection film ----------------

export const PPF_FILMS: readonly { name: string; body: string }[] = [
  { name: "Clear", body: "The paint's own color, protected." },
  { name: "Matte", body: "The paint's color with a matte finish." },
  { name: "Colored", body: "A color change with the film's thickness." },
] as const;

/** Coverage zones. */
export const PPF_ROWS: readonly { name: string; body: string }[] = [
  { name: "Front end", body: "Bumper, hood, fenders and mirrors." },
  { name: "Full body", body: "Every painted panel." },
] as const;

// ---------------- Commercial, buildings, powder ----------------

export const FLEET_ROWS: readonly string[] = [
  "Full color printed graphics",
  "Logos and contact info",
  "Partial fleet wraps",
  "In-house graphic design",
] as const;

export const BUILDING_ROWS: readonly { name: string; body: string }[] = [
  { name: "Storefronts and offices", body: "Dual reflective mirror film, colored film, blackout film, decorative and privacy film." },
  { name: "Homes", body: "Heat, glare and UV reduction, privacy, dual reflective and blackout film." },
] as const;

export const POWDER_ROWS: readonly string[] = [
  "Wheels first",
  "Tires removed and remounted",
  "Sandblasting before the coat",
  "1 to 2 day turnaround",
  "Ask about other parts",
] as const;

// ---------------- Process and time ----------------

/** The only numbered list on the site. An actual sequence. */
export const PROCESS: readonly { title: string; body: string }[] = [
  { title: "Reach out", body: "Call or text (248) 259-1617, message @rickywraps, or send the ticket. Photos of the car help." },
  { title: "Get the quote", body: "Ricky quotes per vehicle: the car, the film or the color, and the panels you want covered." },
  { title: "Book the day", body: "Book online or by text. The shop runs by appointment, Monday 12 to 7 pm and Tuesday to Saturday 10 am to 6 pm." },
  { title: "The install", body: "Film, heat and hands. Full wrap 1 to 3 days, powder coated wheels 1 to 2 days." },
  { title: "Pick up", body: "Look it over with Ricky, then drive it home. Text the same number if anything needs a second look." },
] as const;

/** The durations the shop has actually stated, and nothing else. */
export const TIME_LEDGER: readonly string[] = [
  "Full wrap, 1 to 3 days",
  "Powder coated wheels, 1 to 2 days",
  "By appointment",
] as const;

// ---------------- Home sections (copy per DESIGN.md 7.1) ----------------

export const HOME_SECTIONS = {
  finishes: {
    id: "wraps",
    tab: "Wraps",
    h2: "Every finish in the book.",
    lede: "Full color change, partial wraps, stripes, half wraps, decals, hoods and roofs, printed camo and Bape style designs with in-house graphic design, wrap removal. Hundreds of colors in stock. A full wrap takes 1 to 3 days.",
    also: [{ label: "Helmets, appliances, cabinets and walls", href: "/vinyl-wraps/#other" }] as readonly LinkItem[],
    note: PAINT_SAFETY,
    link: { label: "See vinyl wraps", href: "/vinyl-wraps/" },
  },
  tint: {
    id: "tint",
    tab: "Tint",
    h2: "Pick a shade. Pick a film.",
    lede: "Three films, quoted per vehicle. Windshield and sunroof film, tint removal and colored film too. Mobile tint is available by appointment, ask when you book.",
    photoId: "escalade-black-window",
    also: [{ label: "Storefronts, offices and homes: dual reflective, colored, blackout, decorative and privacy film", href: "/commercial-residential-tinting/" }] as readonly LinkItem[],
    link: { label: "See window tinting", href: "/window-tinting/" },
  },
  ppf: {
    id: "paint-protection-film",
    tab: "Paint protection film",
    h2: "The one film you are not supposed to see.",
    lede: "XPEL paint protection film. Clear, matte or colored. Self healing, long term protection for the paint under it.",
    photoId: "ppf-headlight-wide",
    rows: ["Front end: bumper, hood, fenders and mirrors", "Full body: every painted panel"] as readonly string[],
    link: { label: "See paint protection film", href: "/paint-protection-film/" },
  },
  watch: {
    id: "how-it-goes",
    tab: "How it goes",
    h2: "Film, heat, hands.",
    caption: TIMELAPSE.caption,
  },
  fleet: {
    id: "fleet",
    tab: "Fleet",
    h2: "Your logo, on the road.",
    lede: "Full color printed graphics, logos and contact info, partial fleet wraps, in-house graphic design.",
    photoIds: ["commercial-tesla-homes", "commercial-blazer-pink"] as readonly string[],
    link: { label: "See commercial wraps", href: "/commercial-wraps/" },
  },
  powder: {
    id: "powder-coat",
    tab: "Powder coat",
    h2: "Wheels, in any color that bakes.",
    lede: "Tires off and remounted, sandblasting, 1 to 2 day turnaround.",
    photoId: "powdercoat-wheel-spray",
    link: { label: "See powder coating", href: "/powder-coating/" },
  },
  recent: {
    id: "recent-work",
    tab: "Recent work",
    h2: "From the book to the street.",
    linkLabel: (n: number) => `See all ${n} photos`,
    href: "/gallery/",
  },
  reviews: {
    id: "reviews",
    tab: "Reviews",
    h2: (rating: number) => `Rated ${rating} on Google.`,
    asOf: (count: number, asOf: string) => `from ${count} reviews, as of ${asOf}`,
    attribution: (name: string) => `${name}, on Google`,
  },
  quote: {
    id: "quote",
    tab: "Quote",
    h2: "Tell us the car and the look.",
    lede: "Call or text, book online, or send the ticket. Quoted per vehicle, by appointment.",
  },
} as const;

/** The eight 1:1 cards in the home work strip, in order. */
export const RECENT_WORK: readonly string[] = [
  "trx-yellow-portrait",
  "huracan-red-square",
  "corvette-black-front",
  "bmw-camo-blue",
  "modely-satin-grey",
  "challenger-blue",
  "urus-black-rear",
  "camaro-orange-hood",
] as const;

// ---------------- v2 devices (docs/DESIGN.md 4) ----------------
// Structural words and derived groupings only. No new facts: every photo id
// below is already in WORK and every label is read from that entry.

/** The logo files (docs/BRIEF_V2.md, Logo). The mark sits in the header at 44px tall; the full lockup is the footer's. */
export const LOGO = {
  mark: { src: "/logo-mark.png", width: 897, height: 633, alt: "One Stop Customs mark, two checkered flags over a car" },
  lockup: { src: "/logo-transparent.png", width: 1024, height: 1024, alt: "One Stop Customs Auto Spa logo" },
} as const;

/**
 * The walk-around sets shown in the home "Recent work" steppers, in order.
 * Frames are WORK ids that share a `set`; the stepper prints its own counter
 * from the array, so a set may show fewer frames than the photo's own
 * "NN/NN" setting (the TRX wide frame is left out because it cannot live in
 * a 1:1 box). Both steppers use the same box so they stand level at lg.
 */
export const SETS: readonly { id: string; photoIds: readonly string[]; aspect: CardAspect }[] = [
  { id: "corvette", photoIds: ["corvette-black-wide", "corvette-black-front", "corvette-black-side", "corvette-black-rear"], aspect: "1/1" },
  { id: "trx", photoIds: ["trx-yellow-portrait", "trx-yellow-front", "trx-yellow-side"], aspect: "1/1" },
] as const;

/** Set stepper controls. The counter is "01 / 04" style; the group label is read to assistive tech only. */
export const STEPPER = {
  previous: CTA.previous,
  next: CTA.next,
  counter: (index: number, count: number) => `${String(index).padStart(2, "0")} / ${String(count).padStart(2, "0")}`,
  groupLabel: (label: string) => `${label}, walk around`,
  frameLabel: (index: number, count: number) => `Frame ${index} of ${count}`,
} as const;

/** Finish picker (home and the wraps page): the rows come from FINISHES, the one-line bodies from WRAP_FINISHES by name. */
export const FINISH_PICKER = {
  hint: "Hover or tap a finish to see it on a car.",
  seeLabel: "See vinyl wraps",
  seeHref: "/vinyl-wraps/#finishes",
  bodyFor: (name: string) => WRAP_FINISHES.find((f) => f.name === name)?.body ?? "",
} as const;

/** Tint tier switcher: segmented pills over the three spec cards. Columns and rows stay in TINT_TIERS. */
export const TIER_SWITCH = {
  legend: "Film",
  ariaLabel: "Choose a film to compare",
} as const;

/** Shade slider tick labels under the track, darkest at the left. Same steps as SHADES. */
export const SHADE_TICKS: readonly string[] = SHADES.map((s) => s.label);

/** Lightbox controls. */
export const LIGHTBOX = {
  close: CTA.close,
  previous: CTA.previous,
  next: CTA.next,
  counter: (index: number, count: number) => `${index} / ${count}`,
  label: "Photo",
} as const;

/** The mobile menu button reads Menu, and Close while the sheet is open. */
export const MENU = {
  open: CTA.menu,
  close: CTA.close,
  ariaLabel: "Menu",
} as const;

// ---------------- Services ----------------

const AT_SHOP = "Quoted per vehicle, by appointment, at 13417 E Eight Mile Rd in Warren.";

export const SERVICE_PAGES: Readonly<Record<ServiceId, ServiceSpec>> = {
  wraps: {
    id: "wraps",
    path: "/vinyl-wraps/",
    href: "/vinyl-wraps/",
    name: "Vinyl wraps",
    h1: "Vinyl wraps",
    descriptor: "Color change, partial, printed",
    oneLine: "Change the color or the finish of the whole car, or one panel, with Avery Dennison and 3M film.",
    lede: `Full color change wraps, partial wraps, stripes, half wraps, decals, hoods and roofs. Gloss, satin, matte, metallic, chrome and color flip. Printed camo, Bape style and custom designs with in-house graphic design. Hundreds of colors in stock, wrap removal too. A full wrap takes 1 to 3 days. ${AT_SHOP}`,
    intro: "A wrap is film, not paint. You pick a color and a finish from the book, Ricky lays it panel by panel, and when you want the old color back a professional removal leaves the original paint as it was. That is how you get pink on a Charger or satin purple on a Range Rover without living with it forever.",
    included: [
      "Full color change wraps",
      "Partial wraps and half wraps",
      "Stripes and decals",
      "Hoods and roofs",
      "Printed camo, Bape style and custom designs",
      "In-house graphic design",
      "Wrap removal",
    ],
    cover: { photoId: "charger-red-stripes", kind: "chip" },
    choose: {
      kind: "finishes",
      note: FINISH_NOTE,
      types: WRAP_TYPES,
      other: { photoIds: OTHER_WRAPS.photoIds, line: OTHER_WRAPS.line },
    },
    timing: ["Full wrap, 1 to 3 days", "Partial wraps and smaller vehicles, less", "By appointment"],
    faqs: [
      { q: "What is a vinyl wrap?", a: "A thin adhesive film laid over the paint. It changes the color or the finish of the car without painting it, and it comes off again." },
      { q: "Will a wrap damage my paint?", a: "A wrap applied correctly can be removed by a professional without damaging the original paint." },
      { q: "How long does a full wrap take?", a: "A full wrap usually takes 1 to 3 days depending on the size of the vehicle and the design. Partial wraps and smaller vehicles take less." },
      { q: "How do I wash a wrapped car?", a: "Hand wash with a mild soap and a soft mitt, then dry with a soft cloth. Skip automatic washes with brushes. Check the edges now and then and text us if anything lifts." },
      { q: "Can I wrap just part of the car?", a: "Yes. Hoods, roofs, stripes, half wraps and decals are all on the menu, and the quote covers only the panels you pick." },
      { q: "Do you do printed designs?", a: "Yes. Camo, Bape style and custom designs are drawn in house, printed on the film and laid here." },
      { q: "Can I do it myself?", a: "Kits exist, but a smooth, bubble free wrap that lasts takes the tools and the hands. Bring it in and it is done right the first time." },
      { q: "How much does a wrap cost?", a: "Every wrap is quoted per vehicle. Text photos of the car and the look you want to (248) 259-1617 and Ricky replies with a number." },
    ],
    photoIds: ["charger-red-stripes", "charger-pink", "rangerover-purple", "cybertruck-black", "bmw-camo-blue", "camaro-orange-hood", "kitchen-wrap", "wall-wrap"],
    quotePreset: "wrap",
    metaTitle: "Vinyl wraps in Warren | One Stop Customs by Ricky Wraps",
    metaDescription: "Full color change, partial wraps, stripes, hoods, roofs and printed designs in Avery Dennison and 3M film at 13417 E Eight Mile Rd in Warren. Quoted per vehicle. Call or text (248) 259-1617.",
  },
  commercial: {
    id: "commercial",
    path: "/commercial-wraps/",
    href: "/commercial-wraps/",
    name: "Commercial wraps",
    h1: "Commercial and fleet wraps",
    descriptor: "Printed graphics, fleets",
    oneLine: "Your logo, contact info and colors printed and laid on one van or the whole fleet.",
    lede: `Full color printed graphics, logos and contact info, partial fleet wraps, in-house graphic design. ${AT_SHOP}`,
    intro: "The Homes.com Tesla and the WeDriveFor Blazer in the photos were printed and laid in this shop. Send the logo files and the message, the layout is drawn in house, and the vehicle leaves carrying it. When the campaign or the lease ends, the wrap comes off.",
    included: FLEET_ROWS,
    cover: { photoId: "commercial-blazer-pink", kind: "band" },
    choose: {
      kind: "fleet",
      pairIds: ["commercial-tesla-homes-front", "commercial-tesla-homes"],
      rows: FLEET_ROWS,
    },
    timing: ["Full wrap, 1 to 3 days per vehicle", "By appointment"],
    faqs: [
      { q: "What can go on a fleet vehicle?", a: "Full color printed graphics, your logo, contact information and partial wraps, on one van or a whole fleet. The graphic design is done in house." },
      { q: "What files do you need?", a: "Send what you have. Vector logo files give the cleanest print, and in-house graphic design handles the layout from there." },
      { q: "What happens to the paint underneath?", a: "The wrap covers it. When the wrap comes off, a professional removal leaves the original paint as it was, so a leased or resold vehicle goes back to plain." },
      { q: "Can we change the graphics later?", a: "Yes. A wrap is removable, so new branding or a seasonal message means a new wrap, not a repaint." },
      { q: "How long does a commercial wrap take?", a: "Plan on 1 to 3 days per vehicle for a full wrap. Fleet scheduling is worked out at the quote." },
    ],
    photoIds: ["commercial-blazer-pink", "commercial-tesla-homes-front", "commercial-tesla-homes"],
    quotePreset: "commercial",
    metaTitle: "Commercial and fleet wraps in Warren | One Stop Customs by Ricky Wraps",
    metaDescription: "Full color printed graphics, logos, contact info and partial fleet wraps with in-house graphic design at 13417 E Eight Mile Rd in Warren. Quoted per vehicle. Call or text (248) 259-1617.",
  },
  tint: {
    id: "tint",
    path: "/window-tinting/",
    href: "/window-tinting/",
    name: "Window tinting",
    h1: "Window tinting",
    descriptor: "Three films, quoted per vehicle",
    oneLine: "Standard, black carbon or ceramic film on any window, cut and laid by hand.",
    lede: `Three films: standard dyed film, black carbon and ceramic. Windshield and sunroof film, tint removal and colored film. Mobile tint is available by appointment, ask when you book. ${AT_SHOP}`,
    intro: "Tint is two choices: how dark and which film. The shade is yours to pick inside what Michigan allows on each window. The film decides how much heat stays out and how long the warranty runs, and the table lays the three side by side.",
    included: [
      "Standard dyed film",
      "Black carbon film",
      "Ceramic film",
      "Windshield and sunroof film",
      "Tint removal",
      "Colored film",
      "Mobile tint, available by appointment",
    ],
    cover: { photoId: "escalade-black-window", kind: "chip" },
    choose: {
      kind: "tint",
      chipPhotoId: "tint-hands",
      rows: TINT_ROWS,
      also: { label: "Storefronts, offices and homes: dual reflective, colored, blackout, decorative and privacy film", href: "/commercial-residential-tinting/" },
    },
    timing: ["By appointment", "Mobile tint, available by appointment"],
    faqs: [
      { q: "What does window tint do?", a: "A thin film on the inside of the glass cuts the heat, glare and UV coming into the cabin, adds privacy and helps the interior fade less." },
      { q: "Which film should I pick?", a: "Standard is the dyed film with a 1 year warranty. Black carbon rejects about 60 percent of heat and 99 percent of UV with a 3 year warranty. Ceramic rejects about 80 percent of heat with a 5 year warranty. Ricky will tell you which fits the car and the budget." },
      { q: "How dark can I go?", a: "Michigan sets a limit per window. We will tell you what is allowed on yours." },
      { q: "Will tint hurt my visibility at night?", a: "A legal shade on good film should not get in the way at night. Go darker than the law allows and it will, which is one more reason to stay inside the limit." },
      { q: "Can you remove old tint?", a: "Yes. Tint removal is its own job, purple and bubbled film included, and it is quoted per vehicle." },
      { q: "Do you tint windshields and sunroofs?", a: "Yes. Windshield and sunroof film are available, along with colored film." },
      { q: "Do you come to me?", a: "Mobile tint is available by appointment, ask when you book." },
      { q: "How long does tint last?", a: "It depends on the film. Each tier carries its own warranty, 1 year, 3 year or 5 year, and the terms are confirmed at your quote." },
    ],
    photoIds: ["escalade-black-window", "tint-hands"],
    quotePreset: "tint",
    metaTitle: "Window tinting in Warren | One Stop Customs by Ricky Wraps",
    metaDescription: "Standard, black carbon and ceramic window tint, windshield and sunroof film and tint removal at 13417 E Eight Mile Rd in Warren. Quoted per vehicle. Call or text (248) 259-1617.",
  },
  ppf: {
    id: "ppf",
    path: "/paint-protection-film/",
    href: "/paint-protection-film/",
    name: "Paint protection film",
    h1: "Paint protection film",
    descriptor: "XPEL, clear, matte or colored",
    oneLine: "XPEL film over the paint so rock chips and scratches land on the film, not the car.",
    lede: `XPEL paint protection film. Clear, matte or colored. Front end (bumper, hood, fenders and mirrors) or full body. Self healing, long term protection for the paint under it. ${AT_SHOP}`,
    intro: "The point of this film is that you cannot see it. Clear film keeps the paint's own color, matte film keeps the color and turns the finish matte, and colored film changes the color with the film's thickness behind it. Light scratches settle out with heat.",
    included: [
      "XPEL paint protection film",
      "Clear, matte or colored",
      "Front end: bumper, hood, fenders and mirrors",
      "Full body: every painted panel",
      "Self healing",
    ],
    cover: { photoId: "ppf-headlight-wide", kind: "band" },
    choose: { kind: "ppf", films: PPF_FILMS, coverage: PPF_ROWS },
    timing: ["By appointment", "Quoted per vehicle"],
    faqs: [
      { q: "What is paint protection film?", a: "A clear film laid over painted panels. It takes the rock chips, scratches and road debris so the paint does not." },
      { q: "Does it change how the car looks?", a: "Clear film does not. Matte film keeps the paint's color and turns the finish matte. Colored film changes the color with the film's thickness behind it." },
      { q: "What does self healing mean?", a: "Light scratches and swirl marks in the film settle out with heat, from the sun or a warm garage." },
      { q: "Front end or full body?", a: "Front end covers the bumper, hood, fenders and mirrors, the panels that take the most hits. Full body covers every painted panel. Both are quoted per vehicle." },
      { q: "Which film do you use?", a: "XPEL paint protection film." },
      { q: "How long does it last?", a: "It is long term protection. Ask about the film warranty at your quote." },
    ],
    photoIds: ["ppf-headlight-wide"],
    quotePreset: "ppf",
    metaTitle: "Paint protection film in Warren | One Stop Customs by Ricky Wraps",
    metaDescription: "XPEL paint protection film, clear, matte or colored, front end or full body, at 13417 E Eight Mile Rd in Warren. Self healing, quoted per vehicle. Call or text (248) 259-1617.",
  },
  buildings: {
    id: "buildings",
    path: "/commercial-residential-tinting/",
    href: "/commercial-residential-tinting/",
    name: "Commercial and residential tinting",
    h1: "Window film for storefronts, offices and homes",
    descriptor: "Glass, not cars",
    oneLine: "Dual reflective, colored, blackout, decorative and privacy film for the glass in buildings.",
    lede: "Storefronts and offices: dual reflective mirror film, colored film, blackout film, decorative and privacy film. Homes: heat, glare and UV reduction, privacy, dual reflective and blackout film. Quoted per job, by appointment, from the shop at 13417 E Eight Mile Rd in Warren.",
    intro: "Film on a window does the same job it does on a car: less heat, less glare, less fading and more privacy, without giving up the daylight. Mirror film hides the inside during the day, blackout film hides it all the time, and colored and decorative film change the look of the glass.",
    included: [
      "Dual reflective mirror film",
      "Colored film",
      "Blackout film",
      "Decorative and privacy film",
      "Heat, glare and UV reduction for homes",
    ],
    cover: { photoId: "home-deck-tint", kind: "band" },
    choose: { kind: "buildings", photoId: "home-front-tint", rows: BUILDING_ROWS },
    timing: ["By appointment", "Quoted per job"],
    faqs: [
      { q: "What can window film do for a storefront or office?", a: "Cut the heat and glare, add privacy during the day, and slow the fading of furniture and displays that sit in the sun." },
      { q: "What is dual reflective film?", a: "Mirror film. From outside in daylight the glass reads as a mirror, so people cannot see in, while the view out stays clear." },
      { q: "What is blackout film?", a: "Film that blocks the view and the light entirely, for meeting rooms, storage, construction sites and any room that needs to be dark or private." },
      { q: "Do you do homes?", a: "Yes. Heat, glare and UV reduction, privacy, dual reflective and blackout film for houses." },
      { q: "Do you offer colored or decorative film?", a: "Yes. Colored film in a range of shades, and decorative and privacy film for glass that wants a pattern instead of a shade." },
      { q: "How is it quoted?", a: "By the job. Call or text (248) 259-1617 with the number and rough size of the windows and which way they face." },
    ],
    photoIds: ["home-deck-tint", "home-front-tint"],
    quotePreset: "buildings",
    metaTitle: "Commercial and residential window tinting in Warren | One Stop Customs by Ricky Wraps",
    metaDescription: "Dual reflective, colored, blackout, decorative and privacy window film for storefronts, offices and homes across Metro Detroit, from 13417 E Eight Mile Rd in Warren. Call or text (248) 259-1617.",
  },
  powder: {
    id: "powder",
    path: "/powder-coating/",
    href: "/powder-coating/",
    name: "Powder coating",
    h1: "Powder coating",
    descriptor: "Wheels, baked",
    oneLine: "Wheels stripped, sprayed with powder and baked into a hard color.",
    lede: `Wheels first. Tires removed and remounted, sandblasting before the coat, 1 to 2 day turnaround. ${AT_SHOP}`,
    intro: "Powder coat is color that bakes on. The wheel is sandblasted, sprayed with dry powder and baked, and the tire goes back on here. Bring the color you have in mind.",
    included: POWDER_ROWS,
    cover: { photoId: "powdercoat-wheel-spray", kind: "band" },
    choose: { kind: "powder", rows: POWDER_ROWS },
    timing: ["Powder coated wheels, 1 to 2 days", "By appointment"],
    faqs: [
      { q: "What is powder coating?", a: "A dry powder sprayed onto the wheel and baked into a hard finish." },
      { q: "Do I need to take the tires off?", a: "No. Tires are removed here, the wheels are coated, and the tires are remounted." },
      { q: "How long does it take?", a: "1 to 2 days for a set of wheels." },
      { q: "Is the old finish stripped first?", a: "Yes. Wheels are sandblasted before the coat." },
      { q: "Can you coat other parts?", a: "Wheels first. Ask about other parts when you book." },
      { q: "What colors can I pick?", a: "Tell us the color you have in mind when you book." },
    ],
    photoIds: ["powdercoat-wheel-spray"],
    quotePreset: "powder",
    metaTitle: "Powder coating in Warren | One Stop Customs by Ricky Wraps",
    metaDescription: "Powder coated wheels at 13417 E Eight Mile Rd in Warren: tires off and remounted, sandblasting, 1 to 2 day turnaround. Quoted per vehicle. Call or text (248) 259-1617.",
  },
};

export const SERVICE_ORDER: readonly ServiceId[] = ["wraps", "commercial", "tint", "ppf", "buildings", "powder"] as const;

/** The six services as an ordered array (same objects as SERVICE_PAGES). */
export const SERVICES: readonly ServiceSpec[] = SERVICE_ORDER.map((id) => SERVICE_PAGES[id]);

/** Service page copy shared by the template. */
export const SERVICE_TEMPLATE = {
  titleTab: "Service",
  chooseTab: "Choose",
  chooseTitle: "What you can choose.",
  processTab: "How it goes",
  processTitle: "How it goes.",
  faqTab: "Questions",
  faqTitle: "Questions people ask.",
  quoteTab: "Quote",
  quoteTitle: (service: string) => `Quote: ${service}`,
  quoteLede: "Call or text, book online, or send the ticket. Quoted per vehicle, by appointment.",
} as const;

// ---------------- Cities ----------------

/** Twelve city pages. Counties per the brief. Notes are real geography, not claims about the city. */
export const CITIES: readonly City[] = [
  { slug: "warren", name: "Warren", county: "Macomb", coverPhotoId: "trx-yellow-front", note: "The shop is in Warren, on the Warren side of Eight Mile, the road that divides Warren from Detroit." },
  { slug: "detroit", name: "Detroit", county: "Wayne", coverPhotoId: "charger-pink", note: "Eight Mile is the Detroit city line, so the shop sits directly across the road from the east side of Detroit." },
  { slug: "royal-oak", name: "Royal Oak", county: "Oakland", coverPhotoId: "audi-rosegold-front", note: "From Royal Oak, take Woodward or I-75 south to Eight Mile and head east; the shop is on the Warren side of the road." },
  { slug: "sterling-heights", name: "Sterling Heights", county: "Macomb", coverPhotoId: "challenger-blue", note: "Sterling Heights sits directly north of Warren; Van Dyke, Mound and Schoenherr all run south through Warren to Eight Mile." },
  { slug: "eastpointe", name: "Eastpointe", county: "Macomb", coverPhotoId: "huracan-red-square", note: "Eastpointe shares the Eight Mile line with the shop, one city east of Warren, so it is a run west along the same road." },
  { slug: "roseville", name: "Roseville", county: "Macomb", coverPhotoId: "maserati-blue-side", note: "Roseville sits northeast of Warren; Gratiot runs southwest to Eight Mile, and the shop is west along the road on the Warren side." },
  { slug: "madison-heights", name: "Madison Heights", county: "Oakland", coverPhotoId: "modely-satin-grey", note: "Madison Heights is across Dequindre from Warren, the county line; the shop is south to Eight Mile and east." },
  { slug: "hazel-park", name: "Hazel Park", county: "Oakland", coverPhotoId: "camaro-red-front", note: "Hazel Park fronts Eight Mile too, just west of Dequindre; the shop is a straight run east on the same road." },
  { slug: "ferndale", name: "Ferndale", county: "Oakland", coverPhotoId: "charger-white-red", note: "Ferndale's south edge is Eight Mile at Woodward; the shop is east along Eight Mile on the Warren side." },
  { slug: "troy", name: "Troy", county: "Oakland", coverPhotoId: "sclass-white-front", note: "From Troy, I-75 runs south to Eight Mile; the shop is east from there on the Warren side of the road." },
  { slug: "southfield", name: "Southfield", county: "Oakland", coverPhotoId: "urus-grey-front", note: "Southfield's south edge is Eight Mile as well, west of Woodward; the shop is east along the same road past Woodward." },
  { slug: "grosse-pointe", name: "Grosse Pointe", county: "Wayne", coverPhotoId: "porsche-911-black", note: "The Grosse Pointes sit on Lake St. Clair at Detroit's east edge; the shop is inland on Eight Mile at the south line of Warren." },
] as const;

export const CITY_BY_SLUG: Readonly<Record<string, City>> = Object.fromEntries(CITIES.map((c) => [c.slug, c]));

export const CITY_COPY = {
  tab: "Service area",
  descriptor: (city: City) => `${city.county} County`,
  h1: (city: City) => `Car wraps and window tint for ${city.name}`,
  lede: (city: City) =>
    `One Stop Customs by Ricky Wraps is at 13417 E Eight Mile Rd in Warren, by appointment. ${city.name} customers bring the car to the shop; mobile tint is available by appointment, ask when you book. Vinyl wraps, window tint, XPEL paint protection film, commercial wraps and powder coated wheels, quoted per vehicle.`,
  title: (city: City) => `Car wraps and window tint for ${city.name} | ${BASE_TITLE}`,
  description: (city: City) =>
    `Vinyl wraps, window tint, XPEL paint protection film and powder coated wheels for ${city.name} drivers at 13417 E Eight Mile Rd in Warren, by appointment. Call or text (248) 259-1617.`,
  path: (city: City) => `/wraps-and-tint/${city.slug}/`,
  chooseTab: "Choose",
  chooseTitle: "Pick a finish. Pick a film.",
  recentTab: "Recent work",
  recentTitle: "From the book to the street.",
} as const;

// ---------------- Site-wide FAQ ----------------
// Rewritten from docs/OLD_SITE_TEXT.txt: tighter, factual, old numbers removed.

export const FAQ: readonly FaqItem[] = [
  { q: "What does window tint do?", a: "A thin film on the inside of the glass cuts the heat, glare and UV coming into the cabin, adds privacy and helps the interior fade less." },
  { q: "What is a vinyl wrap?", a: "A thin adhesive film laid over the paint. It changes the color or the finish of the car without painting it. Gloss, satin, matte, metallic, chrome, color flip and printed designs are all film." },
  { q: "Will a wrap damage my paint?", a: "A wrap applied correctly can be removed by a professional without damaging the original paint." },
  { q: "How long does a wrap take?", a: "A full wrap usually takes 1 to 3 days depending on the size of the vehicle and the design. Partial wraps and smaller vehicles take less." },
  { q: "How do I care for a wrapped car?", a: "Hand wash with a mild soap and a soft mitt, dry with a soft cloth, and skip automatic washes with brushes. Check the edges now and then and text us if anything lifts." },
  { q: "Can I tint or wrap the car myself?", a: "Kits exist, but a smooth, bubble free job that lasts takes the tools and the hands. Bring it in and it is done right the first time." },
  { q: "Will tint hurt my visibility at night?", a: "A legal shade on good film should not get in the way at night. Michigan sets a limit per window, and we will tell you what is allowed on yours." },
  { q: "Do you tint buildings?", a: "Yes. Dual reflective mirror film, colored film, blackout film and decorative and privacy film for storefronts, offices and homes." },
  { q: "How do I get a price?", a: "Everything is quoted per vehicle. Call or text (248) 259-1617 with the car and what you want, send the ticket on the contact page, or book online." },
] as const;

// ---------------- Quote ticket ----------------

export const QUOTE_OPTIONS = {
  services: [
    { id: "wrap", label: "Vinyl wrap" },
    { id: "commercial", label: "Commercial wrap" },
    { id: "tint", label: "Window tint" },
    { id: "ppf", label: "Paint protection film" },
    { id: "powder", label: "Powder coating" },
    { id: "buildings", label: "Home or business tint" },
    { id: "other", label: "Something else" },
  ],
  finishes: ["Gloss", "Satin", "Matte", "Metallic", "Chrome", "Color flip", "Printed", "Not sure yet"],
  coverage: ["Full", "Partial", "Hood", "Roof", "Stripes", "Not sure yet"],
  films: ["Standard", "Black carbon", "Ceramic", "Not sure yet"],
  windows: ["All", "Rear only", "Front two", "Windshield or sunroof"],
  mobile: "Mobile tint at my place, if available",
} as const;

export const FORM = {
  endpoint: "https://api.web3forms.com/submit",
  subject: "Quote request from rickywrapsllc.com",
  fromName: "One Stop Customs website",
  /** Trailing slash: next.config.ts sets trailingSlash true, so this is the canonical form. */
  thankYouPath: "/thank-you/",
  envKey: "NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY",
  submit: "Send quote request",
  sending: "Sending",
  sections: {
    vehicle: "Vehicle",
    what: "What you want",
    finish: "Finish or shade",
    reach: "How to reach you",
  },
  fields: {
    vehicle: { label: "Year, make and model", placeholder: "2021 Dodge Charger" },
    finish: { label: "Finish" },
    coverage: { label: "Coverage" },
    film: { label: "Film" },
    windows: { label: "Windows" },
    name: { label: "Name" },
    phone: { label: "Phone" },
    email: { label: "Email (optional)" },
    message: { label: "Anything else" },
  },
  hint: "Text photos to (248) 259-1617 after you send, if it helps.",
  notice: {
    heading: "The quote form is not connected yet.",
    errorHeading: "Something went wrong sending this.",
    body: "Call or text (248) 259-1617, email rickwraps101@gmail.com, or book online.",
  },
  errors: {
    name: "Add your name.",
    phone: "Add a phone number we can text.",
  },
} as const;

// ---------------- About, contact, thank you, 404 ----------------

export const ABOUT = {
  tab: "About",
  h1: "One Stop Customs, by Ricky Wraps.",
  lede: "The shop you know as Ricky Wraps is One Stop Customs, at 13417 E Eight Mile Rd in Warren, by appointment.",
  paragraphs: [
    "Carlton Spencer, known as Ricky, owns and runs the shop. His old site opened with \"My name is Carlton, and I'm the proud owner,\" and that is still the whole story: the person who quotes the job is the person laying the film.",
    "The shop wraps and tints cars, lays XPEL paint protection film, prints and installs commercial wraps, puts window film on storefronts, offices and homes, and powder coats wheels. The film is Avery Dennison and 3M, with hundreds of colors in stock and the graphic design done in house.",
    "Everything runs by appointment and is quoted per vehicle. Call or text (248) 259-1617, book online, or find the work as it happens on Instagram at @rickywraps and @onestopcustoms.autospa.",
  ],
  photoIds: { side: "mustang-white-shop", below: "silverado-black" },
} as const;

export const CONTACT = {
  tab: "Quote",
  h1: "Get a quote.",
  lede: "Tell us the car and what you want. Call or text (248) 259-1617, book online, or send the ticket and Ricky replies from the same number.",
  metaTitle: `Get a quote | ${BASE_TITLE}`,
  metaDescription: "Send the quote ticket, call or text (248) 259-1617, or book online. Vinyl wraps, window tint, paint protection film and powder coating at 13417 E Eight Mile Rd in Warren, by appointment.",
} as const;

export const THANK_YOU = {
  h1: "Got it.",
  lede: "Ricky will call or text you from (248) 259-1617. For anything today, call or text that number.",
  primary: { label: "Call or text (248) 259-1617", href: BRAND.phoneHref },
  secondary: { label: "Book online", href: BRAND.bookingUrl, external: true },
  back: { label: "Back to the gallery", href: "/gallery/" },
  metaTitle: `Got it | ${BASE_TITLE}`,
  metaDescription: "Your quote request was sent. Ricky will call or text you from (248) 259-1617.",
} as const;

export const NOT_FOUND = {
  h1: "This page is not in the book.",
  lede: "Try the gallery, or call or text (248) 259-1617.",
  links: [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery/" },
  ] as readonly LinkItem[],
  metaTitle: `Not found | ${BASE_TITLE}`,
  metaDescription: "This page is not in the book. Try the gallery, or call or text (248) 259-1617.",
} as const;

// ---------------- Reviews summary ----------------
// Items are generated into src/lib/reviews.ts by scripts/fetch-reviews.mjs and never hand-typed.
// Open item: reviews.ts holds five items including "Fadi A." which is not in docs/REVIEWS.json;
// re-run the script before launch so the file and the listing agree.

export const REVIEW_SUMMARY = {
  rating: REVIEWS.rating,
  count: REVIEWS.count,
  asOf: REVIEWS.asOf,
  url: REVIEWS.url,
  source: "Google",
  line: REVIEW_LINE,
} as const;

// ---------------- SEO ----------------

export const SEO: Readonly<Record<string, { title: string; description: string; path?: string }>> = {
  home: {
    title: HOME_TITLE,
    description: "Vinyl wraps, window tint, XPEL paint protection film and powder coating at 13417 E Eight Mile Rd in Warren, by appointment. Avery Dennison and 3M films. Call or text (248) 259-1617.",
    path: "/",
  },
  wraps: { title: SERVICE_PAGES.wraps.metaTitle, description: SERVICE_PAGES.wraps.metaDescription, path: SERVICE_PAGES.wraps.path },
  commercial: { title: SERVICE_PAGES.commercial.metaTitle, description: SERVICE_PAGES.commercial.metaDescription, path: SERVICE_PAGES.commercial.path },
  tint: { title: SERVICE_PAGES.tint.metaTitle, description: SERVICE_PAGES.tint.metaDescription, path: SERVICE_PAGES.tint.path },
  ppf: { title: SERVICE_PAGES.ppf.metaTitle, description: SERVICE_PAGES.ppf.metaDescription, path: SERVICE_PAGES.ppf.path },
  buildings: { title: SERVICE_PAGES.buildings.metaTitle, description: SERVICE_PAGES.buildings.metaDescription, path: SERVICE_PAGES.buildings.path },
  powder: { title: SERVICE_PAGES.powder.metaTitle, description: SERVICE_PAGES.powder.metaDescription, path: SERVICE_PAGES.powder.path },
  gallery: {
    title: `Gallery | ${BASE_TITLE}`,
    description: "Every photo in the book: wraps, stripes, printed commercial wraps, tint, paint protection film and powder coated wheels, all the shop's own work in Warren.",
    path: "/gallery/",
  },
  about: {
    title: `About | ${BASE_TITLE}`,
    description: "One Stop Customs, by Ricky Wraps. Carlton Spencer, known as Ricky, wraps, tints and protects cars at 13417 E Eight Mile Rd in Warren, by appointment.",
    path: "/about/",
  },
  contact: { title: CONTACT.metaTitle, description: CONTACT.metaDescription, path: "/contact/" },
  thankYou: { title: THANK_YOU.metaTitle, description: THANK_YOU.metaDescription, path: "/thank-you/" },
  notFound: { title: NOT_FOUND.metaTitle, description: NOT_FOUND.metaDescription },
};

// ---------------- The shop on paper ----------------

/** Every verified fact in one list, in the order the shop sheet and JSON-LD read them. */
export const SPEC: readonly Fact[] = [
  { key: "Brand", value: "One Stop Customs, by Ricky Wraps" },
  { key: "Legal name", value: "One Stop Customs LLC" },
  { key: "Owner", value: "Carlton Spencer, known as Ricky" },
  { key: "Shop", value: "13417 E Eight Mile Rd, Warren, MI 48089", href: BRAND.address.mapUrl, external: true },
  { key: "Hours", value: "Mon 12 to 7 pm, Tue to Sat 10 am to 6 pm, Sun closed" },
  { key: "Appointments", value: "By appointment" },
  { key: "Phone", value: "Call or text (248) 259-1617", href: BRAND.phoneHref },
  { key: "Email", value: "rickwraps101@gmail.com", href: BRAND.emailHref },
  { key: "Films", value: "Avery Dennison and 3M films, XPEL paint protection film" },
  { key: "Work", value: "Vinyl wraps, commercial wraps, window tint, paint protection film, window film for buildings, powder coated wheels" },
  { key: "Service area", value: "Warren, Detroit and Metro Detroit, Macomb, Oakland and Wayne counties" },
  { key: "Google", value: REVIEW_LINE, href: BRAND.reviewUrl, external: true },
  { key: "Book online", value: "rickywraps.square.site", href: BRAND.bookingUrl, external: true },
  { key: "Instagram", value: "@rickywraps", href: BRAND.social.instagram, external: true },
  { key: "TikTok", value: "@rickywraps", href: BRAND.social.tiktok, external: true },
  { key: "Facebook", value: "Rickywraps1", href: BRAND.social.facebook, external: true },
] as const;

/** Shop sheet rows in the fixed order (DESIGN.md 5.18). Hours come from BRAND.hours. */
export const SHOP_SHEET = {
  address: "Address",
  hours: "Hours",
  appointment: BRAND.byAppointment,
  phone: "Phone",
  phoneText: "Text",
  email: "Email",
  book: "Book online",
  follow: "Follow",
} as const;
