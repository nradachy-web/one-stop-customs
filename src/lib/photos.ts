import manifest from "@/lib/photo-manifest.json";

/**
 * The photo registry. Every photo is the shop's own. Sources live in
 * photos-src/ and scripts/make-renditions.mjs writes the files the site
 * serves (public/photos/{id}-{width}.avif and .webp) plus the manifest of
 * widths this file reads.
 *
 * Alt text and captions state only what is visible: the vehicle, the finish
 * where it is unambiguous, and the color. They never claim the service
 * performed on a car, and never name a street or call a street frame "the
 * shop" (the outdoor frames stand at three different buildings).
 */

export type PhotoGroup = "wraps" | "mono" | "commercial" | "tint" | "buildings" | "ppf" | "powder" | "other";

export interface Photo {
  id: string;
  w: number;
  h: number;
  /** Rendition widths that exist on disk, ascending. */
  widths: number[];
  /** True when a 720 by 900 portrait cut exists for phone heroes. */
  mobile: boolean;
  alt: string;
  caption: string;
  group: PhotoGroup;
  /** CSS object-position for cropped frames. Default 50% 50%. */
  pos?: string;
}

type Entry = [id: string, group: PhotoGroup, caption: string, alt: string, pos?: string];

const ENTRIES: Entry[] = [
  // Color changes
  ["trx-yellow-side", "wraps", "Ram TRX in gloss yellow with a black hood", "Yellow Ram TRX with a black hood, side view under a blue sky"],
  ["trx-yellow-front", "wraps", "Ram TRX in gloss yellow with a black hood", "Yellow Ram TRX with a black hood, front view"],
  ["trx-yellow-portrait", "wraps", "Ram TRX in gloss yellow with a black hood", "Yellow Ram TRX with a black hood under a dramatic sky, front three quarter view", "50% 60%"],
  ["trx-yellow-wide", "wraps", "Ram TRX in gloss yellow with a black hood", "Yellow Ram TRX with a black hood, side view, wide crop"],
  ["rangerover-purple", "wraps", "Range Rover in satin purple", "Satin purple Range Rover, rear three quarter view inside the shop"],
  ["charger-pink", "wraps", "Dodge Charger in gloss pink", "Gloss pink Dodge Charger, front three quarter view on the street"],
  ["cybertruck-black", "wraps", "Tesla Cybertruck in matte black", "Matte black Tesla Cybertruck inside a showroom"],
  ["modely-satin-grey", "wraps", "Tesla Model Y in satin gray", "Satin gray Tesla Model Y, front three quarter view"],
  ["bmw-camo-blue", "wraps", "BMW 4 series in a printed blue camo", "BMW 4 series in a blue camouflage printed wrap"],
  ["huracan-red-square", "wraps", "Lamborghini Huracan in gloss red", "Red Lamborghini Huracan parked beside a white wall"],
  ["audi-rosegold-front", "wraps", "Audi A6 in satin rose gold", "Satin rose gold Audi A6, front view on the street"],
  ["audi-rosegold-wide", "wraps", "Audi A6 in satin rose gold", "Satin rose gold Audi A6, front view, wide crop"],
  ["urus-grey-front", "wraps", "Lamborghini Urus in satin gray", "Satin gray Lamborghini Urus, front view"],
  ["urus-black-rear", "wraps", "Lamborghini Urus in satin black", "Satin black Lamborghini Urus, rear view on the street"],
  ["challenger-blue", "wraps", "Dodge Challenger in gloss blue", "Blue Dodge Challenger, front three quarter view"],
  ["maserati-blue-side", "wraps", "Maserati GranTurismo in blue", "Light blue Maserati GranTurismo, side view on the street", "40% 50%"],
  ["maserati-blue-rear", "wraps", "Maserati GranTurismo in blue", "Light blue Maserati GranTurismo, rear three quarter view on the street"],
  ["bmw-lime", "wraps", "BMW 3 series in gloss lime", "Lime green BMW 3 series coupe, side view on the street"],
  ["bmw-mint-front", "wraps", "BMW 3 series in satin mint", "Mint green BMW 3 series, front view inside the shop"],
  ["camaro-red-front", "wraps", "Chevy Camaro SS in gloss red", "Red Chevy Camaro SS, front three quarter view"],
  ["camaro-red-convertible", "wraps", "Chevy Camaro convertible in gloss red", "Red Chevy Camaro convertible, rear three quarter view"],
  ["crown-grey-rear", "wraps", "Toyota Crown in gray", "Gray Toyota Crown, rear three quarter view inside the shop at night"],
  // Stripes and partials
  ["charger-red-stripes", "wraps", "Dodge Charger in gloss red with black stripes", "Red Dodge Charger with gloss black racing stripes, rear view inside the shop", "50% 55%"],
  ["charger-white-red", "wraps", "Dodge Charger in white with red stripes", "White Dodge Charger with red stripes, front three quarter view in the evening"],
  ["charger-white-side", "wraps", "Dodge Charger in gloss white", "White Dodge Charger, side view at dusk"],
  ["durango-black-red-front", "wraps", "Dodge Durango in black with red pinstripes", "Black Dodge Durango with red pinstripes, front view"],
  ["durango-black-rear", "wraps", "Dodge Durango in black with red accents", "Black Dodge Durango with red accents, rear view inside the shop"],
  ["camaro-orange-hood", "wraps", "Chevy Camaro SS with a gloss black hood", "Orange Chevy Camaro SS with a gloss black wrapped hood inside the shop"],
  // Black cars
  ["corvette-black-front", "mono", "Chevy Corvette C8 in gloss black", "Black Chevy Corvette C8, front three quarter view", "50% 55%"],
  ["corvette-black-wide", "mono", "Chevy Corvette C8 in gloss black", "Black Chevy Corvette C8, wide view with a storefront behind", "50% 55%"],
  ["corvette-black-side", "mono", "Chevy Corvette C8 in gloss black", "Black Chevy Corvette C8, side view", "50% 55%"],
  ["corvette-black-rear", "mono", "Chevy Corvette C8 in gloss black", "Black Chevy Corvette C8, rear three quarter view", "50% 55%"],
  ["porsche-911-black", "mono", "Porsche 911 in gloss black", "Black Porsche 911, rear three quarter view"],
  ["porsche-911-black-front", "mono", "Porsche 911 in gloss black", "Black Porsche 911, front three quarter view by a garage door"],
  ["denali-black-front", "mono", "GMC Denali in gloss black", "Gloss black GMC Denali pickup, front three quarter view"],
  ["denali-black-wide", "mono", "GMC Denali in gloss black", "Gloss black GMC Denali pickup, wide crop"],
  ["silverado-black", "mono", "GMC Denali in gloss black", "Gloss black GMC Denali pickup in a wash bay"],
  ["x6-black-front", "mono", "BMW X6 in gloss black", "Black BMW X6, front view"],
  ["x6-black-rear", "mono", "BMW X6 in gloss black", "Black BMW X6, rear view on the street"],
  ["chrysler300-black-portrait", "mono", "Chrysler 300 in gloss black with bronze wheels", "Black Chrysler 300 with bronze wheels, front three quarter view", "50% 60%"],
  ["chrysler300-black-side", "mono", "Chrysler 300 in gloss black with bronze wheels", "Black Chrysler 300 with bronze wheels, rear view on the street", "50% 60%"],
  ["camaro-black-rear", "mono", "Chevy Camaro in gloss black", "Black Chevy Camaro, rear view"],
  ["wagoneer-grey-front", "mono", "Jeep Grand Wagoneer in gray", "Gray Jeep Grand Wagoneer, front view"],
  ["wagoneer-grey-side", "mono", "Jeep Grand Wagoneer in gray", "Gray Jeep Grand Wagoneer, side view"],
  // White cars
  ["sclass-white-front", "mono", "Mercedes S class in gloss white", "White Mercedes S class, front three quarter view"],
  ["sclass-white-side", "mono", "Mercedes S class in gloss white", "White Mercedes S class, side view under a cloudy sky"],
  ["escalade-white-front", "mono", "Cadillac Escalade in gloss white", "White Cadillac Escalade, front view in the shop doorway"],
  ["grandcherokee-white", "mono", "Jeep Grand Cherokee L in gloss white", "White Jeep Grand Cherokee L, side view"],
  ["mustang-white-shop", "mono", "Ford Mustang in white, in the shop", "White Ford Mustang inside the shop bay", "50% 60%"],
  // Commercial
  ["commercial-tesla-homes-front", "commercial", "Tesla Model 3, printed wrap for Homes.com", "Tesla Model 3 in a white and orange Homes.com printed wrap, front three quarter view inside the shop"],
  ["commercial-tesla-homes", "commercial", "Tesla Model 3, printed wrap for Homes.com", "Tesla Model 3 in a white and orange Homes.com printed wrap inside the shop"],
  ["commercial-blazer-pink", "commercial", "Chevy Blazer EV, printed wrap for WeDriveFor", "Pink Chevy Blazer EV in a WeDriveFor printed wrap inside the shop"],
  // Tint
  ["escalade-black-window", "tint", "Tinted glass on a GMC Denali", "Tinted rear door glass on a black GMC Denali pickup, close up", "55% 50%"],
  ["tint-hands", "tint", "Window film trimmed by hand", "Window film being trimmed by hand on a door glass, close up"],
  // Buildings
  ["home-deck-tint", "buildings", "Window film on sliding glass doors", "Sliding glass doors with window film on a back deck"],
  ["home-front-tint", "buildings", "Window film on a home's front windows", "House with film on the front windows"],
  // Paint protection film, powder coating, other
  ["ppf-headlight-wide", "ppf", "Paint protection film going onto a headlight", "Paint protection film being laid over a headlight, close up", "22% 50%"],
  ["powdercoat-wheel-spray", "powder", "A wheel in the powder booth", "Powder coating gun spraying a wheel in a cloud of blue powder", "32% 50%"],
  ["kitchen-wrap", "other", "Kitchen cabinets in a wood grain wrap", "Kitchen cabinets wrapped in a wood grain vinyl"],
  ["wall-wrap", "other", "Hallway wall in a printed floral wrap", "Blue floral printed vinyl wall wrap in a hallway"],
];

