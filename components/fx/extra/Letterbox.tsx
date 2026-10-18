"use client";

import { useRef, type ReactNode } from "react";
import { useScrub } from "@/components/fx/shared";

/**
 * Cinema bars: two bars frame the content like a film, then slide away as the section scrolls in.
 * (Inside a tall section with a sticky stage it follows that whole section; on its own it follows its pass through the screen.)
 *   <Letterbox><img … /></Letterbox>
 * Props: `bar` (bar height as a share of the box, default 14 = 14%), `color`, `className`.
 */
export default function Letterbox({ children, bar = 14, color = "#000", className = "" }: { children: ReactNode; bar?: number; color?: string; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  useScrub(
    root,
    (p) => {
      const s = String(Math.max(0, 1 - p * 2.2));
      root.current?.querySelectorAll<HTMLElement>("[data-bar]").forEach((b) => (b.style.transform = `scaleY(${s})`));
    },
  );
  const style = (origin: string) => ({ height: `${bar}%`, background: color, transformOrigin: origin });
  return (
    <div ref={root} className={`relative overflow-hidden ${className}`}>
      {children}
      <div data-bar className="pointer-events-none absolute inset-x-0 top-0" style={style("50% 0%")} />
      <div data-bar className="pointer-events-none absolute inset-x-0 bottom-0" style={style("50% 100%")} />
    </div>
  );
}
