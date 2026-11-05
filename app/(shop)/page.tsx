import type { Metadata } from "next";
import { EditorialCategories } from "@/components/home/editorial-categories";
import { EquipmentList } from "@/components/home/equipment-list";
import { HeroSlider } from "@/components/home/hero-slider";
import { Newsletter } from "@/components/home/newsletter";
import { Packaging } from "@/components/home/packaging";
import { ProductRow } from "@/components/home/product-row";
import { PromiseStrip } from "@/components/home/promise-strip";
import { StoryStrip } from "@/components/home/story-strip";
import { TrustRow } from "@/components/home/trust-row";
import { WholesaleBand } from "@/components/home/wholesale-band";
import { WinterEdit } from "@/components/home/winter-edit";
import { Container } from "@/components/ui/container";
import { HERO_SLIDES, newSeason } from "@/lib/dummy";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} | Clothing and textile equipment, ${SITE.city}` },
  description:
    "Panjabi, saree, winter wear and textile equipment from a family cloth house in Dhaka. Cash on delivery across Bangladesh, wholesale available.",
  openGraph: {
    title: SITE.name,
    description: "Clothing and textile equipment, delivered across Bangladesh.",
    type: "website",
    images: [{ url: HERO_SLIDES[0].image.src, width: 1600, alt: `${SITE.name} winter collection` }],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSlider slides={HERO_SLIDES} />
      <PromiseStrip />
      <EditorialCategories />

      <Container as="section" className="pb-20 md:pb-32">
        <ProductRow title="New season" label="Autumn · Winter" href="/category/new" products={newSeason(8)} />
      </Container>

      <WinterEdit />
      <StoryStrip />
      <WholesaleBand />
      <EquipmentList />
      <Packaging />
      <TrustRow />
      <Newsletter />
    </>
  );
}
