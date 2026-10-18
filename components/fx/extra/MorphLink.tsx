"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

type VT = { startViewTransition?: (cb: () => void) => unknown };

/** Runs `change` inside the browser's view transition, so anything with the same `view-transition-name` before and after morphs. Falls back to a plain change. */
export function morph(change: () => void) {
  const d = document as unknown as VT;
  if (typeof d.startViewTransition === "function") d.startViewTransition(change);
  else change();
}

/**
 * A link or button whose click morphs the old view into the new one (a thumbnail grows into the detail page).
 * Give the thumbnail and the big picture the same `style={{ viewTransitionName: "hero" }}`.
 *   <MorphLink onMorph={() => setOpen(true)}>Open</MorphLink>
 */
export default function MorphLink({ onMorph, children, ...rest }: { onMorph: () => void; children: ReactNode } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick">) {
  return (
    <a
      href="#"
      {...rest}
      onClick={(e) => {
        e.preventDefault();
        morph(onMorph);
      }}
    >
      {children}
    </a>
  );
}
