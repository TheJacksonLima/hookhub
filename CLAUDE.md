# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md
@spec/CLAUDE.md

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

There is no test runner configured.

## Stack

- **Next.js 16.2.4** with App Router — see `node_modules/next/dist/docs/01-app/` for current API docs
- **React 19.2.4** — concurrent features and new hooks may differ from training data
- **TypeScript 5** — strict mode enabled; path alias `@/*` maps to the repo root
- **Tailwind CSS v4** — configured via `@tailwindcss/postcss` in [postcss.config.mjs](postcss.config.mjs); no `tailwind.config.*` file; v4 uses CSS-first configuration
- **ESLint 9** — flat config format in [eslint.config.mjs](eslint.config.mjs)

## Architecture

This is a freshly scaffolded project using the App Router pattern:

- [app/layout.tsx](app/layout.tsx) — Root layout; loads Geist fonts, sets `<html>` metadata
- [app/page.tsx](app/page.tsx) — Home page (currently default scaffold)
- [app/globals.css](app/globals.css) — Global styles; defines CSS custom properties for light/dark theming; dark mode via `prefers-color-scheme` media query

Route handlers (API routes) go in `app/api/` following the App Router convention. Server Components are the default; mark client-only files with `"use client"`.
