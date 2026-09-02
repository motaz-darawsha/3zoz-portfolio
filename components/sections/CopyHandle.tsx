"use client";

import { useEffect, useRef, useState } from "react";

type State = "idle" | "copied" | "selected";

/**
 * A copy control shaped like the secondary button, because it sits in a list
 * of them. Clipboard access can be denied by permissions policy, so failure
 * falls back to selecting the handle text — the user can still copy it, and
 * the label says which happened rather than failing silently.
 */
export function CopyHandle({ value, label }: { value: string; label: string }) {
  const [state, setState] = useState<State>("idle");
  const handleRef = useRef<HTMLSpanElement>(null);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timeout.current), []);

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
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setState("idle"), 2400);
  };

  const feedback: Record<State, string> = {
    idle: "Copy",
    copied: "Copied",
    selected: "Selected",
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label} handle`}
      className="flex h-9 w-full items-center justify-between gap-2 rounded-pill border border-border bg-transparent px-4 type-label text-secondary transition-colors duration-200 ease-in-out-soft hover:border-primary-70 hover:text-on-surface"
    >
      <span className="flex items-baseline gap-3">
        <span className="type-overline text-dim">{label}</span>
        <span ref={handleRef} className="type-label text-on-surface">
          {value}
        </span>
      </span>
      <span aria-live="polite" className="type-overline text-dim">
        {feedback[state]}
      </span>
    </button>
  );
}
