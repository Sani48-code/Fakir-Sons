import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { WishlistView } from "./wishlist-view";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Pieces you saved at Fakir & Son's.",
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return (
    <Container className="py-10 md:py-16">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />
      <h1 className="mt-8 font-display text-[44px] font-medium leading-none md:text-[64px]">Wishlist</h1>
      <WishlistView />
    </Container>
  );
}
