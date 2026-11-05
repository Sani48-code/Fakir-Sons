// Dummy content for building the storefront. Replaced by Supabase data later.
// Everything here is deterministic (no Math.random / new Date) so prerendering is stable.

import { pic, type Pic } from "./images";

/* ---------- Types ---------- */

export type Subcategory = { slug: string; name: string };

export type Category = {
  slug: string;
  name: string;
  image: Pic; // tile photo
  banner: Pic; // wide 4:1 banner photo
  blurb: string;
  sub: Subcategory[];
};

export type Swatch = { name: string; hex: string };

export type PriceTier = { minQty: number; maxQty?: number; price: number };

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string; // Category.slug
  sub: string; // Subcategory.slug
  fabric: string; // small-caps line, e.g. "100% COTTON · HANDLOOM"
  description: string;
  price: number; // retail, BDT
  salePrice?: number;
  sizes: string[];
  soldOutSizes: string[];
  colors: Swatch[];
  images: Pic[]; // 2-3 photos
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
  type: string;
  fromPrice: number;
  keySpecs: string[];
  images: Pic[];
  specTable: [string, string][];
};

export type HeroSlide = {
  id: string;
  label: string;
  headline: string;
  subtitle: string;
  lang: "en" | "bn";
  href: string;
  image: Pic;
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


/* ---------- Photo mapping (keys from lib/images.ts) ---------- */
// 2-3 photos per product; a photo repeats only where we have too few for that
// garment (noted inline). Replace with real product photos later.

const PRODUCT_PHOTOS: Record<string, string[]> = {
  "Handloom Cotton Panjabi": ["men-02-panjabi-white-chikan", "hero-01-panjabi-man", "men-03-kurta-yellow"],
  "Embroidered Festive Panjabi": ["men-01-panjabi-blue-embroidered", "men-04-kurta-waistcoat", "men-03-kurta-yellow"],
  "Linen Blend Casual Shirt": ["men-07-trousers-chinos", "men-05-shirt-blue"],
  "Oxford Formal Shirt": ["men-05-shirt-blue", "men-06-shirt-black"],
  "Pique Polo T-shirt": ["men-06-shirt-black", "men-05-shirt-blue", "men-07-trousers-chinos"], // no polo photo found
  "Plain Crew T-shirt": ["men-05-shirt-blue", "men-07-trousers-chinos"], // no t-shirt photo found
  "Chino Trouser": ["men-07-trousers-chinos", "hero-01-panjabi-man"],
  "Jamdani Style Saree": ["women-01-saree", "women-02-saree"],
  "Silk Blend Party Saree": ["women-02-saree", "hero-02-saree-woman", "women-01-saree"],
  "Block Print Three-piece": ["women-03-salwar-kameez", "women-04-three-piece", "hero-03-salwar-kameez"],
  "Everyday Cotton Three-piece": ["women-04-three-piece", "women-03-salwar-kameez"],
  "Straight Cut Kurti": ["women-06-kurti", "women-05-kurti"],
  "Printed Long Kurti": ["women-05-kurti", "women-06-kurti"],
  "Cotton Voile Scarf": ["women-07-shawl", "accessories-01-scarf"],
  "Boys Cotton Panjabi": ["kids-01-panjabi-boy", "kids-03-summer-outfit"],
  "Girls Printed Frock": ["kids-02-girl-sharara", "kids-05-maroon-tee"],
  "Infant Soft Romper": ["kids-03-summer-outfit", "kids-04-denim-jacket"], // no infant photo found
  "Ribbed Wool Sweater": ["winter-01-knit-sweater", "winter-02-sweater-stack"],
  "Quilted Winter Jacket": ["men-08-winter-jacket", "winter-03-jacket"],
  "Handwoven Winter Shawl": ["winter-04-wool-blanket", "women-07-shawl", "women-08-winter-cardigan"],
  "Fleece Zip Hoodie": ["winter-03-jacket", "men-08-winter-jacket"],
  "Kids Knit Cardigan": ["kids-04-denim-jacket", "winter-01-knit-sweater"], // no kids knitwear photo found
  "Cotton Twill Cap": ["accessories-02-hat", "accessories-03-bag"],
  "Leather Belt": ["accessories-03-bag", "accessories-02-hat"], // no belt photo found
  "Cotton Handkerchief Set of 3": ["lifestyle-04-holding-folded", "fabric-02-folded-stack", "lifestyle-02-folded-linen"],
};

const EQUIPMENT_PHOTOS: string[][] = [
  ["equipment-01-sewing-machine", "equipment-03-overlock", "equipment-08-factory-floor"],
  ["equipment-03-overlock", "equipment-01-sewing-machine"],
  ["equipment-02-presser-foot", "equipment-03-overlock"],
  ["equipment-05-fabric-cutting", "fabric-06-pattern-cutting"],
  ["fabric-06-pattern-cutting", "equipment-05-fabric-cutting"],
  ["equipment-06-iron-pressing", "fabric-02-folded-stack"],
  ["equipment-07-thread-cones", "equipment-02-presser-foot"],
  ["equipment-04-embroidery-machine", "equipment-02-presser-foot"],
];

const STORE_PHOTOS = ["lifestyle-01-clothes-rack", "lifestyle-03-colorful-fabric", "fabric-01-fabric-rolls-shop"];

/* ---------- Categories ---------- */

export const CATEGORIES: Category[] = [
  {
    slug: "men",
    name: "Men",
    image: pic("hero-01-panjabi-man"),
    banner: pic("lifestyle-01-clothes-rack", 2000),
    blurb: "Panjabi, shirts and everyday cloth for men.",
    sub: [
      { slug: "panjabi", name: "Panjabi" },
      { slug: "shirt", name: "Shirt" },
      { slug: "t-shirt", name: "T-shirt" },
      { slug: "trouser", name: "Trouser" },
    ],
  },
  {
    slug: "women",
    name: "Women",
    image: pic("hero-03-salwar-kameez"),
    banner: pic("lifestyle-03-colorful-fabric", 2000),
    blurb: "Saree, three-piece and kurti in honest fabrics.",
    sub: [
      { slug: "saree", name: "Saree" },
      { slug: "three-piece", name: "Three-piece" },
      { slug: "kurti", name: "Kurti" },
      { slug: "scarf", name: "Scarf" },
    ],
  },
  {
    slug: "kids",
    name: "Kids",
    image: pic("hero-05-family-traditional"),
    banner: pic("lifestyle-04-holding-folded", 2000),
    blurb: "Soft, easy-wash clothes for boys and girls.",
    sub: [
      { slug: "boys", name: "Boys" },
      { slug: "girls", name: "Girls" },
      { slug: "infants", name: "Infants" },
    ],
  },
  {
    slug: "winter",
    name: "Winter",
    image: pic("women-08-winter-cardigan"),
    banner: pic("winter-05-banner", 2000),
    blurb: "Sweaters, jackets and shawls for the cold months.",
    sub: [
      { slug: "sweater", name: "Sweater" },
      { slug: "jacket", name: "Jacket" },
      { slug: "shawl", name: "Shawl" },
      { slug: "kids-winter", name: "Kids winter" },
    ],
  },
  {
    slug: "textile-equipment",
    name: "Textile Equipment",
    image: pic("equipment-07-thread-cones"),
    banner: pic("equipment-08-factory-floor", 2000),
    blurb: "Sewing machines, cutting tools and spare parts.",
    sub: [
      { slug: "sewing-machines", name: "Sewing machines" },
      { slug: "cutting-tools", name: "Cutting tools" },
      { slug: "spare-parts", name: "Spare parts" },
    ],
  },
  {
    slug: "accessories",
    name: "Accessories",
    image: pic("accessories-02-hat"),
    banner: pic("fabric-02-folded-stack", 2000),
    blurb: "Caps, belts, handkerchiefs and small things.",
    sub: [
      { slug: "cap", name: "Cap" },
      { slug: "belt", name: "Belt" },
      { slug: "handkerchief", name: "Handkerchief" },
    ],
  },
];

/* ---------- Products ---------- */

const SWATCHES: Record<string, Swatch> = {
  ivory: { name: "Ivory", hex: "#EFE6D2" },
  indigo: { name: "Indigo", hex: "#22375A" },
  maroon: { name: "Maroon", hex: "#5A0A0E" },
  olive: { name: "Olive", hex: "#5F6038" },
  sand: { name: "Sand", hex: "#C9B48A" },
  charcoal: { name: "Charcoal", hex: "#3A3A38" },
  rust: { name: "Rust", hex: "#A5502B" },
  sky: { name: "Sky", hex: "#9DB7CF" },
  black: { name: "Black", hex: "#1B1A17" },
  green: { name: "Bottle green", hex: "#1F4D3A" },
};

const CLOTHING_SIZES = ["S", "M", "L", "XL", "XXL"];
const KIDS_SIZES = ["2Y", "4Y", "6Y", "8Y", "10Y"];
const FREE_SIZE = ["Free size"];

type Row = {
  name: string;
  cat: string;
  sub: string;
  fabric: string;
  price: number;
  sale?: number;
  colors: string[];
  sizes?: string[];
  soldOut?: string[];
  stock?: number;
  wholesale?: boolean;
  fresh?: boolean; // force the NEW label
};

const ROWS: Row[] = [
  // Men (7)
  { name: "Handloom Cotton Panjabi", cat: "men", sub: "panjabi", fabric: "100% COTTON · HANDLOOM", price: 2450, colors: ["ivory", "indigo", "maroon"], wholesale: true },
  { name: "Embroidered Festive Panjabi", cat: "men", sub: "panjabi", fabric: "COTTON SILK · EMBROIDERED", price: 3890, sale: 3290, colors: ["maroon", "olive"], soldOut: ["XXL"] },
  { name: "Linen Blend Casual Shirt", cat: "men", sub: "shirt", fabric: "LINEN COTTON BLEND", price: 1890, colors: ["sand", "sky", "ivory"], wholesale: true },
  { name: "Oxford Formal Shirt", cat: "men", sub: "shirt", fabric: "100% COTTON · OXFORD", price: 1650, sale: 1390, colors: ["sky", "ivory"], wholesale: true },
  { name: "Pique Polo T-shirt", cat: "men", sub: "t-shirt", fabric: "100% COTTON · PIQUE", price: 990, colors: ["black", "indigo", "green"], wholesale: true },
  { name: "Plain Crew T-shirt", cat: "men", sub: "t-shirt", fabric: "100% COMBED COTTON", price: 690, colors: ["ivory", "black", "charcoal"], wholesale: true, stock: 4 },
  { name: "Chino Trouser", cat: "men", sub: "trouser", fabric: "COTTON TWILL · STRETCH", price: 2150, colors: ["sand", "olive", "charcoal"] },
  // Women (7)
  { name: "Jamdani Style Saree", cat: "women", sub: "saree", fabric: "COTTON · JAMDANI WEAVE", price: 5900, colors: ["maroon", "ivory", "green"], sizes: FREE_SIZE },
  { name: "Silk Blend Party Saree", cat: "women", sub: "saree", fabric: "SILK BLEND · ZARI BORDER", price: 7450, sale: 6450, colors: ["maroon", "indigo"], sizes: FREE_SIZE },
  { name: "Block Print Three-piece", cat: "women", sub: "three-piece", fabric: "100% COTTON · BLOCK PRINT", price: 3290, colors: ["indigo", "rust", "sand"], wholesale: true },
  { name: "Everyday Cotton Three-piece", cat: "women", sub: "three-piece", fabric: "100% COTTON · LAWN", price: 2450, colors: ["sky", "olive"], wholesale: true },
  { name: "Straight Cut Kurti", cat: "women", sub: "kurti", fabric: "COTTON · SLUB TEXTURE", price: 1590, sale: 1290, colors: ["rust", "ivory", "green"], soldOut: ["S"] },
  { name: "Printed Long Kurti", cat: "women", sub: "kurti", fabric: "VISCOSE · PRINTED", price: 1790, colors: ["indigo", "maroon"] },
  { name: "Cotton Voile Scarf", cat: "women", sub: "scarf", fabric: "COTTON VOILE", price: 690, colors: ["sand", "maroon", "sky"], sizes: FREE_SIZE },
  // Kids (3)
  { name: "Boys Cotton Panjabi", cat: "kids", sub: "boys", fabric: "100% COTTON", price: 1390, colors: ["ivory", "sky"], sizes: KIDS_SIZES, wholesale: true },
  { name: "Girls Printed Frock", cat: "kids", sub: "girls", fabric: "COTTON · PRINTED", price: 1190, sale: 990, colors: ["rust", "sky"], sizes: KIDS_SIZES },
  { name: "Infant Soft Romper", cat: "kids", sub: "infants", fabric: "ORGANIC COTTON · INTERLOCK", price: 790, colors: ["ivory", "sand"], sizes: ["0–3M", "3–6M", "6–12M"], stock: 0 },
  // Winter (4)
  { name: "Ribbed Wool Sweater", cat: "winter", fresh: true, sub: "sweater", fabric: "WOOL BLEND · RIBBED", price: 2890, colors: ["charcoal", "maroon", "sand"] },
  { name: "Quilted Winter Jacket", cat: "winter", fresh: true, sub: "jacket", fabric: "NYLON SHELL · POLY FILL", price: 4590, sale: 3890, colors: ["black", "olive"], wholesale: true },
  { name: "Handwoven Winter Shawl", cat: "winter", fresh: true, sub: "shawl", fabric: "WOOL · HANDWOVEN", price: 3490, colors: ["maroon", "charcoal"], sizes: FREE_SIZE },
  { name: "Fleece Zip Hoodie", cat: "winter", fresh: true, sub: "jacket", fabric: "COTTON FLEECE", price: 2390, colors: ["indigo", "black", "ivory"], wholesale: true },
  { name: "Kids Knit Cardigan", cat: "winter", sub: "kids-winter", fabric: "WOOL BLEND · KNIT", price: 1490, colors: ["sand", "maroon"], sizes: KIDS_SIZES, fresh: true },
  // Accessories (3)
  { name: "Cotton Twill Cap", cat: "accessories", sub: "cap", fabric: "100% COTTON TWILL", price: 450, colors: ["sand", "black", "olive"], sizes: FREE_SIZE, wholesale: true },
  { name: "Leather Belt", cat: "accessories", sub: "belt", fabric: "GENUINE LEATHER", price: 890, colors: ["black", "rust"], sizes: ["32", "34", "36", "38"] },
  { name: "Cotton Handkerchief Set of 3", cat: "accessories", sub: "handkerchief", fabric: "100% COTTON", price: 350, colors: ["ivory", "sky"], sizes: FREE_SIZE, wholesale: true },
];

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function isKids(cat: string) {
  return cat === "kids";
}

export const PRODUCTS: Product[] = ROWS.map((r, i) => {
  const slug = slugify(r.name);
  const wholesale = !!r.wholesale;
  const price = r.sale ?? r.price;
  return {
    id: `p${String(i + 1).padStart(2, "0")}`,
    slug,
    name: r.name,
    category: r.cat,
    sub: r.sub,
    fabric: r.fabric,
    description: `${r.name}, cut from ${r.fabric.toLowerCase()}. Finished by hand in Dhaka. TODO: replace with the real product description.`,
    price: r.price,
    salePrice: r.sale,
    sizes: r.sizes ?? (isKids(r.cat) ? KIDS_SIZES : CLOTHING_SIZES),
    soldOutSizes: r.soldOut ?? [],
    colors: r.colors.map((c) => SWATCHES[c]),
    images: PRODUCT_PHOTOS[r.name].map((k) => pic(k, 1100)),
    stock: r.stock ?? 12 + ((i * 7) % 30),
    isNew: r.fresh ?? i % 3 === 0,
    isBestSeller: i % 4 === 1,
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

/* ---------- Textile equipment ---------- */

export const EQUIPMENT: Equipment[] = [
  {
    id: "e1",
    slug: "jk-8700-single-needle-lockstitch",
    model: "JK-8700 Single Needle Lockstitch",
    brand: "Jack",
    type: "Sewing machines",
    fromPrice: 38500,
    keySpecs: ["5000 spm", "Single needle", "220V"],
    images: EQUIPMENT_PHOTOS[0].map((k) => pic(k, 1200)),
    specTable: [["Max speed", "5000 spm"], ["Stitch length", "5 mm"], ["Motor", "Direct drive servo, 550W"], ["Voltage", "220V / 50Hz"], ["Warranty", "12 months"]],
  },
  {
    id: "e2",
    slug: "sn-4-thread-overlock",
    model: "SN-4 Thread Overlock",
    brand: "Siruba",
    type: "Sewing machines",
    fromPrice: 46000,
    keySpecs: ["6500 spm", "4 thread", "220V"],
    images: EQUIPMENT_PHOTOS[1].map((k) => pic(k, 1200)),
    specTable: [["Max speed", "6500 spm"], ["Threads", "4"], ["Differential feed", "0.7 – 2.0"], ["Voltage", "220V / 50Hz"], ["Warranty", "12 months"]],
  },
  {
    id: "e3",
    slug: "flatlock-interlock-machine",
    model: "Flatlock Interlock Machine",
    brand: "Kingtex",
    type: "Sewing machines",
    fromPrice: 52000,
    keySpecs: ["5500 spm", "Flatbed", "220V"],
    images: EQUIPMENT_PHOTOS[2].map((k) => pic(k, 1200)),
    specTable: [["Max speed", "5500 spm"], ["Needles", "2 or 3"], ["Bed", "Flatbed"], ["Voltage", "220V / 50Hz"], ["Warranty", "12 months"]],
  },
  {
    id: "e4",
    slug: "straight-knife-cutting-machine-8in",
    model: "Straight Knife Cutting Machine 8 in",
    brand: "Eastman",
    type: "Cutting tools",
    fromPrice: 21500,
    keySpecs: ["8 in blade", "550W", "Up to 200 plies"],
    images: EQUIPMENT_PHOTOS[3].map((k) => pic(k, 1200)),
    specTable: [["Blade height", "8 in"], ["Motor", "550W"], ["Cutting capacity", "Up to 200 plies"], ["Voltage", "220V / 50Hz"], ["Warranty", "6 months"]],
  },
  {
    id: "e5",
    slug: "fabric-end-cutter",
    model: "Electric Fabric End Cutter",
    brand: "Hoshi",
    type: "Cutting tools",
    fromPrice: 16800,
    keySpecs: ["Round knife", "370W", "Table mounted"],
    images: EQUIPMENT_PHOTOS[4].map((k) => pic(k, 1200)),
    specTable: [["Knife", "Round, 110 mm"], ["Motor", "370W"], ["Mount", "Table"], ["Voltage", "220V / 50Hz"], ["Warranty", "6 months"]],
  },
  {
    id: "e6",
    slug: "steam-iron-vacuum-table",
    model: "Steam Iron with Vacuum Table",
    brand: "Veit",
    type: "Finishing",
    fromPrice: 29500,
    keySpecs: ["Vacuum table", "1.5 kW boiler", "220V"],
    images: EQUIPMENT_PHOTOS[5].map((k) => pic(k, 1200)),
    specTable: [["Boiler", "1.5 kW"], ["Table", "Vacuum + heated"], ["Voltage", "220V / 50Hz"], ["Warranty", "6 months"]],
  },
  {
    id: "e7",
    slug: "industrial-needle-pack",
    model: "Industrial Needle Pack (100 pcs)",
    brand: "Organ",
    type: "Spare parts",
    fromPrice: 1400,
    keySpecs: ["DBx1", "Size 11–18", "100 pcs"],
    images: EQUIPMENT_PHOTOS[6].map((k) => pic(k, 1200)),
    specTable: [["System", "DBx1"], ["Sizes", "11 – 18"], ["Pack", "100 pieces"]],
  },
  {
    id: "e8",
    slug: "bobbin-case-and-hook-set",
    model: "Bobbin Case and Hook Set",
    brand: "Jack",
    type: "Spare parts",
    fromPrice: 2200,
    keySpecs: ["Lockstitch", "Fits JK-8700", "Steel"],
    images: EQUIPMENT_PHOTOS[7].map((k) => pic(k, 1200)),
    specTable: [["Fits", "JK-8700 and similar"], ["Material", "Hardened steel"], ["Pack", "Set of 1"]],
  },
];

/* ---------- Hero slides ---------- */

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "h1",
    label: "Winter 2026",
    headline: "Warmth for\nthe season",
    subtitle: "শীতের উষ্ণতা: shawls, sweaters and light jackets for the cool months.",
    lang: "bn",
    href: "/category/winter",
    image: pic("hero-04-winter-shawl", 2000),
  },
  {
    id: "h2",
    label: "Panjabi edit",
    headline: "Made for the\nlong evenings",
    subtitle: "Handloom cotton panjabi, stitched in our own workshop.",
    lang: "en",
    href: "/category/men/panjabi",
    image: pic("hero-01-panjabi-man", 2000),
  },
  {
    id: "h3",
    label: "নতুন সংগ্রহ",
    headline: "Saree,\nthe slow way",
    subtitle: "হাতে বোনা কাপড়, ঢাকা থেকে আপনার দরজায়।",
    lang: "bn",
    href: "/category/women/saree",
    image: pic("hero-02-saree-woman", 2000),
  },
  {
    id: "h4",
    label: "Textile equipment",
    headline: "Machines for the\npeople who make",
    subtitle: "Sewing, cutting and finishing equipment with service support.",
    lang: "en",
    href: "/textile-equipment",
    image: pic("equipment-04-embroidery-machine", 2000),
  },
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
  {
    id: "s1",
    name: "TODO: Main showroom",
    address: "TODO: address, Dhaka",
    hours: "Sat–Thu 10:00 – 20:00",
    phone: "+880 1745-947359",
    image: pic(STORE_PHOTOS[0]),
    mapsUrl: "https://maps.google.com",
  },
  {
    id: "s2",
    name: "TODO: Second showroom",
    address: "TODO: address, Dhaka",
    hours: "Sat–Thu 10:00 – 20:00",
    phone: "+880 1745-947359",
    image: pic(STORE_PHOTOS[1]),
    mapsUrl: "https://maps.google.com",
  },
  {
    id: "s3",
    name: "TODO: Wholesale counter",
    address: "TODO: address, Dhaka",
    hours: "Sat–Thu 09:00 – 18:00",
    phone: "+880 1745-947359",
    image: pic(STORE_PHOTOS[2]),
    mapsUrl: "https://maps.google.com",
  },
];

/* ---------- Story blocks (copy is TODO: replace with the real family story) ---------- */

export const STORY = {
  home: {
    image: pic("hero-06-fabric-shop", 1600),
    label: "Our story",
    title: ["Cloth, cut and sold", "by one family"],
    lines: [
      "TODO: Started in Dhaka in 2023, Fakir & Son's began with a few rolls of cloth and a promise to sell it honestly.",
      "TODO: We still choose our fabric ourselves and finish our garments in our own workshop.",
      "TODO: From panjabi to sewing machines, we serve both the people who wear cloth and the people who make it.",
    ],
  },
  about: [
    {
      title: "TODO: How it began",
      text: "TODO: Write the opening of the family story here.",
      image: pic("fabric-04-chalk-marking", 1400),
    },
    {
      title: "TODO: The workshop",
      text: "TODO: Describe the workshop, the tailors and how garments are made.",
      image: pic("fabric-01-fabric-rolls-shop", 1400),
    },
    {
      title: "TODO: Today",
      text: "TODO: Describe the shop today and what comes next.",
      image: pic("hero-05-family-traditional", 1400),
    },
  ],
} as const;

/* ---------- Helpers ---------- */

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const getEquipment = (slug: string) => EQUIPMENT.find((e) => e.slug === slug);
export const productsByCategory = (slug: string) => PRODUCTS.filter((p) => p.category === slug);
/** New Arrivals: winter products lead the season, then other new pieces. */
export function newArrivals(limit = 8): Product[] {
  const winter = PRODUCTS.filter((p) => p.category === "winter");
  const others = PRODUCTS.filter((p) => p.category !== "winter" && p.isNew);
  return [...winter, ...others].slice(0, limit);
}

/** Winter edit: shawls, sweaters, jackets and kids winter. */
export function winterEdit(limit = 4): Product[] {
  const names = ["Handwoven Winter Shawl", "Ribbed Wool Sweater", "Quilted Winter Jacket", "Kids Knit Cardigan"];
  return names
    .map((n) => PRODUCTS.find((p) => p.name === n))
    .filter((p): p is Product => Boolean(p))
    .slice(0, limit);
}

export const effectivePrice = (p: Product) => p.salePrice ?? p.price;
