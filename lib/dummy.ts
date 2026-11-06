// Dummy content for building the storefront. Replaced by Supabase data later.
// Everything here is deterministic (no Math.random / new Date) so prerendering is stable.
// Products are our real garments: one product per garment in our own photos.

import { CUTOUT_PHOTOS, HERO_PHOTOS, pic, type HeroPhoto, type Pic } from "./images";

const CUTOUT_SLUGS = new Set(CUTOUT_PHOTOS.map((p) => p.key.replace(/^product-/, "")));

/** A 4-up card is 318px wide at 1440: 636 device px on retina, allow 15% -> 553 source px. */
const sharpInCard = (p: Pic) => Math.min(p.source.width, p.source.height * 0.75) >= 553;

/* ---------- Types ---------- */

export type Subcategory = { slug: string; name: string };

export type Category = {
  slug: string;
  name: string;
  /** Ledger number used in section labels, "01". */
  number: string;
  blurb: string;
  /** One strong photo for tiles. */
  image: Pic;
  sub: Subcategory[];
};

export type Swatch = { name: string; hex: string };

export type PriceTier = { minQty: number; maxQty?: number; price: number };

export type Department = "men" | "women" | "kids";

export type Product = {
  id: string;
  slug: string;
  name: string;
  /** Department slug: men | women | kids. */
  category: Department;
  /** Subcategory slug inside the department, e.g. "panjabi". */
  sub: string;
  /** Also part of the top-level Winter collection. */
  winter: boolean;
  fabric: string; // small-caps line, e.g. "COTTON SILK · GOLD EMBROIDERY"
  description: string;
  price: number; // retail, BDT
  salePrice?: number;
  sizes: string[];
  soldOutSizes: string[];
  colors: Swatch[];
  images: Pic[]; // 1-2 photos of this garment
  stock: number;
  isNew: boolean;
  isBestSeller: boolean;
  isWholesale: boolean;
  moq?: number;
  tiers?: PriceTier[];
};

export type Equipment = {
  id: string;
  slug: string;
  model: string;
  brand: string;
  /** Subcategory slug under textile-equipment. */
  sub: string;
  fromPrice: number;
  keySpecs: string[];
  images: Pic[];
  specTable: [string, string][];
};

/** Shaped like a row of the future `banners` table (placement = hero). */
export type HeroSlide = {
  id: string;
  title: string; // small caps line, "WINTER 2026"
  subtitle: string; // Cormorant headline
  buttonText: string;
  link: string;
  image: HeroPhoto;
};

export type Faq = { id: string; group: string; q: string; a: string };

export type Store = {
  id: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  image: Pic;
  mapsUrl: string;
};

/* ---------- URLs ---------- */

/** Every category link on the site is built here, so they always match real routes. */
export const categoryHref = (slug: string, sub?: string) => (sub ? `/category/${slug}/${sub}` : `/category/${slug}`);

/* ---------- Categories ---------- */

export const CATEGORIES: Category[] = [
  {
    slug: "men",
    name: "Men",
    number: "01",
    blurb: "Panjabi, suits, winter jackets and hoodies.",
    image: pic("suits-navy-check-three-piece"),
    sub: [
      { slug: "panjabi", name: "Panjabi" },
      { slug: "suits", name: "Suits" },
      { slug: "winter", name: "Winter" },
      { slug: "hoodies", name: "Hoodies" },
    ],
  },
  {
    slug: "women",
    name: "Women",
    number: "02",
    blurb: "Silk sarees and soft winter knits.",
    image: pic("sarees-maroon-banarasi-silk"),
    sub: [
      { slug: "sarees", name: "Sarees" },
      { slug: "winter", name: "Winter knits" },
    ],
  },
  {
    slug: "kids",
    name: "Kids",
    number: "03",
    blurb: "Jackets and suits for boys.",
    image: pic("boys-winter-pair"),
    sub: [{ slug: "boys", name: "Boys" }],
  },
  {
    slug: "winter",
    name: "Winter",
    number: "04",
    blurb: "Coats, puffers, leather and knits for the cool months.",
    image: pic("winter-black-hooded-puffer"),
    sub: [
      { slug: "men", name: "Men" },
      { slug: "women", name: "Women" },
      { slug: "boys", name: "Boys" },
    ],
  },
  {
    slug: "textile-equipment",
    name: "Textile Equipment",
    number: "05",
    blurb: "Industrial sewing machines, cutting, pressing and spare parts.",
    image: pic("stock-eq-overlock-hands"),
    sub: [
      { slug: "sewing-machines", name: "Sewing machines" },
      { slug: "cutting", name: "Cutting" },
      { slug: "pressing", name: "Pressing" },
      { slug: "spare-parts", name: "Spare parts" },
    ],
  },
];

