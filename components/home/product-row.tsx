"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent, MouseEvent } from "react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/shop/icons";
import { ProductCard } from "@/components/shop/product-card";
import { SectionHeader } from "@/components/ui/section-header";
import type { Product } from "@/lib/dummy";

/** Horizontal product row: snap scroll, drag-to-scroll (mouse), arrow buttons, progress line. */
export function ProductRow({
  title,
  label,
  number,
  href,
  hrefLabel,
  products,
}: {
  title: string;
  label?: string;
  number?: string;
  href: string;
  hrefLabel?: string;
  products: Product[];
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(el.scrollWidth ? (el.scrollLeft + el.clientWidth) / el.scrollWidth : 0);
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const by = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = scroller.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = scroller.current;
    if (!d.active || !el) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 5 && !d.moved) {
      d.moved = true;
      setDragging(true);
    }
    if (d.moved) el.scrollLeft = d.startLeft - dx;
  };
  const endDrag = () => {
    drag.current.active = false;
    setDragging(false);
  };
  // A drag must not count as a click on a card link.
  const onClickCapture = (e: MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <div>
      <SectionHeader number={number} label={label} title={title} href={href} hrefLabel={hrefLabel}>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            aria-label={`Previous ${title}`}
            onClick={() => by(-1)}
            disabled={!canPrev}
            className="flex h-11 w-11 items-center justify-center border border-ink transition-colors duration-150 hover:bg-ink hover:text-cotton disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            aria-label={`Next ${title}`}
            onClick={() => by(1)}
            disabled={!canNext}
            className="flex h-11 w-11 items-center justify-center border border-ink transition-colors duration-150 hover:bg-ink hover:text-cotton disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </SectionHeader>

      <div
        ref={scroller}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        role="region"
        aria-label={title}
        tabIndex={0}
        className={`@container no-scrollbar -mx-5 mt-8 scroll-px-5 overflow-x-auto px-5 md:-mx-12 md:scroll-px-12 md:px-12 ${
          dragging ? "cursor-grabbing select-none" : "cursor-grab snap-x snap-mandatory"
        }`}
      >
        <Stagger className="flex w-max gap-4 pb-1 md:gap-6">
          {products.map((p, i) => (
            <StaggerItem key={p.id} index={i} className="w-[240px] shrink-0 snap-start sm:w-[290px] lg:w-[calc((100cqw-72px)/4)]">
              <ProductCard product={p} sizes="(min-width: 1440px) 320px, (min-width: 1024px) 23vw, (min-width: 640px) 290px, 240px" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <div aria-hidden className="mt-6 h-px w-full bg-thread">
        <div className="h-px origin-left bg-ink transition-transform duration-150" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </div>
  );
}
