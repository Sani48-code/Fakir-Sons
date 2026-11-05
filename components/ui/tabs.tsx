"use client";

import { useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { cn } from "@/lib/format";

export type TabItem = { id: string; label: string; content?: ReactNode };

/**
 * Quiet text tabs. Pass `content` for panel tabs, or omit it and use
 * `onChange` as a filter switch (the caller renders the result).
 */
export function Tabs({
  items,
  value,
  defaultValue,
  onChange,
  className,
  ariaLabel = "Tabs",
}: {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  className?: string;
  ariaLabel?: string;
}) {
  const [inner, setInner] = useState(defaultValue ?? items[0]?.id);
  const current = value ?? inner;
  const base = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (id: string) => {
    setInner(id);
    onChange?.(id);
  };

  const onKey = (e: KeyboardEvent, i: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % items.length;
    if (e.key === "ArrowLeft") next = (i - 1 + items.length) % items.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = items.length - 1;
    if (next >= 0) {
      e.preventDefault();
      select(items[next].id);
      refs.current[next]?.focus();
    }
  };

  const active = items.find((t) => t.id === current);

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex gap-6 overflow-x-auto shadow-[inset_0_-1px_0_var(--thread)]"
      >
        {items.map((t, i) => {
          const selected = t.id === current;
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`${base}-tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`${base}-panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "label shrink-0 border-b-2 py-3 transition-colors duration-150",
                selected
                  ? "border-gold text-ink"
                  : "border-transparent text-stone hover:text-ink",
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {active?.content !== undefined && (
        <div
          role="tabpanel"
          id={`${base}-panel-${active.id}`}
          aria-labelledby={`${base}-tab-${active.id}`}
          className="pt-6"
        >
          {active.content}
        </div>
      )}
    </div>
  );
}
