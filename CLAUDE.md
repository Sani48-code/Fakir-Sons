# Project: Clothing & Textile Equipment Store

E-commerce site for a Bangladeshi clothing and textile equipment brand.
One Next.js project contains the customer storefront, the admin panel (`/admin`) and the server logic.
Supports retail (B2C) and wholesale (B2B) orders.

The developer builds this in small daily steps. Do one step at a time, explain what changed, and stop for review before moving to the next step.

NOTE (Windows path): this folder's path contains `&` and `'`, so `npx` and the usual `.bin` shims do not work here. Always run CLI tools through node directly, e.g. `node node_modules/next/dist/bin/next build`, `node node_modules/eslint/bin/eslint.js .`, `node node_modules/typescript/bin/tsc --noEmit`. The `package.json` scripts already do this (relative paths, so they also work on Vercel/Linux).

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

Visual design (palette, fonts, shapes, motion, header/footer, logo rules) lives in `DESIGN.md`. The page-by-page storefront build plan (components, sections, behaviour) lives in `PROMPTS.md`. Both are the source of truth; where they disagree with this file, follow them. Do not describe visuals here.

Use our own brand name, logo, photos and copy. Never copy another brand's logo, images or text.

### Content sources
- Business info: `lib/site.ts`. Dummy content: `lib/dummy.ts`. Image URLs: `lib/images.ts`. Dummy data is replaced by Supabase data page by page later.
- Money format: `lib/format.ts` (`taka()`, BDT with lakh grouping).

### Hero banners and home sections are admin-managed (database plan, keep)
Tables: `banners` (id, image_url, mobile_image_url, title, subtitle, button_text, link, position, placement: hero/promo, active, sort_order) and `home_sections` (id, title, type: category_grid/product_row/video, config jsonb, sort_order, active). The admin panel gets a "Homepage" page to edit them.
Until then, hero slides come from `HERO_SLIDES` in `lib/dummy.ts`, shaped so they can be swapped for rows from `banners` (placement = hero) later.

### Other storefront pages
Category, product, cart drawer + cart page, single-page checkout, search, wholesale, quote, textile equipment, account, auth, about, contact, FAQ and policy pages are specified in `PROMPTS.md`.

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
- [x] Storefront global layout (announcement bar, header, mobile drawer, footer): built
- [x] Storefront PROMPTS.md Page 0 (foundation): built
- [x] Storefront PROMPTS.md Page 1 (home, winter as lead campaign): built
- [ ] Home redesign (premium editorial photo library, full-viewport hero, 1600px layout, New season + Winter edit): built, awaiting review
