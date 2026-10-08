// ============================================================
// One Stop Customs by Ricky Wraps. Site facts (single source of truth)
// 13417 E Eight Mile Rd, Warren, Michigan. Vinyl wraps, window tint,
// paint protection film, powder coating, detailing, ceramic coating, paint
// correction, starlight headliners and kill switches. By appointment.
//
// Rules baked in (docs/BRIEF.md sections 1, 2 and 5): every fact traces to
// the brief; no prices except the ones Ricky sent for the site (paint
// protection film, kill switches, starlight headliners, detailing), no
// years in business, no counts of cars, no guarantees, no invented reviews;
// no em or en dashes anywhere; sentence case. Quote copy uses the free quote
// voice: get a free quote, tell us about your vehicle, fast, no pressure,
// book your spot.
//
// Photos live in photos.ts, the eleven service pages in services.ts.
// ============================================================

import { REVIEWS, type Review } from "@/lib/reviews";

export { REVIEWS };

export interface LinkItem {
  href: string;
  label: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface City {
  slug: string;
  name: string;
  county: "Macomb" | "Oakland" | "Wayne";
  photoId: string;
  /** One sentence of real geography relative to the shop. No drive times. */
  note: string;
}

// ---------------- Site ----------------

/** Stays on the Ricky Wraps domain until Nick buys a One Stop Customs domain (open question). Never link the hijacked rickywraps dot com domain. */
export const SITE_URL = "https://rickywrapsllc.com";

export const BASE_TITLE = "One Stop Customs by Ricky Wraps";
export const HOME_TITLE = "One Stop Customs by Ricky Wraps | Vinyl wraps, window tint and PPF in Warren, MI";

export const BRAND = {
  name: "One Stop Customs",
  byline: "by Ricky Wraps",
  legalName: "One Stop Customs LLC",
  alternateName: "Ricky Wraps",
  owner: "Carlton Spencer",
  ownerKnownAs: "Ricky",
  phoneDisplay: "(248) 259-1617",
  phoneTel: "+12482591617",
  phoneHref: "tel:+12482591617",
  phoneSms: "sms:+12482591617",
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
    { days: "Monday", hours: "12 pm to 7 pm" },
    { days: "Tuesday to Saturday", hours: "10 am to 6 pm" },
    { days: "Sunday", hours: "Closed" },
  ],
  hoursShort: "Mon 12 to 7, Tue to Sat 10 to 6",
  /** schema.org openingHoursSpecification, 24 hour clock. */
  hoursSchema: [
    { dayOfWeek: ["Monday"], opens: "12:00", closes: "19:00" },
    { dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "18:00" },
  ],
  byAppointment: "By appointment",
  bookingUrl: "https://rickywraps.square.site/",
  reviewUrl: "https://maps.google.com/?cid=7698645542302137521",
  googlePlaceId: "ChIJoalNF4PJJIgRsTyQ4FQV12o",
  social: {
    instagram: "https://www.instagram.com/rickywraps",
    instagramHandle: "@rickywraps",
    tiktok: "https://www.tiktok.com/@rickywraps",
    facebook: "https://www.facebook.com/Rickywraps1",
    google: "https://maps.google.com/?cid=7698645542302137521",
  },
  serviceArea: "Warren, Detroit and Metro Detroit",
  counties: ["Macomb", "Oakland", "Wayne"],
  countiesLine: "Macomb, Oakland and Wayne counties",
  mobileTint: "Mobile tint is available by appointment. Ask when you book.",
} as const;

export const BUSINESS_DESCRIPTION =
  "One Stop Customs, by Ricky Wraps, is a by appointment vinyl wrap, window tint, paint protection film and powder coating shop at 13417 E Eight Mile Rd in Warren, Michigan. Avery Dennison and 3M films, XPEL paint protection film, commercial and fleet wraps, window film for storefronts, offices and homes, powder coated wheels, auto detailing, ceramic coating, paint correction, starlight headliners and kill switch installation. Serving Warren, Detroit and Metro Detroit across Macomb, Oakland and Wayne counties.";

/** The one action label, everywhere. */
export const QUOTE_CTA = "Get a free quote";

export const CREDIT = {
  text: "Website & marketing by Modern Apex Strategies",
  href: "https://modernapexstrategies.com",
} as const;

// ---------------- Reviews ----------------

export const REVIEW_SUMMARY = {
  rating: REVIEWS.rating,
  count: REVIEWS.count,
  asOf: REVIEWS.asOf,
  url: REVIEWS.url,
  line: `${REVIEWS.rating} from ${REVIEWS.count} reviews on Google`,
} as const;

/**
 * Only the reviews that are in docs/REVIEWS.json with five stars are quoted
 * on the site, verbatim, first name and last initial.
 */
