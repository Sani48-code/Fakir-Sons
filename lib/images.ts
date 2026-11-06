// One place for every image on the site. All files are local, under public/images/.
//
// OWN photos come from Images/ (not committed) via scripts/optimize-images.mjs,
// which crops, grades and converts them to WebP (q82, hero q90, max 2400px).
// STOCK photos (stock: true) are free Pexels photos downloaded and converted the
// same way, kept until our own photoshoot replaces them. Find them with STOCK
// or by searching for `stock: true`.
//
// focal: CSS object-position used when the photo is cropped by its frame,
// one for desktop and one for mobile (keeps faces and garments in frame).

import stockList from "@/scripts/stock-photos.json";

export type Focal = { desktop: string; mobile: string };

type Base = {
  key: string;
  /** Public path, e.g. /images/collections/winter/black-hooded-puffer.webp */
  src: string;
  width: number;
  height: number;
  alt: string;
  focal: Focal;
};

export type Collection = "winter" | "panjabi" | "suits" | "hoodies" | "sarees" | "boys" | "brand";

export type OwnPhoto = Base & { stock: false; collection: Collection };

export type HeroPhoto = Base & {
  stock: false;
  /**
   * Separate mobile source (currently a 4:5 crop of the banner). Swap this for a
   * higher-resolution portrait file later without touching the desktop image.
   */
  mobile: { src: string; width: number; height: number };
  /** Side of the frame with empty space; hero text and its vignette go here on desktop. */
  textSide: "left" | "right";
};

export type StockUse =
  | "equipment-product"
  | "equipment-banner"
  | "home-catalogue"
  | "wholesale"
  | "story"
  | "about"
  | "category-banner"
  | "empty-state"
  | "not-found";

export type StockPhoto = Base & {
  stock: true;
  group: "equipment" | "fabric" | "atmosphere";
  /** What the photo is of, e.g. "overlock", "velvet", "chalk". */
  topic: string;
  /** Where it is meant to be used once approved. */
  use: StockUse[];
  photographer: string;
  /** Pexels photo page. */
  pageUrl: string;
  /** Equipment product slug this photo belongs to. */
  product?: string;
  /** Caveat shown at review (stand-in, borderline mood, crop made). */
  note?: string;
};

const C = (collection: string, file: string) => `/images/collections/${collection}/${file}.webp`;
const TOP: Focal = { desktop: "50% 25%", mobile: "50% 20%" };

/* ------------------------------------------------------------------ */
/* Hero: 6 slides, in display order                                    */
/* ------------------------------------------------------------------ */

const hero = (
  file: string,
  w: number,
  h: number,
  mw: number,
  alt: string,
  focal: Focal,
  textSide: "left" | "right",
): HeroPhoto => ({
  key: `hero-${file}`,
  src: `/images/hero/${file}.webp`,
  width: w,
  height: h,
  mobile: { src: `/images/hero/${file}-mobile.webp`, width: mw, height: h },
  alt,
  focal,
  textSide,
  stock: false,
});

export const HERO_PHOTOS: HeroPhoto[] = [
  hero(
    "01-winter-knit",
    2172,
    724,
    579,
    "Woman in an oversized cream chunky knit sweater beside a stack of folded knits",
    { desktop: "40% 50%", mobile: "50% 30%" },
    "left",
  ),
  hero(
    "02-mens-winter-coat",
    1983,
    793,
    634,
    "Man in a camel wool overcoat and black turtleneck by pale stone columns",
    { desktop: "60% 40%", mobile: "50% 25%" },
    "left",
  ),
  hero(
    "03-panjabi-ivory",
    2172,
    724,
    579,
    "Man in an ivory panjabi with gold embroidery leaning against a pale column",
    { desktop: "70% 40%", mobile: "50% 25%" },
    "left",
  ),
  hero(
    "04-saree-maroon",
    2172,
    724,
    579,
    "Woman seated in a maroon Banarasi silk saree with gold zari against a maroon wall",
    { desktop: "85% 40%", mobile: "50% 25%" },
    "right",
  ),
  hero(
    "05-suits-tailoring",
    2172,
    724,
    579,
    "Tailor measuring a man in a black bandhgala in a warm-lit tailoring shop",
    { desktop: "0% 40%", mobile: "50% 25%" },
    "left",
  ),
  hero(
    "06-fabric-textile",
    2172,
    724,
    579,
    "Stacked suiting fabrics, measuring tape, pincushion and brass scissors on a tailor's table",
    { desktop: "50% 50%", mobile: "50% 50%" },
    "right",
  ),
];

/* ------------------------------------------------------------------ */
/* Our own collection photos                                           */
/* ------------------------------------------------------------------ */

const own = (
  collection: Collection,
  file: string,
  width: number,
  height: number,
  alt: string,
  focal: Focal = TOP,
): OwnPhoto => ({
  key: `${collection}-${file}`,
  src: collection === "brand" ? `/images/brand/${file}.webp` : C(collection, file),
  width,
  height,
  alt,
  focal,
  collection,
  stock: false,
});

