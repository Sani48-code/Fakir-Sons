import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Img } from "@/components/ui/img";
import { SectionHeader } from "@/components/ui/section-header";
import { EQUIPMENT } from "@/lib/dummy";
import { taka } from "@/lib/format";

/** Catalogue-style list, not a fashion grid. */
export function EquipmentList() {
  const rows = EQUIPMENT.slice(0, 4);
  return (
    <Container as="section" className="py-20 md:py-32">
      <Reveal>
        <SectionHeader
          number="03"
          label="Equipment"
          title="Textile equipment"
          href="/textile-equipment"
          hrefLabel="View catalogue"
        />
      </Reveal>
      <ul className="mt-10 border-t border-thread">
        {rows.map((e) => (
          <li key={e.id} className="border-b border-thread">
            <Link
              href={`/textile-equipment/${e.slug}`}
              className="group flex flex-wrap items-center gap-x-6 gap-y-3 px-2 py-5 transition-colors duration-200 hover:bg-paper md:flex-nowrap md:px-4"
            >
              <Img
                src={e.images[0].src}
                alt={e.images[0].alt}
                ratio="aspect-square"
                sizes="96px"
                className="w-20 shrink-0 md:w-24"
                imgClassName="transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="min-w-0 flex-1 basis-48">
                <p className="label text-stone">{e.brand}</p>
                <h3 className="mt-1 text-[17px] font-medium leading-snug">{e.model}</h3>
              </div>
              <p className="order-last basis-full text-sm text-stone md:order-none md:basis-auto md:flex-1">
                {e.keySpecs.join(" · ")}
              </p>
              <p className="tnum text-[15px] font-medium">
                <span className="mr-2 text-xs font-normal text-stone">from</span>
                {taka(e.fromPrice)}
              </p>
              <span className="link-grow hidden text-sm font-medium md:inline">Details →</span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
