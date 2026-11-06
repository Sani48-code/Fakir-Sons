// Business info lives here only. Components must read from SITE, never hardcode.

export const SITE = {
  name: "Fakir & Son's",
  est: 2023,
  city: "Dhaka",
  phone: "+880 1745-947359", // display
  tel: "+8801745947359", // for tel: links
  whatsapp: "https://wa.me/8801745947359",
  facebook: "https://www.facebook.com/profile.php?id=61560423444727",
  email: "info@fakirandsons.com", // placeholder
  address: "TODO: full shop address, Dhaka, Bangladesh",
  hours: "TODO: Sat–Thu, 10:00 am – 8:00 pm",
  copyrightYear: 2026, // fixed: this Next version forbids new Date() during prerender
  announcement: "Free delivery on orders over ৳3,000",
} as const;

/** "Est. 2023 · Dhaka" */
export const EST_LINE = `Est. ${SITE.est} · ${SITE.city}`;

/** Delivery charges in BDT. Server must recompute these; never trust the client. */
export const DELIVERY = {
  insideDhaka: { fee: 70, days: "1–2 days" },
  outsideDhaka: { fee: 130, days: "3–5 days" },
  freeAbove: 3000,
} as const;

export type NavItem = {
  label: string;
  href: string;
  sale?: boolean;
  children?: { label: string; href: string }[];
};

// Our real collections. Every href follows /category/[slug] or /category/[slug]/[sub]
// (see categoryHref in lib/dummy.ts and app/(shop)/category).
export const NAV: NavItem[] = [
  {
    label: "Men",
    href: "/category/men",
    children: [
      { label: "Panjabi", href: "/category/men/panjabi" },
      { label: "Suits", href: "/category/men/suits" },
      { label: "Winter", href: "/category/men/winter" },
      { label: "Hoodies", href: "/category/men/hoodies" },
    ],
  },
  {
    label: "Women",
    href: "/category/women",
    children: [
      { label: "Sarees", href: "/category/women/sarees" },
      { label: "Winter knits", href: "/category/women/winter" },
    ],
  },
  {
    label: "Kids",
    href: "/category/kids",
    children: [{ label: "Boys", href: "/category/kids/boys" }],
  },
  {
    label: "Winter",
    href: "/category/winter",
    children: [
      { label: "Men", href: "/category/winter/men" },
      { label: "Women", href: "/category/winter/women" },
      { label: "Boys", href: "/category/winter/boys" },
    ],
  },
  {
    label: "Textile Equipment",
    href: "/category/textile-equipment",
    children: [
      { label: "Sewing machines", href: "/category/textile-equipment/sewing-machines" },
      { label: "Cutting", href: "/category/textile-equipment/cutting" },
      { label: "Pressing", href: "/category/textile-equipment/pressing" },
      { label: "Spare parts", href: "/category/textile-equipment/spare-parts" },
    ],
  },
  { label: "Wholesale", href: "/wholesale" },
];

export const TOP_LINKS = [
  { label: "Account", href: "/account" },
  { label: "Store Locations", href: "/stores" },
  { label: "Wholesale Login", href: "/wholesale" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Collections",
    links: [
      { label: "Panjabi", href: "/category/men/panjabi" },
      { label: "Suits", href: "/category/men/suits" },
      { label: "Sarees", href: "/category/women/sarees" },
      { label: "Winter", href: "/category/winter" },
      { label: "Hoodies", href: "/category/men/hoodies" },
      { label: "Boys", href: "/category/kids/boys" },
      { label: "Textile Equipment", href: "/category/textile-equipment" },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Store Locations", href: "/stores" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Delivery", href: "/policies/delivery" },
      { label: "Return & Exchange", href: "/policies/return-exchange" },
      { label: "Refund", href: "/policies/refund" },
      { label: "Privacy", href: "/policies/privacy" },
      { label: "Terms", href: "/policies/terms" },
    ],
  },
];

export const PAYMENT_METHODS = [
  "Visa",
  "Mastercard",
  "bKash",
  "Nagad",
  "Rocket",
  "Cash on Delivery",
];
