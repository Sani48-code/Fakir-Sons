"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { PriceTag } from "@/components/ui/price-tag";
import { cn } from "@/lib/format";
import { POPULAR_SEARCHES, search } from "@/lib/search";
import { CloseIcon, SearchIcon } from "./icons";
import { ProductImage } from "./product-image";

const searchHref = (q: string) => `/search?q=${encodeURIComponent(q.trim())}`;

/**
 * Search panel: slides down under the header on desktop, full screen on mobile.
 * Live results (debounced 250ms): up to 6 products and category suggestions.
 * Enter goes to /search?q=, Esc closes.
 */
export function SearchPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(query), 250);
    return () => window.clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => input.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const lock = window.matchMedia("(max-width: 1023px)").matches;
    const prev = document.body.style.overflow;
    if (lock) document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const result = useMemo(() => search(debounced), [debounced]);
  const products = result.products.slice(0, 6);
  const hasQuery = debounced.trim().length > 1;
  const empty = hasQuery && products.length === 0 && result.categories.length === 0 && result.equipment.length === 0;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    router.push(searchHref(query));
  };
  const go = (q: string) => {
    onClose();
    router.push(searchHref(q));
  };

  return (
    <>
      {/* Desktop backdrop under the panel */}
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          "absolute inset-x-0 top-full hidden h-[100svh] bg-ink/30 transition-opacity duration-200 lg:block",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "fixed inset-0 z-[70] overflow-y-auto bg-paper transition-[opacity,transform] duration-200 ease-out",
          "lg:absolute lg:inset-x-0 lg:bottom-auto lg:top-full lg:z-50 lg:max-h-[calc(100svh-120px)] lg:border-b lg:border-thread",
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-5 md:px-12 lg:pt-8">
          <form onSubmit={submit} role="search" className="flex items-center gap-3 border-b border-ink pb-3 transition-colors focus-within:border-maroon">
            <SearchIcon className="shrink-0 text-stone" />
            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <input
              ref={input}
              id="site-search"
              type="search"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search panjabi, sarees, suits…"
              className="min-w-0 flex-1 bg-transparent font-display text-[28px] leading-tight outline-none placeholder:text-stone/60 search-field md:text-[32px]"
            />
            <button type="button" onClick={onClose} aria-label="Close search" className="shrink-0 p-2">
              <CloseIcon />
            </button>
          </form>

          {!hasQuery && (
            <div className="mt-6">
              <p className="label text-stone">Popular searches</p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {POPULAR_SEARCHES.map((s) => (
                  <li key={s}>
                    <button type="button" onClick={() => go(s)} className="link-grow text-[15px]">
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {empty && (
            <p className="mt-6 text-[15px] text-stone">
              Nothing matches &ldquo;{debounced}&rdquo;. Try one of the popular searches:{" "}
              {POPULAR_SEARCHES.slice(0, 3).map((s, i) => (
                <span key={s}>
                  {i > 0 && ", "}
                  <button type="button" onClick={() => go(s)} className="underline underline-offset-2">
                    {s}
                  </button>
                </span>
              ))}
              .
            </p>
          )}

          {hasQuery && !empty && (
            <div className="mt-6 grid gap-8 lg:grid-cols-12">
              {result.categories.length > 0 && (
                <div className="lg:col-span-3">
                  <p className="label text-stone">Collections</p>
                  <ul className="mt-3 space-y-2 text-[15px]">
                    {result.categories.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} onClick={onClose} className="link-grow">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className={result.categories.length > 0 ? "lg:col-span-9" : "lg:col-span-12"}>
                {products.length > 0 && (
                  <>
                    <p className="label text-stone">Products</p>
                    <ul className="mt-3 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                      {products.map((p) => (
                        <li key={p.id}>
                          <Link href={`/product/${p.slug}`} onClick={onClose} className="group flex items-center gap-4">
                            <span className="relative block aspect-[3/4] w-16 shrink-0 overflow-hidden">
                              <ProductImage pic={p.images[0]} alt="" sizes="64px" />
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate text-[15px] group-hover:underline">{p.name}</span>
                              <PriceTag price={p.price} salePrice={p.salePrice} className="mt-1" />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {result.equipment.length > 0 && (
                  <div className={products.length > 0 ? "mt-6" : ""}>
                    <p className="label text-stone">Textile equipment</p>
                    <ul className="mt-3 space-y-2 text-[15px]">
                      {result.equipment.slice(0, 3).map((e) => (
                        <li key={e.id}>
                          <Link href={`/category/textile-equipment/${e.sub}`} onClick={onClose} className="link-grow">
                            {e.model}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <Link href={searchHref(debounced)} onClick={onClose} className="link-grow label mt-6 inline-block">
                  See all results for &ldquo;{debounced.trim()}&rdquo; →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