const QUOTABLE = ["Steve G.", "Donielle H.", "Ali J.", "Kimonike T."];

export function reviewBy(name: string): Review | undefined {
  if (!QUOTABLE.includes(name)) return undefined;
  return REVIEWS.items.find((r) => r.name === name);
}

// ---------------- The three steps, the same on every page ----------------

export const STEPS: readonly { title: string; body: string }[] = [
  { title: "Tell us about your vehicle", body: "Year, make, model and what you want done. It takes about a minute, and photos help." },
  { title: "Get your free quote", body: "We price it for your vehicle and get back to you fast. No pressure, no surprises." },
  { title: "Book your spot", body: "Pick a day that works and bring it to the shop on Eight Mile in Warren. We run by appointment, so the bay is yours." },
] as const;

// ---------------- Cities ----------------

/** Twelve city pages. Notes are real geography, not claims about the city. */
export const CITIES: readonly City[] = [
  { slug: "warren", name: "Warren", county: "Macomb", photoId: "trx-yellow-front", note: "The shop is in Warren, on the Warren side of Eight Mile, the road that divides Warren from Detroit." },
  { slug: "detroit", name: "Detroit", county: "Wayne", photoId: "charger-pink", note: "Eight Mile is the Detroit city line, so the shop sits directly across the road from the east side of Detroit." },
  { slug: "royal-oak", name: "Royal Oak", county: "Oakland", photoId: "audi-rosegold-front", note: "From Royal Oak, take Woodward or I-75 south to Eight Mile and head east. The shop is on the Warren side of the road." },
  { slug: "sterling-heights", name: "Sterling Heights", county: "Macomb", photoId: "challenger-blue", note: "Sterling Heights sits directly north of Warren. Van Dyke, Mound and Schoenherr all run south through Warren to Eight Mile." },
  { slug: "eastpointe", name: "Eastpointe", county: "Macomb", photoId: "huracan-red-square", note: "Eastpointe shares the Eight Mile line with the shop, one city east of Warren, so it is a run west along the same road." },
  { slug: "roseville", name: "Roseville", county: "Macomb", photoId: "maserati-blue-side", note: "Roseville sits northeast of Warren. Gratiot runs southwest to Eight Mile, and the shop is west along the road on the Warren side." },
  { slug: "madison-heights", name: "Madison Heights", county: "Oakland", photoId: "modely-satin-grey", note: "Madison Heights is across Dequindre from Warren, the county line. The shop is south to Eight Mile and east." },
  { slug: "hazel-park", name: "Hazel Park", county: "Oakland", photoId: "camaro-red-front", note: "Hazel Park fronts Eight Mile too, just west of Dequindre. The shop is a straight run east on the same road." },
  { slug: "ferndale", name: "Ferndale", county: "Oakland", photoId: "charger-white-red", note: "Ferndale's south edge is Eight Mile at Woodward. The shop is east along Eight Mile on the Warren side." },
  { slug: "troy", name: "Troy", county: "Oakland", photoId: "sclass-white-front", note: "From Troy, I-75 runs south to Eight Mile. The shop is east from there on the Warren side of the road." },
  { slug: "southfield", name: "Southfield", county: "Oakland", photoId: "urus-grey-front", note: "Southfield's south edge is Eight Mile as well, west of Woodward. The shop is east along the same road past Woodward." },
  { slug: "grosse-pointe", name: "Grosse Pointe", county: "Wayne", photoId: "porsche-911-black", note: "The Grosse Pointes sit on Lake St. Clair at Detroit's east edge. The shop is inland on Eight Mile at the south line of Warren." },
] as const;

export const CITY_BY_SLUG: Readonly<Record<string, City>> = Object.fromEntries(CITIES.map((c) => [c.slug, c]));

export function cityPath(city: City): string {
  return `/wraps-and-tint/${city.slug}/`;
}

export const CITY_COPY = {
  h1: (city: City) => `Car wraps and window tint for *${city.name}*.`,
  lead: (city: City) =>
    `One Stop Customs is a by appointment wrap, tint and paint protection shop at 13417 E Eight Mile Rd in Warren. ${city.name} drivers bring the car to us, and mobile tint is available by appointment. Get a free quote for your vehicle.`,
  title: (city: City) => `Car wraps and window tint for ${city.name}, MI | ${BASE_TITLE}`,
  description: (city: City) =>
    `Vinyl wraps, window tint, XPEL paint protection film and powder coated wheels for ${city.name} drivers, at 13417 E Eight Mile Rd in Warren. Free quotes. Call or text (248) 259-1617.`,
} as const;

// ---------------- Site-wide questions ----------------

