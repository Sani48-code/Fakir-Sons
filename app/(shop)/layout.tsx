import { AnnouncementBar } from "@/components/shop/announcement-bar";
import { Footer } from "@/components/shop/footer";
import { Header } from "@/components/shop/header";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
