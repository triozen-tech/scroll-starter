"use client";

// Small interface effects written fresh for this template. Each entry is a live demo for the /effects gallery.
import { useEffect, useState } from "react";
import RollText from "@/components/fx/extra/RollText";
import SplitFlap from "@/components/fx/extra/SplitFlap";
import CountdownWheels from "@/components/fx/extra/CountdownWheels";
import Stepper from "@/components/fx/extra/Stepper";
import HeartButton from "@/components/fx/extra/HeartButton";
import type { MotionDef } from "@/components/motion/types";

const center = "grid h-full w-full place-items-center text-white";

function RollDemo() {
  const [n, setN] = useState(128);
  useEffect(() => {
    const id = setInterval(() => setN((v) => v + 1 + Math.floor(Math.random() * 40)), 1800);
    return () => clearInterval(id);
  }, []);
  return <div className={center}><RollText text={`$${n}`} className="text-[clamp(64px,10vw,160px)] font-[800]" /></div>;
}

function FlapDemo() {
  const words = ["PLATFORM 4", "ON TIME", "GATE B12", "NOW BOARDING"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 3200);
    return () => clearInterval(id);
  }, [words.length]);
  return <div className={center}><SplitFlap text={words[i].padEnd(12, " ")} className="text-[clamp(32px,5vw,80px)] font-[800]" /></div>;
}

export const DEFS: MotionDef[] = [
  { code: "U1", name: "Rolling text", how: "Each character rolls up like a slot machine when the value changes", kind: "play", C: RollDemo },
  { code: "U2", name: "Split-flap board", how: "Letters flip through random glyphs, then land one by one", kind: "play", C: FlapDemo },
  { code: "U3", name: "Countdown wheels", how: "Digits are wheels that slide to the next number every second", kind: "play", C: () => <div className={center}><CountdownWheels seconds={3 * 86400 + 4 * 3600 + 12 * 60 + 9} className="text-[clamp(48px,8vw,120px)] font-[800]" /></div> },
  { code: "U4", name: "Quantity stepper", how: "Minus and plus buttons dip on press; the number rolls", kind: "play", C: () => <div className={center}><Stepper defaultValue={2} min={1} max={9} /></div> },
  { code: "U5", name: "Heart burst", how: "Click the heart: it pops and sends out a ring of dots", kind: "play", C: () => <div className={center}><HeartButton size={96} /></div> },
];