/* ---------- Products ---------- */

const SWATCHES = {
  ivory: { name: "Ivory", hex: "#EFE6D2" },
  cream: { name: "Cream", hex: "#E8DCC4" },
  ecru: { name: "Ecru", hex: "#DDD2BC" },
  maroon: { name: "Maroon", hex: "#5A0A0E" },
  mustard: { name: "Mustard", hex: "#D19A2A" },
  camel: { name: "Camel", hex: "#B98A57" },
  brown: { name: "Saddle brown", hex: "#6B3E22" },
  bottle: { name: "Bottle green", hex: "#1F3B2C" },
  olive: { name: "Olive", hex: "#5F6038" },
  navy: { name: "Navy", hex: "#1E2A44" },
  denim: { name: "Mid denim", hex: "#4F6D8F" },
  black: { name: "Black", hex: "#1B1A17" },
} satisfies Record<string, Swatch>;

type SwatchKey = keyof typeof SWATCHES;

const CLOTHING_SIZES = ["S", "M", "L", "XL", "XXL"];
const SUIT_SIZES = ["38", "40", "42", "44", "46"];
const KIDS_SIZES = ["6Y", "8Y", "10Y", "12Y", "14Y"];
const FREE_SIZE = ["Free size"];

type Row = {
  name: string;
  dept: Department;
  sub: string;
  winter?: boolean;
  fabric: string;
  price: number;
  sale?: number;
  colors: SwatchKey[];
  sizes?: string[];
  soldOut?: string[];
  stock?: number;
  wholesale?: boolean;
  fresh?: boolean;
  best?: boolean;
  description: string;
  images: Pic[];
};

