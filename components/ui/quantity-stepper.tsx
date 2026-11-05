"use client";

import { MinusIcon, PlusIcon } from "@/components/shop/icons";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  label = "Quantity",
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  label?: string;
}) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const btn =
    "flex h-11 w-11 items-center justify-center transition-colors duration-150 hover:bg-cotton disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent";
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center rounded-[2px] border border-thread bg-paper"
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        className={btn}
        disabled={value <= min}
        onClick={() => onChange(clamp(value - 1))}
      >
        <MinusIcon />
      </button>
      <input
        aria-label={label}
        inputMode="numeric"
        value={value}
        onChange={(e) => {
          const n = parseInt(e.target.value.replace(/\D/g, ""), 10);
          onChange(Number.isNaN(n) ? min : clamp(n));
        }}
        className="tnum h-11 w-12 bg-transparent text-center text-[15px] focus-visible:outline-offset-[-2px]"
      />
      <button
        type="button"
        aria-label="Increase quantity"
        className={btn}
        disabled={value >= max}
        onClick={() => onChange(clamp(value + 1))}
      >
        <PlusIcon />
      </button>
    </div>
  );
}
