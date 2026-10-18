"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * A panel that slides in over a dimmed page (cart, menu, filters, bottom sheet). Closes on Esc or a click outside.
 *   <Drawer open={open} onClose={() => setOpen(false)} side="right">…</Drawer>
 * Props: `open`, `onClose`, `side` ("right" | "left" | "bottom"), `contained` (cover the nearest positioned parent instead of the whole window), `className` (panel).
 */
export default function Drawer({ open, onClose, side = "right", contained = false, className = "", children }: { open: boolean; onClose: () => void; side?: "right" | "left" | "bottom"; contained?: boolean; className?: string; children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const shade = useRef<HTMLDivElement>(null);
  const from = side === "right" ? { xPercent: 100 } : side === "left" ? { xPercent: -100 } : { yPercent: 100 };

  useEffect(() => {
    const w = wrap.current, p = panel.current, s = shade.current;
    if (!w || !p || !s) return;
    const quick = prefersReducedMotion();
    if (open) {
      w.style.visibility = "visible";
      gsap.to(s, { opacity: 1, duration: quick ? 0 : 0.35 });
      gsap.to(p, { xPercent: 0, yPercent: 0, duration: quick ? 0 : 0.55, ease: "power3.out" });
      p.focus();
    } else {
      gsap.to(s, { opacity: 0, duration: quick ? 0 : 0.3 });
      gsap.to(p, { ...from, duration: quick ? 0 : 0.4, ease: "power3.in", onComplete: () => void (w.style.visibility = "hidden") });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, onClose]);

  const place = side === "right" ? "right-0 top-0 h-full w-[min(440px,100%)]" : side === "left" ? "left-0 top-0 h-full w-[min(440px,100%)]" : "bottom-0 left-0 w-full max-h-[85%]";
  return (
    <div ref={wrap} className={`${contained ? "absolute" : "fixed"} inset-0 z-50`} style={{ visibility: "hidden" }} aria-hidden={!open}>
      <div ref={shade} onClick={onClose} className="absolute inset-0 bg-black/55" style={{ opacity: 0 }} />
      <div ref={panel} tabIndex={-1} role="dialog" aria-modal="true" className={`absolute ${place} overflow-auto bg-[#10151f] p-6 text-white outline-none ${className}`} style={{ transform: side === "bottom" ? "translateY(100%)" : `translateX(${side === "right" ? 100 : -100}%)` }}>
        {children}
      </div>
    </div>
  );
}

/** The bottom sheet is the same panel, coming up from the bottom edge. */
export const Sheet = (props: Omit<Parameters<typeof Drawer>[0], "side">) => <Drawer {...props} side="bottom" />;