const ROWS: Row[] = [
  // Men · Panjabi
  {
    name: "Ivory Embroidered Panjabi",
    dept: "men",
    sub: "panjabi",
    fabric: "COTTON SILK · GOLD THREAD EMBROIDERY",
    price: 4850,
    colors: ["ivory"],
    best: true,
    wholesale: true,
    description: "Ivory cotton silk with gold thread embroidery down the placket and across the chest. A band collar and a straight, easy fall for weddings and Eid.",
    images: [pic("panjabi-ivory-embroidered"), pic("hero-03-panjabi-ivory", "64% 40%")],
  },
  {
    name: "Bottle-Green Embroidered Panjabi",
    dept: "men",
    sub: "panjabi",
    fabric: "COTTON · TONE-ON-TONE EMBROIDERY",
    price: 3450,
    colors: ["bottle"],
    fresh: true,
    wholesale: true,
    description: "Deep bottle-green cotton with a tone-on-tone embroidered placket and collar. Quiet enough for every day, rich enough for the evening.",
    images: [pic("panjabi-bottle-green-embroidered")],
  },
  // Men · Suits
  {
    name: "Navy Windowpane Three-Piece Suit",
    dept: "men",
    sub: "suits",
    fabric: "WOOL BLEND · WINDOWPANE CHECK",
    price: 18500,
    colors: ["navy"],
    sizes: SUIT_SIZES,
    best: true,
    description: "Navy wool blend with a fine windowpane check: two-button jacket, matching waistcoat and flat-front trousers. Altered to fit in our workshop.",
    images: [pic("suits-navy-check-three-piece")],
  },
  {
    name: "Navy Two-Piece Suit",
    dept: "men",
    sub: "suits",
    fabric: "WOOL BLEND · TWO-BUTTON",
    price: 13900,
    colors: ["navy"],
    sizes: SUIT_SIZES,
    soldOut: ["46"],
    description: "A plain navy two-button suit with notch lapels. The one suit every wardrobe needs, for the office and for occasions.",
    images: [pic("suits-navy-two-piece")],
  },
  {
    name: "Black Bandhgala",
    dept: "men",
    sub: "suits",
    fabric: "WOOL BLEND · MANDARIN COLLAR",
    price: 11500,
    colors: ["black"],
    sizes: SUIT_SIZES,
    fresh: true,
    description: "A black bandhgala jacket with a mandarin collar and covered buttons, cut close and measured by hand. Wear it with a pocket square.",
    images: [pic("suits-black-bandhgala"), pic("hero-05-suits-tailoring", "54% 40%")],
  },
  // Men · Winter
  {
    name: "Camel Wool Overcoat",
    dept: "men",
    sub: "winter",
    winter: true,
    fabric: "WOOL BLEND · SINGLE-BREASTED",
    price: 9800,
    colors: ["camel"],
    fresh: true,
    best: true,
    description: "Single-breasted camel overcoat in a soft wool blend with notch lapels. Long enough to cover a suit, light enough for Dhaka winters.",
    images: [pic("winter-camel-wool-overcoat"), pic("hero-02-mens-winter-coat", "58% 40%")],
  },
  {
    name: "Black Hooded Puffer Jacket",
    dept: "men",
    sub: "winter",
    winter: true,
    fabric: "NYLON SHELL · QUILTED FILL",
    price: 5450,
    colors: ["black"],
    fresh: true,
    wholesale: true,
    description: "Quilted black puffer with a fixed hood, drawcords and zip pockets. Warm without the bulk.",
    images: [pic("winter-black-hooded-puffer")],
  },
  {
    name: "Navy Puffer Jacket",
    dept: "men",
    sub: "winter",
    winter: true,
    fabric: "NYLON SHELL · QUILTED FILL",
    price: 4950,
    colors: ["navy"],
    fresh: true,
    wholesale: true,
    description: "A navy quilted puffer with a stand collar, for cold mornings and trips north. Pair it with a cream knit scarf.",
    images: [pic("winter-navy-puffer-cream-scarf")],
  },
  {
    name: "Ecru Trucker Jacket",
    dept: "men",
    sub: "winter",
    winter: true,
    fabric: "HEAVY COTTON TWILL",
    price: 3650,
    colors: ["ecru"],
    fresh: true,
    description: "An ecru trucker jacket in heavy cotton twill with chest pockets. The easy layer for cool evenings.",
    images: [pic("winter-ecru-trucker-jacket")],
  },
  {
    name: "Brown Leather Jacket",
    dept: "men",
    sub: "winter",
    winter: true,
    fabric: "LEATHER · ZIP POCKETS",
    price: 12900,
    colors: ["brown"],
    stock: 3,
    description: "Saddle-brown leather jacket with a snap collar, quilted shoulders and zip pockets. Softens and darkens with wear.",
    images: [pic("winter-brown-leather-jacket")],
  },
  {
    name: "Black Bomber Jacket",
    dept: "men",
    sub: "winter",
    winter: true,
    fabric: "NYLON TWILL · RIB TRIM",
    price: 3950,
    sale: 3450,
    colors: ["black"],
    description: "A black bomber with rib-knit collar, cuffs and hem and a sleeve zip pocket. Light, clean and easy over a tee.",
    images: [pic("winter-black-bomber-jacket")],
  },
  // Men · Hoodies
  {
    name: "Black Fleece Hoodie",
    dept: "men",
    sub: "hoodies",
    fabric: "COTTON FLEECE · 320 GSM",
    price: 1850,
    colors: ["black"],
    fresh: true,
    wholesale: true,
    best: true,
    description: "Heavyweight black cotton fleece with a lined hood, drawcords and a kangaroo pocket.",
    images: [pic("hoodies-black-hoodie"), pic("hoodies-hoodie-trio", "50% 25%")],
  },
  {
    name: "Cream Fleece Hoodie",
    dept: "men",
    sub: "hoodies",
    fabric: "COTTON FLEECE · 320 GSM",
    price: 1850,
    colors: ["cream"],
    fresh: true,
    wholesale: true,
    description: "Heavyweight cream cotton fleece with a lined hood, drawcords and a kangaroo pocket.",
    images: [pic("hoodies-cream-hoodie"), pic("hoodies-hoodie-trio", "12% 25%")],
  },
  {
    name: "Bottle-Green Fleece Hoodie",
    dept: "men",
    sub: "hoodies",
    fabric: "COTTON FLEECE · 320 GSM",
    price: 1850,
    colors: ["bottle"],
    fresh: true,
    wholesale: true,
    description: "Heavyweight bottle-green cotton fleece with a lined hood, drawcords and a kangaroo pocket.",
    images: [pic("hoodies-bottle-green-hoodie"), pic("hoodies-hoodie-trio", "88% 25%")],
  },
  // Women · Sarees
  {
    name: "Maroon Banarasi Silk Saree",
    dept: "women",
    sub: "sarees",
    fabric: "PURE SILK · GOLD ZARI",
    price: 12500,
    colors: ["maroon"],
    sizes: FREE_SIZE,
    best: true,
    description: "Maroon Banarasi silk woven with gold zari buttis and a broad zari border and pallu. Comes with an unstitched blouse piece.",
    images: [pic("sarees-maroon-banarasi-silk"), pic("hero-04-saree-maroon", "45% 60%")],
  },
  {
    name: "Mustard Silk Saree",
    dept: "women",
    sub: "sarees",
    fabric: "SOFT SILK · CONTRAST BORDER",
    price: 7450,
    sale: 6450,
    colors: ["mustard"],
    sizes: FREE_SIZE,
    description: "A mustard soft-silk saree with a gold-edged contrast border. Light to drape and easy to wear all day.",
    images: [pic("sarees-mustard-silk")],
  },
  // Women · Winter
  {
    name: "Cream Chunky Knit Sweater",
    dept: "women",
    sub: "winter",
    winter: true,
    fabric: "WOOL BLEND · CHUNKY KNIT",
    price: 3650,
    colors: ["cream"],
    fresh: true,
    description: "An oversized cream sweater in a chunky open knit, with dropped shoulders and long sleeves to pull over your hands.",
    images: [pic("winter-cream-chunky-knit"), pic("hero-01-winter-knit", "62% 40%")],
  },
  // Kids · Boys
  {
    name: "Boys Olive Puffer Jacket",
    dept: "kids",
    sub: "boys",
    winter: true,
    fabric: "NYLON SHELL · FAUX-FUR HOOD",
    price: 2950,
    colors: ["olive"],
    sizes: KIDS_SIZES,
    fresh: true,
    description: "Olive quilted puffer for boys, with a faux-fur trimmed hood and deep pockets. Built for play outside.",
    images: [pic("boys-olive-puffer"), pic("boys-winter-pair", "25% 35%")],
  },
  {
    name: "Boys Denim Jacket",
    dept: "kids",
    sub: "boys",
    fabric: "COTTON DENIM · BUTTON FRONT",
    price: 2250,
    sale: 1890,
    colors: ["denim"],
    sizes: KIDS_SIZES,
    description: "A classic mid-wash denim jacket for boys with chest pockets. Layers over a hoodie for cooler days.",
    images: [pic("boys-denim-jacket"), pic("boys-winter-pair", "75% 35%")],
  },
  {
    name: "Boys Navy Suit",
    dept: "kids",
    sub: "boys",
    fabric: "POLY-VISCOSE · TWO-PIECE",
    price: 4450,
    colors: ["navy"],
    sizes: KIDS_SIZES,
    description: "A two-piece navy suit for boys, for weddings, school events and Eid. Pair with a white shirt and a blue tie.",
    images: [pic("boys-navy-suit")],
  },
];

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const PRODUCTS: Product[] = ROWS.map((r, i) => {
  const wholesale = !!r.wholesale;
  const price = r.sale ?? r.price;
  return {
    id: `p${String(i + 1).padStart(2, "0")}`,
    slug: slugify(r.name),
    name: r.name,
    category: r.dept,
    sub: r.sub,
    winter: !!r.winter,
    fabric: r.fabric,
    description: r.description,
    price: r.price,
    salePrice: r.sale,
    sizes: r.sizes ?? CLOTHING_SIZES,
    soldOutSizes: r.soldOut ?? [],
    colors: r.colors.map((c) => SWATCHES[c]),
    // Studio cutout first when we have a clean one; the original photo shows on hover.
    // Hover photo only when it stays sharp in a 4-up card on retina (3:4 crop >= 553px wide).
    images: CUTOUT_SLUGS.has(slugify(r.name))
      ? [pic("product-" + slugify(r.name)), r.images[0]].filter((p, n) => n === 0 || sharpInCard(p))
      : r.images.filter((p, n) => n === 0 || sharpInCard(p)),
    stock: r.stock ?? 12 + ((i * 7) % 30),
    isNew: !!r.fresh,
    isBestSeller: !!r.best,
    isWholesale: wholesale,
    moq: wholesale ? 10 : undefined,
    tiers: wholesale
      ? [
          { minQty: 10, maxQty: 49, price: Math.round(price * 0.88) },
          { minQty: 50, price: Math.round(price * 0.8) },
        ]
      : undefined,
  };
});

