"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const GLYPHS = "ABCDEFGHKLMNOPRSTUVWXYZ0123456789";

/**
 * A departures-board word: every letter flips through a few random glyphs, then lands. Plays when it scrolls
 * into view, and again whenever `text` changes.
 *   <SplitFlap text="PLATFORM 4" />
 * Props: `text`, `flips` (random glyphs before landing), `className`, `cellClassName`.
 */
export default function SplitFlap({ text, flips = 3, className = "", cellClassName = "" }: { text: string; flips?: number; className?: string; cellClassName?: string }) {
  const root = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const cells = Array.from(el.querySelectorAll<HTMLElement>("[data-cell]"));
    const tl = gsap.timeline({ paused: true });
    cells.forEach((c, i) => {
      const real = text[i];
      if (real === " ") return;
      const t0 = i * 0.07;
      for (let f = 0; f < flips; f++) {
        tl.call(() => void (c.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]), [], t0 + f * 0.07);
        tl.fromTo(c, { rotationX: -80 }, { rotationX: 0, duration: 0.07, ease: "none" }, t0 + f * 0.07);
      }
      tl.call(() => void (c.textContent = real), [], t0 + flips * 0.07);
      tl.fromTo(c, { rotationX: -80 }, { rotationX: 0, duration: 0.14, ease: "power2.out" }, t0 + flips * 0.07);
    });
    const st = ScrollTrigger.create({ trigger: el, start: "top 85%", onEnter: () => tl.restart() });
    tl.restart();
    return () => {
      st.kill();
      tl.kill();
    };
  }, [text, flips]);

  return (
    <span ref={root} className={`inline-flex gap-[0.08em] [perspective:600px] ${className}`} aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <span key={i} data-cell aria-hidden className={`inline-block min-w-[0.7em] bg-white/10 px-[0.1em] text-center ${cellClassName}`} style={{ transformOrigin: "50% 50%" }}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}
