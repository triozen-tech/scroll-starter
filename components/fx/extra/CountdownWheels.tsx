"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** One digit: a column 0–9 that slides to the right number. */
function Wheel({ digit }: { digit: number }) {
  const col = useRef<HTMLSpanElement>(null);
  const first = useRef(true);
  useEffect(() => {
    const el = col.current;
    if (!el) return;
    const y = -digit * 10;
    if (first.current || prefersReducedMotion()) {
      gsap.set(el, { yPercent: y });
      first.current = false;
    } else gsap.to(el, { yPercent: y, duration: 0.6, ease: "power3.inOut", overwrite: true });
  }, [digit]);
  return (
    <span className="inline-block overflow-hidden align-bottom" style={{ height: "1em", lineHeight: "1em", width: "0.62em" }}>
      <span ref={col} className="flex flex-col will-change-transform">
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} className="block text-center">{n}</span>
        ))}
      </span>
    </span>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * A countdown whose digits are rolling wheels. Give it a target time (a Date, in milliseconds since 1970) or a
 * number of seconds to count down from the moment it appears.
 *   <CountdownWheels seconds={3 * 3600} />   <CountdownWheels to={new Date("2030-01-01")} />
 */
export default function CountdownWheels({ to, seconds = 0, className = "" }: { to?: Date | number; seconds?: number; className?: string }) {
  const startedAt = useRef(0);
  const [left, setLeft] = useState(() => (to ? Math.max(0, Math.floor((+to - Date.now()) / 1000)) : seconds));
  useEffect(() => {
    startedAt.current = Date.now();
    const tick = () => setLeft(to ? Math.max(0, Math.floor((+to - Date.now()) / 1000)) : Math.max(0, seconds - Math.floor((Date.now() - startedAt.current) / 1000)));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [to, seconds]);
  const parts = [
    ["days", Math.floor(left / 86400)],
    ["hours", Math.floor((left % 86400) / 3600)],
    ["min", Math.floor((left % 3600) / 60)],
    ["sec", left % 60],
  ] as const;
  return (
    <div className={`flex items-start gap-[0.5em] ${className}`} role="timer" aria-label={`${left} seconds left`}>
      {parts.map(([label, v]) => (
        <div key={label} className="text-center">
          <div className="flex justify-center">
            {pad(v).split("").map((d, i) => (
              <Wheel key={i} digit={Number(d)} />
            ))}
          </div>
          <div className="mt-[0.3em] text-[0.22em] uppercase tracking-[0.2em] opacity-60">{label}</div>
        </div>
      ))}
    </div>
  );
}
