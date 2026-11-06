import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ProductCard } from "@/components/shop/product-card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { Img } from "@/components/ui/img";
import { CATEGORIES, categoryHref, equipmentIn, getCategory, productsIn } from "@/lib/dummy";
import { cn, taka } from "@/lib/format";
import { SITE } from "@/lib/site";

/**
 * Basic category listing so every category URL on the site resolves.
 * PROMPTS.md Page 2 replaces this with the full page (banner, filters, sort).
 */

export const categoryParams = () => CATEGORIES.map((c) => ({ slug: c.slug }));
export const subcategoryParams = () =>
  CATEGORIES.flatMap((c) => c.sub.map((s) => ({ slug: c.slug, sub: s.slug })));

function resolve(slug: string, sub?: string) {
  const category = getCategory(slug);
  const subcategory = sub ? category?.sub.find((s) => s.slug === sub) : undefined;
  if (!category || (sub && !subcategory)) return null;
  return { category, subcategory };
}

export function categoryMetadata(slug: string, sub?: string): Metadata {
  const r = resolve(slug, sub);
  if (!r) return {};
  const name = r.subcategory ? `${r.category.name} · ${r.subcategory.name}` : r.category.name;
  return {
    title: name,
    description: `${r.category.blurb} Shop ${name.toLowerCase()} at ${SITE.name}, ${SITE.city}.`,
    openGraph: { images: [{ url: r.category.image.src, alt: r.category.image.alt }] },
  };
}

export function CategoryView({ slug, sub }: { slug: string; sub?: string }) {
  const r = resolve(slug, sub);
  if (!r) notFound();
  const { category, subcategory } = r;
  const equipment = category.slug === "textile-equipment";
  const products = equipment ? [] : productsIn(category.slug, sub);
  const machines = equipment ? equipmentIn(sub) : [];
  const count = equipment ? machines.length : products.length;
  const title = subcategory ? subcategory.name : category.name;

  const crumbs = [
    { label: "Home", href: "/" },
    { label: category.name, href: categoryHref(category.slug) },
    ...(subcategory ? [{ label: subcategory.name }] : []),
  ];

  return (
    <Container className="py-10 md:py-16">
      <Breadcrumb items={crumbs} />
      <header className="mt-8 md:mt-12">
        <p className="label text-stone">
          <span className="text-gold">{category.number} — </span>
          {subcategory ? category.name : "Collection"}
        </p>
        <h1 className="mt-3 font-display text-[44px] font-medium leading-none md:text-[72px]">{title}</h1>
        <p className="mt-4 max-w-xl text-[15px] text-stone">
          {category.blurb} <span className="tnum">{count}</span> {count === 1 ? "piece" : "pieces"}.
        </p>
      </header>

      <nav aria-label={`${category.name} sections`} className="no-scrollbar mt-8 overflow-x-auto border-b border-thread">
        <ul className="flex w-max gap-6">
          {[{ slug: "", name: "All" }, ...category.sub].map((s) => {
            const active = (s.slug || undefined) === sub;
            return (
              <li key={s.slug || "all"}>
                <Link
                  href={categoryHref(category.slug, s.slug || undefined)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "label -mb-px block border-b py-3 transition-colors",
                    active ? "border-ink text-ink" : "border-transparent text-stone hover:text-ink",
                  )}
                >
                  {s.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {count === 0 ? (
        <EmptyState
          title="Nothing in this section yet"
          text="New pieces arrive every week. Have a look at the full collection in the meantime."
          action={<ButtonLink href={categoryHref(category.slug)}>View all {category.name.toLowerCase()}</ButtonLink>}
        />
      ) : equipment ? (
        <ul className="mt-10 border-t border-thread">
          {machines.map((e) => (
            <li key={e.id} className="grid grid-cols-[96px_1fr] gap-x-5 gap-y-2 border-b border-thread py-6 md:grid-cols-[160px_1fr_auto] md:items-center md:gap-x-8">
              <Img src={e.images[0].src} alt={e.images[0].alt} position={e.images[0].pos} source={e.images[0].source} box={4 / 3} ratio="aspect-[4/3]" sizes="160px" />
              <div>
                <p className="label text-stone">{e.brand}</p>
                <h2 className="mt-1 text-[17px] font-medium">{e.model}</h2>
                <p className="mt-1 text-sm text-stone">{e.keySpecs.join(" · ")}</p>
              </div>
              <p className="tnum col-start-2 text-[15px] font-medium md:col-start-auto">
                <span className="mr-2 text-xs font-normal text-stone">from</span>
                {taka(e.fromPrice)}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <Stagger className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
          {products.map((p, i) => (
            <StaggerItem key={p.id} index={i}>
              <ProductCard product={p} priority={i < 2} />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </Container>
  );
}
