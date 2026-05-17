# CSS/HTML/JS Experiments Lab — Project Structure & Homepage Plan

## Overview

You're building a **web experiments showcase** — a developer playground where you and other visitors can browse and interact with live demos of cutting-edge CSS, HTML, and JavaScript features (e.g. View Transition API, Scroll-Driven Animations, Container Queries, etc.).

The stack is **TanStack Start** (SSR React) + **TanStack Router** (file-based) + **TailwindCSS v4**.

---

## Proposed File-Based Route Structure

```
src/
├── routes/
│   ├── __root.tsx                    # App shell (Header, Footer)
│   ├── index.tsx                     # Home page — experiment gallery
│   ├── about.tsx                     # About the project
│   └── experiments/
│       ├── index.tsx                 # Experiments listing (optional redirect or overview)
│       └── view-transitions/
│           ├── index.tsx             # View Transition API demo
│           └── -components/          # Route-local components (prefixed with -)
│               └── TransitionDemo.tsx
│       └── scroll-driven-animations/
│           └── index.tsx
│       └── container-queries/
│           └── index.tsx
│       └── anchor-positioning/
│           └── index.tsx
│       ... (each new experiment = new folder)
│
├── components/
│   ├── Header.tsx                    # Global nav
│   ├── Footer.tsx
│   ├── ThemeToggle.tsx
│   └── ExperimentCard.tsx            # Reusable card for the homepage grid
│
├── data/
│   └── experiments.ts                # Centralized experiment registry (title, slug, description, tags, status)
│
└── styles.css                        # Global styles + design tokens
```

> **Key Convention**: TanStack Router treats files/folders prefixed with `-` as non-route files. Use `-components/` inside a route folder for route-local components that shouldn't become routes.

---

## The Experiment Registry (`src/data/experiments.ts`)

This is the **single source of truth** for all experiments. The home page reads from it to render cards. Adding a new experiment = add an entry here + create the route file.

```ts
export type ExperimentStatus = 'stable' | 'experimental' | 'wip';
export type ExperimentTag = 'CSS' | 'HTML' | 'JS' | 'API';

export interface Experiment {
  slug: string;       // matches the route path
  title: string;
  description: string;
  tags: ExperimentTag[];
  status: ExperimentStatus;
  addedAt: string;    // ISO date string
  browserSupport?: string; // e.g. "Chrome 111+, Safari 18+"
}

export const experiments: Experiment[] = [
  {
    slug: 'view-transitions',
    title: 'View Transition API',
    description: 'Animate page and in-page transitions with the native browser View Transition API.',
    tags: ['API', 'CSS'],
    status: 'stable',
    addedAt: '2026-05-17',
    browserSupport: 'Chrome 111+, Safari 18+',
  },
  // add more here...
];
```

---

## Homepage Design (`src/routes/index.tsx`)

The homepage is a **gallery/lab interface** — not a generic landing page. Think: **developer tool aesthetic**.

### Layout Sections

1. **Hero** — Short punchy headline + subtitle. Compact animated gradient mesh background so the gallery is immediately visible below the fold.

2. **Filter Bar** — Tag filter pills: `All | CSS | HTML | JS | API`. Filters the masonry grid client-side without a page reload.

3. **Masonry Gallery Grid** — Pure CSS masonry using `columns` property (no JS library needed). Each `<ExperimentCard>` has a variable height depending on description length, making the layout feel organic and editorial. Each card shows:
   - Experiment title
   - Short description
   - Tags (colored badges: CSS=blue, JS=yellow, HTML=orange, API=purple)
   - Status badge: `stable` / `experimental` / `wip`
   - Browser support note
   - "View Demo →" CTA link

4. **Footer** — Minimal: GitHub link, "Built to explore the web platform."

### Masonry Implementation
Using CSS `columns` (no JS dependency):
```css
.masonry-grid {
  columns: 1;
  column-gap: 1.5rem;
}
@media (min-width: 640px)  { .masonry-grid { columns: 2; } }
@media (min-width: 1024px) { .masonry-grid { columns: 3; } }

.masonry-item {
  break-inside: avoid;
  margin-bottom: 1.5rem;
}
```
This is intentionally a CSS experiment itself — using `columns` for masonry is a great showcase of a native CSS feature!

### Card Design Details
- Glassmorphism style — adapts to both light and dark via CSS `color-scheme`
- Hover: card lifts (`translateY(-4px)`) with a colored glow matching the primary tag color
- Status badge is color-coded: green=stable, amber=experimental, gray=wip
- Tags are pill badges, colored by type

---

## Each Experiment Page Layout

Consistent shell for every experiment:

```
[Breadcrumb: Home > Experiments > View Transition API]
[Title + Description + Browser Support badge]
[Interactive Demo Area]           ← the star of the show
[Code Snippet / Explanation]      ← optional expandable panel
[← Previous] [Next →] navigation
```

Route: `/experiments/view-transitions`

---

## Confirmed Decisions

| Topic | Decision |
|---|---|
| **Theme** | System `prefers-color-scheme` default via existing `ThemeToggle` (already defaults to `auto`). No changes needed to `ThemeToggle.tsx`. |
| **Gallery layout** | CSS `columns`-based masonry — native, no JS library, itself a CSS showcase. |
| **Header nav** | "Experiments" link points to `/` since the homepage IS the gallery. |

> [!NOTE]
> **SSR vs Client-only for demos**: Some experiments (like View Transitions) need to be client-rendered only. We'll use a `useEffect` guard or a `<ClientOnly>` wrapper component where needed.

---

## Verification Plan

- Run `pnpm dev` and navigate between pages — confirm file-based routing resolves correctly.
- Check the homepage renders all `ExperimentCard`s from the registry.
- Verify tag filtering works client-side.
- Click into the View Transitions demo and confirm it's reachable at `/experiments/view-transitions`.
