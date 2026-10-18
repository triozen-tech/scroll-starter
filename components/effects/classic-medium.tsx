"use client";

// Effects from the original effect library, medium tier. Each entry is a small live demo for the /effects gallery.
import { BeforeAfter, ClipDouble, Exploded, FlipGrid, MagneticButton, MorphShape, RackFocus, SkewGallery, SplitOpposite, StackCards, TiltCard3D } from "@/components/fx/layout";
import { DiagonalWipe, FlickeringGrid, GlitchCut, GooeyCursor, IrisTransition, LightRays, MorphingWords, PixelLoader, Pixelate, PortalZoom, RapidLayers, ScrollBlurText, ShimmerButton, TypeShuffle } from "@/components/fx/more";
import type { MotionDef } from "@/components/motion/types";

const fill = "h-full w-full";
const center = "grid h-full w-full place-items-center";

export const DEFS: MotionDef[] = [
  { code: "M40", name: "Sticky stacking cards", how: "each card slides over the last, which shrinks back and dims · scrub", kind: "scrub", C: () => (
        <StackCards
          items={[
            { title: "Origin", text: "Single-estate, hand picked." },
            { title: "Roast", text: "Slow drum, small batches." },
            { title: "Brew", text: "Twelve hours, cold." },
            { title: "Pour", text: "Over ice, no sugar." },
          ]}
        />
  ) },
  { code: "M41", name: "Pinned horizontal gallery + speed skew", how: "vertical scroll → sideways row; scroll speed skews the cards · scrub", kind: "scrub", C: () => (
        <SkewGallery />
  ) },
  { code: "M42", name: "Split screen, opposite scroll", how: "two columns travel in opposite directions · scrub", kind: "scrub", C: () => (
        <SplitOpposite />
  ) },
  { code: "M43", name: "Pixelated → sharp", how: "canvas 2D, image redrawn from big pixels to sharp · scrub", kind: "scrub", C: () => (
        <Pixelate i={2} />
  ) },
  { code: "M46", name: "Scroll before/after slider", how: "clip-path divider sweeps across with the scroll · scrub", kind: "scrub", C: () => (
        <BeforeAfter />
  ) },
  { code: "M47", name: "Exploded product view", how: "layers pull apart in depth; callout lines draw on (DrawSVG) · scrub", kind: "scrub", C: () => (
        <Exploded />
  ) },
  { code: "M50", name: "Rack focus", how: "background sharpens while the foreground softens, like a lens pulling focus · scrub", kind: "scrub", C: () => (
        <RackFocus />
  ) },
  { code: "M51", name: "3D card tilt-rotate", how: "follows the pointer; hands-free a slow figure-eight + moving glare", kind: "play", C: () => (
        <TiltCard3D />
  ) },
  { code: "M53", name: "SVG shape morph", how: "MorphSVG (loaded on demand): circle → diamond → star → square · scrub", kind: "scrub", C: () => (
        <div className={center}>
          <MorphShape className="h-[min(48vh,60vw)] w-[min(48vh,60vw)]" />
        </div>
  ) },
  { code: "M54", name: "Flip layout morph (grid → detail)", how: "Flip (loaded on demand): a tile grows into the detail view and back, by itself", kind: "play", C: () => (
        <FlipGrid />
  ) },
  { code: "X6", name: "Circle iris", how: "clip-path circle opens from the centre · scrub", kind: "scrub", C: () => (
        <IrisTransition />
  ) },
  { code: "X7", name: "Diagonal wipe", how: "slanted edge sweeps across · scrub", kind: "scrub", C: () => (
        <DiagonalWipe />
  ) },
  { code: "X9", name: "RGB glitch cut", how: "crossing the middle tears the frame into RGB slices for 0.45 s, then cuts", kind: "scrub", C: () => (
        <GlitchCut />
  ) },
  { code: "X10", name: "Zoom into a window", how: "a window in A grows while A rushes past the camera · scrub", kind: "scrub", C: () => (
        <PortalZoom />
  ) },
  { code: "M57", name: "Scroll blur typography", how: "letters come into focus left → right", kind: "play", C: () => (
        <div className="grid h-full content-center">
          <ScrollBlurText text="Slow mornings, sharp minds." className="text-[clamp(48px,7vw,110px)] font-[900]" />
        </div>
  ) },
  { code: "M58", name: "Type shuffle", how: "letters flicker through glyphs on colour cells, then settle", kind: "play", C: () => (
        <div className="grid h-full content-center">
          <TypeShuffle text="NEW DROP 07.10" className="text-[clamp(56px,9vw,140px)] font-[900] leading-none" />
        </div>
  ) },
  { code: "M59", name: "Liquid morphing words", how: "words melt into each other through a gooey threshold filter", kind: "play", C: () => (
        <MorphingWords words={["Bold", "Bright", "Cold", "Yours"]} className="h-full w-full text-[clamp(72px,13vw,200px)]" />
  ) },
  { code: "M60", name: "Flickering grid background", how: "canvas squares twinkle forever", kind: "play", C: () => (
        <div className="relative h-full w-full overflow-hidden rounded-[18px] border border-white/10">
          <FlickeringGrid className="absolute inset-0" />
          <p className="font-display absolute inset-0 grid place-items-center text-[clamp(48px,8vw,120px)] font-[900]">Signal</p>
        </div>
  ) },
  { code: "M61", name: "Light rays background", how: "soft beams from the top sway and breathe", kind: "play", C: () => (
        <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-[#070b16]">
          <LightRays className="absolute inset-0" />
          <p className="font-display absolute inset-x-0 bottom-[12%] text-center text-[clamp(44px,7vw,110px)] font-[900]">Into the light</p>
        </div>
  ) },
  { code: "M62", name: "Double-image clip reveal", how: "colour panel + image unfold with clip-path, image counter-scales", kind: "play", C: () => (
        <ClipDouble i={3} />
  ) },
  { code: "M63", name: "Rapid layers intro", how: "colour and photo layers wipe in fast, ending on the title; loops here", kind: "play", C: () => (
        <RapidLayers />
  ) },
  { code: "I6", name: "Pixel transition loader", how: "cells cover the screen in a random wave, then clear from the centre; loops here", kind: "play", C: () => (
        <PixelLoader />
  ) },
  { code: "M64", name: "Shimmer border button", how: "a light spark runs round the border forever", kind: "play", C: () => (
        <div className={center}>
          <ShimmerButton className="text-[18px]">Shop the drop</ShimmerButton>
        </div>
  ) },
  { code: "M65", name: "Gooey cursor trail", how: "cells light under the pointer and melt together; scripted path in record mode", kind: "play", C: () => (
        <div className="relative h-full w-full overflow-hidden rounded-[18px] border border-white/10 bg-[#070b16]">
          <GooeyCursor className="absolute inset-0" />
        </div>
  ) },
  { code: "M71", name: "Magnetic button + text parallax", how: "leans toward the pointer, label leans further; hands-free a slow orbit", kind: "play", C: () => (
        <div className={center}>
          <MagneticButton className="text-[18px]">Get yours</MagneticButton>
        </div>
  ) },
];
