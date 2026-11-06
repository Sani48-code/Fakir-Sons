// Turns our own photos in Images/ (not committed) into optimised WebP files in
// public/images/ (committed). Re-run after changing a crop:
//   node scripts/optimize-images.mjs
//
// Every output is listed below with its source, optional crop (in source pixels)
// and optional grade. Max width 2400px. Hero banners use q90, everything else q82.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "Images";
const OUT = "public/images";
const P = "Product Images";

/** Subtle warm grade: a little less saturation, warmer white balance. */
const WARM = { saturation: 0.86, r: 1.035, g: 1.0, b: 0.93 };

/**
 * @typedef {{ left: number, top: number, width: number, height: number }} Crop
 * @typedef {{ out: string, src: string, crop?: Crop, grade?: typeof WARM, q?: number }} Job
 */

/** 4:5 crop at full height, centred on x (fraction of width) for mobile hero. */
const mobile = (w, h, cx) => {
  const width = Math.round(h * 0.8);
  const left = Math.min(Math.max(Math.round(w * cx - width / 2), 0), w - width);
  return { left, top: 0, width, height: h };
};
/** 3:4 crop at full height centred on x (source px), for product cards cut from banners. */
const card = (w, h, centerX) => {
  const width = Math.round((h * 3) / 4);
  const left = Math.min(Math.max(Math.round(centerX - width / 2), 0), w - width);
  return { left, top: 0, width, height: h };
};

const H1 = `${P}/soft things for cold morning hero images.png`; // 2172x724
const H2 = `${P}/warmth for the season hero images.png`; // 1983x793
const H3 = `${P}/made for long evening her images.png`; // 2172x724
const H4 = `${P}/saree the slow way hero images.png`; // 2172x724
const H5 = `${P}/Cut to fit hero images.png`; // 2172x724
const H6 = `${P}/Good clothes hero images.png`; // 2172x724
const HOODIES = `${P}/Hoodie Collection/Reference images one.png`; // 1536x1024
const KIDS = `${P}/Kids Male/kids male hero images.jpeg`; // 896x1152, black bars rows 0-79 and 1071-1151

