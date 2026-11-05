"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`absolute left-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-black/10 px-4">
          <span className="font-display text-xl font-semibold tracking-wide">
            {SITE.name}
          </span>
          <button onClick={onClose} aria-label="Close menu" className="p-2">
            <CloseIcon />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-2" aria-label="Mobile">
          <ul>
            {NAV.map((item) => (
              <li key={item.label} className="border-b border-black/5">
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
                      <ul className="pb-3 pl-3">
                        {item.children.map((c) => (
                          <li key={c.label}>
                            <Link
                              href={c.href}
                              onClick={onClose}
                              className="block py-2 text-sm text-black/70"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`block py-3.5 text-base ${
                      item.sale ? "font-medium text-sale" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <ul className="mt-5 space-y-3 text-sm text-black/70">
            {TOP_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href} onClick={onClose}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-black/10 bg-accent px-4 py-3 text-sm text-ink">
          Hotline: {SITE.hotline}
        </div>
      </aside>
    </div>
  );
}
