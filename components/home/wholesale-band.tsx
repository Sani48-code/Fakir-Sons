import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const FACTS = [
  ["01", "10+ pcs tier pricing"],
  ["02", "Trade invoice"],
  ["03", "Nationwide delivery"],
];

export function WholesaleBand() {
  return (
    <section className="on-dark relative my-8 bg-wine text-cotton md:my-12">
      <div aria-hidden className="pointer-events-none absolute inset-4 border border-gold/50" />
      <Container className="relative py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <p className="label text-gold">Wholesale &amp; B2B</p>
            <h2 className="mt-4 font-display text-[40px] font-medium leading-none md:text-[64px]">
              Buying in bulk?
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-cotton/80">
              Get tier prices on cloth and garments, a proper trade invoice and delivery anywhere in Bangladesh.
              Apply once and we approve within 24 to 48 hours.
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              {FACTS.map(([n, t]) => (
                <li key={n} className="text-sm">
                  <span className="label mr-2 text-gold">{n}</span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-3 sm:flex-row md:col-span-5 md:justify-end">
            <ButtonLink href="/wholesale" variant="light">
              Apply for wholesale
            </ButtonLink>
            <ButtonLink href="/quote" variant="light-outline">
              Request a quote
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
