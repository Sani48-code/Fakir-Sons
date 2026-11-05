// Dummy content for building the storefront. Replaced by Supabase data later.
// Everything here is deterministic (no Math.random / new Date) so prerendering is stable.

import { img, RATIO } from "./images";

/* ---------- Types ---------- */

export type Subcategory = { slug: string; name: string };

export type Category = {
  slug: string;
  name: string;
  image: string;
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
  images: string[]; // 3
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
  images: string[];
  specTable: [string, string][];
};

export type HeroSlide = {
  id: string;
  label: string;
  headline: string;
  subtitle: string;
  lang: "en" | "bn";
  href: string;
  image: string;
  imageMobile: string;
};

export type Faq = { id: string; group: string; q: string; a: string };

export type Store = {
  id: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  image: string;
  mapsUrl: string;
};

/* ---------- Categories ---------- */

export const CATEGORIES: Category[] = [
  {
    slug: "men",
    name: "Men",
    image: img("cat-men", RATIO.categoryWide),
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
    image: img("cat-women", RATIO.categoryTall),
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
    image: img("cat-kids", RATIO.categoryWide),
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
    image: img("cat-winter", RATIO.categoryWide),
    blurb: "Sweaters, jackets and shawls for the cold months.",
    sub: [
      { slug: "sweater", name: "Sweater" },
      { slug: "jacket", name: "Jacket" },
      { slug: "shawl", name: "Shawl" },
    ],
  },
  {
    slug: "textile-equipment",
    name: "Textile Equipment",
    image: img("cat-equipment", RATIO.categoryWide),
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
    image: img("cat-accessories", RATIO.categoryWide),
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
  { name: "Ribbed Wool Sweater", cat: "winter", sub: "sweater", fabric: "WOOL BLEND · RIBBED", price: 2890, colors: ["charcoal", "maroon", "sand"] },
  { name: "Quilted Winter Jacket", cat: "winter", sub: "jacket", fabric: "NYLON SHELL · POLY FILL", price: 4590, sale: 3890, colors: ["black", "olive"], wholesale: true },
  { name: "Handwoven Winter Shawl", cat: "winter", sub: "shawl", fabric: "WOOL · HANDWOVEN", price: 3490, colors: ["maroon", "charcoal"], sizes: FREE_SIZE },
  { name: "Fleece Zip Hoodie", cat: "winter", sub: "jacket", fabric: "COTTON FLEECE", price: 2390, colors: ["indigo", "black", "ivory"], wholesale: true },
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
    images: [1, 2, 3].map((n) => img(`${slug}-${n}`, RATIO.product)),
    stock: r.stock ?? 12 + ((i * 7) % 30),
    isNew: i % 3 === 0,
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
    images: [1, 2, 3].map((n) => img(`eq-jk8700-${n}`, RATIO.categoryWide)),
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
    images: [1, 2, 3].map((n) => img(`eq-sn4-${n}`, RATIO.categoryWide)),
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
    images: [1, 2, 3].map((n) => img(`eq-flatlock-${n}`, RATIO.categoryWide)),
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
    images: [1, 2, 3].map((n) => img(`eq-cutter-${n}`, RATIO.categoryWide)),
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
    images: [1, 2, 3].map((n) => img(`eq-endcutter-${n}`, RATIO.categoryWide)),
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
    images: [1, 2, 3].map((n) => img(`eq-irontable-${n}`, RATIO.categoryWide)),
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
    images: [1, 2, 3].map((n) => img(`eq-needles-${n}`, RATIO.categoryWide)),
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
    images: [1, 2, 3].map((n) => img(`eq-bobbin-${n}`, RATIO.categoryWide)),
    specTable: [["Fits", "JK-8700 and similar"], ["Material", "Hardened steel"], ["Pack", "Set of 1"]],
  },
];

/* ---------- Hero slides ---------- */

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "h1",
    label: "Winter 2026",
    headline: "Cloth that keeps the cold out",
    subtitle: "Wool, fleece and handwoven shawls, made for Dhaka winters.",
    lang: "en",
    href: "/category/winter",
    image: img("hero-winter", RATIO.heroDesktop),
    imageMobile: img("hero-winter-m", RATIO.heroMobile),
  },
  {
    id: "h2",
    label: "Panjabi edit",
    headline: "Made for the long evenings",
    subtitle: "Handloom cotton panjabi, stitched in our own workshop.",
    lang: "en",
    href: "/category/men/panjabi",
    image: img("hero-panjabi", RATIO.heroDesktop),
    imageMobile: img("hero-panjabi-m", RATIO.heroMobile),
  },
  {
    id: "h3",
    label: "নতুন সংগ্রহ",
    headline: "Saree, the slow way",
    subtitle: "হাতে বোনা কাপড়, ঢাকা থেকে আপনার দরজায়।",
    lang: "bn",
    href: "/category/women/saree",
    image: img("hero-saree", RATIO.heroDesktop),
    imageMobile: img("hero-saree-m", RATIO.heroMobile),
  },
  {
    id: "h4",
    label: "Textile equipment",
    headline: "Machines for the people who make",
    subtitle: "Sewing, cutting and finishing equipment with service support.",
    lang: "en",
    href: "/textile-equipment",
    image: img("hero-equipment", RATIO.heroDesktop),
    imageMobile: img("hero-equipment-m", RATIO.heroMobile),
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
    image: img("store-1", RATIO.categoryWide),
    mapsUrl: "https://maps.google.com",
  },
  {
    id: "s2",
    name: "TODO: Second showroom",
    address: "TODO: address, Dhaka",
    hours: "Sat–Thu 10:00 – 20:00",
    phone: "+880 1745-947359",
    image: img("store-2", RATIO.categoryWide),
    mapsUrl: "https://maps.google.com",
  },
  {
    id: "s3",
    name: "TODO: Wholesale counter",
    address: "TODO: address, Dhaka",
    hours: "Sat–Thu 09:00 – 18:00",
    phone: "+880 1745-947359",
    image: img("store-3", RATIO.categoryWide),
    mapsUrl: "https://maps.google.com",
  },
];

/* ---------- Helpers ---------- */

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const getEquipment = (slug: string) => EQUIPMENT.find((e) => e.slug === slug);
export const productsByCategory = (slug: string) => PRODUCTS.filter((p) => p.category === slug);
export const effectivePrice = (p: Product) => p.salePrice ?? p.price;
