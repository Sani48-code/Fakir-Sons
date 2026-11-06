import Link from "next/link";
import { SITE, TOP_LINKS } from "@/lib/site";

export function AnnouncementBar() {
  return (
    <div className="bg-maroon text-cotton text-xs">
      <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between gap-4 px-5 md:px-12">
        <p className="truncate">
          <a href={`tel:${SITE.tel}`} className="font-medium">
            Hotline: {SITE.phone}
          </a>
          <span className="mx-2 hidden sm:inline">|</span>
          <span className="hidden sm:inline">{SITE.announcement}</span>
        </p>
        <nav aria-label="Top links" className="hidden shrink-0 items-center gap-5 md:flex">
          {TOP_LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="hover:underline">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
