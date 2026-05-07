import HookGrid from "@/components/HookGrid";

export default function Home() {
  return (
    <>
      <header className="border-b border-black/[.08] dark:border-white/[.08] bg-white dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            HookHub
          </span>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Discover open source Claude Code hooks
          </p>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-6xl px-6 py-10">
        <HookGrid />
      </main>

      <footer className="border-t border-black/[.08] dark:border-white/[.08] bg-white dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500">
          <a
            href="https://docs.anthropic.com/en/docs/claude-code/hooks"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            Claude Code Hooks Docs
          </a>
          <a
            href="https://github.com/jacksonlima347/hookhub"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            HookHub on GitHub
          </a>
        </div>
      </footer>
    </>
  );
}
