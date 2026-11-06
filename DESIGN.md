# Fakir & Son's: Design Direction

Read this before building any UI. It applies to both the storefront and the admin panel.

## The idea

Fakir & Son's is a family textile house, not a startup. The site should feel like walking into an old, well-run cloth shop that has been redone by a good designer: calm, confident, crafted, a little editorial. Think heritage tailor's label, fabric swatch books, ledger paper, stamped receipts. Photography does the selling; the interface stays quiet.

One-line test: if a screen could belong to any SaaS template, it's wrong.

## What makes UI look "AI-generated" (never do these)

- Gradients, glows, glassmorphism, blurred blobs, purple/blue tech palettes
- Every card rounded-2xl with a soft drop shadow
- Centered hero with huge gradient headline and two pill buttons
- Emoji or generic line icons used as decoration
- Copy like "Elevate your style", "Discover the perfect blend", "Unleash"
- Everything perfectly symmetric, same-size cards in endless 3/4-column grids
- Pure white #FFFFFF background with pure black text
- Bouncy animations, things fading in on every scroll

## Palette

Neutrals carry the site; color is used sparingly. The logo's maroon is the primary (it replaced the original indigo) and gold replaced the original brass.

| Token | Hex | Use |
|---|---|---|
| `--cotton` | #F5F1E8 | Page background (warm off-white, like unbleached cloth) |
| `--paper` | #FBF9F4 | Cards, inputs, raised surfaces, solid header |
| `--ink` | #1B1A17 | Text, primary buttons |
| `--stone` | #77705F | Secondary text, captions |
| `--thread` | #DDD5C4 | Hairline borders and dividers |
| `--maroon` | #5A0A0E | Primary accent: links, focus, announcement bar, cart badge |
| `--maroon-hover` | #9B111E | Hover state of maroon |
| `--gold` | #C8860D | Tiny details only: "Est." mark, badges, active nav bar, footer hovers |
| `--madder` | #A23B2A | Sale, discounts, errors only. Never use maroon for these. Sale always also shows a "SALE" label and a struck-through original price. |
| `--wine` | #2B0A0C | Footer and wholesale band background (text in `--cotton`) |

Dark sections (footer, wholesale band) use `--wine` background with `--cotton` text.

## Typography

- Display: **Cormorant Garamond** (500/600), for hero headlines, section titles, product names on product page. Large, tight leading, never bold-heavy.
- UI/body: **Jost** (400/500), for nav, buttons, prices, body text.
- Bangla text: **Hind Siliguri**.
- Small labels: Jost 500, uppercase, letter-spacing 0.14em, 11–12px (e.g. "NEW ARRIVALS", "SIZE").
- Prices: Jost 500 with tabular numbers, ৳ symbol before the amount: ৳ 2,450.
- Scale: 12 / 14 / 16 / 20 / 28 / 40 / 64 / 88px. Hero headlines 64–88px desktop, 40px mobile.

## Logo and header

- One logo only: the full-colour original, `public/brand/logo.png` (transparent PNG, `logo@2x.png` for retina). No white/light/dark variants, and never recolour it. It must always be fully readable, so it only sits on `--paper` or `--cotton`.
- Header is always solid `--paper` with a 1px `--thread` bottom border, on every page including home. It is never transparent and never overlays the hero; the hero starts below it.
- Desktop: 112px tall, logo ~92px tall. On scroll it shrinks smoothly (300ms ease-out) to 80px with logo ~64px. Mobile: logo ~52px (header 68px, 60px on scroll).
- Footer: top area on `--cotton` with the logo ~120px tall and the gold "Est." line; link columns and copyright bar sit below it on `--wine`.

## Editorial layout (home redesign)

- Container max 1600px with 40px gutters (20px mobile). Editorial images (category tiles, the Winter edit split) run edge to edge.
- Section titles 48-56px Cormorant (36px mobile). Product names and prices 15px. Section spacing 128px desktop / 80px mobile.
- Hero: desktop height min(80svh, 820px), mobile a 4:5 crop. 6 slides, crossfade 1.2s + slow zoom, autoplay 6s, swipe/arrows/keyboard. No box behind text. Desktop: text on the empty side of the photo (`textSide` in lib/images.ts) over a soft vignette on that side only. Mobile: text at the bottom over a soft bottom vignette. English only. Bottom bar: "01 — 06" with a clickable thin progress line per slide.
- Home order: hero, promise strip, Shop by collection (Winter large), New season row, Winter edit split, Panjabi collection row, Saree split feature, Suits & tailoring row, story strip, wholesale band, textile equipment list, packaging, trust row, newsletter. Do not repeat the same product across sections.
- Photography: our own photos first; Pexels stock only where we have none (flagged `stock: true`). Every photo must literally show what its title says. `lib/images.ts` is the single source.

