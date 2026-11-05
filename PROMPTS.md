# Fakir & Son's: Storefront Build Prompts

How to use: keep this file in the project root. Each day tell Claude Code:
"Read CLAUDE.md, DESIGN.md and PROMPTS.md. Do Page X." Do one page at a time, review in the browser, then commit.

## Rules for every page

- DESIGN.md is the source of truth for colors, fonts, spacing, shapes. Never use shadows, gradients, pills, rounded-xl cards or emoji.
- All business info comes from `lib/site.ts`. All dummy content comes from `lib/dummy.ts`. No hardcoded text that belongs to data.
- Every image goes through `<Img>` (wrapper on next/image) with a real `alt`, correct `sizes`, and a cotton-colored placeholder while loading. Above-the-fold images use `priority`.
- Mobile first. Check 360px, 768px, 1280px, 1536px. No horizontal scroll ever.
- Accessible: semantic HTML, visible focus ring (maroon 2px offset), keyboard works everywhere, aria labels on icon buttons, color is never the only signal.
- Animation follows the "Motion system" below and is disabled under `prefers-reduced-motion`.
- Every page has: metadata (title, description, Open Graph image), a loading state, and an empty/error state where data can be missing.
- Before stopping: run typecheck, lint and build; open the page in the browser at mobile and desktop width and fix anything broken; then commit and push.

## Motion system

Install `motion` (Framer Motion). Build these once in `components/motion/` and reuse them:

- `Reveal`: fades in + moves up 16px, 500ms, ease [0.22, 1, 0.36, 1], triggers once when 20% visible. Use for section headings and blocks, not for every small item.
- `RevealImage`: image uncovers with a clip-path wipe from bottom (inset 100% → 0), 900ms, plus a slight scale 1.06 → 1. Use for large editorial images only.
- `Stagger`: children appear 60ms apart. Use for product grids and lists (max 8 items staggered, rest instant).
- `SlowZoom`: Ken Burns, scale 1 → 1.08 over 8s, for hero slides.
- `TextLines`: headline splits into lines, each slides up from behind a mask, 80ms apart. Hero and page titles only.
- Hover rules: product image crossfade to second image 400ms; links get an underline that grows from left 250ms; buttons darken 150ms. No scale-bounce on hover.
- Page transitions: none (keep navigation instant).
- Smooth scroll: native CSS `scroll-behavior: smooth` only, no scroll-jacking library.

## Images

- Create `lib/images.ts` with one function `img(key)` returning placeholder URLs, so swapping to real photos later means changing one file.
- Placeholders: `https://picsum.photos/seed/<key>/<w>/<h>` with fixed seeds. Add the host to `next.config` `images.remotePatterns`.
- Use files from `Images/` where relevant (copy needed ones to `public/images/`; never commit `Images/` itself). `bags design.png` → About page and packaging strip.
- Aspect ratios: product 3:4, hero 16:9 desktop / 4:5 mobile, category tall 2:3, category wide 4:3, story 5:4.

---

## Page 0: Foundation (do this first)

