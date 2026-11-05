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
  /** object-position per breakpoint so faces are never cropped */
  focus: { desktop: string; mobile: string };
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
// Each product uses photos that actually show that garment. A photo repeats only
// where we have too few of that garment. Replace with real product photos later.

const PRODUCT_PHOTOS: Record<string, string[]> = {
  "Handloom Cotton Panjabi": ["men-01-panjabi", "men-03-kurta"],
  "Teal Jacquard Panjabi": ["men-02-panjabi"],
  "Linen Blend Casual Shirt": ["men-05-shirt-linen"],
  "Oxford Formal Shirt": ["men-04-shirt-white"],
  "Pique Polo T-shirt": ["men-08-polo-tee"],
  "Pleated Wool Trouser": ["men-06-trousers"],
  "Tailored Cream Suit": ["men-07-suit"],
  "Cream Gold Silk Saree": ["women-01-saree", "women-02-saree"],
  "Golden Silk Saree": ["women-02-saree", "women-01-saree"],
  "Embroidered Three-piece": ["women-04-salwar-kameez"],
  "Chikankari Kurti": ["women-06-kurti"],
  "Boys Kurta Waistcoat Set": ["kids-01-kurta"],
  "Boys Polo and Chino Set": ["kids-03-casual"],
  "Girls Utility Jumpsuit": ["kids-04-casual"],
  "Ribbed Wool Sweater": ["winter-01-sweater", "winter-03-sweater"],
  "Oversized Camel Pullover": ["winter-02-sweater"],
  "Merino Turtleneck": ["winter-04-cashmere"],
  "Camel Wool Overcoat": ["winter-08-wool-coat", "winter-06-wool-coat"],
  "Belted Camel Coat": ["winter-07-wool-coat"],
  "Belted Trench Coat": ["women-08-long-coat"],
  "Quilted Puffer Jacket": ["winter-09-puffer", "men-10-jacket"],
  "Oatmeal Knit Cardigan": ["women-09-cardigan"],
  "Handwoven Wool Shawl": ["winter-11-shawl", "winter-12-scarf"],
  "Cream Wool Shawl": ["women-10-shawl"],
  "Kids Knit Pullover": ["kids-05-knit"],
  "Merino Wool Scarf": ["accessories-01-scarf"],
  "Leather Tote Bag": ["accessories-03-bag"],
};

const EQUIPMENT_PHOTOS: string[][] = [
  ["equipment-02-needle-detail", "fabric-03-tailor-hands"],
  ["equipment-02-needle-detail"],
  ["equipment-04-embroidery-machine", "equipment-02-needle-detail"],
  ["equipment-05-cutting", "fabric-03-tailor-hands"],
  ["equipment-05-cutting", "fabric-04-rolls"],
  ["equipment-07-thread-cones", "equipment-05-cutting"],
  ["equipment-02-needle-detail", "fabric-06-thread-buttons"],
  ["fabric-06-thread-buttons", "equipment-07-thread-cones"],
];

const STORE_PHOTOS = ["banner-04-clothing-rail", "fabric-04-rolls", "fabric-02-folded-linen"];

/* ---------- Categories ---------- */

export const CATEGORIES: Category[] = [
  {
    slug: "men",
    name: "Men",
    image: pic("men-09-coat", 1400, "50% 10%"),
    banner: pic("banner-04-clothing-rail", 2000),
    blurb: "Panjabi, shirts and tailoring for men.",
    sub: [
      { slug: "panjabi", name: "Panjabi" },
      { slug: "shirt", name: "Shirt" },
      { slug: "polo", name: "Polo" },
      { slug: "trouser", name: "Trouser" },
      { slug: "suit", name: "Suit" },
    ],
  },
  {
    slug: "women",
    name: "Women",
    image: pic("women-04-salwar-kameez", 1400, "50% 24%"),
    banner: pic("fabric-05-embroidery", 2000),
    blurb: "Saree, three-piece and kurti in honest fabrics.",
    sub: [
      { slug: "saree", name: "Saree" },
      { slug: "three-piece", name: "Three-piece" },
      { slug: "kurti", name: "Kurti" },
    ],
  },
  {
    slug: "kids",
    name: "Kids",
    image: pic("kids-01-kurta", 1400, "50% 26%"),
    banner: pic("fabric-02-folded-linen", 2000),
    blurb: "Soft, easy-wash clothes for boys and girls.",
    sub: [
      { slug: "boys", name: "Boys" },
      { slug: "girls", name: "Girls" },
    ],
  },
  {
    slug: "winter",
    name: "Winter",
    image: pic("winter-07-wool-coat", 1600, "50% 24%"),
    banner: pic("banner-01-winter-knits", 2000),
    blurb: "Coats, knitwear and wraps for the cool months.",
    sub: [
      { slug: "sweater", name: "Sweater" },
      { slug: "coat", name: "Coat" },
      { slug: "jacket", name: "Jacket" },
      { slug: "shawl", name: "Shawl" },
      { slug: "kids-winter", name: "Kids winter" },
    ],
  },
  {
    slug: "textile-equipment",
    name: "Textile Equipment",
    image: pic("equipment-04-embroidery-machine"),
    banner: pic("equipment-07-thread-cones", 2000),
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
    image: pic("accessories-03-bag"),
    banner: pic("banner-03-fabric-rolls", 2000),
    blurb: "Scarves and leather goods.",
    sub: [
      { slug: "scarf", name: "Scarf" },
      { slug: "bag", name: "Bag" },
    ],
  },
];

