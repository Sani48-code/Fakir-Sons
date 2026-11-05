"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/format";

type Variant = "primary" | "outline" | "text" | "light" | "light-outline";

const BASE =
  "inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
  primary: "h-12 rounded-[2px] bg-ink px-6 text-cotton hover:bg-maroon",
  outline: "h-12 rounded-[2px] border border-ink px-6 text-ink hover:bg-ink hover:text-cotton",
  // For wine / dark sections
  light: "h-12 rounded-[2px] bg-cotton px-6 text-ink hover:bg-paper",
  "light-outline":
    "h-12 rounded-[2px] border border-cotton px-6 text-cotton hover:bg-cotton hover:text-ink",
  text: "link-grow h-auto",
};

function Spinner() {
  return (
    <span
      aria-hidden
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
  );
}

type Common = { variant?: Variant; className?: string; children: ReactNode; full?: boolean };

export function Button({
  variant = "primary",
  loading = false,
  full = false,
  className,
  children,
  disabled,
  type = "button",
  ...rest
}: Common & { loading?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(BASE, VARIANTS[variant], full && "w-full", className)}
      {...rest}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  full = false,
  className,
  children,
  external,
}: Common & { href: string; external?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(BASE, VARIANTS[variant], full && "w-full", className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}
