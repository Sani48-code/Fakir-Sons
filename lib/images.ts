// One place for image URLs. Swap placeholders for real photos by editing this file only.

/** Aspect-ratio presets (width x height) used across the site. */
export const RATIO = {
  product: [900, 1200], // 3:4
  heroDesktop: [1920, 1080], // 16:9
  heroMobile: [960, 1200], // 4:5
  categoryTall: [800, 1200], // 2:3
  categoryWide: [1200, 900], // 4:3
  story: [1000, 800], // 5:4
  banner: [1600, 400], // 4:1
  square: [800, 800],
} as const;

type Size = readonly [number, number];

/** Placeholder photo with a fixed seed so it never changes between renders. */
export function img(key: string, size: Size = RATIO.product): string {
  const [w, h] = size;
  return `https://picsum.photos/seed/${encodeURIComponent(key)}/${w}/${h}`;
}

/** Brand files copied into public/images/ (see PROMPTS.md). */
export const LOCAL = {
  bags: "/images/bags-design.png",
} as const;
