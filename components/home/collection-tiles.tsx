import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { ArrowRightIcon } from "@/components/shop/icons";
import { Container } from "@/components/ui/container";
import { Img } from "@/components/ui/img";
import { HOME } from "@/lib/dummy";

/**
 * "Shop by collection": 4 tiles cut from the hero banners (2:3, 483x724 source).
 * The banners are 724px tall, so a tile stays sharp on retina only up to ~240px
 * wide; the layout keeps them at that size (text column left, tiles right).
 */
export function CollectionTiles() {
  return (
    <Container as="section" className="py-8 md:py-12">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-6">
        <Reveal className="lg:col-span-3 lg:pr-4">
          <p className="label text-stone">
            <span className="text-gold">01 — </span>Collections
          </p>
          <h2 className="mt-3 font-display text-[36px] font-medium leading-[1.02] md:text-[52px]">Shop by collection</h2>
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-stone">
            Winter knits, panjabi, silk sarees and tailoring, cut and finished in Dhaka.
          </p>
        </Reveal>

        <div className="lg:col-span-9">
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {HOME.tiles.map((t) => (
              <li key={t.href}>
                <Link href={t.href} className="group relative block aspect-[2/3] overflow-hidden">
                  <Img
                    src={t.image.src}
                    alt={t.image.alt}
                    ratio=""
                    quality={90}
                    sizes="(min-width: 1440px) 240px, (min-width: 1024px) 17vw, (min-width: 768px) 22vw, 50vw"
                    className="absolute inset-0 h-full w-full"
                    imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/55 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 text-cotton md:p-4">
                    <span>
                      <span className="label block text-[10px] text-cotton/80">{t.number}</span>
                      <span className="mt-1 block font-display text-[22px] font-medium leading-none md:text-[26px]">{t.name}</span>
                    </span>
                    <ArrowRightIcon className="mb-0.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-thread pt-4 text-sm">
            <span className="label text-stone">Also in the shop</span>
            {HOME.moreLinks.map((l) => (
              <Link key={l.href} href={l.href} className="link-grow font-medium">
                {l.label}
              </Link>
            ))}
          </p>
        </div>
      </div>
    </Container>
  );
}
