"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { ScrubRoot } from "@/components/fx/shared";
import type { MotionDef } from "@/components/motion/types";

// A demo is only mounted while its section is within ~1.5 screens of the viewport. Far-away demos unmount, so their
// canvases, WebGL contexts and tickers are released (a page with 60 demos would otherwise pile them up).
function useLive(ref: RefObject<HTMLElement | null>) {
  const [live, setLive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // ?static=1 runs no WebGL or loops, so every demo can stay mounted for a layout check
    if (new URLSearchParams(location.search).has("static")) {
      setLive(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { rootMargin: "150% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return live;
}

function Demo({ d, file }: { d: MotionDef; file: string }) {
  const root = useRef<HTMLElement>(null);
  const live = useLive(root);
  const label = (
    <header className="pointer-events-none absolute left-[56px] top-[56px] z-20 max-w-[560px]">
      <p className="text-[40px] font-[800] leading-none text-[#4f8dff]">{d.code}</p>
      <p className="mt-1 text-[20px] font-[650]">{d.name}</p>
      <p className="mt-1 text-[13px] text-white/60">{d.how}</p>
      <p className="mt-3 text-[12px] leading-[1.5] text-white/45">
        <b className="font-[650] text-white/65">How to use:</b> copy the block marked {d.code} from {file} into your site, inside a section with a set height.{" "}
        {d.kind === "scrub" ? "It follows the scroll: give its section about 220vh and keep the stage sticky (useScrub in components/fx/shared.ts)." : "It plays by itself while it is on screen."}
      </p>
    </header>
  );
  const stage = "absolute inset-x-[56px] bottom-[6vh] top-[230px]";
  if (d.kind === "scrub")
    return (
      <section ref={root} id={d.code.toLowerCase()} className="relative h-[220vh] border-t border-white/10" data-record-time="1.2" data-record-label={d.code}>
        <ScrubRoot.Provider value={root}>
          <div className="sticky top-0 h-[100svh] overflow-hidden">
            {label}
            <div className={stage}>{live && <d.C />}</div>
            <div className="fx-pan pointer-events-none absolute inset-[-6%] z-10 opacity-75 mix-blend-screen" aria-hidden>
              <div className="lab-glow absolute inset-0" />
            </div>
          </div>
        </ScrubRoot.Provider>
        <div className="absolute bottom-0 left-0 h-px w-px" data-record-time="2.4" data-record-align="bottom" data-record-label={`${d.code} end`} aria-hidden />
      </section>
    );
  return (
    <section ref={root} id={d.code.toLowerCase()} className="relative h-[100svh] overflow-hidden border-t border-white/10" data-record-time="2.4" data-record-align="center" data-record-label={d.code}>
      {label}
      <div className={stage}>{live && <d.C />}</div>
      <div className="fx-pan pointer-events-none absolute inset-[-6%] z-10 opacity-40 mix-blend-screen" aria-hidden>
        <div className="lab-glow absolute inset-0" />
      </div>
    </section>
  );
}

export default function Gallery({ title, file, defs }: { title: string; file: string; defs: MotionDef[] }) {
  useEffect(() => {
    if (prefersReducedMotion()) document.documentElement.classList.add("is-static");
  }, []);
  // pause the CSS loops of demos that are far from the viewport
  useEffect(() => {
    const secs = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
    const io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle("mo-off", !e.isIntersecting)), { rootMargin: "200px 0px" });
    secs.forEach((s) => {
      s.classList.add("mo-off");
      io.observe(s);
    });
    return () => io.disconnect();
  }, []);
  return (
    <main className="bg-[#05080f] text-[#eaf5ff]" style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      <style>{`.mo-off, .mo-off * { animation-play-state: paused !important; }`}</style>
      <section className="relative grid h-[100svh] place-items-center overflow-hidden px-6 text-center" data-record-time="0.6" data-record-label="Effects">
        <div className="fx-pan pointer-events-none absolute inset-[-6%]" aria-hidden>
          <div className="lab-glow absolute inset-0" />
        </div>
        <div className="relative">
          <p className="text-[13px] uppercase tracking-[0.2em] text-white/50">Effects gallery</p>
          <h1 className="fx-drift mt-4 text-[96px] font-[800] leading-[0.9] tracking-[-0.03em]">{title}</h1>
          <p className="mx-auto mt-4 max-w-[56ch] text-white/65">
            {defs.length} effects, each a small live demo. All names, text and prices in the demos are samples. Add ?static=1 to the address to see the still version with no motion.
          </p>
          <a className="mt-6 inline-block text-[14px] text-[#4f8dff] underline" href="/effects">
            ← all effect groups
          </a>
        </div>
      </section>
      {defs.map((d) => (
        <Demo key={d.code} d={d} file={file} />
      ))}
      <section className="relative grid h-[50svh] place-items-center overflow-hidden" data-record-time="1.2" data-record-align="bottom" data-record-label="End">
        <div className="fx-pan pointer-events-none absolute inset-[-6%]" aria-hidden>
          <div className="lab-glow absolute inset-0" />
        </div>
        <p className="fx-drift relative text-[56px] font-[800]">End of {title}</p>
      </section>
    </main>
  );
}
