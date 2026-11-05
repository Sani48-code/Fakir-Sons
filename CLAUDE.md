# Project: Clothing & Textile Equipment Store

E-commerce site for a Bangladeshi clothing and textile equipment brand.
One Next.js project contains the customer storefront, the admin panel (`/admin`) and the server logic.
Supports retail (B2C) and wholesale (B2B) orders.

The developer builds this in small daily steps. Do one step at a time, explain what changed, and stop for review before moving to the next step.

NOTE: This Next.js version has breaking changes (see AGENTS.md). Read `node_modules/next/dist/docs/` before writing Next.js code. `middleware.ts` may now be `proxy` (see docs 16-proxy.md).

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase: Postgres, Auth, Storage (product images)
- `@supabase/ssr` for server/client Supabase clients
- Deployed on Vercel (auto-deploy from GitHub)
- Payments later: SSLCommerz or aamarPay; start with Cash on Delivery only

## Folder structure

```
app/
  (shop)/            customer storefront: home, products, cart, checkout, account
  admin/             admin panel (admin role only): dashboard, orders, products, customers, wholesale, quotes
  api/               route handlers (webhooks, payment callbacks)
lib/supabase/        client.ts, server.ts, middleware helpers
supabase/migrations/ all schema changes as SQL migration files
middleware.ts        refreshes auth session, protects /admin
```

## Roles

Stored in `profiles.role`: `customer` | `wholesale` | `admin`.
- customer: retail prices
- wholesale: approved by admin; sees tier prices, must meet MOQ, can request quotes
- admin: full access to /admin

## Database (initial)

- profiles: id (= auth.users.id), name, phone, role, company_name, trade_license, wholesale_status (none/pending/approved/rejected)
- addresses: id, user_id, district, area, full_address, is_default
- categories: id, name, slug, parent_id
- products: id, category_id, name, slug, description, type (clothing/equipment), moq, active
- product_variants: id, product_id, sku, size, color, stock, retail_price
- price_tiers: id, variant_id, min_qty, wholesale_price
- product_images: id, product_id, url, position
- orders: id, user_id, order_type (retail/wholesale), status, payment_status, payment_method, subtotal, delivery_fee, total, created_by (customer/admin), shipping address snapshot, note
- order_items: id, order_id, variant_id, product_name snapshot, qty, unit_price
- order_status_log: id, order_id, old_status, new_status, changed_by, note, created_at
- quote_requests: id, user_id, status (pending/quoted/accepted/rejected), note, admin_note, quoted_total
- quote_items: id, quote_id, product_id, variant_id, qty, spec_note, quoted_unit_price

Order status: pending → confirmed → processing → shipped → delivered; also cancelled, refunded.
Store `unit_price` and name snapshots in order_items so later price changes don't alter old orders.

## Rules

- Every schema change goes in a new file in `supabase/migrations/`. Never assume tables were created by hand.
- RLS enabled on every table. Customers read/write only their own rows; admins access all; product catalog is publicly readable when active.
- Never expose `SUPABASE_SECRET_KEY` to the client. Use it only in server code.
- Every admin mutation (server action or route handler) must check the caller's role is `admin` on the server.
- Stock must be decremented in a database function/transaction when an order is confirmed, not in client code.
- Prices are always calculated on the server, never trusted from the client.
- Money stored as numeric (BDT), never float.
- Use TypeScript types generated from Supabase (`supabase gen types`).

## Storefront UI

Reference style: clean, image-led fashion storefront typical of Bangladeshi clothing brands.
Use our own brand name, logo, photos and copy. Never copy another brand's logo, images or text.

### Global layout
- Announcement bar (thin, brand accent color): hotline number, free delivery / offer text; right side: Account, Store locations, Wholesale login.
- Header: logo left, category nav center (Men, Women, Kids, Winter, Textile Equipment, Wholesale, Sale in red), icons right (search, account, wishlist, cart with count badge).
  - On home page: transparent over the hero image, turns solid on scroll. Sticky on all pages.
  - Nav items open a mega-menu dropdown with subcategories.
  - Mobile: hamburger drawer + bottom icons.
