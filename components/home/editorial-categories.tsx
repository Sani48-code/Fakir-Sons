import Link from "next/link";
import { RevealImage } from "@/components/motion/reveal-image";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Img } from "@/components/ui/img";
import { SectionHeader } from "@/components/ui/section-header";
import { getCategory } from "@/lib/dummy";
import { ArrowRightIcon } from "@/components/shop/icons";

function Tag({ n, name }: { n: string; name: string }) {
  return (
    <span className="label absolute bottom-0 left-0 flex items-center gap-2 bg-paper px-4 py-3 text-ink">
      <span className="text-gold">{n} —</span> {name}
      <ArrowRightIcon width={14} height={14} />
    </span>
  );
}

function Tile({
  slug,
  n,
  className,
  imgClassName,
  sizes,
  priority,
  children,
}: {
  slug: string;
  n: string;
  className?: string;
  imgClassName?: string;
  sizes: string;
  priority?: boolean;
  children?: React.ReactNode;
}) {
  const c = getCategory(slug);
  if (!c) return null;
  return (
    <Link href={`/category/${c.slug}`} className={`group relative block overflow-hidden ${className ?? ""}`}>
      <RevealImage className="h-full w-full">
        <Img
          src={c.image.src}
          alt={c.image.alt}
          sizes={sizes}
          ratio=""
          priority={priority}
          className="absolute inset-0 h-full w-full"
          imgClassName={`transition-transform duration-700 ease-out ${imgClassName ?? "group-hover:scale-[1.03]"}`}
        />
      </RevealImage>
      {children}
      <Tag n={n} name={c.name} />
    </Link>
  );
}

/** One tall image (Winter, the lead season) beside two stacked, a wide one below. */
export function EditorialCategories() {
  return (
    <Container as="section" className="py-16 md:py-28">
      <Reveal>
        <SectionHeader number="01" label="Departments" title="Shop by department" />
      </Reveal>

      <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-6">
        {/* Tall: Winter */}
        <Tile
          slug="winter"
          n="01"
          sizes="(min-width: 768px) 50vw, 100vw"
          className="aspect-[3/4] md:row-span-2 md:aspect-auto md:min-h-[640px]"
        />
        {/* Two stacked */}
        <Tile slug="men" n="02" sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3]" />
        <Tile slug="women" n="03" sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3]" />
        {/* Wide with text overlay, left */}
        <Tile
          slug="kids"
          n="04"
          sizes="100vw"
          imgClassName="[scale:-1_1] group-hover:[scale:-1.03_1.03]"
          className="aspect-[4/3] md:col-span-2 md:aspect-[21/9]"
        >
          <div className="pointer-events-none absolute left-0 top-0 hidden max-w-sm bg-ink/45 p-8 text-cotton md:block">
            <p className="label text-gold-soft">Kids</p>
            <p className="mt-2 font-display text-[40px] font-medium leading-none">Small sizes, honest cloth</p>
          </div>
        </Tile>
      </div>
    </Container>
  );
}
