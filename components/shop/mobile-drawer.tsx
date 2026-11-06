"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MEGA } from "@/lib/dummy";
import { NAV, SITE, TOP_LINKS } from "@/lib/site";
import { ChevronDownIcon, CloseIcon } from "./icons";

export function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[60] lg:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`absolute left-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-paper transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-thread px-4">
          <Image
            src="/brand/logo.png"
            alt={SITE.name}
            width={1449}
            height={843}
            className="h-[52px] w-auto"
          />
          <button onClick={onClose} aria-label="Close menu" className="p-2">
            <CloseIcon />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-2" aria-label="Mobile">
          <ul>
            {NAV.map((item) => (
              <li key={item.label} className="border-b border-thread">
                {item.children ? (
                  <>
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex-1 py-3.5 text-base"
                      >
                        {item.label}
                      </Link>
                      <button
                        aria-label={`Toggle ${item.label} submenu`}
                        aria-expanded={expanded === item.label}
                        onClick={() =>
                          setExpanded(expanded === item.label ? null : item.label)
                        }
                        className="p-3"
                      >
                        <ChevronDownIcon
                          className={`transition-transform ${
                            expanded === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                    {expanded === item.label && (
                      <div className="space-y-4 pb-4 pl-3">
                        {(MEGA[item.href]?.groups ?? [{ title: item.label, links: item.children }]).map((g) => (
                          <div key={g.title}>
                            <p className="label text-[11px] text-stone">{g.title}</p>
                            <ul className="mt-1">
                              {g.links.map((c) => (
                                <li key={c.label}>
                                  <Link href={c.href} onClick={onClose} className="block py-2 text-[15px]">
                                    {c.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`block py-3.5 text-base ${
                      item.sale ? "text-madder" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <ul className="mt-5 space-y-3 text-sm text-stone">
            {TOP_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href} onClick={onClose}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="bg-maroon px-4 py-3 text-sm text-cotton">
          Hotline: {SITE.phone}
        </div>
      </aside>
    </div>
  );
}
