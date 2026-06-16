# Plan: Admin CMS + Product DB Integration

**Goal:** Replace static `BestSellers` data with a Postgres-backed product catalog, an Resend-style admin dashboard at `/admin`, product CMS at `/admin/product`, UploadThing image uploads, and env-token admin auth.

**Status:** Reviewed via Context7 — ready to implement.

---

## Tech stack (current repo)

| Layer | Choice | Version (repo) |
|-------|--------|----------------|
| App framework | TanStack Start + TanStack Router (file routes) | `@tanstack/react-start` ^1.167 |
| API | tRPC v11 + `@trpc/tanstack-react-query` | catalog |
| DB | Drizzle ORM + Neon HTTP | `packages/db` |
| Customer auth | Better Auth (sessions) | separate from admin |
| Uploads | UploadThing | **to add** (`uploadthing`, `@uploadthing/react`) |
| Env validation | `@t3-oss/env-core` | `packages/env` |
| Package manager | Bun | root `package.json` |

---

## Decisions (grill session)

| Area | Decision |
|------|----------|
| Admin auth | `/admin/login` validates `ADMIN_TOKEN` → httpOnly cookie |
| Admin session | 24h TTL; `Secure` in production; **`SameSite=Lax`** (TanStack Start auth pattern) |
| Admin guard | Pathless `_admin` layout `beforeLoad` + `adminProcedure` on tRPC + UploadThing middleware |
| Product schema | Full PRD fields in DB; CMS UI exposes name, price, image, colors, category, status only |
| Categories | `pgEnum`: `tees`, `hoodies`, `jackets`, `accessories` |
| Price | Integer whole Rupiah |
| Identifiers | UUID `id` for admin URLs/cart; unique `slug` for seed upsert + future PDP |
| Images | `images` jsonb `string[]`; MVP single element; UploadThing + optional URL fallback |
| Upload auth | Admin cookie only in UploadThing `.middleware()` |
| Dashboard `/admin` | KPI cards + recent 5 products |
| Product CMS | Table at `/admin/product`; create `/admin/product/new`; edit `/admin/product/$id` (UUID) |
| Delete | Archive (`status = archived`), no hard delete |
| Seed | Idempotent script upserting on `slug` |
| Homepage | Loader + public tRPC; `active` + `in_stock` only |
| Rating/reviews | Dropped from MVP |

---

## Architecture

```mermaid
flowchart LR
  subgraph public [Public site]
    Index["/ loader"]
    BestSellers["BestSellers"]
    Index --> BestSellers
  end

  subgraph admin [Admin CMS]
    Login["/admin/login"]
  AdminDash["/admin"]
  Products["/admin/product"]
  Login -->|cookie| AdminDash
  AdminDash --> Products
  end

  subgraph api [Server]
    tRPC["tRPC products router"]
    UT["/api/uploadthing"]
    AdminFn["createServerFn admin session"]
  end

  subgraph db [Neon Postgres]
    ProductsTable["products table"]
  end

  BestSellers --> tRPC
  Products --> tRPC
  Products --> UT
  Login --> AdminFn
  tRPC --> ProductsTable
  UT -->|URL in images[0]| ProductsTable
```

---

## Database schema

**File:** `packages/db/src/schema/product.ts`

```ts
// Enums (pgEnum)
productCategoryEnum   // tees | hoodies | jackets | accessories
productStatusEnum     // draft | active | archived
productStockStatusEnum // in_stock | out_of_stock | low_stock

// Table: products
id            uuid PK defaultRandom()
slug          text unique notNull
name          text notNull
description   text notNull default ''
category      productCategoryEnum notNull
price         integer notNull          // whole Rupiah
images        jsonb.$type<string[]>().notNull().default([])  // MVP: [url]
colors        jsonb.$type<string[]>().notNull().default([])
sizes         jsonb.$type<string[]>().notNull().default([])   // not in CMS yet
stockStatus   productStockStatusEnum notNull default 'in_stock'
stockQuantity integer notNull default 100                     // not in CMS yet
status        productStatusEnum notNull default 'draft'
createdAt     timestamp defaultNow
updatedAt     timestamp defaultNow.$onUpdate(() => new Date())
```

