"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";
import { ChevronDownIcon } from "@/components/shop/icons";
import { cn } from "@/lib/format";

export type AccordionItem = { id: string; title: ReactNode; content: ReactNode };

export function Accordion({
  items,
  defaultOpen = [],
  multiple = false,
  className,
}: {
  items: AccordionItem[];
  defaultOpen?: string[];
  multiple?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState<string[]>(defaultOpen);
  const base = useId();

  const toggle = (id: string) =>
    setOpen((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : multiple ? [...cur, id] : [id],
    );

  return (
    <div className={cn("border-t border-thread", className)}>
      {items.map((it) => {
        const isOpen = open.includes(it.id);
        const panelId = `${base}-${it.id}`;
        return (
          <div key={it.id} className="border-b border-thread">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(it.id)}
                className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-[15px] font-medium"
              >
                {it.title}
                <ChevronDownIcon
                  className={cn("shrink-0 transition-transform duration-250", isOpen && "rotate-180")}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-hidden={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-250 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="pb-5 text-[15px] leading-relaxed text-stone">{it.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
