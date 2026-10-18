# Scroll Starter

A working kit for building scroll-driven showcase websites: a library of motion effects, ready sections, a video-to-scroll pipeline and the small tools around them. It runs on placeholder media, so everything works the moment you install it.

**For your own learning. Not for resale, redistribution or sharing.**

## Set up

You need:

- **Node 20 or newer** (check with `node -v`)
- **Git**
- **VS Code** (or any editor)
- **Chrome**
- For the video tools: **Python 3** with `numpy` and `Pillow` (`pip3 install numpy Pillow`) and **ffmpeg** (on a Mac: `brew install ffmpeg`)

Then:

```
npm install
npm run dev
```

Open http://localhost:3030 and then http://localhost:3030/effects.

## The commands

| Command | What it does |
|---|---|
| `npm run dev` | Run the site while you work |
| `npm run build` then `npm start` | Run the finished version (use this for filming) |
| `npm run check` | Make sure every image and frame your site uses exists |
| `npm run new-site -- coffee-roastery` | Start a new project in a folder next to this one |
| `npm run film-frames -- --src raw/clip.mp4 --name my-clip` | Turn a video into scroll frames |
| `npm run clean-mark -- image.jpg x,y,radius` | Paint a small mark out of an image |
| `npm run cutout -- folder` | Make transparent PNGs (run `npm run cutout:setup` once first) |
| `npm run glb -- model.glb` | Shrink a 3D model |
| `npm run assets` | List the size of your media |
| `npm run reel` | Record the page scrolling by itself |

Address options: `?static=1` turns all motion off. `?record=1` makes the page scroll by itself for filming.

## Where to start

1. Read `docs/how-to-start-a-site.md`.
2. Look through `/effects` and `/patterns` to see what is in the box.
3. Fill in `site/DESIGN.md`, then build in `site/`.
4. `RULES-GUIDE.md` explains how to add your own rules for Claude Code.

## Notices

Third-party credits are in `THIRD-PARTY-NOTICES.md`. All names, text and prices in the demos are samples.
