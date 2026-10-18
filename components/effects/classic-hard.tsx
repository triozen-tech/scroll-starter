"use client";

// Effects from the original effect library, hard tier. Each entry is a small live demo for the /effects gallery.
import { DisplaceSwap, FilmGrain, Flowmap, GradientMesh, LiquidReveal, LiquidWipe, PixelDissolve, RGBShift, Ripple, ScrollBulge, ZoomBlur } from "@/components/fx/gl";
import type { MotionDef } from "@/components/motion/types";

const fill = "h-full w-full";
const center = "grid h-full w-full place-items-center";

export const DEFS: MotionDef[] = [
  { code: "M38", name: "Liquid image reveal", how: "OGL shader: noisy wobbling edge, glowing rim · scrub", kind: "scrub", C: () => (
        <LiquidReveal className={`${fill} rounded-[18px]`} images={[1]} finalValue={1} />
  ) },
  { code: "M52", name: "Animated gradient mesh", how: "OGL shader: drifting colour fields (CSS fallback)", kind: "play", C: () => (
        <GradientMesh className={`${fill} rounded-[18px]`} />
  ) },
  { code: "M55", name: "WebGL RGB shift on scroll speed", how: "OGL: red/blue split along the scroll", kind: "play", C: () => (
        <RGBShift className={`${fill} rounded-[18px]`} images={[0]} />
  ) },
  { code: "M56", name: "WebGL zoom-blur transition", how: "OGL: A rushes into B through a radial blur · scrub", kind: "scrub", C: () => (
        <ZoomBlur className={`${fill} rounded-[18px]`} />
  ) },
  { code: "X8", name: "Pixel dissolve", how: "OGL: A breaks into squares, B resolves · scrub", kind: "scrub", C: () => (
        <PixelDissolve className={`${fill} rounded-[18px]`} />
  ) },
  { code: "X11", name: "Shader liquid wipe", how: "OGL: B pours over A along a rippling diagonal · scrub", kind: "scrub", C: () => (
        <LiquidWipe className={`${fill} rounded-[18px]`} />
  ) },
  { code: "M66", name: "Displacement-map swap", how: "OGL: images melt into each other through a noise map, cycling by itself", kind: "play", C: () => (
        <DisplaceSwap className={`${fill} rounded-[18px]`} />
  ) },
  { code: "M67", name: "Flowmap liquid trail", how: "OGL Flowmap: the pointer (or a scripted path) drags the image like liquid", kind: "play", C: () => (
        <Flowmap className={`${fill} overflow-hidden rounded-[18px]`} images={[2]} />
  ) },
  { code: "M68", name: "Scroll bulge", how: "OGL: the picture bulges with scroll speed", kind: "play", C: () => (
        <ScrollBulge className={`${fill} rounded-[18px]`} images={[3]} />
  ) },
  { code: "M69", name: "Ripple", how: "OGL: water rings spread from the centre on a loop", kind: "play", C: () => (
        <Ripple className={`${fill} rounded-[18px]`} images={[1]} />
  ) },
  { code: "M70", name: "Film grain + vignette", how: "OGL: moving grain and breathing light", kind: "play", C: () => (
        <FilmGrain className={`${fill} rounded-[18px]`} images={[0]} />
  ) },
];
