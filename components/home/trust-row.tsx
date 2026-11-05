import type { SVGProps } from "react";
import { Container } from "@/components/ui/container";

type P = SVGProps<SVGSVGElement>;
const icon = (p: P) => ({
  width: 32,
  height: 32,
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...p,
});

// Custom thin-line icons (1.25px stroke).
const CodIcon = (p: P) => (
  <svg {...icon(p)}>
    <rect x="3" y="8" width="26" height="16" />
    <circle cx="16" cy="16" r="4" />
    <path d="M7 12v.01M25 20v.01" />
  </svg>
);
const ExchangeIcon = (p: P) => (
  <svg {...icon(p)}>
    <path d="M5 12h19l-4-4M27 20H8l4 4" />
  </svg>
);
const SecureIcon = (p: P) => (
  <svg {...icon(p)}>
    <path d="M16 3 6 7v8c0 6 4 11 10 14 6-3 10-8 10-14V7L16 3Z" />
    <path d="m11.5 16 3 3 6-6" />
  </svg>
);
const ShowroomIcon = (p: P) => (
  <svg {...icon(p)}>
    <path d="M4 12 6 5h20l2 7M4 12h24M4 12c0 2 2 3 4 3s4-1 4-3c0 2 2 3 4 3s4-1 4-3c0 2 2 3 4 3s4-1 4-3M6 15v12h20V15M13 27v-7h6v7" />
  </svg>
);

const ITEMS = [
  { Icon: CodIcon, title: "Cash on delivery", text: "Nationwide, pay when it arrives." },
  { Icon: ExchangeIcon, title: "7-day exchange", text: "Unworn pieces, no fuss." },
  { Icon: SecureIcon, title: "Secure payment", text: "bKash, Nagad and card soon." },
  { Icon: ShowroomIcon, title: "Visit our showroom", text: "See the cloth before you buy." },
];

export function TrustRow() {
  return (
    <Container as="section" className="py-12 md:py-16">
      <ul className="grid grid-cols-2 border-y border-thread md:grid-cols-4 md:divide-x md:divide-thread">
        {ITEMS.map(({ Icon, title, text }, i) => (
          <li
            key={title}
            className={`px-4 py-8 md:px-8 ${i % 2 === 0 ? "max-md:border-r max-md:border-thread" : ""} ${
              i < 2 ? "max-md:border-b max-md:border-thread" : ""
            }`}
          >
            <Icon className="text-maroon" />
            <h3 className="mt-4 text-[15px] font-medium">{title}</h3>
            <p className="mt-1 text-sm text-stone">{text}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
