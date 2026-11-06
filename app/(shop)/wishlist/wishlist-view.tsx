"use client";

import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ProductCard } from "@/components/shop/product-card";
import { useWishlist } from "@/components/shop/wishlist";
import { ButtonLink } from "@/components/ui/button";
import { Img } from "@/components/ui/img";
import { ProductCardSkeleton } from "@/components/ui/skeleton";
import { PRODUCTS, categoryHref } from "@/lib/dummy";
import { pic } from "@/lib/images";

const EMPTY = pic("stock-at-hangers-empty");

export function WishlistView() {
  const { slugs, ready } = useWishlist();
  const items = slugs.map((s) => PRODUCTS.find((p) => p.slug === s)).filter((p) => p !== undefined);

  if (!ready) {
    return (
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mt-10 grid items-center gap-8 md:grid-cols-12 md:gap-12">
        <Img
          src={EMPTY.src}
          alt={EMPTY.alt}
          source={EMPTY.source}
          box={3 / 2}
          ratio="aspect-[3/2]"
          sizes="(min-width: 768px) 560px, 100vw"
          className="md:col-span-6 md:max-w-[560px]"
        />
        <div className="md:col-span-6">
          <h2 className="font-display text-[32px] font-medium leading-tight md:text-[44px]">Nothing saved yet</h2>
          <p className="mt-3 max-w-sm text-[15px] text-stone">
            Tap the heart on any piece to keep it here. Your wishlist stays on this device.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={categoryHref("winter")}>Shop winter</ButtonLink>
            <ButtonLink href={categoryHref("men", "panjabi")} variant="outline">
              Shop panjabi
            </ButtonLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <p className="mt-3 text-[15px] text-stone">
        <span className="tnum">{items.length}</span> {items.length === 1 ? "piece" : "pieces"} saved on this device.
      </p>
      <Stagger className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
        {items.map((p, i) => (
          <StaggerItem key={p.id} index={i}>
            <ProductCard product={p} />
          </StaggerItem>
        ))}
      </Stagger>
    </>
  );
}
