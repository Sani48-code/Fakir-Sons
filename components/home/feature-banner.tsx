import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { Container } from "@/components/ui/container";
import { Img } from "@/components/ui/img";
import type { Pic } from "@/lib/images";
import { cn } from "@/lib/format";

/**
 * Split feature: a 2:1 banner crop (1448x724 source, sharp up to ~780px wide on
 * retina) with short text beside it. `mirrored` puts the image on the right.
 */
export function FeatureBanner({
  image,
  label,
  title,
  text,
  href,
  linkLabel,
  mirrored = false,
}: {
  image: Pic;
  label: string;
  title: string;
  text: string;
  href: string;
  linkLabel: string;
  mirrored?: boolean;
}) {
  return (
    <Container as="section" className="py-8 md:py-12">
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-x-6">
        <RevealImage className={cn("lg:col-span-7", mirrored && "lg:order-2")}>
          <Link href={href} className="group block">
            <Img
              src={image.src}
              alt={image.alt}
              ratio="aspect-[2/1]"
              quality={90}
              sizes="(min-width: 1440px) 780px, (min-width: 1024px) 55vw, 100vw"
              imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </Link>
        </RevealImage>
        <Reveal className={cn("lg:col-span-5", mirrored ? "lg:order-1 lg:pr-10" : "lg:pl-10")}>
          <p className="label text-gold">{label}</p>
          <h2 className="mt-3 font-display text-[36px] font-medium leading-[1.02] md:text-[52px]">{title}</h2>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-stone">{text}</p>
          <Link href={href} className="link-grow mt-6 inline-block text-sm font-medium">
            {linkLabel} →
          </Link>
        </Reveal>
      </div>
    </Container>
  );
}
