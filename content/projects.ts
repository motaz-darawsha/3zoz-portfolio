/**
 * Case-study content. Facts come from Motaz only. `evidence` is deliberately
 * narrow: where there is no measurement, the field says so rather than
 * inventing a metric.
 */

export type ProjectStatus = "working" | "paused" | "stopped" | "archived";

export type CaseStudy = {
  slug: string;
  index: string;
  name: string;
  status: ProjectStatus;
  kicker: string;
  /** Answers "what is it" in one line, for the work index. */
  summary: string;
  stack: readonly string[];
  narrative: {
    context: string;
    system: string;
    challenge: string;
    solution: string;
    result: string;
  };
  /** Rendered as a diagram, not a fake screenshot. */
  diagram: {
    caption: string;
    nodes: readonly { id: string; label: string; role: string }[];
  };
  evidence: string;
};

export const statusLabel: Record<ProjectStatus, string> = {
  working: "Working",
  paused: "Paused",
  stopped: "Stopped",
  archived: "Archived",
};

export const featured: readonly CaseStudy[] = [
  {
    slug: "0xmusic",
    index: "01",
    name: "0xMUSIC",
    status: "working",
    kicker: "Discord music bot with a fallback audio backend",
    summary:
      "Plays audio from YouTube and other supported sources in a Discord voice channel, with a second audio backend held in reserve.",
    stack: ["Node.js", "Discord.js", "NodeLink", "Lavalink"],
    narrative: {
      context:
        "Music bots are the most-used thing in a lot of Discord servers and the most fragile. The public ones keep dying — sources break, rate limits change, hosts shut them down. I wanted one I could actually repair, which meant understanding the audio path instead of installing someone else’s.",
      system:
        "The bot itself is Node.js and Discord.js: it owns commands, the queue and the voice connection. It does not decode audio. That happens in a separate audio node — NodeLink as the primary — which the bot talks to over a client library. Lavalink sits behind the same interface as an emergency backend, so if the primary node fails the audio path can be switched without touching command logic.",
      challenge:
        "The hardest part was not writing commands. It was configuring the library that connects Lavalink to the bot. The bot, the client library and the audio node each have their own idea of protocol version, authentication and event shape, and when they disagree you do not get an error that says so — you get a connection that reports healthy and never plays audio.",
      solution:
        "I stopped guessing and worked the layers one at a time: verify the node is up on its own port, verify the bot authenticates against it, verify the voice state update actually reaches the node, then verify a track resolves. Version and config mismatches only became visible once each layer was checked in isolation instead of end to end.",
      result:
        "It plays. Around seven people have used it and liked it. That is the honest size of it — no server counts, no uptime figures, because I have not measured any. What I did get is a working mental model of how Discord voice, an audio node and a client library actually fit together.",
    },
    diagram: {
      caption: "Audio path — the fallback node shares the primary’s interface.",
      nodes: [
        { id: "discord", label: "Discord guild", role: "Voice channel + slash commands" },
        { id: "bot", label: "Bot process", role: "Node.js · Discord.js · queue + voice state" },
        { id: "client", label: "Client library", role: "Protocol, auth, track resolution" },
        { id: "primary", label: "NodeLink", role: "Primary audio node" },
        { id: "fallback", label: "Lavalink", role: "Emergency audio node" },
      ],
    },
    evidence: "Used by ~7 people. No usage metrics collected.",
  },
  {
    slug: "haweah",
    index: "02",
    name: "Haweah",
    status: "paused",
    kicker: "Generated identity cards for roleplay servers",
    summary:
      "An identity system for FiveM and SA-MP servers: generates an in-game ID card from a player’s character record.",
    stack: ["Node.js", "Image generation", "FiveM", "Discord"],
    narrative: {
      context:
        "Roleplay servers run on identity — who you are in the world decides what you can do in it. Most servers handle that with a text command that prints a name. I wanted the artifact itself: a card a player could hold up, that looked issued rather than printed by a script.",
      system:
        "A character record supplies photo, name, job, identity number and issue and expiry dates. The generator composites those onto a card template as a layered 2D image — fixed layout, typographic fields, deterministic output for the same record. The server calls it and hands the result back to the player, with a Discord path for viewing it outside the game.",
      challenge:
        "The design problem outranked the code problem. A card only reads as official if the field layout, type sizes and alignment stay consistent across every record — long names, missing photos, expired dates included. Layout that survives arbitrary data is a constraint, not a template.",
      solution:
        "I treated the card as a design system with fixed slots and defined overflow behaviour rather than as a one-off image, so the generator composes records instead of special-casing them.",
      result:
        "Paused, and honestly presented as paused. It is not a finished platform and has no users. It is here because it shows product thinking, visual generation and server integration in the same project — that is what it demonstrates, and I would rather show that than dress it up as shipped.",
    },
    diagram: {
      caption: "Generation path — one record in, one deterministic card out.",
      nodes: [
        { id: "record", label: "Character record", role: "Name · job · ID · dates · photo" },
        { id: "generator", label: "Card generator", role: "Layered 2D composition" },
        { id: "template", label: "Card template", role: "Fixed slots, defined overflow" },
        { id: "surface", label: "In-game + Discord", role: "Where the card is shown" },
      ],
    },
    evidence: "Paused before release. No users, no deployment.",
  },
] as const;

export const distribution = {
  index: "03",
  name: "Store bot",
  status: "stopped" satisfies ProjectStatus,
  headline: "One earlier bot reached 100+ Discord servers.",
  body: "An earlier project built for Discord stores was deployed in over 100 servers. It rewrote certain words into visually altered equivalents so they would not match simple keyword filters — a technique I would not build the same way today, and not something I would recommend for evading moderation. I stopped the project because I could not complete the Discord verification required to keep it running at that size.",
  lesson:
    "The part worth keeping is the distribution lesson: people found it, installed it into their own servers and kept it there. Getting a bot into 100+ servers is a different discipline from getting one to run — versioning, permissions, onboarding and support all become the product.",
  evidence: "100+ servers, per Discord’s own server count. Stopped over unfinished verification.",
} as const;

export type Experiment = {
  name: string;
  status: ProjectStatus;
  what: string;
  learned: string;
};

export const experiments: readonly Experiment[] = [
  {
    name: "X3 Bot",
    status: "archived",
    what: "General-purpose Discord bot — commands, roles, moderation utilities.",
    learned: "Command routing and permission models before I understood either well.",
  },
  {
    name: "Minecraft–Discord bridge",
    status: "archived",
    what: "Relayed server events and chat between a Minecraft server and a Discord guild.",
    learned: "Two event loops, one message order. Where bridging actually gets hard.",
  },
  {
    name: "Ticket bot",
    status: "archived",
    what: "Support tickets as private channels, opened and closed from a Discord interaction.",
    learned: "Channel lifecycle and cleanup — the unglamorous half of bot state.",
  },
] as const;