- Floating "Chat with us" button bottom-right (WhatsApp / Messenger link).
- Footer (dark background): logo + social icons; columns: Categories, Information (About, Contact, FAQ, Store locations), Policies (Delivery, Return & Exchange, Refund, Privacy, Terms), Contact (phone, email, address); newsletter input with accent arrow button; payment methods strip (Visa, Mastercard, bKash, Nagad, Rocket, COD); copyright bar.

### Home page sections (top to bottom)
1. Full-width hero slider: large image, headline (display serif + bold sans), subtext, "Shop Now" button bottom-left.
2. Promo / sale banner (full width).
3. Category image grid: large lifestyle photos with category label tag in the corner (2 columns desktop, 1 on mobile).
4. "Shop by Category": horizontal row of circular images with names, scrollable on mobile.
5. Product rows: New Arrivals, Best Sellers, a featured collection. Product card: image (second image on hover), name, price in ৳ with strikethrough original price when discounted, sale badge, quick add-to-cart.
6. Wholesale / B2B band: "Bulk order? Get wholesale prices" with Apply for Wholesale + Request a Quote buttons.
7. Textile equipment showcase (separate section, spec-focused cards).
8. Optional video section (YouTube embed) and Instagram link.
9. Trust badges row: Nationwide Cash on Delivery, Store locations, Easy return, Secure digital payment.
10. Newsletter band (accent background).

### Hero banners and home sections are admin-managed
Add tables: `banners` (id, image_url, mobile_image_url, title, subtitle, button_text, link, position, placement: hero/promo, active, sort_order) and `home_sections` (id, title, type: category_grid/product_row/video, config jsonb, sort_order, active). Admin panel gets a "Homepage" page to edit them.

### Other storefront pages
- Category page: filters sidebar (size, color, price range, availability), sort dropdown, product grid, pagination or load more.
- Product page: image gallery with zoom, name, price (retail, or tier table if wholesale user), size/color selector, size guide modal, quantity, Add to cart / Buy now, MOQ notice for wholesale, description and specs tabs, related products.
- Cart drawer (slides from right) + full cart page; checkout single page.

### Style tokens
- Font: display serif for hero headlines (e.g. Playfair Display), clean sans for UI (e.g. Jost or Inter), via next/font.
- Colors: near-black text #1a1a1a, white background, dark footer #2b2b2b, one accent (brand color; yellow #F5C518 placeholder until brand color is decided), sale red #D62828.
- Lots of whitespace, square or slightly rounded corners, large photography, minimal borders.
- Mobile-first; images via next/image with Supabase Storage URLs.

## Env variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=   # used by lib/supabase/client.ts and server.ts
NEXT_PUBLIC_SUPABASE_ANON_KEY=          # legacy, not used by our clients
SUPABASE_SECRET_KEY=                    # server only (createAdminClient in lib/supabase/server.ts)
POSTGRES_URL= / POSTGRES_URL_NON_POOLING= / POSTGRES_PRISMA_URL=   # from the Vercel integration
```
Supabase is connected via the Vercel integration; values live in `.env.local` (gitignored). `.env.example` lists names only.
Connection check: `GET /api/health/supabase`.

## Roadmap

1. Week 1: setup, Supabase auth (signup/login/logout), profiles + roles, /admin protection, all migrations + RLS
2. Week 2: admin product management: categories, products, variants, stock, image upload, price tiers
3. Week 3: storefront: home, category pages, product page with variant select, search/filter
4. Week 4: cart, address, checkout, order creation (COD)
5. Week 5: admin orders: list/filter, details, status change with log, cancel, invoice print, manual order entry
6. Week 6: wholesale: apply form, admin approval, tier pricing, MOQ check, quote request → admin quote → accept → order
7. Week 7: customer account (my orders, tracking), payment gateway
8. Week 8: dashboard reports, SEO, notifications, testing, domain

## Current progress

- [ ] Week 1 Day 1: project created, Supabase connected, Vercel deployed
- [ ] Storefront global layout (announcement bar, header, mobile drawer, footer) — built, awaiting review
