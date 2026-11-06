import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Account",
  description: `Your ${SITE.name} account.`,
  robots: { index: false, follow: true },
};

// Sign-in, orders and addresses arrive with Supabase auth (PROMPTS.md Pages 7 and 8).
const CARDS = [
  { title: "Wishlist", text: "Pieces you saved on this device.", href: "/wishlist", cta: "Open wishlist" },
  { title: "Track an order", text: "Send us your order number on WhatsApp and we will reply with its status.", href: SITE.whatsapp, cta: "Message us", external: true },
  { title: "Call the shop", text: `Talk to us about sizes, fabric or bulk orders. ${SITE.phone}.`, href: `tel:${SITE.tel}`, cta: "Call now", external: true },
];

export default function AccountPage() {
  return (
    <Container className="py-10 md:py-16">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Account" }]} />
      <h1 className="mt-8 font-display text-[44px] font-medium leading-none md:text-[64px]">Your account</h1>
      <p className="mt-4 max-w-xl text-[15px] text-stone">
        Sign-in, order history and saved addresses are coming soon. Until then, you can shop as a guest and pay cash on
        delivery.
      </p>
      <ul className="mt-10 grid border-t border-thread md:grid-cols-3 md:border-l">
        {CARDS.map((c) => (
          <li key={c.title} className="border-b border-thread py-8 md:border-r md:px-8">
            <h2 className="text-[17px] font-medium">{c.title}</h2>
            <p className="mt-2 max-w-xs text-sm text-stone">{c.text}</p>
            {c.external ? (
              <a href={c.href} className="link-grow mt-5 inline-block text-sm font-medium" target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                {c.cta} →
              </a>
            ) : (
              <Link href={c.href} className="link-grow mt-5 inline-block text-sm font-medium">
                {c.cta} →
              </Link>
            )}
          </li>
        ))}
      </ul>
    </Container>
  );
}