Build shared pieces before any page:
1. Update `lib/site.ts`: name "Fakir & Son's", est 2023, city Dhaka, phone display "+880 1745-947359", tel "+8801745947359", WhatsApp "https://wa.me/8801745947359", Facebook "https://www.facebook.com/profile.php?id=61560423444727", email "info@fakirandsons.com" (placeholder). Footer "Est." line reads "Est. 2023 · Dhaka". Show only Facebook and WhatsApp socials.
2. `lib/dummy.ts` with typed data: 6 categories (Men, Women, Kids, Winter, Textile Equipment, Accessories) each with subcategories; 24 clothing products (name, slug, category, fabric line, retail price, optional sale price, sizes, color swatches with hex, 3 images, stock, isNew, isBestSeller, wholesale tiers and MOQ); 8 textile equipment items (model, brand, key specs, from-price, images, spec table); 4 hero slides; 6 FAQ items; 3 store locations.
3. Components in `components/ui/`: Container, SectionHeader (numbered label "01 — " + Cormorant title + optional "View all" link), Button (primary/outline/text, 48px, 2px radius, loading state), PriceTag (৳ format with tabular numbers, sale shows madder price + struck original + "SALE" label), Swatch (square chip with selected ring), SizeButton, Breadcrumb, Badge, Input/Select/Textarea/Checkbox styled per DESIGN.md with label, hint and error, QuantityStepper, Accordion, Tabs, Modal, Sheet (bottom on mobile, side on desktop), Skeleton, EmptyState, Toast.
4. `components/shop/ProductCard.tsx` per DESIGN.md: 3:4 image, hover crossfade to second image, wishlist heart appears on hover (always visible on touch), "NEW" or "SALE" small label top-left, quick "Add to bag" bar slides up from image bottom on hover (desktop) / small bag icon button (mobile), name, fabric line in small caps stone, PriceTag. Out of stock: image dimmed, "Sold out" label.
5. Motion components listed above.
6. Floating WhatsApp button bottom-right: maroon square-ish button with WhatsApp icon, expands to show "Chat with us" text on hover, sits above the mobile safe area.
7. A `/styleguide` page (not linked anywhere, noindex) showing every component and the palette, so we can review them in one place.
Stop after this for review.

## Page 1: Home (`/`)

Sections in order, full detail:
1. **Hero slider:** full-width, 16:9 desktop (max 86vh), 4:5 mobile. 4 slides from dummy data, each: image with SlowZoom, dark-to-transparent bottom-left scrim (solid ink at 45% opacity, not a colorful gradient) only behind the text area, small label (e.g. "WINTER 2026" small caps, gold), headline in Cormorant 88px desktop / 44px mobile using TextLines, one-line subtitle (one slide in Bangla using Hind Siliguri), a text link "Shop the collection →" in cotton with the growing underline. Bottom-right: counter "01 / 04" in Jost plus thin progress line that fills over 7s, prev/next arrow buttons. Autoplay 7s, pauses on hover and when tab hidden, swipe on mobile, crossfade 900ms between slides. Keyboard arrows work.
2. **Promise strip:** thin cotton band with hairline top/bottom, slow continuous marquee (40s loop, pauses on hover): "Nationwide Cash on Delivery · Wholesale & bulk orders · Easy exchange · Since 2023 · ঢাকা থেকে সারা দেশে". Gold dot separators.
3. **Editorial categories:** SectionHeader "01 — Shop by department". Asymmetric layout: one tall 2:3 image left (Women), right column two stacked 4:3 images (Men, Kids); below, a wide image (Winter) with text overlay left. Each tile: RevealImage, label bottom-left on a paper tag "02 — Men" + arrow, image scales 1.03 on hover over 700ms. Mobile: single column, tall images.
4. **New Arrivals:** SectionHeader "New arrivals" with "View all" link; horizontal scroll row of 8 ProductCards with snap, drag-to-scroll on desktop, prev/next buttons top-right, scroll progress bar under the row. Stagger on reveal.
5. **Story strip:** two columns: left RevealImage (fabric/workshop, 5:4), right: small gold label "OUR STORY", Cormorant headline (2 lines), 3 short lines about a family textile business from Dhaka since 2023, signature-style line "— Fakir & Son's" in Cormorant italic, text link "Read our story →" to /about. Mobile stacks.
6. **Best sellers:** 4-column grid (2 on mobile) of ProductCards with Stagger, and a category filter as quiet text tabs above (All · Men · Women · Kids) that switches with a 200ms crossfade.
7. **Wholesale band:** wine #2B0A0C background, cotton text. Left: gold label "WHOLESALE & B2B", Cormorant headline "Buying in bulk?", 2 lines of text, 3 small numbered facts in a row (e.g. "10+ pcs tier pricing", "Trade invoice", "Nationwide delivery"). Right: two buttons "Apply for wholesale" (cotton solid) and "Request a quote" (cotton outline). Thin gold hairline frame inset 16px around the band.
8. **Textile equipment:** SectionHeader "03 — Textile equipment". Catalogue list, not cards: each row has a small square image, model name, 2–3 key specs separated by dots, "from ৳ X", and "Details →". Rows separated by hairlines; on hover the row background turns paper and the image enlarges slightly. 4 rows + "View catalogue" link.
9. **Packaging / brand moment:** full-width cotton section with the bags design image (from Images/) and one Cormorant line, e.g. "Wrapped with care, every order." RevealImage.
10. **Trust row:** 4 columns with hairline dividers, each a thin-line icon (custom simple SVG, 1.25px stroke), a short title and one line: Cash on delivery nationwide · 7-day exchange · Secure payment · Visit our showroom.
11. **Newsletter:** cotton band, Cormorant "Letters from the shop", email input + maroon button, small privacy note, success toast.
Header and footer already exist. Stop for review.