export const OWN_PHOTOS: OwnPhoto[] = [
  // Winter
  own("winter", "black-hooded-puffer", 1305, 1205, "Man in a black hooded puffer jacket over a cream knit"),
  own("winter", "navy-puffer-cream-scarf", 1184, 864, "Man in a navy puffer jacket and cream knit scarf seated in snow", {
    desktop: "45% 35%",
    mobile: "45% 30%",
  }),
  own("winter", "ecru-trucker-jacket", 864, 1184, "Man in an ecru trucker jacket, white tee and jeans by a lake at dusk", {
    desktop: "50% 45%",
    mobile: "50% 40%",
  }),
  own("winter", "brown-leather-jacket", 768, 1220, "Man in a brown leather moto jacket against a deep red backdrop"),
  own("winter", "black-bomber-jacket", 768, 1220, "Man in a black bomber jacket over a white tee against a slate-blue backdrop"),
  own("winter", "camel-wool-overcoat", 595, 793, "Man in a camel wool overcoat over a black turtleneck"),
  own("winter", "cream-chunky-knit", 760, 724, "Woman in an oversized cream chunky knit sweater", {
    desktop: "45% 30%",
    mobile: "45% 30%",
  }),

  // Panjabi
  own("panjabi", "bottle-green-embroidered", 1536, 1024, "Man in a bottle-green panjabi with tone-on-tone embroidered placket", {
    desktop: "50% 30%",
    mobile: "50% 25%",
  }),
  own("panjabi", "ivory-embroidered", 543, 724, "Man in an ivory panjabi with gold embroidery"),

  // Suits
  own("suits", "navy-check-three-piece", 1070, 1470, "Man in a navy windowpane-check three-piece suit in a warm-lit interior"),
  own("suits", "navy-two-piece", 864, 1184, "Man in a plain navy two-piece suit, white shirt and navy tie"),
  own("suits", "black-bandhgala", 543, 724, "Man in a black bandhgala with a pocket square being measured by a tailor"),

  // Hoodies (three crops of one shot; the ad graphic with baked-in text is never used)
  own("hoodies", "hoodie-trio", 1536, 1024, "Three men in cream, black and bottle-green fleece hoodies", {
    desktop: "50% 30%",
    mobile: "50% 25%",
  }),
  own("hoodies", "black-hoodie", 572, 763, "Man in a black fleece pullover hoodie"),
  own("hoodies", "cream-hoodie", 455, 607, "Man in a cream fleece pullover hoodie"),
  own("hoodies", "bottle-green-hoodie", 386, 515, "Man in a bottle-green fleece pullover hoodie", {
    desktop: "40% 25%",
    mobile: "40% 20%",
  }),

  // Sarees
  own("sarees", "maroon-banarasi-silk", 543, 724, "Woman in a maroon Banarasi silk saree with gold zari border"),
  own("sarees", "mustard-silk", 345, 460, "Woman in a mustard silk saree with an embroidered gold blouse"),

  // Boys (letterbox trimmed, warm grade)
  own("boys", "winter-pair", 896, 987, "Two boys in an olive puffer and a denim jacket standing in snow"),
  own("boys", "olive-puffer", 372, 496, "Boy in an olive puffer jacket with a fur-trimmed hood"),
  own("boys", "denim-jacket", 340, 453, "Boy in a denim jacket over a grey hoodie"),
  own("boys", "navy-suit", 1024, 1024, "Boy in a navy suit, white shirt and blue tie"),

  // Brand
  own("brand", "bags", 1536, 1024, "Maroon Fakir & Son's shopping bag with gold logo and ribbon handles on a marble table", {
    desktop: "50% 50%",
    mobile: "50% 50%",
  }),
];

/* ------------------------------------------------------------------ */
/* Stock (Pexels): pending approval, not used on pages yet             */
/* ------------------------------------------------------------------ */

type StockEntry = Omit<StockPhoto, "stock" | "focal"> & { id: number; focal?: Focal };

/** Source data + crops live in scripts/stock-photos.json (scripts/import-stock.mjs writes the files). */
export const STOCK_PHOTOS: StockPhoto[] = (
  stockList as StockEntry[]
).map((e) => ({ ...e, stock: true as const, focal: e.focal ?? { desktop: "50% 50%", mobile: "50% 50%" } }));

/* ------------------------------------------------------------------ */
/* Lookup                                                              */
/* ------------------------------------------------------------------ */

export type AnyPhoto = HeroPhoto | OwnPhoto | StockPhoto;

const BY_KEY = new Map<string, AnyPhoto>([...HERO_PHOTOS, ...OWN_PHOTOS, ...STOCK_PHOTOS].map((p) => [p.key, p]));

export function photo(key: string): AnyPhoto {
  const p = BY_KEY.get(key);
  if (!p) throw new Error(`Unknown photo key: ${key}`);
  return p;
}

/** A photo ready for <Img>: src, alt and focal points (pos = desktop object-position). */
export type Pic = { key: string; src: string; alt: string; pos: string; posMobile: string };

/** Look up a photo for use in data. Pass `pos` to re-aim a shared shot (e.g. one person in a group photo). */
export function pic(key: string, pos?: string, alt?: string): Pic {
  const p = photo(key);
  return { key, src: p.src, alt: alt ?? p.alt, pos: pos ?? p.focal.desktop, posMobile: pos ?? p.focal.mobile };
}

/** Brand files in public/. */
export const LOCAL = {
  bags: "/images/brand/bags.webp",
} as const;
