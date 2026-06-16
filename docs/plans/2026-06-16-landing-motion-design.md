# Plan: Landing Page Motion Design

**Goal:** Add purposeful, premium motion to all landing page components — scroll reveals, choreographed entrances, and polished micro-interactions — without hurting performance or accessibility.

**Status:** Plan only — ready to implement in phases.

---

## Motion personality: Premium

CLTH is a sustainable outdoor apparel brand. Motion should feel **elegant, minimal, and confident** — not playful or corporate-dashboard stiff.

| Constant | Value | Rationale |
|----------|-------|-----------|
| **Signature easing** | `cubic-bezier(0.4, 0, 0.2, 1)` | Smooth deceleration; luxury feel |
| **Emphasized entrance** | `cubic-bezier(0.05, 0.7, 0.1, 1)` | MD3 emphasized — hero headlines |
| **Exit easing** | `cubic-bezier(0.3, 0, 1, 1)` | Accelerate out for drawers/overlays |
| **Duration — quick** | 200ms | Hover, press, icon feedback |
| **Duration — standard** | 350ms | Cards, section headers, list items |
| **Duration — slow** | 500ms | Hero, modals, page-level reveals |
| **Entrance pattern** | `opacity 0→1` + `translateY 20px→0` | Spatial + fade; never opacity-only for important content |
| **Stagger budget** | 50ms delay, max 400ms total | Standard cascade per motion-design skill |

### Three motion layers (every major section)

1. **Primary** — headline or hero image (what the eye follows)
2. **Secondary** — supporting copy, CTAs, icons (50–100ms after primary)
3. **Ambient** — subtle background life (ken-burns on hero, soft shadow shift on cards)

---

## Current state

| Area | Today |
|------|-------|
| Animation library | None in `apps/web` |
| Landing motion | CSS `transition-*` only (hover zoom 700ms, drawer slide 300ms) |
| Scroll reveals | None |
| Hero carousel | Decorative buttons — no state or animation |
| `tw-animate-css` | Available via `@CLTH/ui` but unused on landing |

**Existing durations to preserve:** 700ms image hover zoom, 300ms overlay/drawer — new scroll animations should not fight these.

---

## Library choice

| Option | Verdict |
|--------|---------|
| **`motion` (Framer Motion v12+)** | **Recommended** — React 19 friendly, `whileInView`, springs, layout animations, small bundle when tree-shaken |
| CSS + Intersection Observer | Zero deps but poor orchestration for stagger/choreography |
| GSAP | Overkill for UI reveals; larger bundle |

```bash
# Phase 0
bun add motion --filter web
```

---

## Architecture

```
apps/web/src/
├── lib/motion/
│   ├── tokens.ts          # easings, durations, stagger constants
│   ├── variants.ts        # shared variant objects (fadeUp, fadeIn, slideFromLeft…)
│   └── use-reduced-motion.ts
└── components/motion/
    ├── motion-provider.tsx   # LazyMotion + domAnimation (bundle size)
    ├── reveal.tsx            # whileInView wrapper (once, margin)
    ├── stagger.tsx           # StaggerChildren + StaggerItem
    └── pressable.tsx           # optional: scale press feedback
```

### Core primitives

**`Reveal`** — scroll-triggered entrance

```tsx
// viewport: { once: true, margin: "-80px" }
// initial: { opacity: 0, y: 20 }
// animate: { opacity: 1, y: 0 }
// transition: { duration: 0.35, ease: EASE_PREMIUM }
```

**`Stagger`** — children cascade (50ms, max 8 visible items before cap)

**`useReducedMotion`** — when true: skip translate/scale, instant opacity or no animation

### Performance rules

- Use `LazyMotion` + `domAnimation` feature set (not full `motion` bundle)
- `viewport={{ once: true }}` on all scroll reveals — no repeat on scroll-back
- No animating `width`/`height`/`top`/`left` — only `transform` + `opacity`
- Hero ken-burns: CSS `@keyframes` on background (GPU-friendly) or `scale` on image layer
- Target: no CLS from animations; respect PRD Lighthouse ≥ 85 mobile

### Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  /* fallbacks in use-reduced-motion hook */
}
```

- All motion gated through `useReducedMotion`
- Drawers retain open/close (functional) but use shorter/no spring overshoot
- No auto-playing carousel without pause control (WCAG)

---

## Landing page — component-by-component spec

### Implementation order

```
Phase 0  Infrastructure (tokens, primitives, provider)
Phase 1  Hero + Navbar          ← first impression
Phase 2  Features + Categories  ← trust + discovery
Phase 3  BestSellers            ← commerce focus
Phase 4  Sustainability + Newsletter
Phase 5  Footer + CartSheet polish
```

---

### 1. Navbar (`navbar.tsx`)

| Layer | Animation | Timing |
|-------|-----------|--------|
| Primary | Logo + nav links fade-down on mount | 350ms, no stagger on logo |
| Secondary | Cart badge pop when count changes | scale 0→1, 200ms ease-out-back (light overshoot) |
| Ambient | Scroll: add `backdrop-blur` + subtle shadow after 20px scroll | 200ms opacity transition |

**Mobile drawer upgrade**

| State | Motion |
|-------|--------|
| Open | Panel `translateX(-100%→0)`, overlay fade in — 350ms emphasized ease-out |
| Close | Panel ease-in accelerate, 250ms (exit shorter than entrance) |
| Links | Stagger in 40ms after panel lands |

**Do not:** animate sticky position itself.

---

### 2. Hero (`hero.tsx`)

| Layer | Animation | Timing |
|-------|-----------|--------|
| Primary | Headline lines stagger (line 1 → line 2) | 500ms emphasized, 80ms between lines |
| Secondary | Subcopy fade-up 100ms after headline | 350ms |
| Secondary | CTA buttons fade-up + slight scale 0.96→1 | 350ms, 50ms stagger between buttons |
| Ambient | Background slow ken-burns scale 1→1.05 over 20s loop | CSS keyframes, infinite alternate |
| Ambient | Dark overlay subtle pulse on load (opacity 0.15→0.20→0.20) | one-shot 800ms |
| Interactive | Scroll-down chevron gentle bounce | 2s sine loop, `prefers-reduced-motion: none` only |

**Hero carousel (optional Phase 1b)**

Wire prev/next to 2–3 slides with crossfade + slight horizontal parallax:

- Exit: opacity 1→0, x 0→-30px, 300ms accelerate
- Enter: opacity 0→1, x 30→0, 500ms decelerate
- Dot indicators fade between states

Currently buttons are decorative — either implement minimal carousel or hide until wired.

---

### 3. Features (`features.tsx`)

| Element | Animation |
|---------|-----------|
| Section | `Reveal` on container |
| Each feature item | Stagger 50ms: icon circle scale 0.9→1 + fade, then text fade-up 30ms later |
| Hover | Icon border color transition (existing) + subtle scale 1→1.03 on icon circle | 200ms |

**Weight:** Light — quick cascade, total budget < 400ms for 4 items.

---

### 4. Categories (`categories.tsx`)

| Element | Animation |
|---------|-----------|
| Eyebrow + H2 | `Reveal` as single unit |
| Category cards | Stagger 60ms, each: circle image scale 0.95→1 + fade, title slides up 10px |
| Hover | Keep existing 700ms image zoom; add arrow `translateX(0→4px)` on "Shop now" | 200ms |

**Path language:** Cards enter from below (vertical = growth/collections narrative).

---

### 5. Best Sellers (`best-sellers.tsx`)

| Element | Animation |
|---------|-----------|
| Header block | Eyebrow → title → "View all" link stagger | 50ms |
| Product grid | Cards stagger 50ms (cap at 8 products visible animation) |
| Card entrance | opacity + translateY 24px, 350ms |
| Hover | Keep slide-up Add to cart; add card lift: `translateY(-4px)` + shadow deepen | 300ms |
| Add to cart click | Button press scale 0.97 + cart badge pop (via cart context) | 150ms |
| Wishlist tap | Heart scale pop 1→1.2→1 | 250ms ease-out-back |

**Empty state:** Gentle fade-in message, no stagger.

---

### 6. Sustainability (`sustainability.tsx`)

| Element | Animation |
|---------|-----------|
| Image (left) | `Reveal` slide from left: x -40→0, 500ms |
| Text block (right) | `Reveal` slide from right: x 40→0, 500ms, 100ms delay |
| CTA button | Fade-up 150ms after text lands |
| Ambient | Image subtle parallax on scroll (y shift ±15px via `useScroll` + `useTransform`) — desktop only |

**Split-card narrative:** Counter-motion (image left, text right) reinforces balance / planet + you.

---

### 7. Newsletter & Social (`newsletter-and-social.tsx`)

| Element | Animation |
|---------|-----------|
| Left column | Standard fade-up reveal |
| Form | Input + button stagger 40ms after copy |
| Social tiles | Stagger 60ms, scale 0.95→1 |
| Hover | Keep image zoom; add overlay fade (existing) |

**Subscribe success (future):** scale pop + checkmark — not in scope unless form is wired.

---

### 8. Footer (`footer.tsx`)

| Element | Animation |
|---------|-----------|
| Whole footer | Single `Reveal` fade-up on enter (500ms) — heavy element, one motion |
| Link columns | Optional micro-stagger 30ms — only if footer Reveal feels flat |
| Social icons | Hover scale 1→1.08 | 200ms |

**Keep subtle** — footer is exit rhythm, not hero.

---

### 9. Cart Sheet (`cart-sheet.tsx`)

| Element | Animation |
|---------|-----------|
| Overlay | Opacity 0→1, 300ms |
| Panel | `translateX(100%→0)`, 350ms emphasized ease-out |
| Close | Reverse, 250ms accelerate |
| Line items | Stagger 40ms when panel opens |
| Quantity +/- | Press scale 0.95 | 120ms |
| Remove item | Exit: opacity + x slide, `AnimatePresence` | 250ms |

Replace CSS-only transition with `motion` + `AnimatePresence` for list add/remove.

---

## File change map (Phase 1 landing)

| File | Changes |
|------|---------|
| `apps/web/package.json` | Add `motion` |
| `apps/web/src/lib/motion/*` | New — tokens, variants, hook |
| `apps/web/src/components/motion/*` | New — Reveal, Stagger, provider |
| `apps/web/src/routes/__root.tsx` or `store-layout.tsx` | Wrap with `MotionProvider` |
| `hero.tsx` | Headline stagger, ken-burns, scroll indicator |
| `navbar.tsx` | Mount fade, scroll shadow, drawer spring, link stagger |
| `features.tsx` | Section reveal + item stagger |
| `categories.tsx` | Header reveal + card stagger |
| `best-sellers.tsx` | Header + grid stagger, hover lift |
| `sustainability.tsx` | Split reveal, optional parallax |
| `newsletter-and-social.tsx` | Column reveals + tile stagger |
| `footer.tsx` | Footer reveal |
| `cart-sheet.tsx` | AnimatePresence panel + line items |
| `index.css` | Ken-burns keyframes, reduced-motion globals |

---

## Future phases (out of landing scope)

| Area | Components | Motion notes |
|------|------------|--------------|
| Checkout | `checkout.tsx` | Step transitions, form error shake |
| Auth | `sign-in-form.tsx`, `sign-up-form.tsx` | Error shake, success fade |
| Admin CMS | `admin/*`, `product-form.tsx` | Corporate personality — faster, no overshoot |
| Product PDP | Not built yet | Image gallery crossfade, size selector emphasis |
| Page transitions | TanStack Router | Optional `ViewTransition` or layoutId shared elements |

---

## Quality checklist (from motion-design skill)

Before shipping each component:

- [ ] Emotional target defined (landing = calm confidence / elegance)
- [ ] Primary + secondary + ambient layers present
- [ ] Entrance uses decelerate easing; exit uses accelerate
- [ ] No linear easing on spatial movement
- [ ] Duration matches element weight (see tables above)
- [ ] Stagger total < 500ms
- [ ] `prefers-reduced-motion` respected
- [ ] No layout shift / CLS introduced
- [ ] Hover animations < 200ms for responsiveness

---

## Test plan

1. **Visual** — Load `/` on mobile (375px) and desktop (1440px); scroll full page; verify stagger order and no jank
2. **Reduced motion** — OS setting on; verify instant or opacity-only fallbacks
3. **Interaction** — Open/close mobile nav, cart sheet, add to cart; badge pop fires
4. **Performance** — Lighthouse mobile before/after; target no regression below 85
5. **Regression** — Existing hover zoom on category/product/social images still works

---

## Open questions

1. **Hero carousel** — Implement 2–3 slide rotation in Phase 1, or defer and hide nav buttons until content exists?
2. **Parallax on Sustainability** — Desktop-only subtle effect, or skip for simplicity?
3. **Page-load vs scroll-only** — Should Hero animate on load only (recommended) while below-fold uses `whileInView`?

**Recommendation:** Hero on load; everything else on scroll into view (`once: true`).
