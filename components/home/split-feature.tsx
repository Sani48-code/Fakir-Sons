import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ProductCard } from "@/components/shop/product-card";
import { Img } from "@/components/ui/img";
import type { Product } from "@/lib/dummy";
import { cn } from "@/lib/format";

type Image = { src: string; alt: string; pos: string };

/**
 * Full-bleed split: a large photo with text on it (soft bottom vignette) on one
 * side, a small set of products on a paper panel on the other.
 * Used for the Winter edit (2x2) and the Saree feature (2 side by side).
 */
export function SplitFeature({
  image,
  label,
  title,
  text,
  href,
  linkLabel,
  products,
  panelLabel,
  wide = false,
}: {
  image: Image;
  label: string;
  title: string;
  text: string;
  href: string;
  linkLabel: string;
  products: Product[];
  panelLabel: string;
  /** Image takes 7/12 instead of half (for landscape photos). */
  wide?: boolean;
}) {
  return (
    <section className={cn("grid", wide ? "md:grid-cols-12" : "md:grid-cols-2")}>
      <div
        className={cn(
          "group relative min-h-[520px] overflow-hidden",
          wide ? "md:col-span-7 md:min-h-[680px]" : "md:min-h-[820px]",
        )}
      >
        <RevealImage className="absolute inset-0">
          <Img
            src={image.src}
            alt={image.alt}
            sizes={wide ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
            ratio=""
            position={image.pos}
            className="absolute inset-0 h-full w-full"
          />
        </RevealImage>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-ink/75 via-ink/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 pb-10 text-cotton md:p-10 md:pb-14">
          <p className="label text-gold-soft">{label}</p>
          <h2 className="mt-3 font-display text-[40px] font-medium leading-[0.98] md:text-[64px]">{title}</h2>
          <p className="mt-3 max-w-sm text-[15px] text-cotton/90">{text}</p>
          <Link href={href} className="link-grow mt-5 inline-block text-sm font-medium">
            {linkLabel} →
          </Link>
        </div>
      </div>

      <div className={cn("flex flex-col bg-paper px-5 py-14 md:px-10 md:py-20 lg:px-14", wide && "md:col-span-5 md:justify-center")}>
        <Reveal>
          <p className="label text-stone">{panelLabel}</p>
        </Reveal>
        <Stagger className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
          {products.map((p, i) => (
            <StaggerItem key={p.id} index={i}>
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </Stagger>
        <Link href={href} className="link-grow label mt-12 self-start">
          {linkLabel} →
        </Link>
      </div>
    </section>
  );
}
