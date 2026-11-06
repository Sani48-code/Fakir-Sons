// Search over the dummy catalogue. Replaced by a Supabase query (full-text) later.
import { CATEGORIES, EQUIPMENT, PRODUCTS, categoryHref, type Equipment, type Product } from "./dummy";

export const POPULAR_SEARCHES = ["Panjabi", "Saree", "Puffer jacket", "Suit", "Hoodie", "Sewing machine"];

export type CategoryHit = { label: string; href: string };
export type SearchResult = { products: Product[]; equipment: Equipment[]; categories: CategoryHit[] };

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// Common alternate spellings and plurals people type.
const ALIASES: Record<string, string> = {
  punjabi: "panjabi",
  sari: "saree",
  sarees: "saree",
  suits: "suit",
  hoodies: "hoodie",
  jackets: "jacket",
  coats: "coat",
  machines: "machine",
  kids: "boys",
};

const tokens = (q: string) =>
  norm(q)
    .split(" ")
    .filter((t) => t.length > 1)
    .map((t) => ALIASES[t] ?? t);

function score(haystack: string, words: string[]): number {
  const h = norm(haystack);
  let total = 0;
  for (const w of words) {
    // Match the start of a word only ("pan" finds Panjabi, not Windowpane).
    if (new RegExp(`\\b${w}`).test(h)) total += 2;
    else return 0; // every word must match
  }
  return total;
}

export function search(query: string): SearchResult {
  const words = tokens(query);
  if (words.length === 0) return { products: [], equipment: [], categories: [] };

  const products = PRODUCTS.map((p) => {
    const cat = CATEGORIES.find((c) => c.slug === p.category);
    const sub = cat?.sub.find((s) => s.slug === p.sub)?.name ?? "";
    const hay = [p.name, p.fabric, cat?.name, sub, p.winter ? "winter" : "", p.colors.map((c) => c.name).join(" ")].join(" ");
    return { p, s: score(p.name, words) * 3 + score(hay, words) };
  })
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.p);

  const equipment = EQUIPMENT.map((e) => ({ e, s: score([e.model, e.brand, e.sub.replace("-", " "), "machine equipment", e.keySpecs.join(" ")].join(" "), words) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.e);

  const categories: CategoryHit[] = [];
  for (const c of CATEGORIES) {
    if (score(c.name, words)) categories.push({ label: c.name, href: categoryHref(c.slug) });
    for (const s of c.sub) {
      if (score(`${s.name} ${c.name}`, words)) categories.push({ label: `${c.name} · ${s.name}`, href: categoryHref(c.slug, s.slug) });
    }
  }

  return { products, equipment, categories: categories.slice(0, 5) };
}
