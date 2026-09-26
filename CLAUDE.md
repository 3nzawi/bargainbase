# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint (flat config, `eslint-config-next` core-web-vitals + typescript rules)

There is no test runner configured yet.

## Important: Next.js version

This project pins `next@16.3.6`, which is newer than most training data and has breaking API/convention changes from earlier Next.js versions. Before writing App Router code (routing, data fetching, config, etc.), check the docs vendored in `node_modules/next/dist/docs/` rather than assuming prior knowledge — deprecation notices there are load-bearing.

## Architecture

BargainBase is a Next.js App Router site (TypeScript, Tailwind CSS v4, `src/` layout, `@/*` import alias → `src/*`). It is currently a single-page placeholder (`src/app/page.tsx`) for what's planned as a multi-module product:

- **Deals & Coupons** — coupon/discount aggregator
- **Task Automation** — automation flows for everyday tasks (e.g. ride booking via official APIs)
- **Handy Tools** — small generator utilities

None of these modules exist yet. As they're added, the expectation is each becomes its own route under `src/app/` (e.g. `src/app/deals/`, `src/app/tools/<name>/`), with server-side logic as Next.js API routes (`src/app/api/.../route.ts`) where possible.

A module whose logic can't run as a Vercel serverless function (e.g. Python-only automation, long-running browser automation) should **not** be dropped into `src/`. It belongs in its own top-level folder (sibling to `src/`, e.g. `/automation/<module>/`) with its own dependency manifest, and is called from the Next.js app over HTTP rather than imported directly — decide this per-module based on what the module actually needs to do.

## Deployment

Hosted on Vercel, connected to the `3nzawi/bargainbase` GitHub repo. Every push to `master` auto-deploys.
