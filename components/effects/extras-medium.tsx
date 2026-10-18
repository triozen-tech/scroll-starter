"use client";

// Interface effects written fresh for this template (medium tier). Live demos for the /effects gallery.
import { useRef, useState } from "react";
import Letterbox from "@/components/fx/extra/Letterbox";
import Drawer from "@/components/fx/extra/Drawer";
import Accordion from "@/components/fx/extra/Accordion";
import StickyBuyBar from "@/components/fx/extra/StickyBuyBar";
import MorphLink from "@/components/fx/extra/MorphLink";
import { flyToCart } from "@/components/fx/extra/flyToCart";
import { scene, useScrub } from "@/components/fx/shared";
import type { MotionDef } from "@/components/motion/types";

const center = "grid h-full w-full place-items-center text-white";
const btn = "rounded-full border border-white/30 px-6 py-3 text-[15px] transition-colors hover:bg-white hover:text-black";

function LetterboxDemo() {
  return (
    <div className="grid h-full place-items-center p-10">
      <Letterbox bar={16} className="aspect-[16/9] w-[min(1100px,100%)] rounded-lg">
        <img src={scene(0)} alt="" className="h-full w-full object-cover" />
      </Letterbox>
    </div>
  );
}

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className={center}><button className={btn} onClick={() => setOpen(true)}>Open the cart</button></div>
      <Drawer open={open} onClose={() => setOpen(false)} contained>
        <p className="text-[13px] uppercase tracking-[0.2em] text-white/50">Your cart</p>
        <p className="mt-6 text-[22px]">Linen shirt <span className="float-right">$80 (sample)</span></p>
        <p className="mt-3 text-[22px]">Canvas tote <span className="float-right">$35 (sample)</span></p>
        <button className={`${btn} mt-10`} onClick={() => setOpen(false)}>Close</button>
      </Drawer>
    </div>
  );
}

function FlyDemo() {
  const [count, setCount] = useState(0);
  const img = useRef<HTMLImageElement>(null);
  const cart = useRef<HTMLSpanElement>(null);
  return (
    <div className="relative h-full w-full text-white">
      <span ref={cart} className="absolute right-12 top-10 grid h-12 min-w-12 place-items-center rounded-full border border-white/30 px-3">Cart {count}</span>
      <div className="grid h-full place-items-center">
        <div className="text-center">
          <img ref={img} src={scene(1)} alt="" className="mx-auto h-56 w-56 rounded-xl object-cover" />
          <button className={`${btn} mt-8`} onClick={() => img.current && cart.current && flyToCart(img.current, cart.current, { onLand: () => setCount((c) => c + 1) })}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}

function StickyDemo() {
  const [show, setShow] = useState(false);
  return (
    <div className="relative h-full w-full overflow-hidden text-white">
      <div className={center}>
        <div className="text-center">
          <p className="text-[28px] font-[700]">Linen shirt</p>
          <button className={`${btn} mt-6`} onClick={() => setShow((s) => !s)}>{show ? "Hide the bar" : "Scroll past the buy button"}</button>
        </div>
      </div>
      <StickyBuyBar contained show={show} name="Linen shirt" price="$80 (sample)" />
    </div>
  );
}

function MorphDemo() {
  const [big, setBig] = useState(false);
  return (
    <div className="grid h-full place-items-center text-white">
      <div className={big ? "grid w-[min(900px,92%)] gap-4" : "flex items-center gap-6"}>
        <img src={scene(3)} alt="" className={big ? "h-[420px] w-full rounded-xl object-cover" : "h-32 w-32 rounded-xl object-cover"} style={{ viewTransitionName: "demo-pic" }} />
        <MorphLink onMorph={() => setBig((b) => !b)} className="underline underline-offset-4">{big ? "Back to the list" : "Open the picture"}</MorphLink>
      </div>
    </div>
  );
}

function AccordionDemo() {
  return (
    <div className="grid h-full place-items-center px-10 text-white">
      <Accordion className="w-[min(780px,100%)]" items={[
        { title: "How long is shipping?", body: "Two to four days. This is sample text." },
        { title: "Can I return it?", body: "Yes, within thirty days. Sample text." },
        { title: "Do you ship abroad?", body: "Not yet. Sample text." },
      ]} />
    </div>
  );
}

function SheetScrubDemo() {
  // A card that rises from the bottom as the section scrolls: a scrub demo using the shared helper.
  const root = useRef<HTMLDivElement>(null);
  useScrub(root, (p) => {
    const r = root.current;
    if (!r) return;
    const e = Math.min(1, p * 1.6);
    (r.querySelector("[data-card]") as HTMLElement).style.transform = `translateY(${(1 - e) * 110}%)`;
    (r.querySelector("[data-shade]") as HTMLElement).style.opacity = String(e);
  });
  return (
    <div ref={root} className="relative h-full w-full overflow-hidden text-white">
      <div className={center}><p className="text-[28px]">Scroll: the bottom sheet rises</p></div>
      <div data-shade className="absolute inset-0 bg-black/50" style={{ opacity: 0 }} />
      <div data-card className="absolute inset-x-[10%] bottom-0 h-[55%] rounded-t-2xl bg-[#10151f] p-8" style={{ transform: "translateY(110%)" }}><p className="text-[22px]">Filters</p></div>
    </div>
  );
}

export const DEFS: MotionDef[] = [
  { code: "U6", name: "Letterbox bars", how: "Two cinema bars frame the picture, then slide away as it enters", kind: "scrub", C: LetterboxDemo },
  { code: "U7", name: "Slide-in drawer", how: "A panel slides over a dimmed page; Esc or a click outside closes it", kind: "play", C: DrawerDemo },
  { code: "U8", name: "Accordion", how: "Questions open with a smooth height change; the plus turns into a cross", kind: "play", C: AccordionDemo },
  { code: "U9", name: "Fly to cart", how: "A copy of the picture flies on a curve to the cart, which bumps", kind: "play", C: FlyDemo },
  { code: "U10", name: "Sticky buy bar", how: "A bar slides up from the bottom edge when the main button is out of sight", kind: "play", C: StickyDemo },
  { code: "U11", name: "Morphing link", how: "A thumbnail grows into the big picture using the browser's view transition", kind: "play", C: MorphDemo },
  { code: "U12", name: "Bottom sheet", how: "A card rises from the bottom as you scroll, with the page dimming behind it", kind: "scrub", C: SheetScrubDemo },
];
