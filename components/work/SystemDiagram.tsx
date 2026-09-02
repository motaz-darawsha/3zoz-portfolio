import type { CaseStudy } from "@/content/projects";

/**
 * Explicitly a diagram, not a screenshot — the brief forbids passing generated
 * imagery off as a real product capture. Each node is the architecture Motaz
 * described, so the visual carries information rather than decoration.
 */
export function SystemDiagram({ diagram }: { diagram: CaseStudy["diagram"] }) {
  return (
    <figure className="border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <p className="eyebrow">Architecture · not a screenshot</p>
        <span className="font-mono text-[0.625rem] text-dim" data-numeric>
          {diagram.nodes.length} nodes
        </span>
      </div>

      <ol className="divide-y divide-line">
        {diagram.nodes.map((node, position) => {
          const isLast = position === diagram.nodes.length - 1;
          return (
            <li key={node.id} className="group/node relative flex gap-4 px-5 py-4">
              <div className="flex flex-col items-center pt-1">
                <span
                  aria-hidden
                  className={`size-2 shrink-0 border transition-colors duration-200 ${
                    position === 0 ? "border-ember bg-ember" : "border-line-strong bg-elevated"
                  }`}
                />
                {!isLast ? (
                  <span aria-hidden className="mt-1.5 w-px flex-1 bg-line" />
                ) : null}
              </div>
              <div className="min-w-0 pb-0.5">
                <p className="font-mono text-sm text-text">{node.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-dim">{node.role}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <figcaption className="border-t border-line px-5 py-3 text-sm text-muted">
        {diagram.caption}
      </figcaption>
    </figure>
  );
}