/* ---------- Textile equipment (photos are Pexels stand-ins until we shoot our machines) ---------- */

export const EQUIPMENT: Equipment[] = [
  {
    id: "e1",
    slug: "jk-8700-single-needle-lockstitch",
    model: "JK-8700 Single Needle Lockstitch",
    brand: "Jack",
    sub: "sewing-machines",
    fromPrice: 38500,
    keySpecs: ["5000 spm", "Single needle", "Servo motor"],
    images: [pic("stock-eq-lockstitch-side"), pic("stock-eq-lockstitch-head")],
    specTable: [["Max speed", "5000 spm"], ["Stitch length", "5 mm"], ["Motor", "Direct drive servo, 550W"], ["Voltage", "220V / 50Hz"], ["Warranty", "12 months"]],
  },
  {
    id: "e2",
    slug: "sn-4-thread-overlock",
    model: "4-Thread Overlock",
    brand: "Siruba",
    sub: "sewing-machines",
    fromPrice: 46000,
    keySpecs: ["6500 spm", "4 threads", "Differential feed"],
    images: [pic("stock-eq-overlock-hands"), pic("stock-eq-overlock-foot")],
    specTable: [["Max speed", "6500 spm"], ["Threads", "4"], ["Differential feed", "0.7 – 2.0"], ["Voltage", "220V / 50Hz"], ["Warranty", "12 months"]],
  },
  {
    id: "e3",
    slug: "flatlock-interlock-machine",
    model: "Flatlock Interlock Machine",
    brand: "Kingtex",
    sub: "sewing-machines",
    fromPrice: 52000,
    keySpecs: ["5500 spm", "3 needles", "Flatbed"],
    images: [pic("stock-eq-flatlock-machine"), pic("stock-eq-flatlock-knit")],
    specTable: [["Max speed", "5500 spm"], ["Needles", "2 or 3"], ["Bed", "Flatbed"], ["Voltage", "220V / 50Hz"], ["Warranty", "12 months"]],
  },
  {
    id: "e4",
    slug: "straight-knife-cutting-machine-8in",
    model: "8in Straight Knife Cutting Machine",
    brand: "Eastman",
    sub: "cutting",
    fromPrice: 21500,
    keySpecs: ["8in blade", "750W", "Up to 200 plies"],
    images: [pic("stock-eq-straight-knife"), pic("stock-eq-cloth-cutter")],
    specTable: [["Blade height", "8 in"], ["Motor", "750W"], ["Cutting capacity", "Up to 200 plies"], ["Voltage", "220V / 50Hz"], ["Warranty", "6 months"]],
  },
  {
    id: "e5",
    slug: "fabric-end-cutter",
    model: "Fabric End Cutter",
    brand: "Hoshi",
    sub: "cutting",
    fromPrice: 16800,
    keySpecs: ["Round knife", "370W", "Rail mounted"],
    images: [pic("stock-eq-cutting-table"), pic("stock-eq-cutting-shears")],
    specTable: [["Knife", "Round, 110 mm"], ["Motor", "370W"], ["Mount", "Cutting table rail"], ["Voltage", "220V / 50Hz"], ["Warranty", "6 months"]],
  },
  {
    id: "e6",
    slug: "steam-iron-vacuum-table",
    model: "Steam Iron and Vacuum Table",
    brand: "Veit",
    sub: "pressing",
    fromPrice: 29500,
    keySpecs: ["1.5 kW boiler", "Vacuum + heated", "220V"],
    images: [pic("stock-eq-steam-iron")],
    specTable: [["Boiler", "1.5 kW"], ["Table", "Vacuum + heated"], ["Voltage", "220V / 50Hz"], ["Warranty", "6 months"]],
  },
  {
    id: "e7",
    slug: "industrial-needle-pack",
    model: "Industrial Needle Pack, 100 pcs",
    brand: "Organ",
    sub: "spare-parts",
    fromPrice: 1400,
    keySpecs: ["DBx1", "Size 11–18", "100 pcs"],
    images: [pic("stock-eq-needles-row"), pic("stock-eq-needles-fan")],
    specTable: [["System", "DBx1"], ["Sizes", "11 – 18"], ["Pack", "100 pieces"]],
  },
  {
    id: "e8",
    slug: "bobbin-case-and-hook-set",
    model: "Bobbin Case and Hook Set",
    brand: "Jack",
    sub: "spare-parts",
    fromPrice: 2200,
    keySpecs: ["Lockstitch", "Fits JK-8700", "Hardened steel"],
    images: [pic("stock-eq-bobbin-stack"), pic("stock-eq-bobbins-table")],
    specTable: [["Fits", "JK-8700 and similar"], ["Material", "Hardened steel"], ["Pack", "Set of 1"]],
  },
];