/** @type {Job[]} */
const JOBS = [
  // ---- Hero (desktop full banner + separate 4:5 mobile crop) ----
  { out: "hero/01-winter-knit.webp", src: H1, q: 90 },
  { out: "hero/01-winter-knit-mobile.webp", src: H1, crop: mobile(2172, 724, 0.62), q: 90 },
  { out: "hero/02-mens-winter-coat.webp", src: H2, q: 90 },
  { out: "hero/02-mens-winter-coat-mobile.webp", src: H2, crop: mobile(1983, 793, 0.6), q: 90 },
  { out: "hero/03-panjabi-ivory.webp", src: H3, q: 90 },
  { out: "hero/03-panjabi-ivory-mobile.webp", src: H3, crop: mobile(2172, 724, 0.64), q: 90 },
  { out: "hero/04-saree-maroon.webp", src: H4, q: 90 },
  { out: "hero/04-saree-maroon-mobile.webp", src: H4, crop: mobile(2172, 724, 0.6), q: 90 },
  { out: "hero/05-suits-tailoring.webp", src: H5, q: 90 },
  { out: "hero/05-suits-tailoring-mobile.webp", src: H5, crop: mobile(2172, 724, 0.53), q: 90 },
  { out: "hero/06-fabric-textile.webp", src: H6, q: 90 },
  { out: "hero/06-fabric-textile-mobile.webp", src: H6, crop: mobile(2172, 724, 0.24), q: 90 },

  // ---- Winter ----
  { out: "collections/winter/black-hooded-puffer.webp", src: `${P}/Mens Winter/Winter Hero main.png` },
  { out: "collections/winter/navy-puffer-cream-scarf.webp", src: `${P}/Mens Winter/Images 1.png` },
  { out: "collections/winter/ecru-trucker-jacket.webp", src: `${P}/Mens Winter/image 2.png` },
  // winter 3 + 4: drop the bottom strip that carries the watermark sparkle
  { out: "collections/winter/brown-leather-jacket.webp", src: `${P}/Mens Winter/winter 3.png`, crop: { left: 0, top: 0, width: 768, height: 1220 } },
  { out: "collections/winter/black-bomber-jacket.webp", src: `${P}/Mens Winter/winter 4.png`, crop: { left: 0, top: 0, width: 768, height: 1220 } },
  { out: "collections/winter/camel-wool-overcoat.webp", src: H2, crop: card(1983, 793, 1170) },
  { out: "collections/winter/cream-chunky-knit.webp", src: H1, crop: { left: 940, top: 0, width: 760, height: 724 } },

  // ---- Panjabi ----
  { out: "collections/panjabi/bottle-green-embroidered.webp", src: `${P}/Panjabi Collection/Panjabi Collection Hero Images.png` },
  { out: "collections/panjabi/ivory-embroidered.webp", src: H3, crop: card(2172, 724, 1390) },

  // ---- Suits ----
  { out: "collections/suits/navy-check-three-piece.webp", src: `${P}/Suit/suit hero imagtes.png` },
  { out: "collections/suits/navy-two-piece.webp", src: `${P}/Suit/suit 1.png` },
  { out: "collections/suits/black-bandhgala.webp", src: H5, crop: card(2172, 724, 1315) },

  // ---- Hoodies (three crops from the reference shot; the ad graphic is never used) ----
  { out: "collections/hoodies/hoodie-trio.webp", src: HOODIES },
  { out: "collections/hoodies/cream-hoodie.webp", src: HOODIES, crop: { left: 0, top: 130, width: 455, height: 607 } },
  { out: "collections/hoodies/black-hoodie.webp", src: HOODIES, crop: { left: 495, top: 20, width: 572, height: 763 } },
  { out: "collections/hoodies/bottle-green-hoodie.webp", src: HOODIES, crop: { left: 1150, top: 150, width: 386, height: 515 } },

  // ---- Sarees ----
  { out: "collections/sarees/maroon-banarasi-silk.webp", src: H4, crop: card(2172, 724, 1300) },
  // tight on the woman and garment, cutting out most of the busy shop
  { out: "collections/sarees/mustard-silk.webp", src: `${P}/Saree/saree hero images.jpeg`, crop: { left: 100, top: 290, width: 345, height: 460 } },

  // ---- Boys (letterbox trimmed + warm grade) ----
  { out: "collections/boys/winter-pair.webp", src: KIDS, crop: { left: 0, top: 82, width: 896, height: 987 }, grade: WARM },
  { out: "collections/boys/olive-puffer.webp", src: KIDS, crop: { left: 0, top: 166, width: 372, height: 496 }, grade: WARM },
  { out: "collections/boys/denim-jacket.webp", src: KIDS, crop: { left: 446, top: 160, width: 340, height: 453 }, grade: WARM },
  { out: "collections/boys/navy-suit.webp", src: `${P}/Kids Male/kids suit.jpeg`, grade: WARM },

  // ---- Brand ----
  { out: "brand/bags.webp", src: "bags design.png" },
];

const only = process.argv[2]; // optional substring filter
for (const job of JOBS) {
  if (only && !job.out.includes(only)) continue;
  let img = sharp(path.join(SRC, job.src));
  if (job.crop) img = img.extract(job.crop);
  img = img.resize({ width: 2400, withoutEnlargement: true });
  if (job.grade) {
    const g = job.grade;
    img = img.modulate({ saturation: g.saturation }).linear([g.r, g.g, g.b], [0, 0, 0]);
  }
  const dest = path.join(OUT, job.out);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const info = await img.webp({ quality: job.q ?? 82, effort: 6 }).toFile(dest);
  console.log(`${job.out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}
