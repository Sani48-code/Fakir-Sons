import { Img } from "@/components/ui/img";
import type { Pic } from "@/lib/images";
import { cn } from "@/lib/format";

/**
 * Widest CSS size a 3:4 crop of this photo may be shown at on a retina (2x)
 * screen without exceeding its source by more than 15%.
 */
export function maxCssWidth(p: Pic): number {
  const cropW = Math.min(p.source.width, p.source.height * 0.75);
  return Math.floor((cropW * 1.15) / 2);
}

/**
 * Product photo in the shared #EDE8DF studio frame (3:4). Cutouts fill it.
 * A photo too small for the frame is shown smaller, bottom-centred, instead
 * of being stretched (the 15% resolution rule).
 */
export function ProductImage({
  pic,
  alt,
  sizes,
  priority = false,
  className,
  imgClassName,
}: {
  pic: Pic;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={cn("absolute inset-0 flex items-end justify-center bg-studio", className)}>
      <div className="relative aspect-[3/4] w-full" style={{ maxWidth: maxCssWidth(pic) }}>
        <Img
          src={pic.src}
          alt={alt}
          sizes={sizes}
          ratio=""
          position={pic.pos}
          source={pic.source}
          box={3 / 4}
          priority={priority}
          className="absolute inset-0 bg-transparent"
          imgClassName={imgClassName}
        />
      </div>
    </div>
  );
}
