/**
 * Every fact in this file was supplied by Motaz. Nothing here is inferred,
 * rounded up, or invented — if a number is absent it is because none exists.
 */

export const profile = {
  name: "Motaz Darawsha",
  thesis: "I build things to understand how they work.",
  origin: "Palestinian",
  summary:
    "I work on Discord bots, game-server infrastructure and the integrations between them. Most of what I know came from taking a system apart, breaking it, and reading until it ran again.",
} as const;

export const links = [
  { label: "GitHub", handle: "Motaz-Darawsha", href: "https://github.com/Motaz-Darawsha" },
  { label: "X", handle: "@MotaxXa", href: "https://x.com/MotaxXa" },
  { label: "Discord", handle: "@91jq", href: null },
] as const;

export type CapabilityGroup = {
  id: string;
  title: string;
  note: string;
  items: readonly string[];
};

export const capabilities: readonly CapabilityGroup[] = [
  {
    id: "core",
    title: "Core",
    note: "Where I spend most build time.",
    items: ["JavaScript", "TypeScript", "Node.js", "Discord.js"],
  },
  {
    id: "frontend",
    title: "Frontend",
    note: "This site is the current working sample.",
    items: ["React", "Next.js", "HTML", "CSS"],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    note: "Learned by running servers that had to stay up for other people.",
    items: ["Docker", "Linux", "Server configuration"],
  },
  {
    id: "systems",
    title: "Systems & integrations",
    note: "Making services that were never designed to meet talk to each other.",
    items: ["REST APIs", "Databases", "Discord integrations", "Game-server ecosystems"],
  },
] as const;

export const infrastructure = {
  headline: "I learned infrastructure by breaking things.",
  body: "Game servers are an unforgiving place to learn operations. A misconfigured world, a bad mod load order or a dropped socket is visible to everyone on the server within seconds, and nobody is paid to fix it but you. That is where I picked up process supervision, config management, log reading and the habit of changing one variable at a time.",
  domains: [
    {
      id: "minecraft",
      label: "Minecraft (Java & Bedrock)",
      detail:
        "Server setup and configuration, mod and plugin management, world management, and diagnosing the crash loops that follow both.",
    },
    {
      id: "fivem",
      label: "FiveM",
      detail:
        "Resource configuration and server-side scripting inside an existing community, plus the identity system in Haweah.",
    },
    {
      id: "samp",
      label: "SA-MP",
      detail:
        "Older ecosystem, same lesson: read the gamemode, understand the event model, then change something.",
    },
    {
      id: "bridges",
      label: "Discord-connected systems",
      detail:
        "Bridging a game server and a Discord guild — status, moderation and identity flowing both directions.",
    },
  ],
} as const;
