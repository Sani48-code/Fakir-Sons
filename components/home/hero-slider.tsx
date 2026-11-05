"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { EASE } from "@/components/motion/reveal";
import { SlowZoom } from "@/components/motion/slow-zoom";
import { TextLines } from "@/components/motion/text-lines";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/shop/icons";
import { Img } from "@/components/ui/img";
import type { HeroSlide } from "@/lib/dummy";

const AUTOPLAY_MS = 7000;

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
      className="relative aspect-[4/5] w-full touch-pan-y overflow-hidden bg-ink text-cotton focus-visible:outline-offset-[-4px] md:aspect-[16/9] md:max-h-[86vh]"
    >
      {/* Slides: crossfade 900ms */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${count}`}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-[900ms] ease-in-out ${
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
            />
          </SlowZoom>
        </div>
      ))}

      {/* Text: solid ink scrim only behind the text block, bottom-left */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-20 md:p-10 md:pb-24">
        <div key={slide.id} className="w-fit max-w-[640px] bg-ink/45 p-5 md:p-8">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            className="label text-gold-soft"
          >
            {slide.label}
          </motion.p>
          <TextLines
            lines={lines}
            as="h1"
            trigger="mount"
            delay={0.15}
            className="mt-3 font-display text-[44px] font-semibold leading-[0.98] md:text-[88px]"
          />
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
            className="mt-4 max-w-md text-[15px] leading-relaxed text-cotton/90 md:text-base"
          >
            {slide.subtitle}
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="mt-5"
          >
            <Link href={slide.href} className="link-grow text-sm font-medium">
              Shop the collection →
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Controls, bottom-right */}
      <div className="absolute bottom-4 right-[76px] flex items-center gap-4 bg-ink/45 p-2 pl-4 md:bottom-8 md:right-24 md:gap-6">
        <p aria-live={autoplay && !paused ? "off" : "polite"} className="tnum text-sm tracking-wider">
          {pad(index + 1)} / {pad(count)}
        </p>
        <span aria-hidden className="relative hidden h-px w-24 overflow-hidden bg-cotton/30 sm:block">
          {autoplay && (
            <span
              key={index}
              onAnimationEnd={() => go(index + 1)}
              className="absolute inset-0 origin-left bg-cotton"
              style={{
                animation: `hero-progress ${AUTOPLAY_MS}ms linear forwards`,
                animationPlayState: paused ? "paused" : "running",
              }}
            />
          )}
        </span>
        <div className="flex gap-2">
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
      </div>
    </section>
  );
}