export const FAQ: readonly FaqItem[] = [
  { q: "How do I get a quote?", a: "Tell us about your vehicle and what you want done using the form on this page, or call or text (248) 259-1617. Quotes are free and we get back to you fast." },
  { q: "Do I need an appointment?", a: "Yes. The shop runs by appointment so your vehicle has a set day. Book online, or call or text to set a time." },
  { q: "Will a wrap damage my paint?", a: "A wrap applied correctly can be removed by a professional without damaging the original paint." },
  { q: "How long does a wrap take?", a: "A full wrap usually takes 1 to 3 days depending on the size of the vehicle and the design. Partial wraps and smaller vehicles take less." },
  { q: "Which window film should I pick?", a: "Standard is the dyed film with a 1 year warranty. Black carbon rejects about 60 percent of heat and 99 percent of UV with a 3 year warranty. Ceramic rejects about 80 percent of heat with a 5 year warranty. We will help you pick the one that fits the car and the budget." },
  { q: "How dark can I tint my windows?", a: "Michigan sets a limit for each window. We will tell you what is allowed on yours before any film goes on." },
  { q: "Do you come to me?", a: "Mobile tint is available by appointment, and detailing is offered mobile or at the shop. Ask when you book. Wraps, paint protection film and powder coating are done at the shop." },
  { q: "Do you tint homes and businesses?", a: "Yes. Dual reflective, colored, blackout, decorative and privacy film for storefronts, offices and homes." },
] as const;

// ---------------- Quote form ----------------

export const QUOTE_SERVICES: readonly { id: string; label: string }[] = [
  { id: "wraps", label: "Vinyl wrap" },
  { id: "commercial", label: "Commercial or fleet wrap" },
  { id: "tint", label: "Window tint" },
  { id: "ppf", label: "Paint protection film" },
  { id: "powder", label: "Powder coating" },
  { id: "detailing", label: "Auto detailing" },
  { id: "ceramic", label: "Ceramic coating" },
  { id: "correction", label: "Paint correction" },
  { id: "starlight", label: "Starlight headliner" },
  { id: "killswitch", label: "Kill switch" },
  { id: "buildings", label: "Home or business tint" },
  { id: "other", label: "Something else" },
] as const;

export const FORM = {
  endpoint: "https://api.web3forms.com/submit",
  subject: "Free quote request from the One Stop Customs website",
  fromName: "One Stop Customs website",
  /** Trailing slash: next.config.ts sets trailingSlash true, so this is the canonical form. */
  thankYouPath: "/thank-you/",
  submit: "Get my free quote",
  sending: "Sending",
  errors: {
    name: "Add your name.",
    phone: "Add a phone number we can call or text.",
  },
  notConnected: {
    heading: "This form is not connected yet.",
    body: "Call or text (248) 259-1617 and we will get your quote started.",
  },
  failed: {
    heading: "Something went wrong sending this.",
    body: "Nothing was lost on our end. Call or text (248) 259-1617 and we will take it from there.",
  },
} as const;

// ---------------- About ----------------

export const ABOUT = {
  h1: "One shop for the *whole look*.",
  lead: "One Stop Customs is the shop you know as Ricky Wraps, on Eight Mile in Warren.",
  paragraphs: [
    "Carlton Spencer, known as Ricky, owns and runs the shop. The name on the sign is new. The work, the phone number and the people are the same.",
    "The shop wraps and tints cars, lays XPEL paint protection film, prints and installs commercial wraps, puts window film on storefronts, offices and homes, and powder coats wheels. It also details cars, corrects and ceramic coats paint, builds starlight headliners and installs kill switches. The vinyl is Avery Dennison and 3M, with hundreds of colors in stock and the graphic design done in house.",
    "Everything runs by appointment and every job starts with a free quote. Tell us about your vehicle, pick a day, and bring it to Eight Mile.",
  ],
  facts: [
    { k: "Owner", v: "Carlton Spencer, known as Ricky" },
    { k: "Shop", v: "13417 E Eight Mile Rd, Warren, MI 48089" },
    { k: "Hours", v: "Mon 12 to 7, Tue to Sat 10 to 6, by appointment" },
    { k: "Vinyl", v: "Avery Dennison and 3M" },
    { k: "Paint protection", v: "XPEL film" },
    { k: "Area", v: "Warren, Detroit and Metro Detroit" },
  ],
} as const;

// ---------------- Share card ----------------
// scripts/make-og.py reads these two blocks to draw public/og-image.jpg, so
// the card cannot drift from the site. The site itself does not print them.

export const HERO = {
  headline: "The wrap and tint shop on Eight Mile in Warren.",
  headlineLines: ["The wrap and tint shop", "on Eight Mile in Warren."] as readonly string[],
} as const;

export const CTA = {
  callOrText: "Call or text (248) 259-1617",
} as const;
