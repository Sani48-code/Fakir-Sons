import type { Metadata } from "next";
import { BestSellers } from "@/components/home/best-sellers";
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
import { HERO_SLIDES, PRODUCTS, newArrivals } from "@/lib/dummy";
import { img } from "@/lib/images";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} | Clothing and textile equipment, ${SITE.city}` },
  description:
    "Panjabi, saree, winter wear and textile equipment from a family cloth house in Dhaka. Cash on delivery across Bangladesh, wholesale available.",
  openGraph: {
    title: SITE.name,
    description: "Clothing and textile equipment, delivered across Bangladesh.",
    type: "website",
    images: [{ url: img("hero-04-winter-shawl", 1200), width: 1200, alt: `${SITE.name} winter collection` }],
  },
};

export default function HomePage() {
  const arrivals = newArrivals(8);
  return (
    <>
      <HeroSlider slides={HERO_SLIDES} />
      <PromiseStrip />
      <EditorialCategories />

      <Container as="section" className="pb-16 md:pb-28">
        <ProductRow title="New arrivals" label="This season" href="/category/new" products={arrivals} />
      </Container>

      <WinterEdit />

      <hr className="mx-auto max-w-[1376px] border-thread" />
      <StoryStrip />

      <Container as="section" className="pb-16 md:pb-28">
        <BestSellers products={PRODUCTS} />
      </Container>

      <WholesaleBand />
      <EquipmentList />
      <Packaging />
      <TrustRow />
      <Newsletter />
    </>
  );
}
