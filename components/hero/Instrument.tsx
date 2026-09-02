import { featured, distribution, experiments } from "@/content/projects";
import { Body } from "@/components/sky/Body";

/**
 * The instrument: the hero's readout of the field below it.
 *
 * This deliberately is not the hero-metric template (big number, small label,
 * accent) that the craft floor bans. It is a legend for the visual language
 * the rest of the page uses — it teaches you that brightness means status
 * before you scroll into the case studies, and every figure in it is a real
 * count derived from content, not a marketing statistic.
 */
export function Instrument() {
  const archived = experiments.length;

  return (
    <div className="mx-auto mt-xl max-w-[62rem]">
      <div className="grid gap-md sm:grid-cols-3">
        {[
          {
            slug: featured[0].slug,
            status: featured[0].status,
            nodes: featured[0].diagram.nodes.length,
            name: featured[0].name,
            reading: "Emitting",
            note: "Runs today. Used by about seven people — the only number ever measured.",
          },
          {
            slug: featured[1].slug,
            status: featured[1].status,
            nodes: featured[1].diagram.nodes.length,
            name: featured[1].name,
            reading: "Dim",
            note: "Paused before release. Product thinking and visual generation, unfinished.",
          },
          {
            slug: "archive",
            status: "archived" as const,
            nodes: archived,
            name: `${archived} earlier builds`,
            reading: "Dark",
            note: `Archived. ${distribution.name} reached 100+ servers before it stopped.`,
          },
        ].map((entry) => (
          <figure key={entry.slug} className="flex flex-col items-center text-center">
            <div className="w-full max-w-[13rem]">
              <Body
                seed={entry.slug}
                status={entry.status}
                satellites={entry.nodes}
                label={entry.name}
              />
            </div>
            <figcaption className="mt-sm">
              <p className="type-label text-on-surface">{entry.name}</p>
              <p className="type-overline mt-1.5 text-primary">{entry.reading}</p>
              <p className="type-body-sm mt-2 max-w-[30ch] text-dim">{entry.note}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="type-body-sm mt-lg text-center text-dim">
        Brightness is status, not decoration. These are plotted diagrams — no screenshots of these
        projects exist.
      </p>
    </div>
  );
}
