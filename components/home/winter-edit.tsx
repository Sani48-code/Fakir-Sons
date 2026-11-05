import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ProductCard } from "@/components/shop/product-card";
import { Container } from "@/components/ui/container";
import { Img } from "@/components/ui/img";
import { WINTER_FEATURE, winterEdit } from "@/lib/dummy";

/** Lead campaign: one large split. Big image on one half, a 2x2 of winter pieces on the other. */
export function WinterEdit() {
  const products = winterEdit(4);
  const f = WINTER_FEATURE;

  return (
    <section className="grid md:grid-cols-2">
      <div className="group relative min-h-[560px] overflow-hidden md:min-h-[820px]">
        <RevealImage className="absolute inset-0">
          <Img
            src={f.image.src}
            alt={f.image.alt}
            sizes="(min-width: 768px) 50vw, 100vw"
            ratio=""
            position={f.image.pos}
            className="absolute inset-0 h-full w-full"
          />
        </RevealImage>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 pb-10 text-cotton md:p-10 md:pb-14">
          <p className="label text-gold-soft">Winter 2026</p>
          <h2 className="mt-3 font-display text-[44px] font-medium leading-[0.98] md:text-[64px]">
            The winter edit
          </h2>
          <p className="mt-3 max-w-sm text-[15px] text-cotton/85">
            শীতের উষ্ণতা: coats, knits and wraps in camel, cream and cocoa.
          </p>
          <Link href="/category/winter" className="link-grow mt-5 inline-block text-sm font-medium">
            Shop winter →
          </Link>
        </div>
      </div>

      <div className="bg-paper px-5 py-14 md:px-10 md:py-20 lg:px-14">
        <Reveal>
          <p className="label text-stone">Four pieces to begin</p>
        </Reveal>
        <Stagger className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
          {products.map((p, i) => (
            <StaggerItem key={p.id} index={i}>
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </Stagger>
        <Container className="mt-12 px-0 md:px-0">
          <Link href="/category/winter" className="link-grow label">
            View all winter →
          </Link>
        </Container>
      </div>
    </section>
  );
}
