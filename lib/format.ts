/** Format a BDT amount with Bangladeshi (lakh) digit grouping: 245000 -> "2,45,000". */
export function formatBDT(amount: number): string {
  const n = Math.round(amount);
  const s = Math.abs(n).toString();
  let out: string;
  if (s.length <= 3) out = s;
  else {
    const last3 = s.slice(-3);
    const rest = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    out = `${rest},${last3}`;
  }
  return n < 0 ? `-${out}` : out;
}

/** "৳ 2,450" */
export function taka(amount: number): string {
  return `৳ ${formatBDT(amount)}`;
}

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
