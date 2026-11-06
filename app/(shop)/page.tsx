import type { Metadata } from "next";
import { CollectionGrid } from "@/components/home/collection-grid";
import { CollectionRow } from "@/components/home/collection-row";
import { EquipmentList } from "@/components/home/equipment-list";
import { HeroSlider } from "@/components/home/hero-slider";
import { Newsletter } from "@/components/home/newsletter";
import { Packaging } from "@/components/home/packaging";
import { ProductRow } from "@/components/home/product-row";
import { PromiseStrip } from "@/components/home/promise-strip";
import { SplitFeature } from "@/components/home/split-feature";
import { StoryStrip } from "@/components/home/story-strip";
import { TrustRow } from "@/components/home/trust-row";
import { WholesaleBand } from "@/components/home/wholesale-band";
import { Container } from "@/components/ui/container";
import { HERO_SLIDES, HOME, categoryHref } from "@/lib/dummy";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} | Clothing and textile equipment, ${SITE.city}` },
  description:
    "Panjabi, suits, sarees, winter wear and textile equipment from a family cloth house in Dhaka. Cash on delivery across Bangladesh, wholesale available.",
  openGraph: {
    title: SITE.name,
    description: "Clothing and textile equipment, delivered across Bangladesh.",
    type: "website",
    images: [{ url: HERO_SLIDES[0].image.src, width: HERO_SLIDES[0].image.width, alt: HERO_SLIDES[0].image.alt }],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSlider slides={HERO_SLIDES} />
      <PromiseStrip />
      <CollectionGrid />

      <Container as="section" className="pb-20 md:pb-32">
        <ProductRow
          number="02"
          title="New season"
          label="Autumn · Winter"
          href={categoryHref("winter")}
          products={HOME.newSeason}
        />
      </Container>

      <SplitFeature
        image={HOME.winterEdit.image}
        label="Winter 2026"
        title="The winter edit"
        text="Coats, puffers and knits in camel, cream and black, for men, women and boys."
        href={categoryHref("winter")}
        linkLabel="Shop winter"
        panelLabel="Four pieces to begin"
        products={HOME.winterEdit.products}
      />

      <CollectionRow
        number="03"
        label="Panjabi"
        title="Panjabi collection"
        href={categoryHref("men", "panjabi")}
        image={HOME.panjabi.image}
        caption="Embroidered by hand, cut for weddings, Eid and every evening in between."
        products={HOME.panjabi.products}
      />

      <SplitFeature
        wide
        image={{ src: HOME.sarees.image.src, alt: HOME.sarees.image.alt, pos: "58% 35%" }}
        label="Saree collection"
        title="Woven for the occasion"
        text="Banarasi silk with gold zari, and soft silks light enough for every day."
        href={categoryHref("women", "sarees")}
        linkLabel="Explore sarees"
        panelLabel="Two sarees to begin"
        products={HOME.sarees.products}
      />

      <CollectionRow
        number="04"
        label="Suits"
        title="Suits & tailoring"
        href={categoryHref("men", "suits")}
        products={HOME.suits}
      />

      <StoryStrip />
      <WholesaleBand />
      <EquipmentList />
      <Packaging />
      <TrustRow />
      <Newsletter />
    </>
  );
}
