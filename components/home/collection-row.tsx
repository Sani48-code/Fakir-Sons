import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ProductCard } from "@/components/shop/product-card";
import { Container } from "@/components/ui/container";
import { Img } from "@/components/ui/img";
import { SectionHeader } from "@/components/ui/section-header";
import type { Product } from "@/lib/dummy";

type Image = { src: string; alt: string; pos: string };

/**
 * A collection row on a 4-column grid. With an image, the photo takes two
 * columns (3:2, same height as the cards' photos) beside two products.
 */
export function CollectionRow({
  number,
  label,
  title,
  href,
  products,
  image,
  caption,
}: {
  number: string;
  label: string;
  title: string;
  href: string;
  products: Product[];
  image?: Image;
  caption?: string;
}) {
  return (
    <Container as="section" className="py-20 md:py-32">
      <Reveal>
        <SectionHeader number={number} label={label} title={title} href={href} />
      </Reveal>
      <Stagger className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-12 md:grid-cols-4 md:gap-x-6">
        {image && (
          <StaggerItem className="col-span-2">
            <Link href={href} className="group block">
              <RevealImage>
                <Img
                  src={image.src}
                  alt={image.alt}
                  ratio="aspect-[4/3] md:aspect-[3/2]"
                  position={image.pos}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </RevealImage>
              {caption && <p className="mt-3 text-sm text-stone">{caption}</p>}
            </Link>
          </StaggerItem>
        )}
        {products.map((p, i) => (
          <StaggerItem key={p.id} index={i + (image ? 1 : 0)}>
            <ProductCard product={p} />
          </StaggerItem>
        ))}
      </Stagger>
    </Container>
  );
}