/* ---------- Products ---------- */

const SWATCHES: Record<string, Swatch> = {
  ivory: { name: "Ivory", hex: "#EFE6D2" },
  cream: { name: "Cream", hex: "#E8DCC4" },
  maroon: { name: "Maroon", hex: "#5A0A0E" },
  sand: { name: "Sand", hex: "#C9B48A" },
  camel: { name: "Camel", hex: "#B98A57" },
  cocoa: { name: "Cocoa", hex: "#5B4636" },
  charcoal: { name: "Charcoal", hex: "#3A3A38" },
  ash: { name: "Ash grey", hex: "#B9B9B6" },
  teal: { name: "Teal", hex: "#1F5F5B" },
  gold: { name: "Gold", hex: "#D4A537" },
  black: { name: "Black", hex: "#1B1A17" },
  olive: { name: "Olive", hex: "#5F6038" },
  sky: { name: "Sky", hex: "#9DB7CF" },
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
  { name: "Handloom Cotton Panjabi", cat: "men", sub: "panjabi", fabric: "COTTON · EMBROIDERED PLACKET", price: 2450, colors: ["ash", "ivory"], wholesale: true },
  { name: "Teal Jacquard Panjabi", cat: "men", sub: "panjabi", fabric: "COTTON SILK · JACQUARD", price: 3890, sale: 3290, colors: ["teal", "maroon"], soldOut: ["XXL"] },
  { name: "Linen Blend Casual Shirt", cat: "men", sub: "shirt", fabric: "LINEN COTTON BLEND", price: 1890, colors: ["sand", "ivory"], wholesale: true },
  { name: "Oxford Formal Shirt", cat: "men", sub: "shirt", fabric: "100% COTTON · OXFORD", price: 1650, sale: 1390, colors: ["ivory", "sky"], wholesale: true },
  { name: "Pique Polo T-shirt", cat: "men", sub: "polo", fabric: "100% COTTON · PIQUE", price: 990, colors: ["sand", "ivory", "charcoal"], wholesale: true, stock: 4 },
  { name: "Pleated Wool Trouser", cat: "men", sub: "trouser", fabric: "WOOL BLEND · PLEATED", price: 3290, colors: ["cocoa", "charcoal"] },
  { name: "Tailored Cream Suit", cat: "men", sub: "suit", fabric: "WOOL BLEND · TAILORED", price: 8900, colors: ["cream"], sizes: ["46", "48", "50", "52"] },
  // Women (4)
  { name: "Cream Gold Silk Saree", cat: "women", sub: "saree", fabric: "SILK · GOLD ZARI BORDER", price: 5900, colors: ["cream", "gold"], sizes: FREE_SIZE },
  { name: "Golden Silk Saree", cat: "women", sub: "saree", fabric: "SILK · CONTRAST BORDER", price: 7450, sale: 6450, colors: ["gold", "maroon"], sizes: FREE_SIZE },
  { name: "Embroidered Three-piece", cat: "women", sub: "three-piece", fabric: "COTTON · EMBROIDERED", price: 3290, colors: ["cocoa", "sand"], wholesale: true },
  { name: "Chikankari Kurti", cat: "women", sub: "kurti", fabric: "COTTON · CHIKANKARI", price: 1790, sale: 1490, colors: ["ivory"], soldOut: ["S"] },
  // Kids (3)
  { name: "Boys Kurta Waistcoat Set", cat: "kids", sub: "boys", fabric: "COTTON · JACQUARD WAISTCOAT", price: 1890, colors: ["ivory", "maroon"], sizes: KIDS_SIZES, wholesale: true },
  { name: "Boys Polo and Chino Set", cat: "kids", sub: "boys", fabric: "COTTON PIQUE · TWILL", price: 1390, sale: 1190, colors: ["ivory", "sand"], sizes: KIDS_SIZES },
  { name: "Girls Utility Jumpsuit", cat: "kids", sub: "girls", fabric: "COTTON · UTILITY WEAVE", price: 1290, colors: ["sand", "olive"], sizes: KIDS_SIZES, stock: 0 },
  // Winter (11)
  { name: "Ribbed Wool Sweater", cat: "winter", sub: "sweater", fabric: "WOOL BLEND · RIBBED", price: 2890, colors: ["cream", "camel"], fresh: true },
  { name: "Oversized Camel Pullover", cat: "winter", sub: "sweater", fabric: "WOOL · CHUNKY KNIT", price: 3190, colors: ["camel", "cream"], fresh: true },
  { name: "Merino Turtleneck", cat: "winter", sub: "sweater", fabric: "MERINO WOOL · FINE KNIT", price: 2790, colors: ["maroon", "charcoal"], fresh: true },
  { name: "Camel Wool Overcoat", cat: "winter", sub: "coat", fabric: "WOOL · DOUBLE FACE", price: 9800, sale: 8400, colors: ["camel", "charcoal"], fresh: true },
  { name: "Belted Camel Coat", cat: "winter", sub: "coat", fabric: "WOOL BLEND · BELTED", price: 8900, colors: ["camel"], fresh: true },
  { name: "Belted Trench Coat", cat: "winter", sub: "coat", fabric: "COTTON GABARDINE", price: 5900, colors: ["sand"], fresh: true },
  { name: "Quilted Puffer Jacket", cat: "winter", sub: "jacket", fabric: "NYLON SHELL · POLY FILL", price: 4590, sale: 3890, colors: ["cream", "black"], wholesale: true, fresh: true },
  { name: "Oatmeal Knit Cardigan", cat: "winter", sub: "sweater", fabric: "WOOL BLEND · KNIT", price: 3290, colors: ["sand"], fresh: true },
  { name: "Handwoven Wool Shawl", cat: "winter", sub: "shawl", fabric: "WOOL · HANDWOVEN", price: 3490, colors: ["ash", "cocoa"], sizes: FREE_SIZE, fresh: true },
  { name: "Cream Wool Shawl", cat: "winter", sub: "shawl", fabric: "PURE WOOL", price: 3790, colors: ["cream"], sizes: FREE_SIZE, fresh: true },
  { name: "Kids Knit Pullover", cat: "winter", sub: "kids-winter", fabric: "WOOL BLEND · KNIT", price: 1490, colors: ["olive", "sand"], sizes: KIDS_SIZES, fresh: true },
  // Accessories (2)
  { name: "Merino Wool Scarf", cat: "accessories", sub: "scarf", fabric: "MERINO WOOL", price: 1290, colors: ["ash", "charcoal"], sizes: FREE_SIZE },
  { name: "Leather Tote Bag", cat: "accessories", sub: "bag", fabric: "PEBBLED LEATHER", price: 4900, colors: ["sand"], sizes: FREE_SIZE },
];

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
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
    description: `${r.name}, in ${r.fabric.toLowerCase()}. TODO: replace with the real product description.`,
    price: r.price,
    salePrice: r.sale,
    sizes: r.sizes ?? CLOTHING_SIZES,
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
    model: "HD-5 Walking Foot Machine",
    brand: "Siruba",
    type: "Sewing machines",
    fromPrice: 46000,
    keySpecs: ["4500 spm", "Walking foot", "220V"],
    images: EQUIPMENT_PHOTOS[1].map((k) => pic(k, 1200)),
    specTable: [["Max speed", "6500 spm"], ["Threads", "4"], ["Differential feed", "0.7 – 2.0"], ["Voltage", "220V / 50Hz"], ["Warranty", "12 months"]],
  },
  {
    id: "e3",
    slug: "flatlock-interlock-machine",
    model: "Computerised Embroidery Machine",
    brand: "Kingtex",
    type: "Sewing machines",
    fromPrice: 52000,
    keySpecs: ["1000 spm", "6 needles", "220V"],
    images: EQUIPMENT_PHOTOS[2].map((k) => pic(k, 1200)),
    specTable: [["Max speed", "5500 spm"], ["Needles", "2 or 3"], ["Bed", "Flatbed"], ["Voltage", "220V / 50Hz"], ["Warranty", "12 months"]],
  },
  {
    id: "e4",
    slug: "straight-knife-cutting-machine-8in",
    model: "Electric Rotary Fabric Cutter",
    brand: "Eastman",
    type: "Cutting tools",
    fromPrice: 21500,
    keySpecs: ["70 mm blade", "550W", "Up to 40 plies"],
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
    model: "Polyester Thread Cone Set, 24 cones",
    brand: "Veit",
    type: "Spare parts",
    fromPrice: 29500,
    keySpecs: ["40/2 polyester", "5000 m cones", "24 pcs"],
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
    subtitle: "শীতের উষ্ণতা: coats, knits and wraps for the cool months.",
    lang: "bn",
    href: "/category/winter",
    image: pic("hero-01-winter-coat", 2400),
    focus: { desktop: "50% 24%", mobile: "38% 40%" },
  },
  {
    id: "h2",
    label: "Panjabi edit",
    headline: "Made for the\nlong evenings",
    subtitle: "Handloom cotton panjabi, stitched in our own workshop.",
    lang: "en",
    href: "/category/men/panjabi",
    image: pic("hero-02-panjabi", 2400),
    focus: { desktop: "50% 30%", mobile: "86% 35%" },
  },
  {
    id: "h3",
    label: "নতুন সংগ্রহ",
    headline: "Saree,\nthe slow way",
    subtitle: "হাতে বোনা কাপড়, ঢাকা থেকে আপনার দরজায়।",
    lang: "bn",
    href: "/category/women/saree",
    image: pic("hero-03-saree", 2400),
    focus: { desktop: "50% 40%", mobile: "64% 45%" },
  },
  {
    id: "h4",
    label: "Knitwear",
    headline: "Soft things for\ncold mornings",
    subtitle: "Chunky knits and fine merino in camel, cream and cocoa.",
    lang: "en",
    href: "/category/winter/sweater",
    image: pic("hero-04-knitwear", 2400),
    focus: { desktop: "50% 38%", mobile: "42% 45%" },
  },
  {
    id: "h5",
    label: "Tailoring",
    headline: "Cut to\nfit you",
    subtitle: "Suits and trousers, tailored in Dhaka.",
    lang: "en",
    href: "/category/men/suit",
    image: pic("hero-05-tailoring", 2400),
    focus: { desktop: "50% 28%", mobile: "72% 35%" },
  },
  {
    id: "h6",
    label: "The cloth",
    headline: "Good cloth,\nhonestly sold",
    subtitle: "Wholesale cloth and trims for tailors and boutiques.",
    lang: "en",
    href: "/wholesale",
    image: pic("hero-06-fabric", 2400),
    focus: { desktop: "50% 78%", mobile: "55% 80%" },
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
    image: pic("fabric-03-tailor-hands", 1600, "50% 45%"),
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
      image: pic("fabric-03-tailor-hands", 1400),
    },
    {
      title: "TODO: The workshop",
      text: "TODO: Describe the workshop, the tailors and how garments are made.",
      image: pic("fabric-04-rolls", 1400),
    },
    {
      title: "TODO: Today",
      text: "TODO: Describe the shop today and what comes next.",
      image: pic("fabric-05-embroidery", 1400),
    },
  ],
} as const;

