"use client";

import { cn } from "@/lib/format";

export function SizeButton({
  label,
  selected = false,
  soldOut = false,
  onSelect,
}: {
  label: string;
  selected?: boolean;
  soldOut?: boolean;
  onSelect?: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={soldOut}
      onClick={onSelect}
      className={cn(
        "relative flex h-11 min-w-11 items-center justify-center rounded-[2px] border px-3 text-sm transition-colors duration-150",
        selected
          ? "border-ink bg-ink text-cotton"
          : "border-thread bg-paper text-ink hover:border-ink",
        soldOut && "cursor-not-allowed text-stone/60 line-through hover:border-thread",
      )}
    >
      {label}
      {soldOut && <span className="sr-only"> (sold out)</span>}
    </button>
  );
}
