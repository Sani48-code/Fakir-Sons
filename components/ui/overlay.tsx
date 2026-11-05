"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/**
 * Shared base for Modal and Sheet: a native <dialog> (focus trap, Esc and
 * top-layer for free) with backdrop-click close and body scroll lock.
 */
export function Overlay({
  open,
  onClose,
  label,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <dialog
      ref={ref}
      aria-label={label}
      className="overlay"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        // Click on the dialog box itself (outside the panel) = backdrop click.
        if (e.target === ref.current) onClose();
      }}
    >
      {children}
    </dialog>
  );
}