**Migration note:** Use `bun run db:push` (repo convention) after exporting schema from `packages/db/src/schema/index.ts`. No migrations folder populated yet.

---

## Environment variables

Add to `packages/env/src/server.ts`:

| Variable | Purpose |
|----------|---------|
| `ADMIN_TOKEN` | `z.string().min(16)` — operator login secret |
| `UPLOADTHING_TOKEN` | UploadThing SDK token (from dashboard) |

Create `apps/web/.env.example` documenting all server vars (including existing `DATABASE_URL`, Better Auth vars).

**Note:** UploadThing v7 uses `UPLOADTHING_TOKEN` only — no separate `UPLOADTHING_APP_ID` in current docs.

---

## Admin session (TanStack Start pattern)

**Do not** use a raw `/api/admin/login` route. Use `createServerFn` + cookie helpers per TanStack Start auth docs.

| File | Purpose |
|------|---------|
| `apps/web/src/server/admin-session.ts` | `setAdminCookie`, `clearAdminCookie`, `readAdminToken`, `verifyAdminSession` |
| `apps/web/src/functions/admin-auth.ts` | `adminLogin` (POST), `adminLogout` (POST), `getAdminSession` (GET) |

Cookie helpers use `getRequestHeader` / `setResponseHeader` from `@tanstack/react-start/server`.

```ts
// Cookie name: clth-admin-session (dev-friendly; avoid __Host- prefix unless prod-only Secure is guaranteed)
// Attributes: HttpOnly; Path=/; Max-Age=86400; SameSite=Lax; Secure in production
```

**Login flow:**

1. User submits token on `/admin/login`
2. `adminLogin` compares to `env.ADMIN_TOKEN` (constant-time compare via `crypto.timingSafeEqual` on equal-length buffers)
3. On success: set signed/random session value in cookie (store hash in cookie OR sign token — MVP: set cookie value = HMAC of admin marker + expiry, verify on read)
4. `beforeLoad` on `_admin` calls `getAdminSession`; redirect to `/admin/login` if invalid

**UploadThing middleware** calls the same `verifyAdminSession(request)` helper.

---

## UploadThing integration

**Migration note:** UploadThing's TanStack Start guide references deprecated `createAPIFileRoute` from `@tanstack/start/api`. This project uses **`createFileRoute` + `server.handlers`** (same as `/api/trpc/$`). Follow the project pattern, not the outdated guide.

### Packages

```bash
bun add uploadthing @uploadthing/react --filter web
```

### Files

| File | Purpose |
|------|---------|
| `apps/web/src/server/uploadthing.ts` | `createUploadthing` from **`uploadthing/server`**; `imageUploader` route, max 1 file, admin middleware |
| `apps/web/src/routes/api/uploadthing/$.ts` | `createRouteHandler` from **`uploadthing/server`** |
| `apps/web/src/utils/uploadthing.ts` | `generateUploadButton` / `generateUploadDropzone` from `@uploadthing/react` |

### API route (match existing tRPC pattern)

```ts
// apps/web/src/routes/api/uploadthing/$.ts
import { createFileRoute } from "@tanstack/react-router";
import { createRouteHandler } from "uploadthing/server";
import { uploadRouter } from "@/server/uploadthing";

const handlers = createRouteHandler({
  router: uploadRouter,
  config: { token: process.env.UPLOADTHING_TOKEN },
});

export const Route = createFileRoute("/api/uploadthing/$")({
  server: {
    handlers: {
      GET: ({ request }) => handlers(request),
      POST: ({ request }) => handlers(request),
    },
  },
});
```

### File router middleware

