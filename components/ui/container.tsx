import { cn } from "@/lib/format";

/** Site container: max 1600px, 40px gutters (20px on mobile). Editorial images go full-bleed outside it. */
export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "main" | "header" | "footer" | "nav";
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1600px] px-5 md:px-10", className)}>{children}</Tag>
  );
}
