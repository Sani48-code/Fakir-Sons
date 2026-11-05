import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { ArrowRightIcon } from "@/components/shop/icons";
import { Container } from "@/components/ui/container";
import { Img } from "@/components/ui/img";
import { SectionHeader } from "@/components/ui/section-header";
import { getCategory } from "@/lib/dummy";

function Tile({
  slug,
  n,
  className,
  sizes,
}: {
  slug: string;
  n: string;
  className?: string;
  sizes: string;
}) {
  const c = getCategory(slug);
  if (!c) return null;
  return (
    <Link href={`/category/${c.slug}`} className={`group relative block overflow-hidden ${className ?? ""}`}>
      <RevealImage className="absolute inset-0">
        <Img
          src={c.image.src}
          alt={c.image.alt}
          sizes={sizes}
          ratio=""
          position={c.image.pos}
          className="absolute inset-0 h-full w-full"
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </RevealImage>
      {/* Readable label: paper tag, large Cormorant name */}
      <span className="absolute bottom-0 left-0 flex items-end gap-5 bg-paper px-5 py-4 text-ink md:px-8 md:py-6">
        <span>
          <span className="label block text-gold">{n}</span>
          <span className="mt-1 block font-display text-[30px] font-medium leading-none md:text-[40px]">{c.name}</span>
        </span>
        <ArrowRightIcon className="mb-1 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

/** Full-bleed bento: Winter (the lead season) tall on the left, others around it. */
export function EditorialCategories() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <Reveal>
          <SectionHeader number="01" label="Departments" title="Shop by department" />
        </Reveal>
      </Container>

      <div className="mt-10 grid gap-1 md:mt-16 md:grid-cols-2">
        <Tile
          slug="winter"
          n="01"
          sizes="(min-width: 768px) 50vw, 100vw"
          className="aspect-[3/4] md:row-span-2 md:aspect-auto"
        />
        <Tile slug="men" n="02" sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3]" />
        <Tile slug="women" n="03" sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3]" />
        <Tile slug="kids" n="04" sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3]" />
        <Tile
          slug="textile-equipment"
          n="05"
          sizes="(min-width: 768px) 50vw, 100vw"
          className="aspect-[4/3]"
        />
      </div>
    </section>
  );
}