```ts
import { createUploadthing, UploadThingError } from "uploadthing/server";
import { verifyAdminSession } from "@/server/admin-session";

const f = createUploadthing();

export const uploadRouter = {
  productImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      if (!verifyAdminSession(req)) {
        throw new UploadThingError("Unauthorized");
      }
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      // Return URL to client via UploadThing response (file.ufsUrl or file.url per SDK version)
      return { url: file.ufsUrl };
    }),
};
```

**SDK note:** Require `uploadthing` ^6.7+ for automatic callback verification (per UploadThing auth docs).

### Product form image UX

- Primary: `UploadButton` endpoint `productImage`
- Fallback: optional URL text input → writes `images[0]`
- Validation: require `images[0]` as valid `https` URL before save

---

## tRPC products router

**File:** `packages/api/src/routers/products.ts`

| Procedure | Auth | Description |
|-----------|------|-------------|
| `products.listActive` | public | `status = active` AND `stockStatus = in_stock`; optional `limit` |
| `products.list` | admin | All products + filters (status, category) |
| `products.getById` | admin | Single product by UUID |
| `products.stats` | admin | KPI counts for dashboard |
| `products.recent` | admin | Last 5 by `updatedAt` |
| `products.create` | admin | Create product |
| `products.update` | admin | Update product |
| `products.archive` | admin | Set `status = archived` |

**New procedure wrapper:** `packages/api/src/index.ts`

```ts
export const adminProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.adminSession) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { ...ctx, adminSession: ctx.adminSession } });
});
```

**Extend** `packages/api/src/context.ts` to call `verifyAdminSession(req)` and set `adminSession` alongside Better Auth `session`.

Wire router in `packages/api/src/routers/index.ts`.

---

## Routes (TanStack Router file map)

Mirror existing `_auth` + `dashboard` pattern with pathless `_admin` layout.

| File | URL | Guard |
|------|-----|-------|
| `routes/admin/login.tsx` | `/admin/login` | Public |
| `routes/_admin/route.tsx` | — | `beforeLoad` → `getAdminSession` |
| `routes/_admin/admin/index.tsx` | `/admin` | Dashboard KPIs + recent products |
| `routes/_admin/admin/product/index.tsx` | `/admin/product` | Product table |
| `routes/_admin/admin/product/new.tsx` | `/admin/product/new` | Create form |
| `routes/_admin/admin/product/$id.tsx` | `/admin/product/$id` | Edit form (UUID param) |

**Login redirect:** Unauthenticated `_admin` access → `/admin/login?redirect=<href>` (TanStack auth pattern).

---

## Homepage data loading

**File:** `apps/web/src/routes/index.tsx`

Add `loader` that prefetches `products.listActive` via tRPC (same pattern as SSR query integration in `router.tsx` / `__root.tsx`).

Pass products into `LandingPage` → `BestSellers` as props.

**File:** `apps/web/src/components/landing/best-sellers.tsx`

- Remove static `products` array
- Accept `products` prop; map `name` → display title, `images[0]` → image
- Cart `addItem` uses UUID `id`

---

## Admin UI (Resend-style reference)

**Layout component:** `apps/web/src/components/admin/admin-layout.tsx`

- Left sidebar: brand, nav (Dashboard, Products), logout
- Background `#F8F8F8`; content cards white, rounded, light border
- Active nav state on current route

**Dashboard cards:** Total, Active, Draft, Archived, Out of Stock (`stockStatus = out_of_stock`)

**Product table columns:** image thumb, name, category, price (formatted IDR), status, stock status, updated, actions (Edit / Archive)

Use existing `@CLTH/ui` / shadcn components where available.

---

## Seed script

**File:** `packages/db/src/seed.ts`

- Upsert 4 products by `slug`: `classic-tee`, `coastal-hoodie`, `wanderer-jacket`, `explorer-backpack`
- Map static `best-sellers.tsx` data (names, prices, colors, image URLs, categories)
- Set `status: active`, `stockStatus: in_stock`, `stockQuantity: 100`

