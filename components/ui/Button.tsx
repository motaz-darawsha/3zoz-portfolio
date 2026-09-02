import type { ComponentProps } from "react";

/**
 * The brief's three button variants, exactly as specified: pill geometry, 36px
 * tall, 11px/16px padding, label-md type. Hover shifts tone and brightness
 * rather than introducing motion — the brief is explicit that hovers stay
 * subtle here.
 */
type Variant = "primary" | "secondary" | "tertiary";

const base =
  "inline-flex h-9 items-center justify-center gap-2 type-label whitespace-nowrap transition-colors duration-200 ease-in-out-soft disabled:pointer-events-none disabled:opacity-45";

const variants: Record<Variant, string> = {
  // Inset glow gives the primary its lightly-bordered luminous edge.
  primary:
    "rounded-pill bg-primary px-4 text-neutral lit-edge hover:bg-primary-60 active:bg-primary-70",
  secondary:
    "rounded-pill border border-border bg-transparent px-4 text-secondary hover:border-primary-70 hover:text-on-surface",
  tertiary:
    "rounded-none bg-transparent p-0 text-secondary underline decoration-border decoration-1 underline-offset-4 hover:text-on-surface hover:decoration-primary",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return <a className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
