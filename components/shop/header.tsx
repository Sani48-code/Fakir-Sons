"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import {
  BagIcon,
  ChevronDownIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "./icons";
import { MobileDrawer } from "./mobile-drawer";

const CART_COUNT = 0; // placeholder until the cart exists

export function Header() {
  const isHome = usePathname() === "/";
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparent only on home, at the top, with nothing hovered/open.
  const solid = !isHome || scrolled || hovered || drawerOpen;

  return (
    <>
      <header
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        // On home the header overlays the hero: pull following content up by its height.
        className={`sticky top-0 z-50 h-16 transition-colors duration-300 ${
          isHome ? "-mb-16" : ""
        } ${
          solid
            ? "bg-white text-ink shadow-[0_1px_0_rgba(0,0,0,0.08)]"
            : "bg-transparent text-white"
        }`}
      >
        <div className="mx-auto grid h-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 lg:flex lg:justify-between lg:px-8">
          {/* Mobile hamburger */}
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            className="-ml-2 justify-self-start p-2 lg:hidden"
          >
            <MenuIcon />
          </button>

          {/* Logo (placeholder text) */}
          <Link
            href="/"
            className="font-display text-xl font-semibold tracking-[0.12em] sm:text-2xl lg:shrink-0"
          >
            {SITE.name}
          </Link>

          {/* Desktop nav + mega-menu */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-7 text-sm uppercase tracking-wide">
              {NAV.map((item) => (
                <li key={item.label} className="group">
                  <Link
                    href={item.href}
                    className={`flex h-16 items-center gap-1 ${
                      item.sale ? "font-medium text-sale" : ""
                    }`}
                  >
                    {item.label}
                    {item.children && <ChevronDownIcon />}
                  </Link>

                  {item.children && (
                    <div className="invisible absolute left-0 right-0 top-full border-t border-black/5 bg-white text-ink opacity-0 shadow-lg transition-opacity duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      <div className="mx-auto grid max-w-[1440px] grid-cols-4 gap-8 px-8 py-8">
                        <div>
                          <p className="mb-3 text-xs uppercase tracking-widest text-black/50">
                            {item.label}
                          </p>
                          <ul className="space-y-2 text-sm normal-case tracking-normal">
                            {item.children.map((c) => (
                              <li key={c.label}>
                                <Link href={c.href} className="hover:underline">
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                            <li>
                              <Link href={item.href} className="font-medium underline">
                                View all
                              </Link>
                            </li>
                          </ul>
                        </div>
                        {/* Placeholder promo tile */}
                        <div className="col-span-3 flex h-40 items-center justify-center bg-neutral-100 text-sm text-black/40">
                          Featured image placeholder
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Icons */}
          <div className="flex items-center justify-self-end gap-1 lg:gap-3">
            <Link href="/search" aria-label="Search" className="p-2">
              <SearchIcon />
            </Link>
            <Link href="/account" aria-label="Account" className="hidden p-2 sm:block">
              <UserIcon />
            </Link>
            <Link href="/wishlist" aria-label="Wishlist" className="hidden p-2 sm:block">
              <HeartIcon />
            </Link>
            <Link href="/cart" aria-label={`Cart, ${CART_COUNT} items`} className="relative p-2">
              <BagIcon />
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-ink">
                {CART_COUNT}
              </span>
            </Link>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={closeDrawer} />
    </>
  );
}
