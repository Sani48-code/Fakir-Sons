"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FocusEvent } from "react";
import { MEGA } from "@/lib/dummy";
import { cn } from "@/lib/format";
import { NAV, SITE } from "@/lib/site";
import { BagIcon, ChevronDownIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from "./icons";
import { MobileDrawer } from "./mobile-drawer";
import { ProductImage } from "./product-image";
import { SearchPanel } from "./search-panel";
import { useWishlist } from "./wishlist";

const CART_COUNT = 0; // placeholder until the cart exists (Page 5)

export function Header() {
  const pathname = usePathname();
  const wishlist = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus after navigating.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset UI when the route changes
    setMega(null);
    setSearchOpen(false);
  }, [pathname]);

  const openMega = (href: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMega(href);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMega(null), 150);
  };
  const onBlurItem = (e: FocusEvent<HTMLLIElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMega(null);
  };

  return (
    <>
      {/* Always solid. Shrinks on scroll: desktop 112 -> 80px, mobile 68 -> 60px. */}
      <header
        onKeyDown={(e) => e.key === "Escape" && setMega(null)}
        className={`sticky top-0 z-50 border-b border-thread bg-paper text-ink transition-[height] duration-300 ease-out ${
          scrolled ? "h-[60px] lg:h-[80px]" : "h-[68px] lg:h-[112px]"
        }`}
      >
        <div className="mx-auto grid h-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 lg:flex lg:justify-between lg:px-12">
          <button onClick={() => setDrawerOpen(true)} aria-label="Open menu" className="-ml-2 justify-self-start p-2 lg:hidden">
            <MenuIcon />
          </button>

          <Link
            href="/"
            aria-label={SITE.name}
            className={`relative block aspect-[1449/843] transition-[height] duration-300 ease-out lg:shrink-0 ${
              scrolled ? "h-[44px] lg:h-[64px]" : "h-[52px] lg:h-[92px]"
            }`}
          >
            <Image src="/brand/logo.png" alt={SITE.name} fill priority sizes="(min-width: 1024px) 160px, 90px" className="object-contain" />
          </Link>

          {/* Desktop nav + mega-menu: opens on hover or focus, closes 150ms after leaving */}
          <nav aria-label="Main" className="hidden h-full lg:block">
            <ul className="label flex h-full items-center gap-7">
              {NAV.map((item) => {
                const menu = MEGA[item.href];
                const open = mega === item.href && !!menu;
                return (
                  <li
                    key={item.label}
                    className="h-full"
                    onMouseEnter={() => menu && openMega(item.href)}
                    onMouseLeave={scheduleClose}
                    onFocus={() => menu && openMega(item.href)}
                    onBlur={onBlurItem}
                  >
                    <Link
                      href={item.href}
                      aria-expanded={menu ? open : undefined}
                      aria-haspopup={menu ? "true" : undefined}
                      className={cn("relative flex h-full items-center gap-1", item.sale && "text-madder")}
                    >
                      {item.label}
                      {menu && <ChevronDownIcon className={cn("transition-transform duration-200", open && "rotate-180")} />}
                      <span aria-hidden className={cn("absolute inset-x-0 bottom-0 h-0.5 bg-gold transition-opacity", open ? "opacity-100" : "opacity-0")} />
                    </Link>

                    {menu && (
                      <div
                        className={cn(
                          "absolute inset-x-0 top-full border-y border-thread bg-paper text-ink transition-[opacity,transform] duration-200 ease-out",
                          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
                        )}
                      >
                        <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-6 px-12 py-10">
                          {menu.groups.map((g) => (
                            <div key={g.title} className="col-span-2">
                              <p className="label text-stone">{g.title}</p>
                              <ul className="mt-4 space-y-2.5 text-[15px] normal-case tracking-normal">
                                {g.links.map((l) => (
                                  <li key={l.label}>
                                    <Link href={l.href} className="link-grow">
                                      {l.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          <ul className="col-span-5 col-start-8 grid grid-cols-2 gap-6 normal-case tracking-normal">
                            {menu.featured.map((f) => (
                              <li key={f.caption}>
                                <Link href={f.href} className="group block" tabIndex={open ? 0 : -1}>
                                  <span className="relative block aspect-[3/4] overflow-hidden">
                                    <ProductImage pic={f.image} alt={f.image.alt} sizes="200px" />
                                  </span>
                                  <span className="mt-2 block text-sm group-hover:underline">{f.caption} →</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Icons: search opens the panel; account and wishlist are real pages */}
          <div className="flex items-center justify-self-end gap-1 lg:gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen((o) => !o)}
              aria-label="Search"
              aria-expanded={searchOpen}
              className="p-2"
            >
              <SearchIcon />
            </button>
            <Link href="/account" aria-label="Account" className="hidden p-2 sm:block">
              <UserIcon />
            </Link>
            <Link
              href="/wishlist"
              aria-label={`Wishlist, ${wishlist.slugs.length} items`}
              className="relative hidden p-2 sm:block"
            >
              <HeartIcon />
              {wishlist.slugs.length > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center bg-ink px-1 text-[10px] font-medium text-cotton">
                  {wishlist.slugs.length}
                </span>
              )}
            </Link>
            <Link href="/cart" aria-label={`Cart, ${CART_COUNT} items`} className="relative p-2">
              <BagIcon />
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center bg-maroon px-1 text-[10px] font-medium text-cotton">
                {CART_COUNT}
              </span>
            </Link>
          </div>
        </div>

        <SearchPanel open={searchOpen} onClose={closeSearch} />
      </header>

      <MobileDrawer open={drawerOpen} onClose={closeDrawer} />
    </>
  );
}
