"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerMotion, ScrollTrigger, ease } from "@/lib/motion";
import type { ProjectStatus } from "@/content/projects";

/**
 * A project rendered as a body in the field — authored SVG, drawn here rather
 * than sourced, because no screenshots of these systems exist and none may be
 * invented.
 *
 * Brightness and motion are bound to real status: a working system orbits and
 * pulses, a paused one drifts slowly, an archived one is still. So the visual
 * carries information rather than ornament, and the page has a living element
 * that is also honest.
 *
 * Motion is one infinite rotation on a transform — compositor-only, paused
 * when off-screen, and never created at all under prefers-reduced-motion.
 */
function seeded(seed: string) {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return () => {
    hash ^= hash << 13;
    hash ^= hash >>> 17;
    hash ^= hash << 5;
    return ((hash >>> 0) % 10000) / 10000;
  };
}

const luminosity: Record<
  ProjectStatus,
  { core: number; halo: number; ring: number; spin: number }
> = {
  working: { core: 1, halo: 0.55, ring: 0.6, spin: 34 },
  paused: { core: 0.6, halo: 0.18, ring: 0.36, spin: 90 },
  stopped: { core: 0.45, halo: 0.1, ring: 0.28, spin: 0 },
  archived: { core: 0.32, halo: 0, ring: 0.22, spin: 0 },
};

export function Body({
  seed,
  status,
  satellites,
  label,
}: {
  seed: string;
  status: ProjectStatus;
  satellites: number;
  label: string;
}) {
  const rootRef = useRef<SVGSVGElement>(null);
  const random = seeded(seed);
  const size = 320;
  const centre = size / 2;
  const light = luminosity[status];
  const gradientId = `body-${seed}`;

  const step = (Math.PI * 2) / Math.max(satellites, 1);
  const angles: number[] = [];
  for (let index = 0, angle = -Math.PI / 2; index < satellites; index += 1) {
    angle += step + (random() - 0.5) * 0.5;
    angles.push(angle);
  }

  const orbits = angles.map((angle, index) => {
    const radius = 62 + (index / Math.max(satellites - 1, 1)) * 74;
    return {
      radius,
      x: centre + Math.cos(angle) * radius,
      y: centre + Math.sin(angle) * radius * 0.62,
      angle,
    };
  });

  useGSAP(
    () => {
      registerMotion();
      const root = rootRef.current;
      if (!root || light.spin === 0) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        // Each satellite rides its own ellipse. Rotating the group would skew
        // the dots, so each one is tweened along its path by angle instead.
        const tweens = orbits.map((orbit, index) => {
          const dot = root.querySelector(`[data-satellite="${index}"]`);
          if (!dot) return null;
          const proxy = { angle: orbit.angle };
          return gsap.to(proxy, {
            angle: orbit.angle + Math.PI * 2,
            duration: light.spin + index * 6,
            repeat: -1,
            ease: "none",
            onUpdate: () => {
              gsap.set(dot, {
                attr: {
                  cx: centre + Math.cos(proxy.angle) * orbit.radius,
                  cy: centre + Math.sin(proxy.angle) * orbit.radius * 0.62,
                },
              });
            },
          });
        });

        const core = root.querySelector("[data-core]");
        const pulse = core
          ? gsap.to(core, {
              opacity: light.core * 0.62,
              scale: 0.94,
              transformOrigin: "center",
              duration: 2.4,
              repeat: -1,
              yoyo: true,
              ease: ease.soft,
            })
          : null;

        // Off-screen bodies must not burn frames.
        const trigger = ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          onToggle: ({ isActive }) => {
            tweens.forEach((tween) => {
              if (!tween) return;
              if (isActive) tween.play();
              else tween.pause();
            });
            if (!pulse) return;
            if (isActive) pulse.play();
            else pulse.pause();
          },
        });

        return () => {
          trigger.kill();
          tweens.forEach((tween) => tween?.kill());
          pulse?.kill();
        };
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <svg
      ref={rootRef}
      viewBox={`0 0 ${size} ${size}`}
      className="h-auto w-full"
      role="img"
      aria-label={`${label}: ${satellites} components, plotted as a body whose brightness reflects its ${status} status. A diagram, not a screenshot.`}
    >
      <defs>
        <radialGradient id={gradientId}>
          <stop offset="0%" stopColor="var(--color-glow)" stopOpacity={light.halo} />
          <stop offset="45%" stopColor="var(--color-primary-70)" stopOpacity={light.halo * 0.42} />
          <stop offset="100%" stopColor="var(--color-primary-70)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {light.halo > 0 ? (
        <circle cx={centre} cy={centre} r={centre} fill={`url(#${gradientId})`} />
      ) : null}

      {orbits.map((orbit, index) => (
        <ellipse
          key={`orbit-${index}`}
          cx={centre}
          cy={centre}
          rx={orbit.radius}
          ry={orbit.radius * 0.62}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="0.75"
          opacity={light.ring - index * 0.04}
        />
      ))}

      {orbits.map((orbit, index) => (
        <circle
          key={`node-${index}`}
          data-satellite={index}
          cx={orbit.x}
          cy={orbit.y}
          r={index === 0 ? 4 : 2.5}
          fill={index === 0 ? "var(--color-primary)" : "var(--color-secondary)"}
          opacity={index === 0 ? light.core : light.core * 0.62}
        />
      ))}

      <g data-core>
        <circle cx={centre} cy={centre} r="13" fill="var(--color-primary)" opacity={light.core} />
        <circle
          cx={centre}
          cy={centre}
          r="13"
          fill="none"
          stroke="var(--color-glow)"
          strokeWidth="1"
          opacity={light.core * 0.7}
        />
      </g>
    </svg>
  );
}
