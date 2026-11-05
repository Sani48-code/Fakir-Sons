"use client";

import type { ReactNode } from "react";
import { CloseIcon } from "@/components/shop/icons";
import { Overlay } from "./overlay";

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <Overlay open={open} onClose={onClose} label={title}>
      <div className="flex h-full items-center justify-center p-4">
        <div
          className="flex max-h-full w-full max-w-xl flex-col rounded-[2px] border border-thread bg-paper"
          style={{ animation: "fade-in 200ms ease-out" }}
        >
          <div className="flex items-center justify-between border-b border-thread px-6 py-4">
            <h2 className="font-display text-[28px] font-medium leading-none">{title}</h2>
            <button type="button" onClick={onClose} aria-label="Close" className="-mr-2 p-2">
              <CloseIcon />
            </button>
          </div>
          <div className="overflow-y-auto px-6 py-6">{children}</div>
        </div>
      </div>
    </Overlay>
  );
}
