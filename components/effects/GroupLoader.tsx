"use client";

import { useEffect, useState } from "react";
import type { MotionDef } from "@/components/motion/types";
import { GROUPS } from "./registry";
import Gallery from "./Gallery";

// Loads one effect group (its own chunk) and shows it as a gallery page.
export default function GroupLoader({ slug }: { slug: string }) {
  const g = GROUPS.find((x) => x.slug === slug);
  const [defs, setDefs] = useState<MotionDef[] | null>(null);
  useEffect(() => {
    let live = true;
    g?.load().then((m) => live && setDefs(m.DEFS));
    return () => {
      live = false;
    };
  }, [g]);
  if (!g) return <p className="p-10 text-white">Unknown group.</p>;
  if (!defs) return <p className="grid h-[100svh] place-items-center bg-[#05080f] text-white/60">Loading {g.title}…</p>;
  return <Gallery title={g.title} file={g.file} defs={defs} />;
}
