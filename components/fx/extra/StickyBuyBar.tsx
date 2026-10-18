"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * A buy bar that slides up from the bottom edge once the main buy button has scrolled out of sight.
 * You decide when: pass `show`. (Real use: set it from an IntersectionObserver on your main button.)
 *   <StickyBuyBar show={!mainButtonVisible} name="Linen shirt" price="$80 (sample)" onBuy={…} />
 * `contained` keeps the bar inside the nearest positioned parent (used by the gallery demo).
 */
export default function StickyBuyBar({ show, name, price, label = "Add to cart", onBuy, contained = false, children }: { show: boolean; name: string; price: string; label?: string; onBuy?: () => void; contained?: boolean; children?: ReactNode }) {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!bar.current) return;
    gsap.to(bar.current, { yPercent: show ? 0 : 110, duration: prefersReducedMotion() ? 0 : 0.5, ease: "power3.out" });
  }, [show]);
  return (
    <div ref={bar} className={`${contained ? "absolute" : "fixed"} inset-x-0 bottom-0 z-40 flex items-center gap-6 border-t border-white/15 bg-[#10151f]/95 px-8 py-4 text-white backdrop-blur`} style={{ transform: "translateY(110%)" }}>
      <div>
        <p className="text-[15px] font-[650]">{name}</p>
        <p className="text-[13px] text-white/60">{price}</p>
      </div>
      {children}
      <button type="button" onClick={onBuy} className="ml-auto rounded-full bg-white px-6 py-2.5 text-[14px] font-[650] text-black">{label}</button>
    </div>
  );
}