## Page 2: Category listing (`/category/[slug]` and `/category/[slug]/[sub]`)

- Top: Breadcrumb, then a banner: wide 4:1 RevealImage with category name in Cormorant over a light scrim bottom-left, numbered label, and product count. Below the banner, subcategory chips as text tabs (All · Panjabi · Shirt · Trouser ...).
- Toolbar (sticky under header): result count left; right: Sort dropdown (Featured, Newest, Price low–high, Price high–low, Best selling), grid density toggle (2/3/4 columns desktop, 1/2 mobile), and "Filters" button on mobile.
- Desktop left sidebar 260px, sticky: Accordion groups: Size (square buttons), Color (swatches with names), Price (dual range slider + min/max inputs in ৳), Fabric (checkboxes), Availability (in stock only toggle), On sale toggle. Active filters show as removable chips above the grid with "Clear all". Filters update URL query params so links are shareable.
- Mobile: Filters open in a bottom Sheet with "Show N results" button.
- Grid of ProductCards with Stagger, "Load more" button showing "Showing 12 of 48" and a thin progress line. Skeleton cards while loading.
- Empty state when filters match nothing: Cormorant line, suggestion text, "Clear filters" button.
- Below grid: short SEO paragraph about the category in stone text.
Stop for review.

## Page 3: Product detail (`/product/[slug]`)

- Breadcrumb.
- Desktop two columns (58/42). Left gallery: vertical thumbnails column + main image 3:4; click main image opens a fullscreen lightbox with zoom (pinch on mobile, click-to-zoom with pan on desktop), arrow keys work. Thumbnail active state = maroon hairline. Mobile: swipeable full-width gallery with dot-line indicators.
- Right panel sticky: small category label, product name in Cormorant 40px, PriceTag (large), "Inclusive of VAT" small stone text, short description (2 lines), Color: swatches with selected color name shown, Size: SizeButtons with sold-out sizes crossed out and disabled, "Size guide" text link opens Modal with a size table and how-to-measure illustration (simple line SVG), Quantity stepper, buttons: "Add to bag" (primary, full width) + "Buy now" (outline), wishlist text button. Stock note ("Only 3 left" in madder when low). Delivery estimate line: "Inside Dhaka 1–2 days · Outside Dhaka 3–5 days". Small trust line with COD and exchange.
- Wholesale block (when dummy `isWholesale` is true): paper box with hairline border, title "Wholesale pricing", tier table (qty range → price per piece), MOQ note, live total that updates with quantity, and "Request a quote" link.
- Adding to bag: button shows a brief check state, the cart drawer opens, header badge count animates (number slides up).
- Below: Tabs: Description · Fabric & care · Delivery & exchange. Care tab uses small line icons for washing instructions.
- "Complete the look" row (3–4 products) and "You may also like" horizontal row.
- Mobile: a sticky bottom bar appears after scrolling past the main Add to bag, with price and "Add to bag".
- JSON-LD Product schema.
Stop for review.

## Page 4: Search and mega-menu

- Search: clicking the search icon opens a full-width panel sliding down under the header (paper background): large input in Cormorant 32px, "Popular searches" text links, and live results as you type (debounced 250ms): up to 6 products with thumbnail, name, price, and category suggestions. Enter goes to `/search?q=`. Esc closes. Mobile: full-screen sheet.
- `/search` page: query in the title ("Results for "panjabi""), same grid and filters as category page, empty state with suggestions.
- Mega-menu: on hover/focus of a nav item, a panel drops (200ms) under the header: 3 columns of subcategory links (small caps group titles), and on the right one or two featured images with captions linking to collections. Closes on mouse leave with 150ms delay, works by keyboard. Mobile drawer: nested accordion with the same content.
Stop for review.

