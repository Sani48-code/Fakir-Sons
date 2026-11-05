"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Img } from "@/components/ui/img";
import { PriceTag } from "@/components/ui/price-tag";
import { useToast } from "@/components/ui/toast";
import type { Product } from "@/lib/dummy";
import { cn } from "@/lib/format";
import { BagIcon, HeartIcon, PlusIcon } from "./icons";

const SIZES = "(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 48vw";

export function ProductCard({
  product,
  priority = false,
  onQuickAdd,
  className,
}: {
  product: Product;
  priority?: boolean;
  onQuickAdd?: (p: Product) => void;
  className?: string;
}) {
  const [wished, setWished] = useState(false);
  const toast = useToast();
  const soldOut = product.stock === 0;
  const onSale = product.salePrice !== undefined && product.salePrice < product.price;
  const href = `/product/${product.slug}`;

  const quickAdd = () => {
    if (soldOut) return;
    if (onQuickAdd) return onQuickAdd(product);
    // TODO(Page 5): open the cart drawer and add the default variant.
    toast(`${product.name} added to bag`);
  };

  return (
    <article className={cn("group relative", className)}>
      <div className="relative">
        <Link href={href} aria-label={product.name} tabIndex={-1} className="block">
          <div className="relative aspect-[3/4] overflow-hidden bg-thread/60">
            <Img
              src={product.images[0]}
              alt={`${product.name}, front`}
              sizes={SIZES}
              ratio=""
              priority={priority}
              className={cn("absolute inset-0", soldOut && "opacity-55")}
            />
            <Img
              src={product.images[1]}
              alt=""
              sizes={SIZES}
              ratio=""
              className={cn(
                "absolute inset-0 opacity-0 transition-opacity duration-[400ms] ease-out hoverable:group-hover:opacity-100 hoverable:group-focus-within:opacity-100",
                soldOut && "!opacity-0",
              )}
            />
          </div>
        </Link>

        {/* Labels, top-left */}
        <div className="pointer-events-none absolute left-2 top-2 flex flex-col items-start gap-1">
          {soldOut ? (
            <Badge tone="neutral">Sold out</Badge>
          ) : onSale ? (
            <Badge tone="sale">Sale</Badge>
          ) : product.isNew ? (
            <Badge tone="new">New</Badge>
          ) : null}
        </div>

        {/* Wishlist: on hover (desktop), always visible on touch */}
        <button
          type="button"
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wished}
          onClick={() => setWished((w) => !w)}
          className={cn(
            "absolute right-2 top-2 flex h-9 w-9 items-center justify-center bg-paper/90 text-ink transition-opacity duration-200",
            "hoverable:opacity-0 hoverable:group-hover:opacity-100 hoverable:group-focus-within:opacity-100",
            wished && "text-maroon hoverable:opacity-100",
          )}
        >
          <HeartIcon width={18} height={18} fill={wished ? "currentColor" : "none"} />
        </button>

        {/* Quick add: slide-up bar on hover-capable screens, small bag button on touch */}
        {!soldOut && (
          <>
            <button
              type="button"
              onClick={quickAdd}
              aria-label={`Quick add ${product.name} to bag`}
              className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center bg-ink text-cotton hoverable:hidden"
            >
              <BagIcon width={18} height={18} />
            </button>
            <div className="absolute inset-x-0 bottom-0 hidden h-11 overflow-hidden hoverable:block">
              <button
                type="button"
                onClick={quickAdd}
                className="label flex h-11 w-full translate-y-full items-center justify-center gap-2 bg-ink text-cotton transition-transform duration-200 ease-out hover:bg-maroon focus-visible:translate-y-0 group-hover:translate-y-0 group-focus-within:translate-y-0"
              >
                <PlusIcon width={14} height={14} />
                Add to bag
              </button>
            </div>
          </>
        )}
      </div>

      <div className="mt-3">
        <h3 className="text-[15px] leading-snug">
          <Link href={href} className="link-grow">
            {product.name}
          </Link>
        </h3>
        <p className="label mt-1 !text-[11px] text-stone">{product.fabric}</p>
        <PriceTag price={product.price} salePrice={product.salePrice} className="mt-1.5" />
      </div>
    </article>
  );
}
