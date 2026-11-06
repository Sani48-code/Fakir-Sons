import { SITE } from "@/lib/site";

// The last item is hidden on phones so the line fits without scrolling.
const ITEMS = ["COD nationwide", "Wholesale available", "Easy exchange", `Since ${SITE.est}`];

/** One thin, static line under the hero. */
export function PromiseStrip() {
  return (
    <div className="border-b border-thread bg-cotton">
      <ul className="mx-auto flex max-w-[1440px] items-center justify-center gap-x-3 px-3 py-3 sm:gap-x-5 md:gap-x-8 md:px-12">
        {ITEMS.map((t, i) => (
          <li key={t} className={`flex shrink-0 items-center gap-x-3 sm:gap-x-5 md:gap-x-8 ${i === ITEMS.length - 1 ? "max-sm:hidden" : ""}`}>
            {i > 0 && <span aria-hidden className="h-1 w-1 bg-gold" />}
            {/* Not .label: its unlayered size would override these phone sizes. */}
            <span className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.08em] text-ink sm:text-[11px] sm:tracking-[0.14em]">{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
