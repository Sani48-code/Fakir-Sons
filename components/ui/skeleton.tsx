import { cn } from "@/lib/format";

/** Quiet loading block: cotton-coloured, slow opacity pulse. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("bg-thread/60", className)}
      style={{ animation: "skeleton 1.6s ease-in-out infinite" }}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div role="status" aria-label="Loading product">
      <Skeleton className="aspect-[3/4] w-full" />
      <Skeleton className="mt-3 h-4 w-3/4" />
      <Skeleton className="mt-2 h-3 w-1/2" />
      <Skeleton className="mt-2 h-4 w-1/3" />
    </div>
  );
}
