"use client";

import type { ReactNode } from "react";
import { CloseIcon } from "@/components/shop/icons";
import { cn } from "@/lib/format";
import { Overlay } from "./overlay";

/**
 * Panel that is a bottom sheet on mobile and a side panel from the right
 * (or left) on desktop.
 */
export function Sheet({
  open,
  onClose,
  title,
  children,
  footer,
  side = "right",
  widthClass = "md:w-[440px]",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  side?: "right" | "left";
  widthClass?: string;
}) {
  return (
    <Overlay open={open} onClose={onClose} label={title}>
      <div
        className={cn(
          "sheet-anim fixed bottom-0 left-0 right-0 flex max-h-[88%] flex-col border-t border-thread bg-paper",
          "md:bottom-0 md:top-0 md:max-h-none md:border-t-0",
          side === "right" ? "md:left-auto md:border-l" : "md:right-auto md:border-r",
          widthClass,
        )}
      >
        <div className="flex items-center justify-between border-b border-thread px-5 py-4">
          <h2 className="font-display text-[28px] font-medium leading-none">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="-mr-2 p-2">
            <CloseIcon />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
        {footer && <div className="border-t border-thread px-5 py-4">{footer}</div>}
      </div>
    </Overlay>
  );
}