## Shape, line and space

- Corners: 0 for images and sections, 2px max for buttons and inputs. No pills.
- Borders: 1px `--thread` hairlines instead of shadows. No drop shadows on cards. (Exception: the soft bottom vignette on hero and full-bleed feature images, for text legibility.)
- Buttons: primary = solid `--ink` with cotton text; secondary = 1px ink outline; text links underlined with offset. Height 48px.
- Generous whitespace: sections 96–128px apart on desktop, 64px on mobile.
- Grid: 12 columns, max width 1440px, 24–32px gutters. Break the grid on purpose: one large image beside two small ones, text offset from images.
- Subtle paper/linen grain texture (very low opacity SVG noise) on `--cotton` sections is allowed. Nothing else decorative.

## Signature details (what makes it ours)

- Small "Est. 19XX · Dhaka" mark near the logo and in the footer (fill in the real year/city).
- Section labels numbered like a ledger: "01 — Men", "02 — Women", "03 — Textile Equipment".
- Product care/fabric line on cards in small caps: "100% COTTON · HANDLOOM".
- Swatch chips for colors: small square fabric-like chips, not round dots.
- Order confirmation and invoice styled like a stamped shop receipt.
- Thin horizontal rules between sections, like pages of a catalogue.
- A short Bangla line here and there (hero subtitle, footer sign-off) gives local character.

## Motion

Quiet and fast. 200–300ms ease-out. Allowed: image crossfade on product hover, header height shrink on scroll, drawer slide, slow (6–8s) hero slide change. Not allowed: scroll-triggered fade-ins on every block, parallax everywhere, bouncing.

## Storefront pages

**Home**
1. Hero: see "Editorial layout" above (the current spec). Headline in Cormorant, a small caps label, one text-style link (not a big button).
2. Thin marquee or single line: "Nationwide Cash on Delivery · Wholesale available · Since 19XX".
3. Editorial category block: one tall image + two stacked images, numbered labels.
4. New Arrivals: horizontal scroll row of product cards, "View all" link right.
5. Story strip: one photo of the workshop/fabric + 3 lines about the family business.
6. Wholesale band (ink background): "Buying in bulk?" + short text + "Apply for wholesale" and "Request a quote".
7. Textile Equipment: spec-style list layout (model, key spec, from price), feels like a catalogue page, not a fashion grid.
8. Trust row in plain text with hairline dividers: COD nationwide · Easy exchange · Secure payment · Showrooms.
9. Footer.

**Product card:** image 3:4, no border, no shadow; second image on hover; below: name (Jost 15px), fabric line (small caps, stone), price; sale price in madder with original struck through. Wishlist icon top-right only on hover.

**Product page:** large gallery left (vertical thumbnails), details right and sticky: name in Cormorant, price, swatches, size buttons (square), size guide link, quantity, "Add to bag" (ink) + "Buy now" (outline). Wholesale users see a tier table: "10–49 pcs ৳ X · 50+ pcs ৳ Y" and the MOQ.

## Admin panel

Different job, same family. It should feel like a well-kept ledger: dense, clear, fast. Not a colorful dashboard.

- Light `--paper` background, `--ink` text, Jost only (Cormorant only for the small brand mark in the sidebar).
- Left sidebar 240px: Dashboard, Orders, Products, Categories, Customers, Wholesale, Quotes, Homepage, Settings. Active item = gold left bar.
- Tables are the main UI: hairline rows, 44px row height, sticky header, tabular numbers, filters above as quiet tabs (All · Pending · Confirmed · Shipped · Cancelled).
- Status badges: small, square-ish, muted tints: pending = gold tint, confirmed = maroon tint, shipped = stone, delivered = green-grey, cancelled = madder tint.
- Dashboard: 4 plain number tiles (Today's orders, Pending, Revenue this month, Low stock) + recent orders table. No charts until there's real data.
- Order detail: two columns: items/totals left, customer/address/status timeline right. Primary actions top-right: Confirm, Mark shipped, Cancel (cancel asks for a reason).
- Use shadcn/ui components restyled with the tokens above (radius 2px, no shadows).
- Admin login page: centered small card on cotton, logo, email + password, nothing else. No "Sign up" link.
