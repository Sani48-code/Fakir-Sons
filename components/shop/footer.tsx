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
    <footer className="bg-footer text-white/80">
      <div className="mx-auto max-w-[1440px] px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.3fr]">
          {/* Brand + socials */}
          <div>
            <p className="font-display text-2xl font-semibold tracking-[0.12em] text-white">
              {SITE.name}
            </p>
            <p className="mt-3 max-w-xs text-sm text-white/60">
              Quality clothing and textile equipment, delivered across Bangladesh.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon width={18} height={18} />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-sm font-medium uppercase tracking-widest text-white">
                {col.title}
              </h3>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="transition-colors hover:text-accent">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact + newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-widest text-white">
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={`tel:${SITE.hotline.replace(/[^+\d]/g, "")}`} className="hover:text-accent">
                  {SITE.hotline}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-accent">
                  {SITE.email}
                </a>
              </li>
              <li className="text-white/60">{SITE.address}</li>
            </ul>

            {/* Placeholder: not wired up yet */}
            <form className="mt-6" aria-label="Newsletter">
              <label htmlFor="newsletter-email" className="mb-2 block text-xs uppercase tracking-widest text-white/60">
                Newsletter
              </label>
              <div className="flex">
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Your email"
                  className="min-w-0 flex-1 border border-white/25 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-accent focus:outline-none"
                />
                <button
                  type="button"
                  aria-label="Subscribe"
                  className="flex w-11 items-center justify-center bg-accent text-ink transition-opacity hover:opacity-90"
                >
                  <ArrowRightIcon width={18} height={18} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Payment methods strip (text pills until real logos are added) */}
        <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-white/10 pt-8">
          <span className="mr-2 text-xs uppercase tracking-widest text-white/50">
            We accept
          </span>
          {PAYMENT_METHODS.map((m) => (
            <span
              key={m}
              className="rounded-sm border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white"
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-[1440px] px-4 py-4 text-xs text-white/50 lg:px-8">
          © {SITE.copyrightYear} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
