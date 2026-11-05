import Image from "next/image";
import Link from "next/link";
import { FOOTER_COLUMNS, PAYMENT_METHODS, SITE } from "@/lib/site";
import {
  ArrowRightIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "./icons";

const SOCIALS = [
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "YouTube", href: "#", Icon: YoutubeIcon },
];

export function Footer() {
  return (
    <footer className="bg-wine text-cotton/80">
      <div className="mx-auto max-w-[1440px] px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.3fr]">
          {/* Brand + socials */}
          <div>
            <Image
              src="/brand/logo-light.png"
              alt={SITE.name}
              width={216}
              height={112}
              className="h-auto w-[216px]"
            />
            <p className="label mt-4 text-gold">Est. 19XX · Dhaka</p>
            <p className="mt-3 max-w-xs text-sm text-cotton/60">
              Quality clothing and textile equipment, delivered across Bangladesh.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center border border-cotton/25 text-cotton transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon width={18} height={18} />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="label mb-4 text-cotton">
                {col.title}
              </h3>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="transition-colors hover:text-gold">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact + newsletter */}
          <div>
            <h3 className="label mb-4 text-cotton">
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={`tel:${SITE.hotline.replace(/[^+\d]/g, "")}`} className="hover:text-gold">
                  {SITE.hotline}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-gold">
                  {SITE.email}
                </a>
              </li>
              <li className="text-cotton/60">{SITE.address}</li>
            </ul>

            {/* Placeholder: not wired up yet */}
            <form className="mt-6" aria-label="Newsletter">
              <label htmlFor="newsletter-email" className="mb-2 block label text-cotton/60">
                Newsletter
              </label>
              <div className="flex">
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Your email"
                  className="min-w-0 flex-1 border border-cotton/25 bg-transparent px-3 py-2.5 text-sm text-cotton placeholder:text-cotton/40 focus:border-gold focus:outline-none"
                />
                <button
                  type="button"
                  aria-label="Subscribe"
                  className="flex w-11 items-center justify-center bg-gold text-ink transition-opacity hover:opacity-90"
                >
                  <ArrowRightIcon width={18} height={18} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Payment methods strip (text pills until real logos are added) */}
        <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-cotton/10 pt-8">
          <span className="mr-2 label text-cotton/50">
            We accept
          </span>
          {PAYMENT_METHODS.map((m) => (
            <span
              key={m}
              className="border border-cotton/20 px-3 py-1.5 text-xs font-medium text-cotton"
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-cotton/10">
        <p className="mx-auto max-w-[1440px] px-4 py-4 text-xs text-cotton/50 lg:px-8">
          © {SITE.copyrightYear} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
