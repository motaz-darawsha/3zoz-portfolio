/**
 * The celestial field the whole page sits on.
 *
 * Painted with CSS radial gradients on two fixed layers rather than canvas or
 * WebGL: nothing to animate per frame, nothing to hydrate, and it stays sharp
 * at any resolution. The second layer is offset and scaled so the two tile
 * patterns never visibly repeat against each other.
 *
 * Purely atmospheric, so it is hidden from assistive technology and sits
 * behind everything at a negative z-index.
 */
export function Field() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="starfield absolute inset-0 opacity-70" />
      <div
        className="starfield absolute inset-0 opacity-40"
        style={{ backgroundSize: "413px 337px", backgroundPosition: "137px 61px" }}
      />
      {/* A cold wash toward the horizon so the field reads as depth rather than
          as a flat sprinkle of dots. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, color-mix(in oklab, var(--color-primary-70) 9%, transparent), transparent 60%)",
        }}
      />
    </div>
  );
}
