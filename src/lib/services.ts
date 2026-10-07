import { BASE_TITLE, REVIEW_SUMMARY, type FaqItem } from "@/lib/constants";

/**
 * The six service pages, one record each. ServiceLanding.tsx renders every
 * one of them from this file, so new service copy goes here and never in a
 * page file. A heading may carry one *starred* word, which the hero prints
 * in the accent green.
 */

export type ServiceId = "wraps" | "tint" | "ppf" | "commercial" | "buildings" | "powder";

export interface Service {
  id: ServiceId;
  path: string;
  /** The name in navigation, cards and breadcrumbs. */
  name: string;
  /** One line under the name in the navigation menu. */
  navNote: string;
  /** The card on the home and city pages. */
  blurb: string;
  cardPhoto: string;
  cardPos?: string;
  eyebrow: string;
  h1: string;
  lead: string;
  heroPhoto: string;
  /** A different frame for phones, where the box is portrait. Defaults to heroPhoto. */
  heroPhotoMobile?: string;
  /** object-position at 768 and up. */
  heroFocus?: string;
  /** Low resolution or busy frames run under a deeper scrim. */
  heroHeavy?: boolean;
  checksHeading: string;
  checks: readonly { title: string; body: string }[];
  proofHeading: string;
  proofIntro: string;
  proofRows: readonly { k: string; v: string }[];
  proofPhoto: string;
  proofRatio?: string;
  reviewName?: string;
  faqs: readonly FaqItem[];
  quoteKey: string;
  metaTitle: string;
  metaDescription: string;
}

const REVIEWS_ROW = { k: "Google reviews", v: `${REVIEW_SUMMARY.rating} stars from ${REVIEW_SUMMARY.count} reviews` };
const PRICE_ANSWER =
  "Every job is priced for the vehicle and the coverage you want. Tell us about your vehicle and we will get back to you fast with a free quote.";

