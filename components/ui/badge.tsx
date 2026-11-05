import { cn } from "@/lib/format";

type Tone = "neutral" | "sale" | "new" | "gold" | "maroon";

const TONES: Record<Tone, string> = {
  neutral: "border border-thread bg-paper text-ink",
  new: "bg-paper text-ink",
  sale: "bg-madder text-cotton",
  gold: "bg-gold/15 text-ink",
  maroon: "bg-maroon text-cotton",
};

export function Badge({
  tone = "neutral",
  children,
  className,
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "label inline-block rounded-[2px] px-2 py-1 !text-[11px] leading-none",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
