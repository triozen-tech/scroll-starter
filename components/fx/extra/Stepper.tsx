"use client";

import { useState } from "react";
import RollText from "./RollText";

/**
 * A quantity stepper: minus, a number that rolls, plus. Buttons dip when pressed.
 *   <Stepper min={1} max={9} onChange={(n) => …} />
 */
export default function Stepper({ defaultValue = 1, min = 0, max = 99, onChange, className = "" }: { defaultValue?: number; min?: number; max?: number; onChange?: (n: number) => void; className?: string }) {
  const [n, setN] = useState(defaultValue);
  const set = (v: number) => {
    const c = Math.min(max, Math.max(min, v));
    setN(c);
    onChange?.(c);
  };
  const btn = "grid h-10 w-10 place-items-center rounded-full border border-white/25 text-[20px] transition-transform active:scale-90 disabled:opacity-30";
  return (
    <div className={`inline-flex items-center gap-4 ${className}`}>
      <button type="button" className={btn} onClick={() => set(n - 1)} disabled={n <= min} aria-label="One less">−</button>
      <RollText text={String(n)} className="min-w-[2ch] justify-center text-[24px]" />
      <button type="button" className={btn} onClick={() => set(n + 1)} disabled={n >= max} aria-label="One more">+</button>
    </div>
  );
}
