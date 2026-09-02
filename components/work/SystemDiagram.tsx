import type { CaseStudy } from "@/content/projects";

/**
 * The signal path.
 *
 * Rendered as a horizontal chain on the raised surface tone rather than as a
 * grid of cards — the brief warns against dense grids competing with the focal
 * point, and a signal path is genuinely sequential, so the order carries
 * information. Kept explicitly labelled as a diagram: no screenshots of these
 * systems exist and none may be implied.
 */
export function SystemDiagram({ diagram }: { diagram: CaseStudy["diagram"] }) {
  return (
    <figure className="mx-auto mt-xl max-w-[72rem]">
      <div className="rounded-md bg-surface p-md lit-edge">
        <ol className="grid gap-sm md:grid-cols-2 lg:grid-cols-5">
          {diagram.nodes.map((node, position) => (
            <li key={node.id} className="relative flex gap-3 lg:flex-col lg:gap-2.5">
              <div className="flex shrink-0 items-center gap-2 lg:w-full">
                <span
                  aria-hidden
                  className={`size-2 shrink-0 rounded-pill ${
                    position === 0 ? "bg-primary" : "bg-border"
                  }`}
                  style={
                    position === 0
                      ? {
                          boxShadow:
                            "0 0 10px color-mix(in oklab, var(--color-primary) 60%, transparent)",
                        }
                      : undefined
                  }
                />
                <span aria-hidden className="hidden h-px flex-1 bg-border lg:block" />
              </div>
              <div className="min-w-0">
                <p className="type-label text-on-surface">{node.label}</p>
                <p className="type-body-sm mt-1.5 text-dim">{node.role}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <figcaption className="type-body-sm mt-sm text-center text-dim">
        {diagram.caption} A diagram, not a screenshot.
      </figcaption>
    </figure>
  );
}
