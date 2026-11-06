import { AnnouncementBar } from "@/components/shop/announcement-bar";
import { Footer } from "@/components/shop/footer";
import { Header } from "@/components/shop/header";
import { WhatsAppButton } from "@/components/shop/whatsapp-button";
import { WishlistProvider } from "@/components/shop/wishlist";
import { ToastProvider } from "@/components/ui/toast";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <WishlistProvider>
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </WishlistProvider>
    </ToastProvider>
  );
}
