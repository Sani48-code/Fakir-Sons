// Placeholder site config. Replace with real brand data / DB-driven categories later.

export const SITE = {
  name: "Fakir & Son's",
  hotline: "+880 1XXX-XXXXXX",
  email: "hello@example.com",
  address: "Your address line, Dhaka, Bangladesh",
  copyrightYear: 2026, // fixed: this Next version forbids new Date() during prerender
  announcement:"Free delivery on orders over ৳3,000",
};

export type NavItem = {
  label: string;
  href: string;
  sale?: boolean;
  children?: { label: string; href: string }[];
};

// Placeholder subcategories for the mega-menu.
export const NAV: NavItem[] = [
  {
    label: "Men",
    href: "/category/men",
    children: [
      { label: "T-Shirts", href: "/category/men-t-shirts" },
      { label: "Polo Shirts", href: "/category/men-polo" },
      { label: "Shirts", href: "/category/men-shirts" },
      { label: "Panjabi", href: "/category/men-panjabi" },
      { label: "Trousers", href: "/category/men-trousers" },
    ],
  },
  {
    label: "Women",
    href: "/category/women",
    children: [
      { label: "Three Piece", href: "/category/women-three-piece" },
      { label: "Kurti", href: "/category/women-kurti" },
      { label: "Tops", href: "/category/women-tops" },
      { label: "Saree", href: "/category/women-saree" },
      { label: "Scarves", href: "/category/women-scarves" },
    ],
  },
  {
    label: "Kids",
    href: "/category/kids",
    children: [
      { label: "Boys", href: "/category/kids-boys" },
      { label: "Girls", href: "/category/kids-girls" },
      { label: "Infants", href: "/category/kids-infants" },
    ],
  },
  {
    label: "Winter",
    href: "/category/winter",
    children: [
      { label: "Jackets", href: "/category/winter-jackets" },
      { label: "Sweaters", href: "/category/winter-sweaters" },
      { label: "Hoodies", href: "/category/winter-hoodies" },
    ],
  },
  {
    label: "Textile Equipment",
    href: "/category/textile-equipment",
    children: [
      { label: "Sewing Machines", href: "/category/sewing-machines" },
      { label: "Cutting Tools", href: "/category/cutting-tools" },
      { label: "Fabric & Trims", href: "/category/fabric-trims" },
      { label: "Spare Parts", href: "/category/spare-parts" },
    ],
  },
  { label: "Wholesale", href: "/wholesale" },
  { label: "Sale", href: "/category/sale", sale: true },
];

export const TOP_LINKS = [
  { label: "Account", href: "/account" },
  { label: "Store Locations", href: "/stores" },
  { label: "Wholesale Login", href: "/wholesale" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Categories",
    links: [
      { label: "Men", href: "/category/men" },
      { label: "Women", href: "/category/women" },
      { label: "Kids", href: "/category/kids" },
      { label: "Winter", href: "/category/winter" },
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