/* ---------- Helpers ---------- */

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const getEquipment = (slug: string) => EQUIPMENT.find((e) => e.slug === slug);
export const productsByCategory = (slug: string) => PRODUCTS.filter((p) => p.category === slug);
const WINTER_EDIT_NAMES = ["Oversized Camel Pullover", "Handwoven Wool Shawl", "Quilted Puffer Jacket", "Kids Knit Pullover"];

/** Large image for the Winter edit split feature. */
export const WINTER_FEATURE = {
  image: pic("winter-06-wool-coat", 1800, "50% 22%"),
};

/** Winter edit: knit, wrap, jacket and kids winter. */
export function winterEdit(limit = 4): Product[] {
  return WINTER_EDIT_NAMES.map((n) => PRODUCTS.find((p) => p.name === n))
    .filter((p): p is Product => Boolean(p))
    .slice(0, limit);
}

/** New season row: other winter pieces first, then a few new non-winter pieces. No repeats of the Winter edit. */
export function newSeason(limit = 8): Product[] {
  const edit = new Set(WINTER_EDIT_NAMES);
  const winter = PRODUCTS.filter((p) => p.category === "winter" && !edit.has(p.name));
  const others = PRODUCTS.filter((p) => p.category !== "winter" && p.isNew);
  return [...winter.slice(0, 5), ...others.slice(0, 3)].slice(0, limit);
}

export const effectivePrice = (p: Product) => p.salePrice ?? p.price;
