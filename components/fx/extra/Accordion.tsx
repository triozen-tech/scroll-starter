"use client";

import { useRef, useState, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export type AccordionItem = { title: string; body: ReactNode };

/**
 * Questions that open with a smooth height change; one open at a time. The plus turns into a cross.
 *   <Accordion items={[{ title: "Shipping?", body: "Two days." }]} />
 */
export default function Accordion({ items, className = "" }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const bodies = useRef<(HTMLDivElement | null)[]>([]);
  const toggle = (i: number) => {
    const next = open === i ? null : i;
    const dur = prefersReducedMotion() ? 0 : 0.5;
    bodies.current.forEach((b, k) => b && gsap.to(b, { height: k === next ? "auto" : 0, duration: dur, ease: "power3.inOut" }));
    setOpen(next);
  };
  return (
    <div className={`divide-y divide-white/15 border-y border-white/15 ${className}`}>
      {items.map((it, i) => (
        <div key={it.title}>
          <button type="button" onClick={() => toggle(i)} aria-expanded={open === i} className="flex w-full items-center justify-between py-5 text-left text-[20px]">
            {it.title}
            <span className="relative ml-6 block h-4 w-4 shrink-0 transition-transform duration-500" style={{ transform: `rotate(${open === i ? 135 : 0}deg)` }} aria-hidden>
              <i className="absolute left-0 top-1/2 h-px w-full bg-current" />
              <i className="absolute left-1/2 top-0 h-full w-px bg-current" />
            </span>
          </button>
          <div ref={(el) => void (bodies.current[i] = el)} className="overflow-hidden" style={{ height: i === 0 ? "auto" : 0 }}>
            <div className="pb-5 text-white/65">{it.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