**Root script:** `"db:seed": "bun run packages/db/src/seed.ts"`

Run after `bun run db:push`.

---

## Implementation checklist

### Phase 1 — Schema & env
- [ ] `packages/db/src/schema/product.ts` + export
- [ ] `packages/env` — `ADMIN_TOKEN`, `UPLOADTHING_TOKEN`
- [ ] `apps/web/.env.example`
- [ ] `bun run db:push`
- [ ] `packages/db/src/seed.ts` + root `db:seed` script

### Phase 2 — Admin auth
- [ ] `admin-session.ts` cookie helpers
- [ ] `admin-auth.ts` server functions
- [ ] `routes/admin/login.tsx`
- [ ] `routes/_admin/route.tsx` guard

### Phase 3 — tRPC products
- [ ] `adminProcedure` + context extension
- [ ] `products` router + wire to `appRouter`
- [ ] Zod input schemas for create/update

### Phase 4 — UploadThing
- [ ] Install packages
- [ ] `uploadthing.ts` file router + API route
- [ ] `utils/uploadthing.ts` React components

### Phase 5 — Admin UI
- [ ] `admin-layout.tsx`
- [ ] Dashboard page
- [ ] Product list, new, edit pages + shared product form

### Phase 6 — Public integration
- [ ] Index loader + `BestSellers` refactor
- [ ] Verify cart still works with UUID ids

### Phase 7 — Verification
- [ ] `bun run db:seed` → homepage shows 4 products
- [ ] Admin login → create/edit/archive product → homepage updates
- [ ] Upload image + URL fallback both work
- [ ] Unauthenticated `/admin` and upload → blocked

---

## Risks & notes

| Risk | Mitigation |
|------|------------|
| Cart localStorage has old string ids (`prod-t1`) | One-time cache mismatch; users re-add items. Document in PR. |
| `__Host-` cookie prefix | Use `clth-admin-session` for local dev; add `Secure` only in production |
| UploadThing guide outdated API route pattern | Use `createFileRoute` + `server.handlers` |
| `uploadthing/next` imports | Use `uploadthing/server` — not Next.js |
| Neon + jsonb defaults | Test `db:push` with empty array defaults |

---

## Plan review (Context7)

**Reviewed:** 2026-06-16  
**Libraries checked:** `/pingdotgg/uploadthing`, `/websites/tanstack_start`, `/drizzle-team/drizzle-orm-docs`

### Changes made

- **UploadThing API route:** Replaced deprecated `createAPIFileRoute` (`@tanstack/start/api`) with `createFileRoute` + `server.handlers`, matching existing `/api/trpc/$` in this repo.
- **UploadThing imports:** Specified `uploadthing/server` for `createUploadthing` and `createRouteHandler` (not `uploadthing/next`).
- **Env var:** Confirmed `UPLOADTHING_TOKEN` only; removed ambiguous `UPLOADTHING_APP_ID` from plan.
- **Admin session:** Aligned with TanStack Start auth docs — `createServerFn` + `setResponseHeader` cookie helpers; **`SameSite=Lax`** instead of `Strict`; cookie name without `__Host-` for local dev compatibility.
- **Drizzle schema:** Added concrete `pgEnum`, `uuid().defaultRandom()`, `jsonb.$type<string[]>()`, and `.$onUpdate` patterns from current Drizzle docs.
- **tRPC:** Explicit `adminProcedure` separate from Better Auth `protectedProcedure`; extend `createContext` with `adminSession`.
- **Route file map:** Aligned with pathless `_admin` + nested `admin/` pattern (mirrors `_auth/dashboard`).

### Follow-up reviews

- `@trpc/tanstack-react-query` loader prefetch pattern for index route (verify against installed v11 API during implementation)
- `@uploadthing/react` component generation API if SDK v7 differs from v6 examples
- TanStack Router exact file paths after `routeTree.gen.ts` regeneration (confirm `/admin` URL resolution)
