import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

function base(props: P) {
  return {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

export const SearchIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);
export const UserIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);
export const HeartIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 20s-7.5-4.6-9.3-9.2C1.5 7.5 3.6 4.5 6.8 4.5c2 0 3.7 1.1 5.2 3 1.5-1.9 3.2-3 5.2-3 3.2 0 5.3 3 4.1 6.3C19.5 15.4 12 20 12 20Z" />
  </svg>
);
export const BagIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 8h14l-1 12H6L5 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);
export const MenuIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);
export const CloseIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const ChevronDownIcon = (p: P) => (
  <svg {...base({ width: 14, height: 14, strokeWidth: 2, ...p })}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
export const ArrowRightIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);
export const FacebookIcon = (p: P) => (
  <svg {...base({ strokeWidth: 1.6, ...p })}>
    <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8Z" />
  </svg>
);
export const InstagramIcon = (p: P) => (
  <svg {...base({ strokeWidth: 1.6, ...p })}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);
export const YoutubeIcon = (p: P) => (
  <svg {...base({ strokeWidth: 1.6, ...p })}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="m10 9 5 3-5 3V9Z" fill="currentColor" />
  </svg>
);

export const WhatsAppIcon = (p: P) => (
  <svg {...base({ strokeWidth: 1.6, ...p })}>
    <path d="M3.5 20.5 5 16A8.5 8.5 0 1 1 8 19l-4.5 1.5Z" />
    <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.4-1.8-1.2-2.3-2.3l.8-1-1-2L9 8.5Z" />
  </svg>
);
export const CheckIcon = (p: P) => (
  <svg {...base({ strokeWidth: 2, ...p })}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
export const PlusIcon = (p: P) => (
  <svg {...base({ width: 16, height: 16, strokeWidth: 1.8, ...p })}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const MinusIcon = (p: P) => (
  <svg {...base({ width: 16, height: 16, strokeWidth: 1.8, ...p })}>
    <path d="M5 12h14" />
  </svg>
);
export const ChevronLeftIcon = (p: P) => (
  <svg {...base({ width: 18, height: 18, strokeWidth: 1.8, ...p })}>
    <path d="m15 6-6 6 6 6" />
  </svg>
);
export const ChevronRightIcon = (p: P) => (
  <svg {...base({ width: 18, height: 18, strokeWidth: 1.8, ...p })}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);
