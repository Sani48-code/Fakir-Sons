import { SITE } from "@/lib/site";

const ITEMS = [
  "Winter collection now in",
  "Nationwide Cash on Delivery",
  "Wholesale & bulk orders",
  "Easy exchange",
  `Since ${SITE.est}`,
  "Delivered from Dhaka, nationwide",
];

function Half({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {ITEMS.map((t) => (
        <li key={t} className="flex items-center">
          <span className="label px-6 py-3.5 text-ink">{t}</span>
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
        </li>
      ))}
    </ul>
  );
}

/** Thin hairline band with a slow continuous marquee (pauses on hover). */
export function PromiseStrip() {
  return (
    <div className="marquee overflow-hidden border-y border-thread bg-cotton">
      <div className="marquee-track">
        <Half />
        <Half hidden />
      </div>
    </div>
  );
}