## Page 5: Cart (drawer + `/cart`)

- Cart state: React context + localStorage, typed, with add/remove/update qty, and server-ready shape (variant id, qty).
- Drawer from right, 440px wide (full width on mobile), paper background: title "Your bag (3)", free-delivery progress line ("Add ৳ 650 more for free delivery inside Dhaka"), line items (thumbnail 3:4, name, color/size, qty stepper, price, remove with undo toast), subtotal, note "Delivery calculated at checkout", buttons "Checkout" (primary) and "View bag" (text). Empty state: Cormorant line + "Continue shopping" + 4 suggested products. Items animate out on remove (height collapse 250ms).
- `/cart` page: two columns: items table left, order summary right (subtotal, discount, delivery estimate, total, coupon field, Checkout). "You may also like" row below.
Stop for review.

## Page 6: Checkout (`/checkout`) and order success

- Minimal header on checkout (logo + "Secure checkout" + phone number), no nav, no footer links except policies.
- Desktop two columns: form left, sticky order summary right (collapsible "Show order summary" on mobile).
- Sections with numbered labels: 01 Contact (name, phone with BD validation 01XXXXXXXXX, email optional), 02 Delivery address (division select → district select filtered by division → area/thana, full address, optional note), 03 Delivery (radio cards: Inside Dhaka ৳ 70, Outside Dhaka ৳ 130, with day estimates; values from lib/site.ts), 04 Payment (radio cards: Cash on Delivery active; bKash, Nagad, Card shown disabled with "Coming soon"), Terms checkbox, "Place order" button with total.
- Validation with react-hook-form + zod, inline errors, scroll to first error.
- Placing order: button loading state, then go to `/order/[id]/success`.
- Success page styled like a stamped shop receipt: paper card with perforated top/bottom edge (CSS), logo, "Thank you, {name}", order number, date, items, totals, delivery address, a maroon circular "RECEIVED" stamp rotated -8° that animates in (scale 1.3 → 1, 300ms), buttons "Continue shopping" and "Track order", and a Print button that prints only the receipt.
Fake order id for now. Stop for review.

## Page 7: Auth pages (UI only)

- `/login`, `/signup`, `/forgot-password`, `/reset-password`: split layout: left 50% RevealImage fabric photo with a Cormorant quote and the logo; right the form centered (max 400px). Mobile: image becomes a short top banner.
- Fields with labels, show/hide password, password strength line on signup, phone field on signup, "Remember me", links between pages, error and success states, loading button.
- `/admin/login`: different: centered small card on cotton, full logo, "Staff sign in" label, email + password, no signup or social links, discreet footer "Authorized staff only".
UI only, no Supabase calls yet. Stop for review.

## Page 8: Account (`/account/*`)

- Layout: left sidebar on desktop (Overview, Orders, Addresses, Profile, Wholesale, Sign out), horizontal scroll tabs on mobile. Greeting in Cormorant "Welcome back, {name}".
- Overview: 3 quiet tiles (Orders, In transit, Wishlist), latest order card, wholesale status card.
- Orders list: table on desktop / cards on mobile: order no, date, items count, total, status badge, "View".
- Order detail: items, totals, address, and a vertical status timeline (Placed → Confirmed → Shipped → Delivered) with dates; current step in maroon; cancelled shows madder. "Download invoice" button.
- Addresses: cards with default tag, add/edit in a Sheet, delete with confirm.
- Profile: name, phone, email, change password.
- Wholesale: status states (not applied / pending / approved / rejected) each with its own message and action.
Dummy data. Stop for review.

## Page 9: Wholesale (`/wholesale`)