type ManifestEntry = { w: number; h: number; widths: number[]; mobile: boolean };
const MANIFEST = manifest as Record<string, ManifestEntry>;

export const PHOTOS: Readonly<Record<string, Photo>> = Object.fromEntries(
  ENTRIES.map(([id, group, caption, alt, pos]) => {
    const m = MANIFEST[id];
    if (!m) throw new Error(`Photo ${id} has no renditions. Run node scripts/make-renditions.mjs`);
    return [id, { id, group, caption, alt, pos, ...m }];
  }),
);

/** Throws at build time if a component asks for a photo that is not registered. */
export function photo(id: string): Photo {
  const p = PHOTOS[id];
  if (!p) throw new Error(`Unknown photo id: ${id}`);
  return p;
}

export const PHOTO_ORDER: readonly string[] = ENTRIES.map((e) => e[0]);

/** The gallery, grouped by the kind of work. */
const idsIn = (...groups: PhotoGroup[]) => ENTRIES.filter((e) => groups.includes(e[1])).map((e) => e[0]);

export const GALLERY_GROUPS: readonly { id: string; title: string; blurb: string; photoIds: string[] }[] = [
  {
    id: "wraps",
    title: "Color changes and stripes",
    blurb: "Gloss, satin, matte and printed film, full cars and single panels.",
    photoIds: idsIn("wraps"),
  },
  {
    id: "mono",
    title: "Black and white",
    blurb: "The cars that came in for the cleanest look there is.",
    photoIds: idsIn("mono"),
  },
  {
    id: "commercial",
    title: "Commercial wraps",
    blurb: "Printed graphics designed in house.",
    photoIds: idsIn("commercial"),
  },
  {
    id: "tint",
    title: "Tint, film and powder coat",
    blurb: "Window film on cars and buildings, paint protection film and powder coated wheels.",
    photoIds: idsIn("tint", "buildings", "ppf", "powder"),
  },
  {
    id: "other",
    title: "More than cars",
    blurb: "Cabinets, walls and whatever else film sticks to.",
    photoIds: idsIn("other"),
  },
];
