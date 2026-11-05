"use client";

import { useMemo, useState } from "react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ProductCard } from "@/components/shop/product-card";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeader } from "@/components/ui/section-header";
import { Tabs } from "@/components/ui/tabs";
import type { Product } from "@/lib/dummy";

const TABS = [
  { id: "all", label: "All" },
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "kids", label: "Kids" },
];

/** 4-column grid (2 on mobile) with quiet text tabs; switching crossfades in 200ms. */
export function BestSellers({ products }: { products: Product[] }) {
  const [tab, setTab] = useState("all");

  const shown = useMemo(() => {
    const pool = tab === "all" ? products : products.filter((p) => p.category === tab);
    return [...pool].sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller)).slice(0, 8);
  }, [products, tab]);

  return (
    <div>
      <SectionHeader label="Most loved" title="Best sellers" href="/category/men" hrefLabel="Shop all" />
      <Tabs ariaLabel="Best sellers by department" items={TABS} value={tab} onChange={setTab} className="mt-8" />
      <div key={tab} className="mt-8" style={{ animation: "fade-in 200ms ease-out" }}>
        {shown.length === 0 ? (
          <EmptyState title="Nothing here yet" text="New pieces arrive every week." />
        ) : (
          <Stagger className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
            {shown.map((p, i) => (
              <StaggerItem key={p.id} index={i}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </div>
  );
}
