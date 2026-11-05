import Link from "next/link";
import { cn } from "@/lib/format";

export function SectionHeader({
  number,
  label,
  title,
  href,
  hrefLabel = "View all",
  className,
  as: Tag = "h2",
  children,
}: {
  number?: string; // "01"
  label?: string; // small caps text next to the number
  title: string;
  href?: string;
  hrefLabel?: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  children?: React.ReactNode; // right-side extras (e.g. scroll buttons)
}) {
  return (
    <div className={cn("flex items-end justify-between gap-6", className)}>
      <div>
        {(number || label) && (
          <p className="label mb-3 text-stone">
            {number && <span className="text-gold">{number} — </span>}
            {label}
          </p>
        )}
        <Tag className="font-display text-[28px] font-medium leading-[1.05] sm:text-[40px]">
          {title}
        </Tag>
      </div>
      <div className="flex shrink-0 items-center gap-5">
        {children}
        {href && (
          <Link href={href} className="link-grow label">
            {hrefLabel} →
          </Link>
        )}
      </div>
    </div>
  );
}
