"use client";

// Effects from the original effect library, easy tier. Each entry is a small live demo for the /effects gallery.
import { BendMarquee, CurvedPathText, DrawRings, Odometer, ParticleText, ScrambleLine, ShineText } from "@/components/fx/text";
import { AtmosphericBleed, CutAndStamp, FadeThroughBlack, GlacialPin, InversionCut, PreloaderOverlap, ReticleWipe, StampPopDissolve, ThrownPath, VelocitySkewText, VignetteSpotlight } from "@/components/fx/more2";
import type { MotionDef } from "@/components/motion/types";

const fill = "h-full w-full";
const center = "grid h-full w-full place-items-center";

export const DEFS: MotionDef[] = [
  { code: "M8", name: "Line draw (now DrawSVG)", how: "DrawSVG draws three lines on; a spark keeps running along them", kind: "play", C: () => (
        <div className={center}>
          <DrawRings className="w-[min(900px,90%)] text-[#5cc8ff]" />
        </div>
  ) },
  { code: "M22", name: "Scramble / decode (now ScrambleText)", how: "ScrambleText lands each value left → right", kind: "play", C: () => (
        <div className="grid h-full content-center gap-4 text-[clamp(44px,8vw,120px)] font-[900] leading-none">
          <ScrambleLine text="80 MG CAFFEINE" className="font-display" />
          <ScrambleLine text="B3 · B6 · B12" className="font-display text-[var(--accent)]" duration={1.8} />
        </div>
  ) },
  { code: "M39", name: "Text on a moving curved path", how: "SVG textPath; curve breathes, text slides with time + scroll", kind: "play", C: () => (
        <CurvedPathText text="COLD BREW · SMALL BATCH" className={`${fill} text-[#eaf5ff]`} />
  ) },
  { code: "M44", name: "Marquee that bends with scroll speed", how: "endless row; faster scroll = deeper arc · time + scroll", kind: "play", C: () => (
        <div className="grid h-full content-center">
          <BendMarquee words={["Cold", "Loud", "Awake", "Fresh", "Bold"]} className="text-[clamp(56px,9vw,140px)] font-[900]" />
        </div>
  ) },
  { code: "M45", name: "Particle text", how: "canvas dots fly in and form the word; they keep shimmering · scrub", kind: "scrub", C: () => (
        <ParticleText text="AWAKE" className={fill} />
  ) },
  { code: "M48", name: "Odometer number roll (full spin)", how: "each digit column spins a full cycle to its value; replays on re-entry", kind: "play", C: () => (
        <div className="grid h-full content-center gap-2 text-[clamp(64px,12vw,180px)] font-[900] leading-none">
          <Odometer value="2,480" prefix="$" className="font-display" />
          <Odometer value="98" suffix="%" className="font-display text-[var(--accent)]" />
        </div>
  ) },
  { code: "M49", name: "Light sweep / shine", how: "a bright band sweeps the type on a loop, faster while scrolling", kind: "play", C: () => (
        <div className="grid h-full content-center">
          <ShineText className="font-display text-[clamp(64px,11vw,170px)] font-[900] leading-none text-[#7f93a8]">PURE GOLD</ShineText>
        </div>
  ) },
  { code: "X12", name: "Fade through black", how: "A fades to black, a held darkness (a light keeps it alive), B fades up · scrub", kind: "scrub", C: () => (
        <FadeThroughBlack />
  ) },
  { code: "X13", name: "Inversion cut", how: "B opens as the photographic negative and settles, tilting from 2° · scrub", kind: "scrub", C: () => (
        <InversionCut />
  ) },
  { code: "X14", name: "Atmospheric bleed", how: "a drifting haze rises over A, holds, clears onto B · scrub", kind: "scrub", C: () => (
        <AtmosphericBleed />
  ) },
  { code: "X15", name: "Vignette spotlight", how: "the edges close to a spotlight, cut, the vignette opens on B · scrub", kind: "scrub", C: () => (
        <VignetteSpotlight />
  ) },
  { code: "X16", name: "Cut-and-stamp", how: "a hard cut with a 2px jolt that settles at once · scrub", kind: "scrub", C: () => (
        <CutAndStamp />
  ) },
  { code: "X17", name: "Lock-on reticle wipe", how: "B opens inside a circle traced by an accent reticle (DrawSVG) · scrub", kind: "scrub", C: () => (
        <ReticleWipe />
  ) },
  { code: "X18", name: "Stamp-pop dissolve", how: "a short crossfade while a stamp pops 1 → 1.05 → 1 · scrub", kind: "scrub", C: () => (
        <StampPopDissolve />
  ) },
  { code: "M72", name: "Glacial-then-sudden pin", how: "60% slow linear drift through haze, then a 40% payoff reveal (power2.out) · scrub", kind: "scrub", C: () => (
        <GlacialPin />
  ) },
  { code: "M73", name: "Velocity-skew type", how: "letters skew and lift with damped scroll speed (capped 6° / 0.18em) + idle wave", kind: "play", C: () => (
        <div className="grid h-full content-center">
          <VelocitySkewText text="Speed you can feel." className="text-[clamp(52px,8vw,130px)] font-[900]" />
        </div>
  ) },
  { code: "M74", name: "Thrown curved path (CSS)", how: "typed @property --x/--y on separate keyframes = a curved thrown arc, no JS", kind: "play", C: () => (
        <ThrownPath />
  ) },
  { code: "I10", name: "Preloader-to-hero overlap", how: "counter ≤ 1.6 s, the plate wipes off while the title already rises (0.35 s overlap); loops here", kind: "play", C: () => (
        <PreloaderOverlap />
  ) },
];
