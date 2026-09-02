import { statusLabel, type ProjectStatus } from "@/content/projects";

const tone: Record<ProjectStatus, string> = {
  working: "text-ember border-ember-dim",
  paused: "text-muted border-line",
  stopped: "text-dim border-line",
  archived: "text-dim border-line",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] ${tone[status]}`}
    >
      {status === "working" ? (
        <span className="size-1.5 rounded-full bg-ember" aria-hidden />
      ) : null}
      {statusLabel[status]}
    </span>
  );
}
