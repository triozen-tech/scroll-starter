# Tips

Short technical lessons, in plain words. Skim them before you build, and again when something looks wrong.

## Scroll videos

- Play a scroll video by **video time**, not by frame number. Fast parts and slow parts then feel right. `npm run film-frames` keeps a list of the second each frame came from.
- Blend the two nearest frames instead of showing one at a time. Stepped frames look like stutter.
- Use the **first seconds** of a generated clip; they are the cleanest. Look at a contact sheet of the frames before you plan around them, and write down the exact second of any key moment instead of guessing.
- Fade the edges of a video into the page colour inside the player, and grade the video's black onto the page background, so no hard edge shows.
- Load the first film while the loader is showing. Load later films lazily, and start the big ones during a calm section.
- When one clip ends where the next begins, use the **same image** as the end of one and the start of the next. Then the join is invisible.
- Clips that are meant to loop often pop at the seam. Compare the first and last frame and bake a short crossfade into the file.
- Check every still for small corner marks that image tools add. Paint them out with `npm run clean-mark`, and keep the original.

## Motion

- Everything that scrubs with the scroll should use the **whole** scroll range, evenly, and finish exactly at the end. Add a little time-based drift so a stopped page never looks frozen.
- Make scroll-linked motion a pure function of scroll position. Then any speed, stopping, or scrolling back all give the same picture.
- Never start an animation at `scale(0)`. Start at 0.9 or 0.95 with a fade.
- Keep animated blur small (8px at most) and never animate `backdrop-filter`.
- In React effects, prefer GSAP `fromTo()` over `from()`. `from()` can get stuck on its start values after a re-mount.
- A finished CSS animation that fills forward will beat GSAP's inline styles. Copy the computed values inline and set `animation: none` before animating.
- Do not give an element GSAP is moving an inline `transform` of your own. Set the starting values through GSAP.
- Triggers that end at `"max"` switch off exactly at the page bottom. Start on enter and stop only on leaving backwards.
- Hand-offs between sections need no empty frame. Start the next section's content while the last one is still leaving.
- Words should never roll letter by letter; half-words show mid-change. Roll digits only, and swap words whole.

## Layout and type

- Do not hard-code `relative` on a component that takes a `className`. A caller passing `absolute` will collapse it. The helper `pos()` in `components/fx/shared.ts` handles this.
- Site styles that target component classes belong in `@layer components`. Unlayered rules beat Tailwind utilities.
- Clip horizontal overflow with `overflow-x: clip` on `body`, not `hidden`. `hidden` breaks sticky pins.
- Check the page width at several scroll depths with motion on. Parked, off-screen elements can make the page wider.
- Display type should be at least 24px with tight tracking (-0.02 to -0.04em) and line-height 1.05 to 1.2. Use `text-wrap: balance` on headings.
- Hover should never change font weight, spacing or padding; that makes the layout jump. Cross-fade a second layer instead.
- Small text stays at 12px or more. Check contrast: bright accents under white text often fail.
- Text over a bright video needs a soft dark gradient behind the text only, never a dull filter over the whole video.

## 3D and big libraries

- Plain three.js is about 150 KB; React Three Fiber and `<model-viewer>` add a lot more. The kit's OGL helper is the light choice. Use the others only when you need them.
- Do not mix a library scroller (like drei's `ScrollControls`) with the smooth scroller. Drive 3D from scroll progress instead.
- One driver, many renderers: tween a plain object with the scroll, then apply it to the picture or model each frame.
- Compress every `.glb` with `npm run glb`. Use `--ogl` for models shown with OGL or model-viewer.
- For background removal, name the model explicitly (`-m birefnet-general`) so the licence is clear.
- Glass and frost cut out badly. Photograph them on a plain mid-grey background and check on both dark and light.

## Images and files

- Keep full-resolution stills and WebP at quality 90 or higher. Make the page fast with lazy loading, not smaller files.
- Decode big images right after they load (`img.decode()`) so they do not stall the page when they arrive on screen.
- Canvas `shadowBlur` on wide strokes is slow. Draw a wide, faint stroke under the line instead.
- Thin, faint movement can look frozen on camera. Add one broad, soft moving element.

## Working habits

- Check the page with `?static=1` first. If every section is readable without motion, adding motion is safe.
- A check that fails on a busy machine is not always a site bug. Look at the frames, wait, and run it again before changing code.
- Always close test browsers when you finish; stray ones slow everything down.
- Restart the production server after adding files to `public/`, or new files can return 404.
- Check `npm run build` really succeeded before starting the server. A type error can look like a server problem.
- Look up a brand name before you use it, even a made-up one. Rename anything that matches a real company.
