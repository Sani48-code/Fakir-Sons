import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ProductCard } from "@/components/shop/product-card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { ProductCardSkeleton, Skeleton } from "@/components/ui/skeleton";
import { CATEGORIES, categoryHref } from "@/lib/dummy";
import { taka } from "@/lib/format";
import { POPULAR_SEARCHES, search } from "@/lib/search";

export const metadata: Metadata = {
  title: "Search",
  description: "Search panjabi, sarees, suits, winter wear and textile equipment.",
  robots: { index: false, follow: true },
};

type SP = Promise<{ q?: string | string[] }>;

export default function SearchPage({ searchParams }: { searchParams: SP }) {
  return (
    <Container className="py-10 md:py-16">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
      <Suspense fallback={<ResultsSkeleton />}>
        <Results searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}

function SearchForm({ q }: { q: string }) {
  return (
    <form action="/search" role="search" className="mt-6 flex max-w-2xl items-end gap-3 border-b border-ink pb-2 transition-colors focus-within:border-maroon">
      <label htmlFor="search-page-q" className="sr-only">
        Search products
      </label>
      <input
        id="search-page-q"
        name="q"
        type="search"
        defaultValue={q}
        placeholder="Search panjabi, sarees, suits…"
        className="min-w-0 flex-1 bg-transparent font-display text-[26px] leading-tight outline-none placeholder:text-stone/60 search-field md:text-[32px]"
      />
      <button type="submit" className="label pb-2">
        Search
      </button>
    </form>
  );
}

function Suggestions() {
  return (
    <div className="mt-10 grid gap-10 md:grid-cols-2">
      <div>
        <p className="label text-stone">Popular searches</p>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
          {POPULAR_SEARCHES.map((s) => (
            <li key={s}>
              <Link href={`/search?q=${encodeURIComponent(s)}`} className="link-grow">
                {s}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="label text-stone">Collections</p>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link href={categoryHref(c.slug)} className="link-grow">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

async function Results({ searchParams }: { searchParams: SP }) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw ?? "").trim().slice(0, 80);

  if (!q) {
    return (
      <>
        <h1 className="mt-8 font-display text-[44px] font-medium leading-none md:text-[64px]">Search the shop</h1>
        <SearchForm q="" />
        <Suggestions />
      </>
    );
  }

  const { products, equipment, categories } = search(q);
  const count = products.length + equipment.length;

  return (
    <>
      <h1 className="mt-8 font-display text-[40px] font-medium leading-[1.02] md:text-[64px]">
        Results for &ldquo;{q}&rdquo;
      </h1>
      <p className="mt-3 text-[15px] text-stone">
        <span className="tnum">{count}</span> {count === 1 ? "result" : "results"}
      </p>
      <SearchForm q={q} />

      {categories.length > 0 && (
        <nav aria-label="Matching collections" className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <span className="label text-stone">Collections</span>
          {categories.map((c) => (
            <Link key={c.href} href={c.href} className="link-grow font-medium">
              {c.label}
            </Link>
          ))}
        </nav>
      )}

      {count === 0 ? (
        <div className="mt-12 border-t border-thread pt-10">
          <h2 className="font-display text-[28px] font-medium leading-tight md:text-[40px]">Nothing matches &ldquo;{q}&rdquo;</h2>
          <p className="mt-3 max-w-lg text-[15px] text-stone">
            Check the spelling, try a shorter word like &ldquo;panjabi&rdquo; or &ldquo;saree&rdquo;, or browse a collection.
          </p>
          <Suggestions />
        </div>
      ) : (
        <>
          {products.length > 0 && (
            <Stagger className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
              {products.map((p, i) => (
                <StaggerItem key={p.id} index={i}>
                  <ProductCard product={p} priority={i < 2} />
                </StaggerItem>
              ))}
            </Stagger>
          )}
          {equipment.length > 0 && (
            <section className="mt-14">
              <h2 className="label text-stone">Textile equipment</h2>
              <ul className="mt-4 border-t border-thread">
                {equipment.map((e) => (
                  <li key={e.id} className="border-b border-thread">
                    <Link
                      href={categoryHref("textile-equipment", e.sub)}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 hover:bg-paper md:px-2"
                    >
                      <span>
                        <span className="label mr-3 text-stone">{e.brand}</span>
                        <span className="text-[16px] font-medium">{e.model}</span>
                      </span>
                      <span className="tnum text-[15px]">
                        <span className="mr-2 text-xs text-stone">from</span>
                        {taka(e.fromPrice)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </>
  );
}

function ResultsSkeleton() {
  return (
    <div className="mt-8" aria-busy="true" aria-label="Loading results">
      <Skeleton className="h-14 w-2/3 max-w-xl" />
      <Skeleton className="mt-4 h-4 w-24" />
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