- Hero: wine background, gold label "WHOLESALE & B2B", Cormorant headline, short text, two buttons (Apply now scrolls to form, Request a quote).
- "Why buy from us": 4 items in a hairline grid with simple line icons.
- "How it works": 3 numbered steps in a horizontal line connected by a thin gold line that draws in on scroll (Apply → Get approved in 24–48h → Order at tier prices).
- Tier pricing example table and MOQ explanation.
- Categories available for wholesale (image strip).
- FAQ accordion (wholesale-specific).
- Apply form in a paper panel: company name, owner name, phone, email, trade license number, business type (select), address, district, expected monthly volume (select), file upload for trade license (drag-and-drop zone), notes, submit. Success state replaces form with a confirmation and next steps.
Stop for review.

## Page 10: Request a quote (`/quote`)

- Intro with Cormorant title and one line.
- Dynamic product rows: product search select (from dummy products + equipment), quantity, size/color or spec note, remove row; "Add another item" button. Rows animate in/out.
- Contact block (prefilled if logged in), delivery district, needed-by date, attachment upload, notes.
- Summary sidebar showing items count and "We reply within 24 hours".
- Success state: receipt-style confirmation with quote reference number.
Stop for review.

## Page 11: Textile equipment (`/textile-equipment` and `/textile-equipment/[slug]`)

- Listing: catalogue feel. Header with Cormorant title and intro. Filter tabs by machine type. Each item as a wide row: image 4:3 left, model + brand, spec chips (e.g. "Speed 5000 spm · Single needle · 220V"), from-price, "View details" and "Request quote". Hairline separated. Optional toggle between list and grid view.
- Detail: gallery left, right: model in Cormorant, brand, from-price, availability, key specs list, "Request quote" (primary), "Call us" and "WhatsApp" buttons with the real number. Below: full spec table (two columns, zebra in paper), "What's in the box", warranty and service info, downloadable brochure button (placeholder PDF), related equipment row.
Stop for review.

## Page 12: About (`/about`)

- Opening: full logo large and centered on cotton, "Est. 2023 · Dhaka" with gold rules, one Cormorant sentence.
- Story in alternating image/text blocks (3 blocks) with RevealImage; text placeholders clearly marked `TODO:` for us to replace.
- Values: 3 columns with numbers (01 Quality cloth, 02 Fair price, 03 Honest service).
- Packaging image from Images/ with a caption.
- Timeline from 2023 to now (placeholder milestones marked TODO), horizontal on desktop, vertical on mobile, line draws in on scroll.
- Closing CTA: "Visit us or shop online" with two buttons.
Stop for review.

## Page 13: Contact (`/contact`) and Store locations (`/store-locations`)

- Contact: two columns: left contact cards (Phone with tel link, WhatsApp, Facebook, Email, Business hours), right contact form (name, phone, subject select, message) with success state. Below: map placeholder area (styled box with address, to be replaced by Google Maps embed).
- Store locations: list of stores from dummy data (name, address, hours, phone, "Get directions" link), each with a photo; selecting a store highlights it. Placeholder data marked TODO.
Stop for review.

## Page 14: FAQ, policies, 404, loading

- `/faq`: grouped accordions (Orders, Delivery, Payment, Exchange & returns, Wholesale) with a search box filtering questions, and "Still need help?" contact block.
- Policy pages `/policies/delivery`, `/policies/return-exchange`, `/policies/refund`, `/policies/privacy`, `/policies/terms`: shared layout with left sticky table of contents (scroll-spy highlights current section), readable column max 68ch, "Last updated" date, placeholder text for a Bangladeshi clothing business marked TODO.
- Custom 404: Cormorant "This page has gone out of stock.", search box, links to main categories, 4 popular products.
- Global `loading.tsx` with a quiet skeleton, and `error.tsx` with retry.
- Final pass: every header, footer and in-page link points to a real page; run a broken-link check; Lighthouse on home, category and product pages (aim 90+ performance and accessibility on mobile) and fix the top issues.
Commit, push, stop for review.

---

## After the storefront

Admin panel design (dashboard, orders, products, categories, customers, wholesale, quotes, homepage banners) gets its own prompts, then Supabase auth and real data replace the dummy data page by page.
