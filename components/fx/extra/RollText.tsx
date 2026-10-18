"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Text that rolls like a slot machine when it changes. Each character sits in a mask; the old character
 * slides up and out while the new one slides up from below.
 *   <RollText text={String(count)} />
 * Props: `text`, `duration` (seconds per character), `stagger` (delay between characters), `className`.
 */
export default function RollText({ text, duration = 0.55, stagger = 0.04, className = "" }: { text: string; duration?: number; stagger?: number; className?: string }) {
  const root = useRef<HTMLSpanElement>(null);
  const prev = useRef<string | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const before = prev.current;
    prev.current = text;
    if (before === null || before === text || prefersReducedMotion()) return;
    const cols = Array.from(el.querySelectorAll<HTMLElement>("[data-col]"));
    cols.forEach((col, i) => {
      if ((before[i] ?? "") === (text[i] ?? "")) return;
      gsap.fromTo(col, { yPercent: 0 }, { yPercent: -50, duration, delay: i * stagger, ease: "power3.inOut", onComplete: () => void gsap.set(col, { yPercent: 0 }) });
    });
  }, [text, duration, stagger]);

  const before = prev.current ?? text;
  return (
    <span ref={root} className={`inline-flex ${className}`} aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom" style={{ height: "1.1em", lineHeight: "1.1em" }}>
          <span data-col className="flex flex-col will-change-transform">
            <span>{before[i] === " " || ch === " " ? " " : (before[i] ?? ch)}</span>
            <span>{ch === " " ? " " : ch}</span>
          </span>
        </span>
      ))}
    </span>
  );
}
