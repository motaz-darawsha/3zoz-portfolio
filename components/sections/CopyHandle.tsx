"use client";

import { useEffect, useRef, useState } from "react";

type State = "idle" | "copied" | "selected";

/**
 * Level 1 microinteraction. Clipboard access can be denied by permissions
 * policy, so failure falls back to selecting the handle text — the user can
 * still copy it, and the label says which happened instead of failing silently.
 */
export function CopyHandle({ value, label }: { value: string; label: string }) {
  const [state, setState] = useState<State>("idle");
  const handleRef = useRef<HTMLSpanElement>(null);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timeout.current), []);

  const reset = () => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setState("idle"), 2400);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      const node = handleRef.current;
      if (node) {
        const range = document.createRange();
        range.selectNodeContents(node);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      setState("selected");
    }
    reset();
  };

  const labels: Record<State, string> = {
    idle: "Copy",
    copied: "Copied",
    selected: "Selected — press copy",
  };

  return (
    <span className="flex flex-1 items-baseline justify-between gap-6">
      <span ref={handleRef} className="font-display text-xl sm:text-2xl">
        {value}
      </span>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="shrink-0 border border-line px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-dim transition-colors duration-200 hover:border-ember-dim hover:text-text"
      >
        <span aria-live="polite">{labels[state]}</span>
      </button>
    </span>
  );
}
