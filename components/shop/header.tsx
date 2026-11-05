"use client";

import Image from "next/image";
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
        className={`sticky top-0 z-50 h-[76px] transition-colors duration-300 ${
          isHome ? "-mb-[76px]" : ""
        } ${
          solid
            ? "border-b border-thread bg-paper text-ink"
            : "border-b border-transparent bg-transparent text-cotton"
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

          {/* Logo: light over the transparent hero, dark when solid */}
          <Link
            href="/"
            aria-label={SITE.name}
            className="relative block h-14 w-[108px] lg:shrink-0"
          >
            <Image
              src="/brand/logo-light.png"
              alt={SITE.name}
              fill
              priority
              sizes="108px"
              className={`object-contain transition-opacity duration-300 ${solid ? "opacity-0" : "opacity-100"}`}
            />
            <Image
              src="/brand/logo-dark.png"
              alt=""
              fill
              priority
              sizes="108px"
              className={`object-contain transition-opacity duration-300 ${solid ? "opacity-100" : "opacity-0"}`}
            />
          </Link>

          {/* Desktop nav + mega-menu */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-7 label">
              {NAV.map((item) => (
                <li key={item.label} className="group">
                  <Link
                    href={item.href}
                    className={`flex h-[76px] items-center gap-1 ${
                      item.sale ? "text-madder" : ""
                    }`}
                  >
                    {item.label}
                    {item.children && <ChevronDownIcon />}
                  </Link>

                  {item.children && (
                    <div className="invisible absolute left-0 right-0 top-full border-t border-thread bg-paper text-ink opacity-0 transition-opacity duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      <div className="mx-auto grid max-w-[1440px] grid-cols-4 gap-8 px-8 py-8">
                        <div>
                          <p className="label mb-3 text-stone">
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
                        <div className="col-span-3 flex h-40 items-center justify-center bg-cotton text-sm text-stone">
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
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center bg-maroon px-1 text-[10px] font-medium text-cotton">
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
