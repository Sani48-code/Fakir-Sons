"use client";

import { motion, useReducedMotion } from "motion/react";
import { getImageProps } from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import { EASE } from "@/components/motion/reveal";
import { SlowZoom } from "@/components/motion/slow-zoom";
import { TextLines } from "@/components/motion/text-lines";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/shop/icons";
import { Container } from "@/components/ui/container";
import type { HeroSlide } from "@/lib/dummy";
import { cn } from "@/lib/format";

const AUTOPLAY_MS = 6000;
const QUALITY = 90; // hero only; allowed in next.config images.qualities

/**
 * Art-directed photo: the desktop banner from md up, a separate (swappable)
 * 4:5 mobile file below it. Each has its own focal point.
 */
function HeroPicture({ slide, first }: { slide: HeroSlide; first: boolean }) {
  const { image } = slide;
  const common = { alt: "", sizes: "100vw", quality: QUALITY, fill: true } as const;
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: image.src });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, src: image.mobile.src });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <img
        {...rest}
        srcSet={mobile}
        alt={image.alt}
        loading={first ? "eager" : "lazy"}
        fetchPriority={first ? "high" : "auto"}
        className="absolute inset-0 h-full w-full object-cover [object-position:var(--pm)] md:[object-position:var(--pd)]"
      />
    </picture>
  );
}

/**
 * Editorial hero: 6 slides, crossfade 1.2s with a slow zoom, autoplay 6s.
 * Desktop: text on the empty side of each photo over a soft side vignette.
 * Mobile: 4:5 crop, text at the bottom over a soft bottom vignette.
 * No box behind the text.
 */
export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const swipeStart = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback(
    (next: number) => {
      setIndex((cur) => {
        const target = (next + count) % count;
        if (target !== cur) setPrev(cur);
        return target;
      });
    },
    [count],
  );

  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const paused = hovered || focused || tabHidden;
  const autoplay = !reduce;

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(index + 1);
    if (e.key === "ArrowLeft") go(index - 1);
  };
  const onPointerDown = (e: PointerEvent) => {
    swipeStart.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (swipeStart.current === null) return;
    const dx = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
  };

  const slide = slides[index];
  const right = slide.image.textSide === "right";
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      className="relative aspect-[4/5] max-h-[calc(100svh-104px)] w-full touch-pan-y overflow-hidden bg-ink text-cotton focus-visible:outline-offset-[-4px] md:aspect-auto md:h-[min(80svh,820px)] md:max-h-none md:min-h-[520px]"
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${count}: ${s.title}`}
          aria-hidden={i !== index}
          style={{ "--pd": s.image.focal.desktop, "--pm": s.image.focal.mobile } as CSSProperties}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <SlowZoom active={i === index || i === prev} className="absolute inset-0">
            <HeroPicture slide={s} first={i === 0} />
          </SlowZoom>
          {/* Soft vignette on the text side only (bottom on mobile) */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-t from-ink/85 via-ink/50 to-transparent",
              "md:inset-y-0 md:h-auto md:w-[62%] md:via-ink/25",
              s.image.textSide === "right"
                ? "md:left-auto md:right-0 md:bg-gradient-to-l md:from-ink/65"
                : "md:right-auto md:left-0 md:bg-gradient-to-r md:from-ink/65",
            )}
          />
        </div>
      ))}

      {/* Text: bottom on mobile; on the photo's empty side on desktop */}
      <div className="absolute inset-0 flex items-end pb-20 md:items-center md:pb-0">
        <Container className={cn("flex", right ? "md:justify-end" : "md:justify-start")}>
          <div key={slide.id} className="max-w-[560px] md:pb-8">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
              className="label text-cotton md:text-gold-soft"
            >
              {slide.title}
            </motion.p>
            <TextLines
              lines={[slide.subtitle]}
              as={index === 0 ? "h1" : "h2"}
              trigger="mount"
              delay={0.2}
              className="mt-3 font-display text-[40px] font-medium leading-[1] md:mt-4 md:text-[72px] lg:text-[84px]"
            />
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-5 md:mt-7"
            >
              <Link href={slide.link} className="link-grow text-sm font-medium">
                {slide.buttonText} →
              </Link>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Bottom bar: 01 — 06, a clickable progress line per slide, arrows */}
      <div className="absolute inset-x-0 bottom-0 pb-4 md:pb-7">
        <Container className="flex items-center gap-4 md:gap-8">
          <p aria-live={autoplay && !paused ? "off" : "polite"} className="tnum shrink-0 text-sm tracking-wider">
            {pad(index + 1)} — {pad(count)}
          </p>
          <div className="flex flex-1 gap-2 md:max-w-[560px] md:gap-3">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Go to slide ${i + 1}: ${s.title}`}
                aria-current={i === index}
                onClick={() => go(i)}
                className="group flex h-8 flex-1 items-center"
              >
                <span className="relative block h-px w-full overflow-hidden bg-cotton/35 transition-[height] duration-200 group-hover:h-[3px]">
                  {i < index && <span className="absolute inset-0 bg-cotton" />}
                  {i === index &&
                    (autoplay ? (
                      <span
                        key={index}
                        onAnimationEnd={() => go(index + 1)}
                        className="absolute inset-0 origin-left bg-cotton"
                        style={{
                          animation: `hero-progress ${AUTOPLAY_MS}ms linear forwards`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                      />
                    ) : (
                      <span className="absolute inset-0 bg-cotton" />
                    ))}
                </span>
              </button>
            ))}
          </div>
          <div className="ml-auto hidden gap-2 sm:flex">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go(index - 1)}
              className="flex h-11 w-11 items-center justify-center border border-cotton/50 transition-colors duration-150 hover:bg-cotton hover:text-ink"
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go(index + 1)}
              className="flex h-11 w-11 items-center justify-center border border-cotton/50 transition-colors duration-150 hover:bg-cotton hover:text-ink"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </Container>
      </div>
    </section>
  );
}
