# HookHub — Product Spec (MVP)

## Overview

HookHub is a browsable directory of open source Claude Code hooks. Developers can discover, filter, and link out to hooks shared across GitHub repositories. The MVP scope is read-only: no submissions, no accounts, no ratings — just a clean, fast discovery experience.

---

## What is a Claude Hook?

Claude Code hooks are user-defined shell commands, HTTP endpoints, prompts, or subagents that execute at specific points in Claude Code's lifecycle (e.g. `PreToolUse`, `PostToolUse`, `Stop`, `SessionStart`). They give developers deterministic control over Claude's behavior — enforcing safety rules, auto-formatting code, sending notifications, logging sessions, and more.

---

## Data Model

Each hook entry has the following fields:

| Field         | Type     | Description                                         |
|---------------|----------|-----------------------------------------------------|
| `id`          | string   | Unique slug (e.g. `file-guard`)                     |
| `name`        | string   | Human-readable name (e.g. "File Guard")             |
| `category`    | string   | One of the categories below                         |
| `description` | string   | 1–2 sentence summary of what the hook does          |
| `repoUrl`     | string   | GitHub repository URL                               |
| `author`      | string   | GitHub username of the repo owner                   |
| `hookType`    | string   | `Command`, `HTTP`, `Prompt`, `Agent`, or `MCP Tool` |
| `event`       | string[] | Lifecycle events the hook targets (e.g. `PreToolUse`) |

### Categories (MVP)

- **Safety** — block dangerous operations, protect sensitive files
- **Formatting** — auto-format after file writes
- **Monitoring** — logging, metrics, session tracking
- **Notifications** — alerts during agent operation
- **Productivity** — task verification, workflow automation

---

## Pages

### 1. Home (`/`)

The primary view. Displays all hooks in a responsive card grid.

**Layout:**
- Header: logo + site name ("HookHub"), short tagline
- Filter bar: category pills (All · Safety · Formatting · Monitoring · Notifications · Productivity)
- Hook grid: 3 columns on desktop, 2 on tablet, 1 on mobile
- Footer: link to Claude Code hooks docs, GitHub link for HookHub repo

**Hook card:**
- Hook name (bold)
- Category badge (colored pill)
- Description (2-line clamp)
- Author (`@username`)
- "View on GitHub" button → opens `repoUrl` in new tab

**Interactions:**
- Clicking a category pill filters the grid client-side (no page reload)
- "All" pill resets the filter

### 2. Hook Detail (`/hooks/[id]`) — Post-MVP

Not in scope for MVP.

---

## Data Source

For the MVP, hooks are stored as a static JSON/TypeScript file in the repo (`lib/hooks.ts`). No database, no CMS, no API calls at runtime.

Example:

```ts
export const hooks = [
  {
    id: "file-guard",
    name: "File Guard",
    category: "Safety",
    description: "Blocks Claude from modifying sensitive files like .env and credentials.",
    repoUrl: "https://github.com/carlrannaberg/claudekit",
    author: "carlrannaberg",
    hookType: "Command",
    event: ["PreToolUse"],
  },
  // ...
];
```

Initial seed data: pull representative hooks from the repos found in research (karanb192, disler, carlrannaberg, hesreallyhim, yurukusa).

---

## Non-Goals (MVP)

- User submissions or a form to add hooks
- Search / full-text filtering
- Hook detail pages
- Authentication or user accounts
- Ratings, comments, or votes
- Dark/light mode toggle (follow system preference via existing CSS)
- Pagination (render all hooks; expected count is < 50 for MVP)

---

## Tech Constraints

- Next.js App Router — home page is a Server Component; category filter uses a Client Component island
- Static data in `lib/hooks.ts` — no fetch at runtime
- Tailwind CSS v4 for all styling
- No new dependencies beyond what is already in the project

---

## Success Criteria (MVP)

1. Home page loads and displays all hooks in a grid
2. Category filter works without a page reload
3. Every "View on GitHub" link opens the correct repo
4. Page is responsive across mobile, tablet, and desktop
5. Build passes (`npm run build`) with no TypeScript or lint errors
