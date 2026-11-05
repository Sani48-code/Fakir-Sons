import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ProductCard } from "@/components/shop/product-card";
import { Container } from "@/components/ui/container";
import { Img } from "@/components/ui/img";
import { getCategory, winterEdit } from "@/lib/dummy";

/** Lead campaign: wide banner with title, then four winter products. */
export function WinterEdit() {
  const winter = getCategory("winter");
  if (!winter) return null;
  const products = winterEdit(4);

  return (
    <Container as="section" className="pb-16 md:pb-28">
      <div className="relative aspect-[16/9] overflow-hidden md:aspect-[4/1]">
        <RevealImage className="absolute inset-0">
          <Img
            src={winter.banner.src}
            alt={winter.banner.alt}
            sizes="(min-width: 1440px) 1376px, 100vw"
            ratio=""
            className="absolute inset-0 h-full w-full"
            imgClassName="object-center"
          />
        </RevealImage>
        <div className="absolute inset-y-0 left-0 flex items-center">
          <div className="m-4 max-w-md bg-ink/45 p-5 text-cotton md:m-8 md:p-8">
            <p className="label text-gold-soft">Winter 2026</p>
            <h2 className="mt-2 font-display text-[28px] font-medium leading-[1.02] md:text-[40px]">
              The winter edit
            </h2>
            <Link href="/category/winter" className="link-grow mt-4 inline-block text-sm font-medium">
              Shop winter →
            </Link>
          </div>
        </div>
      </div>

      <Reveal className="mt-6 max-w-lg text-[15px] text-stone">
        শীতের উষ্ণতা: shawls, sweaters and light jackets, chosen for the cool months.
      </Reveal>

      <Stagger className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
        {products.map((p, i) => (
          <StaggerItem key={p.id} index={i}>
            <ProductCard product={p} />
          </StaggerItem>
        ))}
      </Stagger>
    </Container>
  );
}
