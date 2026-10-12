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

export type PhotoGroup = "recent" | "wraps" | "mono" | "commercial" | "tint" | "buildings" | "before" | "ppf" | "powder" | "other";

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
  // Recent work, texted in by Ricky on October 8, 2026
  ["escalade-blue-jeep-srt", "recent", "Cadillac Escalade and Jeep Grand Cherokee SRT in blue and white", "Blue Cadillac Escalade with a white top beside a blue Jeep Grand Cherokee SRT with white stripes"],
  ["charger-blue-carbon-front", "recent", "Dodge Charger in blue with forged carbon stripes", "Blue Dodge Charger with forged carbon stripes on a checkered floor, front three quarter view", "50% 62%"],
  ["charger-blue-carbon-shop", "recent", "Dodge Charger in blue with forged carbon stripes", "Blue Dodge Charger with forged carbon stripes on a checkered floor, front view", "50% 62%"],
  ["escalade-white-snow-front", "recent", "Cadillac Escalade in white", "White Cadillac Escalade parked in the snow, front three quarter view", "50% 62%"],
  ["durango-red-stripes-shop", "recent", "Dodge Durango in red with black stripes", "Red Dodge Durango with black stripes under hexagon lights inside the shop", "50% 66%"],
  ["durango-red-stripes-front", "recent", "Dodge Durango in red with black stripes", "Red Dodge Durango with black stripes in the snow, front three quarter view", "50% 62%"],
  ["challenger-red-stripes-front", "recent", "Dodge Challenger in red with black stripes", "Red Dodge Challenger with black stripes, front three quarter view", "50% 66%"],
  ["bronco-pink-front", "recent", "Ford Bronco in pink with a white top", "Pink Ford Bronco with a white grille and a white top, front three quarter view", "50% 62%"],
  ["wrangler-pink-front", "recent", "Jeep Wrangler in pink", "Pink Jeep Wrangler, front three quarter view", "50% 66%"],
  ["chevelle-black-orange-front", "recent", "Chevy Chevelle in matte black with orange stripes", "Matte black Chevy Chevelle with orange stripes and orange wheels, front three quarter view", "50% 66%"],
  ["rangerover-sport-black-front", "recent", "Range Rover Sport in matte black", "Matte black Range Rover Sport, front three quarter view", "50% 66%"],
  ["rangerover-sport-black-side", "recent", "Range Rover Sport in matte black", "Matte black Range Rover Sport, side view", "50% 70%"],
  ["charger-black-blue-front", "recent", "Dodge Charger in matte black with blue stripes", "Matte black Dodge Charger with blue stripes, front three quarter view", "50% 60%"],
  ["charger-black-blue-nose", "recent", "Dodge Charger in matte black with blue stripes", "Matte black Dodge Charger with blue stripes, front view", "50% 55%"],
  ["grandcherokee-black-front", "recent", "Jeep Grand Cherokee in matte black", "Matte black Jeep Grand Cherokee, front three quarter view", "50% 62%"],
  ["grandcherokee-black-side", "recent", "Jeep Grand Cherokee in matte black", "Matte black Jeep Grand Cherokee, side view", "50% 60%"],
  ["suburban-green-front", "recent", "Chevy Suburban in matte green", "Matte green Chevy Suburban, front three quarter view"],
  ["escalade-blue-shop", "recent", "Cadillac Escalade in blue with a white top", "Blue Cadillac Escalade with a white top inside the shop, front three quarter view", "50% 62%"],
  ["mustang-white-front", "recent", "Ford Mustang in white", "White Ford Mustang with black wheels, front three quarter view"],
  ["ram-purple-front", "recent", "Ram 1500 in purple with a black hood", "Purple Ram 1500 pickup with a black hood, front three quarter view on the street"],
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
  ["commercial-trailer-treats-side", "commercial", "Dessert trailer in a full printed wrap", "Enclosed trailer in a pink printed dessert wrap, side view", "50% 58%"],
  ["commercial-trailer-treats-front", "commercial", "Dessert trailer in a full printed wrap", "Enclosed trailer in a pink printed dessert wrap, front three quarter view", "50% 58%"],
  ["commercial-van-choir-front", "commercial", "Ford Transit, printed wrap for the Detroit Youth Choir", "Ford Transit van in a black and gold Detroit Youth Choir printed wrap, front three quarter view", "50% 62%"],
  ["commercial-van-maxwell-front", "commercial", "Ram ProMaster lettered for Maxwell Building Services", "White Ram ProMaster van with black Maxwell Building Services lettering, front three quarter view", "50% 70%"],
  ["commercial-van-blue-side", "commercial", "Ram ProMaster in printed graphics", "White Ram ProMaster van with blue printed graphics, side view", "50% 45%"],
  // Tint
  ["escalade-black-window", "tint", "Tinted glass on a GMC Denali", "Tinted rear door glass on a black GMC Denali pickup, close up", "55% 50%"],
  ["tint-hands", "tint", "Window film trimmed by hand", "Window film being trimmed by hand on a door glass, close up"],
  // Buildings
  ["home-brick-film-front", "buildings", "Window film on a two story brick home", "Two story brick home with window film on the front windows"],
  ["home-brick-film-angle", "buildings", "Window film on a two story brick home", "Two story brick home with window film on the front windows, seen from the side"],
  ["flatglass-storefront-after", "buildings", "Storefront glass after film", "Storefront windows after window film, reflecting the parking lot"],
  ["flatglass-salon-after", "buildings", "Salon storefront after film", "Salon storefront windows after window film, reflecting the sky"],
  ["flatglass-house-after", "buildings", "A home's front window after film", "Brick house with window film on the front window, reflecting the street"],
  ["flatglass-interior-after", "buildings", "Storefront glass after film, from inside", "Storefront windows after window film, seen from inside"],
  ["home-deck-tint", "buildings", "Window film on sliding glass doors", "Sliding glass doors with window film on a back deck"],
  ["home-front-tint", "buildings", "Window film on a home's front windows", "House with film on the front windows"],
  // The same glass before the film went on. Shown beside its "after" on the home and business tint page, not in the gallery.
  ["flatglass-storefront-before", "before", "Storefront glass before film", "Storefront windows before window film"],
  ["flatglass-salon-before", "before", "Salon storefront before film", "Salon storefront windows before window film"],
  ["flatglass-house-before", "before", "A home's front window before film", "Brick house front window before window film"],
  ["flatglass-interior-before", "before", "Storefront glass before film, from inside", "Storefront windows before window film, seen from inside"],
  // Paint protection film, powder coating, other
  ["ppf-headlight-wide", "ppf", "Paint protection film going onto a headlight", "Paint protection film being laid over a headlight, close up", "22% 50%"],
  ["powdercoat-wheel-spray", "powder", "A wheel in the powder booth", "Powder coating gun spraying a wheel in a cloud of blue powder", "32% 50%"],
  ["kitchen-wrap", "other", "Kitchen cabinets in a wood grain wrap", "Kitchen cabinets wrapped in a wood grain vinyl"],
  ["wall-wrap", "other", "Hallway wall in a printed floral wrap", "Blue floral printed vinyl wall wrap in a hallway"],
  ["casket-wrap-wide", "other", "Memorial casket in a custom printed wrap", "Casket in a custom printed memorial wrap at the front of a chapel", "50% 55%"],
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
    id: "recent",
    title: "Fresh out of the shop",
    blurb: "The latest cars and trucks through the bay.",
    photoIds: idsIn("recent"),
  },
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
    blurb: "Printed wraps and lettering on cars, vans and trailers, designed in house.",
    photoIds: idsIn("commercial"),
  },
  {
    id: "tint",
    title: "Tint, film and powder coat",
    blurb: "Window film on cars, paint protection film and powder coated wheels.",
    photoIds: idsIn("tint", "ppf", "powder"),
  },
  {
    id: "buildings",
    title: "Home and business tint",
    blurb: "Window film on houses, storefronts and offices.",
    photoIds: idsIn("buildings"),
  },
  {
    id: "other",
    title: "More than cars",
    blurb: "Cabinets, walls, a memorial casket and whatever else film sticks to.",
    photoIds: idsIn("other"),
  },
];
