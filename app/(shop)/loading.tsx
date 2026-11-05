import { Container } from "@/components/ui/container";
import { ProductCardSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div role="status" aria-label="Loading">
      <Skeleton className="aspect-[4/5] w-full md:aspect-[16/9] md:max-h-[86vh]" />
      <Container className="py-16">
        <Skeleton className="h-10 w-64" />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </Container>
    </div>
  );
}
