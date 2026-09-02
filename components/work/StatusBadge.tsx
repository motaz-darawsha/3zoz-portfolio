import { statusLabel, type ProjectStatus } from "@/content/projects";
import { Chip } from "@/components/ui/Chip";

/**
 * Status as a chip, with a lit dot only when the thing genuinely runs. The dot
 * is the same signal the project's body uses, so the two readings agree.
 */
export function StatusBadge({ status }: { status: ProjectStatus }) {
  const live = status === "working";

  return (
    <Chip tone={live ? "live" : "faint"}>
      <span
        aria-hidden
        className={`size-1.5 rounded-pill ${live ? "bg-primary" : "bg-dim"}`}
        style={
          live
            ? { boxShadow: "0 0 8px color-mix(in oklab, var(--color-primary) 70%, transparent)" }
            : undefined
        }
      />
      {statusLabel[status]}
    </Chip>
  );
}
