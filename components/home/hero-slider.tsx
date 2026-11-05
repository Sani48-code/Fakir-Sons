"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import { EASE } from "@/components/motion/reveal";
import { SlowZoom } from "@/components/motion/slow-zoom";
import { TextLines } from "@/components/motion/text-lines";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/shop/icons";
import { Container } from "@/components/ui/container";
import { Img } from "@/components/ui/img";
import type { HeroSlide } from "@/lib/dummy";

const AUTOPLAY_MS = 6000;

/**
 * Full-viewport editorial hero. Text sits directly on the photo (no box) over a
 * soft bottom-only vignette. Each slide has its own desktop and mobile focal
 * point so faces are never cropped.
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
  const lines = slide.headline.split("\n");
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
      className="relative h-[calc(100svh-104px)] min-h-[520px] w-full touch-pan-y overflow-hidden bg-ink text-cotton focus-visible:outline-offset-[-4px] md:h-[calc(100svh-148px)]"
    >
      {/* Slides: crossfade 1.2s + slow Ken Burns */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${count}`}
          aria-hidden={i !== index}
          style={{ "--pd": s.focus.desktop, "--pm": s.focus.mobile } as CSSProperties}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <SlowZoom active={i === index || i === prev} className="absolute inset-0">
            <Img
              src={s.image.src}
              alt={i === index ? s.image.alt : ""}
              sizes="100vw"
              ratio=""
              priority={i === 0}
              className="absolute inset-0"
              imgClassName="[object-position:var(--pm)] md:[object-position:var(--pd)]"
            />
          </SlowZoom>
        </div>
      ))}

      {/* Soft dark vignette, bottom only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-ink/75 via-ink/30 to-transparent"
      />

      {/* Text sits directly on the image, bottom-left */}
      <div className="absolute inset-x-0 bottom-0 pb-24 md:pb-32">
        <Container>
          <div key={slide.id} className="max-w-[900px]">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
              className="label text-gold-soft"
            >
              {slide.label}
            </motion.p>
            <TextLines
              lines={lines}
              as="h1"
              trigger="mount"
              delay={0.2}
              className="mt-4 font-display text-[48px] font-medium leading-[0.96] md:text-[96px]"
            />
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.55 }}
              className="mt-5 max-w-lg text-[15px] leading-relaxed text-cotton/90 md:text-base"
            >
              {slide.subtitle}
            </motion.p>
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-6"
            >
              <Link href={slide.href} className="link-grow text-sm font-medium">
                Shop the collection →
              </Link>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Bottom bar: 01 — 06, a clickable progress line per slide, arrows */}
      <div className="absolute inset-x-0 bottom-0 pb-5 md:pb-8">
        <Container className="flex items-center gap-4 pr-[84px] md:gap-8 md:pr-[96px]">
          <p aria-live={autoplay && !paused ? "off" : "polite"} className="tnum shrink-0 text-sm tracking-wider">
            {pad(index + 1)} — {pad(count)}
          </p>
          <div className="flex flex-1 gap-2 md:max-w-[560px] md:gap-3">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Go to slide ${i + 1}: ${s.label}`}
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
