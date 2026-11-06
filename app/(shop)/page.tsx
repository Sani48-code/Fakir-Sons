import type { Metadata } from "next";
import { CollectionTiles } from "@/components/home/collection-tiles";
import { EquipmentList } from "@/components/home/equipment-list";
import { FeatureBanner } from "@/components/home/feature-banner";
import { HeroSlider } from "@/components/home/hero-slider";
import { Newsletter } from "@/components/home/newsletter";
import { ProductRow } from "@/components/home/product-row";
import { PromiseStrip } from "@/components/home/promise-strip";
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

/** Fewer, larger sections. Section spacing: 48px above + below = 96px desktop (64px mobile). */
export default function HomePage() {
  return (
    <>
      <HeroSlider slides={HERO_SLIDES} />
      <PromiseStrip />
      <div className="pt-8 md:pt-12">
        <CollectionTiles />
      </div>

      <Container as="section" className="py-8 md:py-12">
        <ProductRow number="02" label="Autumn · Winter" title="New season" href={categoryHref("winter")} products={HOME.newSeason} />
      </Container>

      <FeatureBanner
        image={HOME.sareeFeature}
        label="Saree collection"
        title="Woven for the occasion"
        text="Banarasi silk with gold zari, and soft silks light enough for every day."
        href={categoryHref("women", "sarees")}
        linkLabel="Explore sarees"
      />
      <FeatureBanner
        mirrored
        image={HOME.panjabiFeature}
        label="Panjabi collection"
        title="Embroidered by hand"
        text="Cotton silk and fine cotton, cut for weddings, Eid and every evening in between."
        href={categoryHref("men", "panjabi")}
        linkLabel="Explore panjabi"
      />

      <WholesaleBand />
      <EquipmentList />
      <TrustRow />
      <Newsletter />
    </>
  );
}
