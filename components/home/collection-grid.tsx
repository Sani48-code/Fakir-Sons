import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { ArrowRightIcon } from "@/components/shop/icons";
import { Container } from "@/components/ui/container";
import { Img } from "@/components/ui/img";
import { SectionHeader } from "@/components/ui/section-header";
import { HOME } from "@/lib/dummy";
import { cn } from "@/lib/format";

type Tile = (typeof HOME.collections)[number];

/** Grid placement per tile, in HOME.collections order. Winter is the large lead tile. */
const LAYOUT = [
  "col-span-2 aspect-[4/5] md:row-span-2 md:aspect-auto",
  "aspect-[3/4]",
  "aspect-[3/4]",
  "aspect-[3/4]",
  "aspect-[3/4]",
  "aspect-[3/4] md:col-span-2 md:aspect-[16/9]",
  "aspect-[3/4] md:col-span-2 md:aspect-[16/9]",
];
const SIZES = [
  "(min-width: 768px) 50vw, 100vw",
  "(min-width: 768px) 25vw, 50vw",
  "(min-width: 768px) 25vw, 50vw",
  "(min-width: 768px) 25vw, 50vw",
  "(min-width: 768px) 25vw, 50vw",
  "(min-width: 768px) 50vw, 50vw",
  "(min-width: 768px) 50vw, 50vw",
];

function CollectionTile({ t, i }: { t: Tile; i: number }) {
  const lead = i === 0;
  return (
    <Link href={t.href} className={cn("group relative block overflow-hidden", LAYOUT[i])}>
      <RevealImage className="absolute inset-0">
        <Img
          src={t.image.src}
          alt={t.image.alt}
          sizes={SIZES[i]}
          ratio=""
          position={t.image.pos}
          className="absolute inset-0 h-full w-full"
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </RevealImage>
      {/* Paper tag keeps the name readable on any photo */}
      <span className="absolute bottom-0 left-0 flex max-w-[calc(100%-12px)] items-end gap-3 bg-paper px-3.5 py-3 text-ink md:gap-5 md:px-6 md:py-5">
        <span className="min-w-0">
          <span className="label block text-gold">{t.number}</span>
          <span
            className={cn(
              "mt-1 block font-display font-medium leading-none",
              lead ? "text-[32px] md:text-[52px]" : "text-[22px] md:text-[34px]",
            )}
          >
            {t.name}
          </span>
        </span>
        <ArrowRightIcon className="mb-0.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

/** "Shop by collection": one strong photo per collection, Winter large. Full bleed. */
export function CollectionGrid() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <Reveal>
          <SectionHeader number="01" label="Collections" title="Shop by collection" />
        </Reveal>
      </Container>
      <div className="mt-10 grid grid-cols-2 gap-1 md:mt-16 md:grid-cols-4">
        {HOME.collections.map((t, i) => (
          <CollectionTile key={t.href} t={t} i={i} />
        ))}
      </div>
    </section>
  );
}
