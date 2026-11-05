"use client";

import { cn } from "@/lib/format";

/** Square fabric-like colour chip. */
export function Swatch({
  name,
  hex,
  selected = false,
  disabled = false,
  onSelect,
  size = 28,
}: {
  name: string;
  hex: string;
  selected?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  size?: number;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={name}
      title={name}
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        "relative border transition-[outline-color] disabled:opacity-40",
        selected
          ? "border-ink outline outline-1 outline-offset-2 outline-ink"
          : "border-thread hover:outline hover:outline-1 hover:outline-offset-2 hover:outline-thread",
      )}
      style={{ width: size, height: size, backgroundColor: hex }}
    />
  );
}
