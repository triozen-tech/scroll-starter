# Scroll Starter: rules for Claude Code

This project builds scroll-driven showcase websites. Read this file first, every session.

## Part A · Core rules (keep these)

These are fixed. Do not change or remove them.

1. **No look-alikes of real brands.** Real brand names are fine in text, but never copy a brand's logo file, its real website's layout, or its exact packaging. Invent a fictional name instead.
2. **Nothing fake that looks real.** No made-up reviews, receipts, orders, testimonials or records presented as genuine. Sample content must read as sample.
3. **Prices are labelled "sample"** wherever a visitor could mistake them for real.
4. **No private codes in the repo.** No passwords, access codes, keys or logins in any file, and never in git history. Use a local `.env` file (it is ignored by git) if something private is needed.
5. **Never delete with a wildcard.** Name each file or folder you delete.
6. **Never push or deploy without asking the user first.** Local commits are fine. Anything that sends the project to the internet needs a clear yes.
7. **Claude Code does not search the web.** Research is done by the user, by hand. Work from what the user pastes or saves into the project.

## Part B · Style rules (you may change these)

These are the defaults. The user may edit them to taste (see `RULES-GUIDE.md`).

- **People:** no AI-made faces, hands or people in any image or clip. Use objects, places, textures and shapes.
- **Brands on products:** no visible brand text or logos on products in images.
- **Footer credit:** the footer shows whatever is written in the `credit` field of `site/config.ts`. It is empty by default, so nothing shows. Do not add a credit line yourself.
- **Motion:** motion is always on. Only `?static=1` in the address turns it off. Never honour the operating system's reduce-motion setting and never add a reduce-motion media query (`npm run check` fails on it). `prefersReducedMotion()` in `lib/gsap.ts` is the only switch.
- **Screen size:** design and test for a desktop screen of 1440 x 900.
- **Quality:** keep full-resolution stills and full-quality frames (WebP quality 90 or higher). Do not shrink files to save space. Make it fast with lazy loading instead.
- **Plugins:** register GSAP plugins only in `lib/gsap.ts`. Lenis is the scroller.
- **Copy, then restyle:** never edit `components/engine/` or `components/patterns/` for one site. Copy a pattern into `site/components/` and change the copy.
- **Commits:** short, plain messages in the present tense ("Add pricing section"). No trailers, no links.
- **Reports:** short. Say what changed, what to check, and what is next.

## Part C · The user's own rules

@MY-RULES.md

Also read MY-RULES.md. If it conflicts with Part A, Part A wins.

## How the project is organised

| Folder | What | Change per site? |
|---|---|---|
| `site/` | Everything about your site: `config.ts`, `content.ts`, `Page.tsx`, `fonts.ts`, `site.css`, `DESIGN.md`, `components/` | Yes |
| `components/engine/` | Loader, smooth scroll, animations by data attribute, record mode | No |
| `components/motion/` · `components/fx/` · `components/effects/` | The effect library and the `/effects` gallery | No: import or copy |
| `components/patterns/` | Ready sections to copy and restyle (see them at `/patterns`) | No: copy first |
| `components/video/` | `FrameScrub`: a scroll-scrubbed image sequence | No |
| `lib/` | GSAP setup, frame loading, WebGL helper, types | No |
| `scripts/` | The command-line tools | No |
| `docs/` | How-to, research guide, tips | Add notes |

Start with `docs/how-to-start-a-site.md`. Fill in `site/DESIGN.md` before writing code.

## Commands

- `npm run dev` · `npm run build && npm start`: run the site (port 3030).
- `npm run check`: confirms every image and frame used in `site/` exists.
- `npm run new-site -- <category>`: start a fresh project, for example `coffee-roastery`.
- `npm run film-frames -- --src raw/clip.mp4 --name my-clip`: turn a video into scroll frames.
- `npm run clean-mark -- <image> <x,y,radius>`: paint a small mark out of an image.
- `npm run cutout -- <folder>`: transparent PNGs from photos.
- `npm run glb -- in.glb`: shrink a 3D model.
- `npm run reel`: record the auto-scroll (`?record=1`) as a video.
- `?static=1`: no motion · `?record=1`: the page scrolls itself for filming.
