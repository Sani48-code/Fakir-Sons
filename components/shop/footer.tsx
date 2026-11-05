import Image from "next/image";
import Link from "next/link";
import { EST_LINE, FOOTER_COLUMNS, PAYMENT_METHODS, SITE } from "@/lib/site";
import { ArrowRightIcon, FacebookIcon, WhatsAppIcon } from "./icons";

const SOCIALS = [
  { label: "Facebook", href: SITE.facebook, Icon: FacebookIcon },
  { label: "WhatsApp", href: SITE.whatsapp, Icon: WhatsAppIcon },
];

export function Footer() {
  return (
    <footer>
      {/* Brand area on cotton */}
      <div className="border-t border-thread bg-cotton text-ink">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start gap-8 px-5 py-14 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
            <Image
              src="/brand/logo.png"
              alt={SITE.name}
              width={1449}
              height={843}
              className="h-[120px] w-auto"
            />
            <div>
              <p className="label text-gold">{EST_LINE}</p>
              <p className="mt-3 max-w-xs text-sm text-stone">
                Quality clothing and textile equipment, delivered across Bangladesh.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center border border-ink/25 text-ink transition-colors hover:border-maroon hover:text-maroon"
              >
                <Icon width={18} height={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Links + legal on wine */}
      <div className="bg-wine text-cotton/80">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.4fr]">
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
                <a href={`tel:${SITE.tel}`} className="hover:text-gold">
                  {SITE.phone}
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
        <p className="mx-auto max-w-[1600px] px-5 py-4 text-xs text-cotton/50 md:px-10">
          © {SITE.copyrightYear} {SITE.name}. All rights reserved.
        </p>
      </div>
      </div>
    </footer>
  );
}
