"use client";

import { useState } from "react";
import { hooks, CATEGORIES, type Hook, type HookCategory } from "@/lib/hooks";

const CATEGORY_COLORS: Record<HookCategory, string> = {
  Safety: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Formatting: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Monitoring: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Notifications: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Productivity: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

function HookCard({ hook }: { hook: Hook }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-black/[.08] dark:border-white/[.1] bg-white dark:bg-zinc-900 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{hook.name}</h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[hook.category]}`}
        >
          {hook.category}
        </span>
      </div>
      <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 line-clamp-2">
        {hook.description}
      </p>
      <div className="mt-auto flex items-center justify-between pt-2">
        <span className="text-xs text-zinc-400 dark:text-zinc-500">@{hook.author}</span>
        <a
          href={hook.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-black/[.08] dark:border-white/[.1] px-3 py-1 text-xs font-medium text-zinc-900 dark:text-zinc-50 transition-colors hover:bg-black/[.04] dark:hover:bg-white/[.06]"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
}

export default function HookGrid() {
  const [active, setActive] = useState<HookCategory | null>(null);

  const filtered = active ? hooks.filter((h) => h.category === active) : hooks;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActive(null)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            active === null
              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
              : "border border-black/[.08] dark:border-white/[.1] text-zinc-600 dark:text-zinc-400 hover:bg-black/[.04] dark:hover:bg-white/[.06]"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              active === cat
                ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                : "border border-black/[.08] dark:border-white/[.1] text-zinc-600 dark:text-zinc-400 hover:bg-black/[.04] dark:hover:bg-white/[.06]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((hook) => (
          <HookCard key={hook.id} hook={hook} />
        ))}
      </div>
    </div>
  );
}
