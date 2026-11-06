"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

/**
 * Wishlist: product slugs in localStorage. Works for guests; moves to the
 * account in Supabase once auth exists (Page 8).
 */
type Wishlist = {
  slugs: string[];
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  ready: boolean;
};

const KEY = "fs-wishlist";
const Ctx = createContext<Wishlist | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of browser storage after mount
      if (Array.isArray(saved)) setSlugs(saved.filter((s) => typeof s === "string"));
    } catch {
      /* storage blocked or corrupt: start empty */
    }
    setReady(true);
  }, []);

  const toggle = useCallback((slug: string) => {
    setSlugs((cur) => {
      const next = cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug];
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ slugs, has: (s: string) => slugs.includes(s), toggle, ready }), [slugs, toggle, ready]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWishlist(): Wishlist {
  const v = useContext(Ctx);
  if (!v) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return v;
}
