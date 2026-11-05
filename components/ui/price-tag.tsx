import { cn, taka } from "@/lib/format";

export function PriceTag({
  price,
  salePrice,
  size = "md",
  className,
}: {
  price: number;
  salePrice?: number;
  size?: "md" | "lg";
  className?: string;
}) {
  const onSale = salePrice !== undefined && salePrice < price;
  const main = size === "lg" ? "text-xl" : "text-[15px]";
  return (
    <p className={cn("tnum flex flex-wrap items-baseline gap-x-2 font-medium", className)}>
      {onSale ? (
        <>
          <span className={cn(main, "text-madder")}>{taka(salePrice)}</span>
          <s className="text-sm font-normal text-stone">
            <span className="sr-only">Original price </span>
            {taka(price)}
          </s>
          <span className="label !text-[11px] text-madder">Sale</span>
        </>
      ) : (
        <span className={main}>{taka(price)}</span>
      )}
    </p>
  );
}