/* ---------- Hero slides (order matters) ---------- */

const H = (key: string) => {
  const h = HERO_PHOTOS.find((p) => p.key === key);
  if (!h) throw new Error(`Unknown hero photo ${key}`);
  return h;
};

export const HERO_SLIDES: HeroSlide[] = [
  { id: "h1", title: "Winter 2026", subtitle: "Soft layers for cooler days", buttonText: "Shop winter", link: categoryHref("winter"), image: H("hero-01-winter-knit") },
  { id: "h2", title: "Men's winter", subtitle: "Tailored for the season", buttonText: "Shop men's winter", link: categoryHref("men", "winter"), image: H("hero-02-mens-winter-coat") },
  { id: "h3", title: "Panjabi collection", subtitle: "Crafted for every occasion", buttonText: "Shop panjabi", link: categoryHref("men", "panjabi"), image: H("hero-03-panjabi-ivory") },
  { id: "h4", title: "Saree collection", subtitle: "Draped in heritage", buttonText: "Shop sarees", link: categoryHref("women", "sarees"), image: H("hero-04-saree-maroon") },
  { id: "h5", title: "Suits & tailoring", subtitle: "Made to measure, made to last", buttonText: "Shop suits", link: categoryHref("men", "suits"), image: H("hero-05-suits-tailoring") },
  { id: "h6", title: "Fabric & textile", subtitle: "Where every garment begins", buttonText: "Explore textile equipment", link: categoryHref("textile-equipment"), image: H("hero-06-fabric-textile") },
];

