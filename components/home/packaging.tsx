import { Reveal } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { Container } from "@/components/ui/container";
import { Img } from "@/components/ui/img";
import { LOCAL } from "@/lib/images";

export function Packaging() {
  return (
    <section className="border-y border-thread bg-cotton py-16 md:py-28">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-5 md:order-2">
            <p className="label text-gold">Packaging</p>
            <h2 className="mt-4 font-display text-[28px] font-medium leading-[1.05] sm:text-[40px]">
              Wrapped with care, every order.
            </h2>
            <p className="mt-4 max-w-sm text-[15px] text-stone">
              Maroon paper, gold foil and a ribbon handle. Every parcel leaves our shop ready to give.
            </p>
          </Reveal>
          <RevealImage className="md:col-span-7 md:order-1">
            <Img
              src={LOCAL.bags}
              alt="Maroon Fakir & Son's shopping bag with gold logo and ribbon handles on a marble table"
              ratio="aspect-[3/2]"
              sizes="(min-width: 768px) 58vw, 100vw"
            />
          </RevealImage>
        </div>
      </Container>
    </section>
  );
}
