"use client";

import { useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * A heart you can toggle: it pops and sends out a small ring of dots when it turns on.
 *   <HeartButton onChange={(on) => …} />
 * Props: `defaultOn`, `color`, `size` (px), `onChange`.
 */
export default function HeartButton({ defaultOn = false, color = "#ff4d6d", size = 40, onChange }: { defaultOn?: boolean; color?: string; size?: number; onChange?: (on: boolean) => void }) {
  const [on, setOn] = useState(defaultOn);
  const root = useRef<HTMLButtonElement>(null);
  const click = () => {
    const next = !on;
    setOn(next);
    onChange?.(next);
    const el = root.current;
    if (!el || prefersReducedMotion() || !next) return;
    gsap.fromTo(el.querySelector("svg"), { scale: 0.6 }, { scale: 1, duration: 0.7, ease: "elastic.out(1,0.45)" });
    el.querySelectorAll("[data-dot]").forEach((d, i) => {
      const a = (i / 8) * Math.PI * 2;
      gsap.fromTo(d, { x: 0, y: 0, scale: 1, opacity: 1 }, { x: Math.cos(a) * size * 0.9, y: Math.sin(a) * size * 0.9, scale: 0, opacity: 0, duration: 0.6, ease: "power2.out" });
    });
  };
  return (
    <button ref={root} type="button" onClick={click} aria-pressed={on} aria-label={on ? "Remove from favourites" : "Add to favourites"} className="relative grid place-items-center" style={{ width: size, height: size }}>
      {Array.from({ length: 8 }, (_, i) => (
        <i key={i} data-dot className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full opacity-0" style={{ background: color }} />
      ))}
      <svg viewBox="0 0 24 24" width={size * 0.7} height={size * 0.7} fill={on ? color : "none"} stroke={on ? color : "currentColor"} strokeWidth={1.6} style={{ transition: "fill .25s, stroke .25s" }}>
        <path d="M12 21s-7.5-4.6-9.5-9.2C1.2 8.6 3 5 6.4 5c2 0 3.6 1.1 4.6 2.7h2C14 6.1 15.600 5 17.600 5 21 5 22.800 8.600 21.500 11.800 19.500 16.400 12 21 12 21z" />
      </svg>
    </button>
  );
}