/* ---------- FAQ ---------- */

export const FAQS: Faq[] = [
  { id: "f1", group: "Delivery", q: "How long does delivery take?", a: "Inside Dhaka 1–2 working days, outside Dhaka 3–5 working days. TODO: confirm with courier." },
  { id: "f2", group: "Payment", q: "Can I pay on delivery?", a: "Yes. Cash on Delivery is available nationwide. Online payment (bKash, Nagad, card) is coming soon." },
  { id: "f3", group: "Exchange & returns", q: "What is your exchange policy?", a: "You can exchange unworn items within 7 days of delivery. TODO: finalise the policy wording." },
  { id: "f4", group: "Orders", q: "Can I change or cancel my order?", a: "Yes, until it is confirmed. Call or WhatsApp us as soon as you can." },
  { id: "f5", group: "Wholesale", q: "What is the minimum order for wholesale?", a: "It depends on the product, usually 10 pieces. Tier prices are shown on each product once your wholesale account is approved." },
  { id: "f6", group: "Wholesale", q: "How do I get a wholesale account?", a: "Apply on the Wholesale page with your trade licence. We approve within 24–48 hours." },
];

/* ---------- Stores (TODO: replace with real locations) ---------- */

export const STORES: Store[] = [
  { id: "s1", name: "TODO: Main showroom", address: "TODO: address, Dhaka", hours: "Sat–Thu 10:00 – 20:00", phone: "+880 1745-947359", image: pic("stock-at-atelier"), mapsUrl: "https://maps.google.com" },
  { id: "s2", name: "TODO: Second showroom", address: "TODO: address, Dhaka", hours: "Sat–Thu 10:00 – 20:00", phone: "+880 1745-947359", image: pic("stock-fab-shop-shelves"), mapsUrl: "https://maps.google.com" },
  { id: "s3", name: "TODO: Wholesale counter", address: "TODO: address, Dhaka", hours: "Sat–Thu 09:00 – 18:00", phone: "+880 1745-947359", image: pic("stock-fab-suiting-stack"), mapsUrl: "https://maps.google.com" },
];

