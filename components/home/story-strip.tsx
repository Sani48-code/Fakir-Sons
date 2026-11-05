import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { Container } from "@/components/ui/container";
import { Img } from "@/components/ui/img";
import { STORY } from "@/lib/dummy";

export function StoryStrip() {
  const s = STORY.home;
  return (
    <Container as="section" className="py-20 md:py-32">
      <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
        <RevealImage className="md:col-span-7">
          <Img
            src={s.image.src}
            alt={s.image.alt}
            ratio="aspect-[5/4]"
            sizes="(min-width: 768px) 58vw, 100vw"
          />
        </RevealImage>
        <Reveal className="md:col-span-5 md:pl-6">
          <p className="label text-gold">{s.label}</p>
          <h2 className="mt-4 font-display text-[36px] font-medium leading-[1.05] sm:text-[52px]">
            {s.title[0]}
            <br />
            {s.title[1]}
          </h2>
          <div className="mt-6 space-y-3 text-[15px] leading-relaxed text-stone">
            {s.lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
          <p className="mt-6 font-display text-[28px] italic text-ink">— Fakir &amp; Son&rsquo;s</p>
          <Link href="/about" className="link-grow mt-6 inline-block text-sm font-medium">
            Read our story →
          </Link>
        </Reveal>
      </div>
    </Container>
  );
}