export const SERVICE_LIST: readonly Service[] = [
  {
    id: "wraps",
    path: "/vinyl-wraps/",
    name: "Vinyl wraps",
    navNote: "Color changes, partials, stripes, printed",
    blurb: "Full color changes, partial wraps, stripes and printed designs in Avery Dennison and 3M film.",
    cardPhoto: "charger-pink",
    eyebrow: "Vinyl wraps · Warren, MI",
    h1: "Change the color.|Keep the *paint*.",
    lead: "Full color change wraps, partial wraps, stripes and printed designs in Avery Dennison and 3M film. Gloss, satin, matte, metallic, chrome and color flip, with hundreds of colors in stock. Get a free quote for your vehicle.",
    heroPhoto: "trx-yellow-side",
    heroFocus: "50% 70%",
    heroHeavy: true,
    checksHeading: "What a wrap gets you.",
    checks: [
      { title: "A new color without a repaint", body: "Film goes over the paint you have. Pick the color and the finish, and the car leaves looking like a different car." },
      { title: "Your factory paint stays underneath", body: "A wrap applied correctly can be removed by a professional without damaging the original paint." },
      { title: "Hundreds of colors in stock", body: "Gloss, satin, matte, metallic, chrome and color flip. Come see the swatches in person before you choose." },
      { title: "The whole car or one panel", body: "Full color changes, half wraps, hoods, roofs, stripes and decals. Your quote covers only the panels you pick." },
      { title: "Printed and custom designs", body: "Camo, Bape style and one off designs are drawn in house, printed on the film and installed here." },
      { title: "Done in 1 to 3 days", body: "A full wrap usually takes 1 to 3 days depending on the vehicle and the design. Partial wraps take less." },
    ],
    proofHeading: "Why wrap it here.",
    proofIntro: "Brand name film, design done in house, and the work posted as it happens on Instagram at @rickywraps. Check any of it before you call.",
    proofRows: [
      { k: "Film", v: "Avery Dennison and 3M" },
      { k: "Finishes", v: "Gloss, satin, matte, metallic, chrome, color flip" },
      { k: "Design", v: "Custom and printed designs drawn in house" },
      { k: "Turnaround", v: "1 to 3 days for a full wrap" },
      { k: "Removal", v: "Wrap removal is available" },
      REVIEWS_ROW,
    ],
    proofPhoto: "rangerover-purple",
    reviewName: "Steve G.",
    faqs: [
      { q: "What is a vinyl wrap?", a: "A thin adhesive film laid over the paint. It changes the color or the finish of the car without painting it, and it comes off again." },
      { q: "Will a wrap damage my paint?", a: "A wrap applied correctly can be removed by a professional without damaging the original paint." },
      { q: "How long does a full wrap take?", a: "A full wrap usually takes 1 to 3 days depending on the size of the vehicle and the design. Partial wraps and smaller vehicles take less." },
      { q: "Can I wrap just part of the car?", a: "Yes. Hoods, roofs, stripes, half wraps and decals are all on the menu, and your quote covers only the panels you pick." },
      { q: "Do you do printed designs?", a: "Yes. Camo, Bape style and custom designs are drawn in house, printed on the film and installed here." },
      { q: "How do I wash a wrapped car?", a: "Hand wash with a mild soap and a soft mitt, then dry with a soft cloth. Skip automatic washes with brushes. Check the edges now and then and text us if anything lifts." },
      { q: "How much does a wrap cost?", a: PRICE_ANSWER },
    ],
    quoteKey: "wraps",
    metaTitle: `Vinyl wraps in Warren, MI | ${BASE_TITLE}`,
    metaDescription: "Color change wraps, partial wraps, stripes and printed designs in Avery Dennison and 3M film at 13417 E Eight Mile Rd in Warren. Free quotes. Call or text (248) 259-1617.",
  },
  {
    id: "tint",
    path: "/window-tinting/",
    name: "Window tinting",
    navNote: "Standard, black carbon and ceramic film",
    blurb: "Standard, black carbon and ceramic film for a cooler, more private cabin, cut and laid by hand.",
    cardPhoto: "escalade-black-window",
    cardPos: "40% 55%",
    eyebrow: "Window tinting · Warren, MI",
    h1: "Less heat. Less glare.|More *privacy*.",
    lead: "Standard, black carbon and ceramic window film, cut and laid by hand in our Warren shop. Windshield and sunroof film, tint removal, and mobile tint by appointment. Get a free quote for your vehicle.",
    heroPhoto: "tint-hands",
    heroFocus: "70% 50%",
    checksHeading: "What tint does for you.",
    checks: [
      { title: "A cooler cabin", body: "Ceramic film rejects about 80 percent of heat and black carbon about 60 percent, so the car is easier to get into in July." },
      { title: "UV kept off you and the interior", body: "Black carbon film blocks 99 percent of UV, the light that fades seats and dashboards." },
      { title: "Privacy and less glare", body: "Darker glass keeps eyes out of the cabin and takes the edge off low sun and headlights." },
      { title: "Three films to choose from", body: "Standard, black carbon and ceramic. We explain the difference and you pick what fits the car and the budget." },
      { title: "A warranty on every film", body: "1 year on standard, 3 years on black carbon and 5 years on ceramic. Terms are confirmed with your quote." },
      { title: "Old tint taken off first", body: "Purple, bubbled or peeling film comes off before the new film goes on. Tint removal is its own service too." },
    ],
    proofHeading: "Why tint it here.",
    proofIntro: "The options get explained before anything goes on the glass, and every film carries its own warranty.",
    proofRows: [
      { k: "Films", v: "Standard, black carbon and ceramic" },
      { k: "Heat rejection", v: "About 60 percent with carbon, about 80 percent with ceramic" },
      { k: "Warranty", v: "1, 3 or 5 years, by film" },
      { k: "Also", v: "Windshield, sunroof and colored film, tint removal" },
      { k: "Mobile tint", v: "Available by appointment" },
      REVIEWS_ROW,
    ],
    proofPhoto: "escalade-black-window",
    reviewName: "Donielle H.",
    faqs: [
      { q: "What does window tint do?", a: "A thin film on the inside of the glass cuts the heat, glare and UV coming into the cabin, adds privacy and helps the interior fade less." },
      { q: "Which film should I pick?", a: "Standard is the dyed film with a 1 year warranty. Black carbon rejects about 60 percent of heat and 99 percent of UV with a 3 year warranty. Ceramic rejects about 80 percent of heat with a 5 year warranty. We will help you pick the one that fits the car and the budget." },
      { q: "How dark can I go?", a: "Michigan sets a limit for each window. We will tell you what is allowed on yours before any film goes on." },
      { q: "Will tint hurt my visibility at night?", a: "A legal shade on good film should not get in the way at night. Going darker than the law allows will, which is one more reason to stay inside the limit." },
      { q: "Can you remove old tint?", a: "Yes. Tint removal is its own job, purple and bubbled film included." },
      { q: "Do you tint windshields and sunroofs?", a: "Yes. Windshield and sunroof film are available, along with colored film." },
      { q: "Do you come to me?", a: "Mobile tint is available by appointment. Ask when you book." },
      { q: "How much does tint cost?", a: PRICE_ANSWER },
    ],
    quoteKey: "tint",
    metaTitle: `Window tinting in Warren, MI | ${BASE_TITLE}`,
    metaDescription: "Standard, black carbon and ceramic window tint, windshield film and tint removal at 13417 E Eight Mile Rd in Warren. Free quotes. Call or text (248) 259-1617.",
  },
  {
    id: "ppf",
    path: "/paint-protection-film/",
    name: "Paint protection film",
    navNote: "XPEL film, clear, matte or colored",
    blurb: "XPEL film over the panels that take the hits. Clear, matte or colored, front end or full body.",
    cardPhoto: "ppf-headlight-wide",
    cardPos: "18% 50%",
    eyebrow: "Paint protection film · XPEL",
    h1: "Rock chips stop *here*.",
    lead: "XPEL paint protection film over the panels that take the hits, so chips and scratches land on the film and not on your paint. Clear, matte or colored, front end or full body. Get a free quote for your vehicle.",
    heroPhoto: "ppf-headlight-wide",
    heroFocus: "0% 50%",
    heroHeavy: true,
    checksHeading: "What the film does.",
    checks: [
      { title: "Takes the chips and scratches", body: "Rocks, road debris and scuffs hit the film. The paint underneath stays the way it left the factory." },
      { title: "Heals itself", body: "Light scratches and swirl marks in the film settle out with heat from the sun or a warm garage." },
      { title: "Clear, matte or colored", body: "Keep the paint's own look, turn the finish matte, or change the color with film thick enough to protect it." },
      { title: "Front end or full body", body: "Cover the bumper, hood, fenders and mirrors, or cover every painted panel." },
      { title: "XPEL film", body: "A film brand you can look up. Ask about the film warranty with your quote." },
      { title: "Long term protection", body: "This is not a wax or a spray. The film stays on the car and keeps working." },
    ],
    proofHeading: "Why film it here.",
    proofIntro: "XPEL film, installed in our Warren shop by appointment, with the coverage and the warranty confirmed for your vehicle before any work starts.",
    proofRows: [
      { k: "Film", v: "XPEL paint protection film" },
      { k: "Finishes", v: "Clear, matte or colored" },
      { k: "Front end", v: "Bumper, hood, fenders and mirrors" },
      { k: "Full body", v: "Every painted panel" },
      { k: "Warranty", v: "Confirmed with your quote" },
      REVIEWS_ROW,
    ],
    proofPhoto: "ppf-headlight-wide",
    proofRatio: "16 / 9",
    reviewName: "Kimonike T.",
    faqs: [
      { q: "What is paint protection film?", a: "A clear film laid over painted panels. It takes the rock chips, scratches and road debris so the paint does not." },
      { q: "Does it change how the car looks?", a: "Clear film does not. Matte film keeps the paint's color and turns the finish matte. Colored film changes the color with the film's thickness behind it." },
      { q: "What does self healing mean?", a: "Light scratches and swirl marks in the film settle out with heat, from the sun or a warm garage." },
      { q: "Front end or full body?", a: "Front end covers the bumper, hood, fenders and mirrors, the panels that take the most hits. Full body covers every painted panel." },
      { q: "Which film do you use?", a: "XPEL paint protection film." },
      { q: "How long does it last?", a: "It is long term protection. Ask about the film warranty with your quote." },
      { q: "How much does paint protection film cost?", a: PRICE_ANSWER },
    ],
    quoteKey: "ppf",
    metaTitle: `Paint protection film in Warren, MI | ${BASE_TITLE}`,
    metaDescription: "XPEL paint protection film, clear, matte or colored, front end or full body, at 13417 E Eight Mile Rd in Warren. Free quotes. Call or text (248) 259-1617.",
  },
  {
    id: "commercial",
    path: "/commercial-wraps/",
    name: "Commercial wraps",
    navNote: "Printed graphics for one vehicle or a fleet",
    blurb: "Your logo, colors and contact info, designed in house and printed for one vehicle or a whole fleet.",
    cardPhoto: "commercial-tesla-homes-front",
    eyebrow: "Commercial and fleet wraps · Warren, MI",
    h1: "Put your brand|on the *road*.",
    lead: "Full color printed graphics, logos and contact info on one vehicle or a whole fleet. The layout is designed in house, printed on the film and installed in our Warren shop. Get a free quote for your vehicles.",
    heroPhoto: "commercial-tesla-homes-front",
    heroFocus: "50% 62%",
    heroHeavy: true,
    checksHeading: "What your vehicles get.",
    checks: [
      { title: "Design done in house", body: "Send the logo and the message. The layout is drawn here, so there is no outside designer to chase." },
      { title: "Full color printed graphics", body: "Logos, colors and contact info printed on the film and laid on the vehicle." },
      { title: "One vehicle or the fleet", body: "Full wraps and partial fleet wraps, with each vehicle quoted on its own." },
      { title: "It comes off when you need it to", body: "When the lease ends or the branding changes, a professional removal leaves the original paint as it was." },
      { title: "New branding without a repaint", body: "A new look or a seasonal message means new film, not new paint." },
      { title: "About 1 to 3 days per vehicle", body: "Plan on 1 to 3 days for a full wrap. Fleet scheduling is worked out with your quote." },
    ],
    proofHeading: "Designed, printed and installed here.",
    proofIntro: "The Homes.com Tesla and the WeDriveFor Blazer in these photos were designed in house and wrapped in this shop.",
    proofRows: [
      { k: "Design", v: "Graphic design done in house" },
      { k: "Print", v: "Full color printed graphics" },
      { k: "Coverage", v: "Full wraps and partial fleet wraps" },
      { k: "Film", v: "Avery Dennison and 3M" },
      { k: "Turnaround", v: "1 to 3 days per vehicle for a full wrap" },
      REVIEWS_ROW,
    ],
    proofPhoto: "commercial-blazer-pink",
    proofRatio: "2 / 1",
    reviewName: "Steve G.",
    faqs: [
      { q: "What can go on a fleet vehicle?", a: "Full color printed graphics, your logo, contact information and partial wraps, on one vehicle or a whole fleet. The graphic design is done in house." },
      { q: "What files do you need?", a: "Send what you have. Vector logo files give the cleanest print, and in house graphic design handles the layout from there." },
      { q: "What happens to the paint underneath?", a: "The wrap covers it. When the wrap comes off, a professional removal leaves the original paint as it was, so a leased or resold vehicle goes back to plain." },
      { q: "Can we change the graphics later?", a: "Yes. A wrap is removable, so new branding or a seasonal message means a new wrap, not a repaint." },
      { q: "How long does a commercial wrap take?", a: "Plan on 1 to 3 days per vehicle for a full wrap. Fleet scheduling is worked out with your quote." },
      { q: "How much does a commercial wrap cost?", a: PRICE_ANSWER },
    ],
    quoteKey: "commercial",
    metaTitle: `Commercial and fleet wraps in Warren, MI | ${BASE_TITLE}`,
    metaDescription: "Printed fleet graphics, logos and contact info with in house design at 13417 E Eight Mile Rd in Warren. Free quotes. Call or text (248) 259-1617.",
  },
  {
    id: "buildings",
    path: "/commercial-residential-tinting/",
    name: "Home and business tint",
    navNote: "Film for storefronts, offices and homes",
    blurb: "Privacy, heat and glare film for storefronts, offices and homes across Metro Detroit.",
    cardPhoto: "home-front-tint",
    eyebrow: "Home and business window tinting · Metro Detroit",
    h1: "Cut the heat.|Keep the *daylight*.",
    lead: "Window film for storefronts, offices and homes across Metro Detroit. Dual reflective, colored, blackout, decorative and privacy film, quoted for your glass. Get a free quote.",
    heroPhoto: "home-deck-tint",
    heroFocus: "50% 50%",
    heroHeavy: true,
    checksHeading: "What film does for a building.",
    checks: [
      { title: "Less heat and glare", body: "Film takes the edge off sun soaked rooms and storefronts without giving up the daylight." },
      { title: "UV kept off what is inside", body: "It slows the fading of furniture, flooring and displays that sit in the sun." },
      { title: "Privacy during the day", body: "Dual reflective film reads as a mirror from outside in daylight while the view out stays clear." },
      { title: "Blackout where you need it", body: "Blocks the view and the light entirely, for meeting rooms, storage and any room that needs to be private." },
      { title: "Decorative and colored film", body: "Decorative, privacy and colored film for glass that needs a look instead of a shade." },
      { title: "Quoted for your glass", body: "Tell us how many windows, roughly how big, and which way they face. The quote is free." },
    ],
    proofHeading: "Film for buildings, from a film shop.",
    proofIntro: "Window film is what this shop does every day. The same care goes onto a storefront or a sliding glass door.",
    proofRows: [
      { k: "Storefronts and offices", v: "Dual reflective, colored, blackout, decorative and privacy film" },
      { k: "Homes", v: "Heat, glare and UV reduction, privacy, dual reflective and blackout film" },
      { k: "Area", v: "Warren, Detroit and Metro Detroit" },
      { k: "Quotes", v: "Free, by the job" },
      REVIEWS_ROW,
    ],
    proofPhoto: "home-front-tint",
    reviewName: "Donielle H.",
    faqs: [
      { q: "What can window film do for a storefront or office?", a: "Cut the heat and glare, add privacy during the day, and slow the fading of furniture and displays that sit in the sun." },
      { q: "What is dual reflective film?", a: "Mirror film. From outside in daylight the glass reads as a mirror, so people cannot see in, while the view out stays clear." },
      { q: "What is blackout film?", a: "Film that blocks the view and the light entirely, for meeting rooms, storage, and any room that needs to be dark or private." },
      { q: "Do you do homes?", a: "Yes. Heat, glare and UV reduction, privacy, dual reflective and blackout film for houses." },
      { q: "Do you offer colored or decorative film?", a: "Yes. Colored film in a range of shades, and decorative and privacy film for glass that wants a pattern instead of a shade." },
      { q: "How is it quoted?", a: "By the job, and the quote is free. Tell us the number and rough size of the windows and which way they face." },
    ],
    quoteKey: "buildings",
    metaTitle: `Home and business window tinting in Metro Detroit | ${BASE_TITLE}`,
    metaDescription: "Dual reflective, colored, blackout, decorative and privacy film for storefronts, offices and homes, from the shop in Warren. Free quotes. Call or text (248) 259-1617.",
  },
  {
    id: "powder",
    path: "/powder-coating/",
    name: "Powder coating",
    navNote: "Wheels sandblasted, coated and baked",
    blurb: "Wheels sandblasted, coated and baked in a new color. Tires come off and go back on here.",
    cardPhoto: "powdercoat-wheel-spray",
    cardPos: "30% 50%",
    eyebrow: "Powder coating · Wheels",
    h1: "A new finish for your *wheels*.",
    lead: "Wheels sandblasted, powder coated and baked into a hard new color. Tires come off and go back on here, with a 1 to 2 day turnaround. Get a free quote for your set.",
    heroPhoto: "powdercoat-wheel-spray",
    heroFocus: "100% 50%",
    heroHeavy: true,
    checksHeading: "What your wheels get.",
    checks: [
      { title: "A finish that is baked on", body: "Dry powder is sprayed onto the wheel and baked into a hard finish." },
      { title: "Sandblasted first", body: "The old finish is blasted off before the new coat goes on." },
      { title: "Tires handled here", body: "Tires are removed, the wheels are coated, and the tires are remounted. No second stop." },
      { title: "Back in 1 to 2 days", body: "A set of wheels takes 1 to 2 days." },
      { title: "Your color", body: "Tell us the color you have in mind when you book." },
      { title: "More than wheels", body: "Wheels come first. Ask about other parts when you book." },
    ],
    proofHeading: "One stop for the whole look.",
    proofIntro: "Pair new wheels with a wrap or tint and plan the whole look with one shop.",
    proofRows: [
      { k: "Work", v: "Wheels first, other parts on request" },
      { k: "Prep", v: "Sandblasting before the coat" },
      { k: "Tires", v: "Removed and remounted here" },
      { k: "Turnaround", v: "1 to 2 days" },
      REVIEWS_ROW,
    ],
    proofPhoto: "powdercoat-wheel-spray",
    proofRatio: "16 / 9",
    reviewName: "Kimonike T.",
    faqs: [
      { q: "What is powder coating?", a: "A dry powder sprayed onto the wheel and baked into a hard finish." },
      { q: "Do I need to take the tires off?", a: "No. Tires are removed here, the wheels are coated, and the tires are remounted." },
      { q: "How long does it take?", a: "1 to 2 days for a set of wheels." },
      { q: "Is the old finish stripped first?", a: "Yes. Wheels are sandblasted before the coat." },
      { q: "Can you coat other parts?", a: "Wheels come first. Ask about other parts when you book." },
      { q: "How much does powder coating cost?", a: PRICE_ANSWER },
    ],
    quoteKey: "powder",
    metaTitle: `Powder coating in Warren, MI | ${BASE_TITLE}`,
    metaDescription: "Powder coated wheels at 13417 E Eight Mile Rd in Warren: tires off and remounted, sandblasting, 1 to 2 days. Free quotes. Call or text (248) 259-1617.",
  },
] as const;

export const SERVICES: Readonly<Record<ServiceId, Service>> = Object.fromEntries(SERVICE_LIST.map((s) => [s.id, s])) as Record<ServiceId, Service>;
