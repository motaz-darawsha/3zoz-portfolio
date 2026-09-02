import type { ReactNode } from "react";

/**
 * The brief's chip: pill, surface ground, secondary text, 6px/12px padding.
 * Used for stack tags and status, never as a decorative badge.
 */
export function Chip({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "live" | "faint";
}) {
  const tones = {
    default: "bg-surface text-secondary",
    live: "bg-surface text-primary",
    faint: "bg-transparent text-dim ring-1 ring-border ring-inset",
  } as const;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-pill px-3 py-1.5 type-body-sm ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