/* ---------- Story blocks ---------- */
// TODO(owner): replace with the real family story. Kept plain (no "TODO" text on the page).

export const STORY = {
  home: {
    image: pic("hero-06-fabric-textile", "18% 50%", "Stacked suiting fabrics with a tailor's measuring tape"),
    label: "Our story",
    title: ["Cloth, cut and sold", "by one family"],
    lines: [
      `Fakir & Son's began in Dhaka with a few rolls of cloth and a simple rule: sell it honestly.`,
      "We still choose our fabric by hand and finish our garments with tailors we know by name.",
      "From panjabi to sewing machines, we serve the people who wear cloth and the people who make it.",
    ],
  },
  about: [
    { title: "TODO: How it began", text: "TODO: Write the opening of the family story here.", image: pic("stock-at-pattern") },
    { title: "TODO: The workshop", text: "TODO: Describe the workshop, the tailors and how garments are made.", image: pic("stock-fab-shop-shelves") },
    { title: "TODO: Today", text: "TODO: Describe the shop today and what comes next.", image: pic("stock-fab-velvet-embroidery") },
  ],
} as const;

/* ---------- Queries ---------- */

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const getEquipment = (slug: string) => EQUIPMENT.find((e) => e.slug === slug);
const byName = (names: string[]) =>
  names.map((n) => {
    const p = PRODUCTS.find((x) => x.name === n);
    if (!p) throw new Error(`Unknown product ${n}`);
    return p;
  });

/** Products in a category URL: /category/[slug] or /category/[slug]/[sub]. */
export function productsIn(slug: string, sub?: string): Product[] {
  if (slug === "winter") {
    const dept = sub === "boys" ? "kids" : sub;
    return PRODUCTS.filter((p) => p.winter && (!dept || p.category === dept));
  }
  return PRODUCTS.filter((p) => p.category === slug && (!sub || p.sub === sub));
}

export const equipmentIn = (sub?: string) => EQUIPMENT.filter((e) => !sub || e.sub === sub);

/* ---------- Home sections (no product repeats across sections) ---------- */

export const HOME = {
  /** 4 large tiles, cut from the hero banners at 2:3 (public/images/tiles). */
  tiles: [
    { name: "Winter", number: "01", href: categoryHref("winter"), image: pic("tile-winter-knit") },
    { name: "Panjabi", number: "02", href: categoryHref("men", "panjabi"), image: pic("tile-panjabi") },
    { name: "Sarees", number: "03", href: categoryHref("women", "sarees"), image: pic("tile-sarees") },
    { name: "Suits & tailoring", number: "04", href: categoryHref("men", "suits"), image: pic("tile-suits") },
  ],
  /** Thin text row under the tiles. */
  moreLinks: [
    { label: "Hoodies", href: categoryHref("men", "hoodies") },
    { label: "Boys", href: categoryHref("kids", "boys") },
    { label: "Textile Equipment", href: categoryHref("textile-equipment") },
  ],
  /** 8 products with sharp studio cutouts (source wide enough for a 4-across card on retina). */
  newSeason: byName([
    "Black Hooded Puffer Jacket",
    "Ivory Embroidered Panjabi",
    "Camel Wool Overcoat",
    "Cream Chunky Knit Sweater",
    "Navy Windowpane Three-Piece Suit",
    "Bottle-Green Embroidered Panjabi",
    "Brown Leather Jacket",
    "Black Fleece Hoodie",
  ]),
  sareeFeature: pic("feature-saree"),
  panjabiFeature: pic("feature-panjabi"),
};

export const effectivePrice = (p: Product) => p.salePrice ?? p.price;
