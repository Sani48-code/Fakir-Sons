"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import type { ReactNode } from "react";
import { CloseIcon } from "@/components/shop/icons";

type ToastItem = { id: number; message: string; actionLabel?: string; onAction?: () => void };
type Options = { actionLabel?: string; onAction?: () => void; duration?: number };

const ToastContext = createContext<((message: string, opts?: Options) => void) | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const dismiss = useCallback((id: number) => {
    setItems((cur) => cur.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, opts: Options = {}) => {
      const id = ++counter.current;
      setItems((cur) => [...cur.slice(-2), { id, message, ...opts }]);
      window.setTimeout(() => dismiss(id), opts.duration ?? 4000);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[90] flex flex-col items-center gap-2 px-4"
      >
        {items.map((t) => (
          <div
            key={t.id}
            role="status"
            style={{ animation: "fade-in 200ms ease-out" }}
            className="pointer-events-auto flex w-full max-w-sm items-center gap-4 rounded-[2px] border border-ink bg-ink px-4 py-3 text-sm text-cotton"
          >
            <span className="flex-1">{t.message}</span>
            {t.actionLabel && (
              <button
                type="button"
                onClick={() => {
                  t.onAction?.();
                  dismiss(t.id);
                }}
                className="label text-gold underline underline-offset-4"
              >
                {t.actionLabel}
              </button>
            )}
            <button type="button" aria-label="Dismiss" onClick={() => dismiss(t.id)}>
              <CloseIcon width={16} height={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
