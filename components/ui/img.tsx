import Image from "next/image";
import { cn } from "@/lib/format";

/**
 * Scale every size in a `sizes` string, e.g. "(min-width: 1440px) 320px, 48vw" x1.5.
 * Used when object-fit: cover crops a source that is wider than its box: the
 * browser picks a variant by box width, but the crop needs more source pixels.
 */
function scaleSizes(sizes: string, factor: number): string {
  if (factor <= 1.01) return sizes;
  return sizes
    .split(",")
    .map((part) =>
      part.replace(/(\d+(?:\.\d+)?)(px|vw)\s*$/, (_, n: string, unit: string) => `${Math.round(Number(n) * factor)}${unit}`),
    )
    .join(",");
}

/**
 * The only way images enter the UI. Wraps next/image with a cotton-coloured
 * placeholder, a required alt and a required `sizes` (the box's rendered width).
 * Pass `source` (the file's pixel size) and `box` (the box's width/height ratio)
 * when the photo is cropped by its box, so the right variant is downloaded.
 */
export function Img({
  src,
  alt,
  sizes,
  ratio = "aspect-[3/4]",
  priority = false,
  quality = 85,
  position,
  source,
  box,
  className,
  imgClassName,
}: {
  src: string;
  alt: string; // use "" only for purely decorative images
  sizes: string;
  ratio?: string; // tailwind aspect class, e.g. "aspect-[3/4]"; "" to fill parent
  priority?: boolean;
  /** 85 by default; 90 for large editorial images (both allowed in next.config images.qualities). */
  quality?: 85 | 90;
  position?: string; // CSS object-position (focal point), e.g. "50% 20%"
  /** Source pixel size, for cover-crop size correction. */
  source?: { width: number; height: number };
  /** Box aspect (width / height), e.g. 3/4 for a product card. */
  box?: number;
  className?: string;
  imgClassName?: string;
}) {
  const factor = source && box ? Math.max(1, source.width / source.height / box) : 1;
  return (
    <div
      className={cn(
        "overflow-hidden",
        // placeholder colour while loading, unless the caller sets its own background
        !className?.includes("bg-") && "bg-thread/60",
        !className?.includes("absolute") && "relative",
        ratio,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={scaleSizes(sizes, factor)}
        priority={priority}
        quality={quality}
        style={position ? { objectPosition: position } : undefined}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
