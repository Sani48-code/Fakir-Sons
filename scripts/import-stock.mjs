// Downloads the Pexels stock photos listed in scripts/stock-photos.json, applies
// any crop, resizes to max 2400px on the long side and writes WebP (q82) to
// public/images/stock/<group>/. Writes the output width/height back into the
// JSON (lib/images.ts reads it). Re-run after adding or changing an entry:
//   node scripts/import-stock.mjs [key-substring]
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const LIST = "scripts/stock-photos.json";
const entries = JSON.parse(fs.readFileSync(LIST, "utf8"));
const only = process.argv[2];

for (const e of entries) {
  if (only && !e.key.includes(only)) continue;
  const url = `https://images.pexels.com/photos/${e.id}/pexels-photo-${e.id}.jpeg?auto=compress&cs=tinysrgb&w=2400`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (image import script)" } });
  const type = res.headers.get("content-type") ?? "";
  if (res.status !== 200 || !type.startsWith("image/")) {
    throw new Error(`${e.key}: ${url} returned ${res.status} ${type}`);
  }
  let img = sharp(Buffer.from(await res.arrayBuffer())).rotate();
  if (e.crop) img = img.extract(e.crop);
  // "warm": same gentle grade as our kids photos (scripts/optimize-images.mjs WARM)
  if (e.grade === "warm") img = img.modulate({ saturation: 0.86 }).linear([1.035, 1.0, 0.93], [0, 0, 0]);
  const file = `${e.key.replace(/^stock-[a-z]+-/, "")}.webp`;
  const dest = path.join("public/images/stock", e.group, file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const info = await img.resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toFile(dest);
  e.src = `/${dest.replaceAll("\\", "/").replace(/^public\//, "")}`;
  e.width = info.width;
  e.height = info.height;
  console.log(`${e.key}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}

fs.writeFileSync(LIST, JSON.stringify(entries, null, 2) + "\n");
