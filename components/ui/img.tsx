import Image from "next/image";
import { cn } from "@/lib/format";

/**
 * The only way images enter the UI. Wraps next/image with a cotton-coloured
 * placeholder, a required alt and a required `sizes`.
 */
export function Img({
  src,
  alt,
  sizes,
  ratio = "aspect-[3/4]",
  priority = false,
  position,
  className,
  imgClassName,
}: {
  src: string;
  alt: string; // use "" only for purely decorative images
  sizes: string;
  ratio?: string; // tailwind aspect class, e.g. "aspect-[3/4]"; "" to fill parent
  priority?: boolean;
  position?: string; // CSS object-position (focal point), e.g. "50% 20%"
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden bg-thread/60",
        !className?.includes("absolute") && "relative",
        ratio,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={position ? { objectPosition: position } : undefined}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
