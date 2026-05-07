export type HookCategory = "Safety" | "Formatting" | "Monitoring" | "Notifications" | "Productivity";
export type HookType = "Command" | "HTTP" | "Prompt" | "Agent" | "MCP Tool";

export interface Hook {
  id: string;
  name: string;
  category: HookCategory;
  description: string;
  repoUrl: string;
  author: string;
  hookType: HookType;
  event: string[];
}

export const CATEGORIES: HookCategory[] = [
  "Safety",
  "Formatting",
  "Monitoring",
  "Notifications",
  "Productivity",
];

export const hooks: Hook[] = [
  {
    id: "file-guard",
    name: "File Guard",
    category: "Safety",
    description:
      "Blocks Claude from modifying sensitive files like .env, credentials, and private keys.",
    repoUrl: "https://github.com/carlrannaberg/claudekit",
    author: "carlrannaberg",
    hookType: "Command",
    event: ["PreToolUse"],
  },
  {
    id: "dangerous-command-blocker",
    name: "Dangerous Command Blocker",
    category: "Safety",
    description:
      "Intercepts and blocks destructive shell commands like rm -rf before they execute.",
    repoUrl: "https://github.com/karanb192/claude-code-hooks",
    author: "karanb192",
    hookType: "Command",
    event: ["PreToolUse"],
  },
  {
    id: "auto-format",
    name: "Auto Format",
    category: "Formatting",
    description:
      "Runs Prettier on every file write to keep code consistently formatted without manual steps.",
    repoUrl: "https://github.com/karanb192/claude-code-hooks",
    author: "karanb192",
    hookType: "Command",
    event: ["PostToolUse"],
  },
  {
    id: "session-stats",
    name: "Session Stats",
    category: "Monitoring",
    description:
      "Logs token usage and estimated cost at the end of each Claude session for budget tracking.",
    repoUrl: "https://github.com/yurukusa/cc-safe-setup",
    author: "yurukusa",
    hookType: "Command",
    event: ["SessionEnd"],
  },
  {
    id: "audit-logger",
    name: "Audit Logger",
    category: "Monitoring",
    description:
      "Records every tool call with arguments to a local audit log for traceability and review.",
    repoUrl: "https://github.com/yurukusa/cc-safe-setup",
    author: "yurukusa",
    hookType: "Command",
    event: ["PreToolUse", "PostToolUse"],
  },
  {
    id: "health-check",
    name: "Health Check",
    category: "Monitoring",
    description:
      "Runs a pre-session environment check to verify required tools and config are in place.",
    repoUrl: "https://github.com/yurukusa/cc-safe-setup",
    author: "yurukusa",
    hookType: "Command",
    event: ["SessionStart"],
  },
  {
    id: "desktop-notification",
    name: "Desktop Notification",
    category: "Notifications",
    description:
      "Sends a native desktop push notification when Claude finishes a task or needs attention.",
    repoUrl: "https://github.com/disler/claude-code-hooks-mastery",
    author: "disler",
    hookType: "Command",
    event: ["Stop", "Notification"],
  },
  {
    id: "tts-announcer",
    name: "TTS Announcer",
    category: "Notifications",
    description:
      "Reads Claude's notifications aloud using text-to-speech so you never miss an update.",
    repoUrl: "https://github.com/disler/claude-code-hooks-mastery",
    author: "disler",
    hookType: "Command",
    event: ["Notification"],
  },
  {
    id: "task-verifier",
    name: "Task Verifier",
    category: "Productivity",
    description:
      "Forces Claude to verify all task completion criteria before it stops, reducing incomplete work.",
    repoUrl: "https://github.com/disler/claude-code-hooks-mastery",
    author: "disler",
    hookType: "Prompt",
    event: ["Stop"],
  },
];
