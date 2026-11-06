import { Img } from "@/components/ui/img";
import {
  CUTOUT_PHOTOS,
  CUTOUT_REJECTED,
  HERO_PHOTOS,
  OWN_PHOTOS,
  STOCK_PHOTOS,
  type AnyPhoto,
  type StockPhoto,
  type StockUse,
} from "@/lib/images";

/** Contact sheet: our own photos first, then stock picks grouped by intended use. */

const USE_LABEL: Record<StockUse, string> = {
  "equipment-product": "Equipment products (2 each)",
  "equipment-banner": "Equipment page banner",
  "home-catalogue": "Home: textile equipment catalogue",
  wholesale: "Wholesale page",
  story: "Story strip",
  about: "About page",
  "category-banner": "Category banners",
  "empty-state": "Empty states",
  "not-found": "404 page",
};

function ratioOf(p: { width: number; height: number }) {
  const r = p.width / p.height;
  return r > 2 ? "aspect-[3/1]" : r > 1.15 ? "aspect-[4/3]" : r < 0.87 ? "aspect-[3/4]" : "aspect-square";
}

function Tile({ p, wide = false }: { p: AnyPhoto; wide?: boolean }) {
  return (
    <li className={`text-xs ${wide ? "col-span-2 md:col-span-3 xl:col-span-4" : ""}`}>
      <Img
        src={p.src}
        alt={p.alt}
        ratio={ratioOf(p)}
        position={p.focal.desktop}
        sizes={wide ? "(min-width: 1280px) 70vw, 100vw" : "(min-width: 1280px) 18vw, (min-width: 768px) 30vw, 48vw"}
      />
      <p className="mt-2 break-all font-medium text-ink">{p.key}</p>
      <p className="mt-1 text-stone">{p.alt}</p>
      <p className="label mt-1 text-[10px]! text-stone">
        {p.width}×{p.height}
        {"collection" in p ? ` · ${p.collection}` : ""}
        {"topic" in p ? ` · ${p.topic}` : ""}
        {p.stock && p.product ? ` · ${p.product}` : ""}
      </p>
      {p.stock && p.note && <p className="mt-1 text-maroon">Note: {p.note}</p>}
      {p.stock && (
        <p className="mt-1 text-stone">
          <a href={p.pageUrl} target="_blank" rel="noopener noreferrer" className="link-grow">
            {p.photographer} · Pexels
          </a>
        </p>
      )}
    </li>
  );
}

const grid = "grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-5";

export function PhotoSheet() {
  const byUse = new Map<StockUse, StockPhoto[]>();
  for (const p of STOCK_PHOTOS) {
    const first = p.use[0];
    byUse.set(first, [...(byUse.get(first) ?? []), p]);
  }

  return (
    <div className="space-y-16">
      <section>
        <h3 className="font-display text-2xl">Product cutouts ({CUTOUT_PHOTOS.length} approved)</h3>
        <p className="mt-2 max-w-2xl text-sm text-stone">
          Background removed with rembg (<code>scripts/product-cutouts.py</code>), placed on the #EDE8DF studio backdrop,
          3:4, head at 7% from the top, native resolution. Saved to <code>public/images/products/</code>.
        </p>
        <ul className={`mt-6 ${grid}`}>
          {CUTOUT_PHOTOS.map((p) => (
            <Tile key={p.key} p={p} />
          ))}
        </ul>
        <h4 className="label mt-10 mb-3 text-gold">Rejected: these keep their original photo</h4>
        <ul className="space-y-1 text-sm text-stone">
          {CUTOUT_REJECTED.map((r) => (
            <li key={r.slug}>
              <span className="font-medium text-ink">{r.slug}</span>: {r.reason}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-display text-2xl">Our photos</h3>
        <p className="mt-2 max-w-2xl text-sm text-stone">
          From <code>Images/</code>, optimised by <code>scripts/optimize-images.mjs</code>. Tiles use each photo&apos;s desktop
          focal point.
        </p>

        <h4 className="label mt-8 mb-4 text-gold">Hero (desktop banner, then 4:5 mobile crop)</h4>
        <ul className="space-y-10">
          {HERO_PHOTOS.map((h, i) => (
            <li key={h.key} className="grid gap-4 md:grid-cols-[1fr_200px]">
              <div>
                <Img src={h.src} alt={h.alt} ratio="aspect-[3/1]" sizes="(min-width: 768px) 70vw, 100vw" />
                <p className="mt-2 text-xs font-medium text-ink">
                  {String(i + 1).padStart(2, "0")} · {h.key} · text {h.textSide}
                </p>
                <p className="mt-1 text-xs text-stone">{h.alt}</p>
              </div>
              <Img src={h.mobile.src} alt="" ratio="aspect-[4/5]" sizes="200px" position={h.focal.mobile} />
            </li>
          ))}
        </ul>

        <h4 className="label mt-12 mb-4 text-gold">Collections</h4>
        <ul className={grid}>
          {OWN_PHOTOS.map((p) => (
            <Tile key={p.key} p={p} />
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-display text-2xl">Stock photos ({STOCK_PHOTOS.length})</h3>
        <p className="mt-2 max-w-2xl text-sm text-stone">
          Free Pexels photos, downloaded to <code>public/images/stock/</code> and flagged <code>stock: true</code> in{" "}
          <code>lib/images.ts</code> so they can be replaced after our photoshoot. Not used on any page yet.
        </p>
        {[...byUse.entries()].map(([use, list]) => (
          <div key={use}>
            <h4 className="label mt-10 mb-4 text-gold">
              {USE_LABEL[use]} ({list.length})
            </h4>
            <ul className={grid}>
              {list.map((p) => (
                <Tile key={p.key} p={p} />
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
