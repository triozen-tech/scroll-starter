# How to start a site

Follow the steps in order. Do not skip ahead to code.

## 1. Pick the business

Choose a kind of business you can picture clearly: a coffee roastery, a bike shop, a candle maker. Write one line in `site/DESIGN.md` under **Business**, then who it is for under **Audience**.

Use a fictional name. Never copy a real brand's name, logo or layout.

## 2. Research (by hand)

Read `docs/research-guide.html` and follow it, section by section. Save screenshots into a folder of your own. Write down what you liked and why. This is the step that makes your site look different from the last one.

## 3. Three layout options, then pick one

Sketch or mock up three full-page layouts. Each should list its sections in order and say what is unusual about it. Put them under **Three layout options** in `DESIGN.md`. Pick one and write why under **Chosen layout and why**. Also decide the **Palette** and **Type**.

Check your pick against the other options: if it looks like the last site you made, change it.

## 4. Write the prompts

Write the prompts for your stills and your clip. Keep one clean description of each thing you need: what it shows, how it is used, its size. When you run them, paste the prompts under **Prompts as run** in `DESIGN.md`, word for word.

## 5. Make the stills and the clip

Make the images and the video with your own tools. Put them in `raw/`.

## 6. Run the tools

- Paint any small mark out of a still: `npm run clean-mark -- raw/still.jpg x,y,radius`
- Make transparent PNGs of products: `npm run cutout -- raw/cutouts`
- Turn a clip into scroll frames: `npm run film-frames -- --src raw/clip.mp4 --name my-clip`
- Shrink a 3D model: `npm run glb -- model.glb`

## 7. Build

1. Start a project: `npm run new-site -- coffee-roastery`, then `cd` into it.
2. Set the name, colours and fonts in `site/config.ts` and `site/fonts.ts`.
3. Put the words in `site/content.ts`.
4. Build the page in `site/Page.tsx` from sections copied out of `/patterns`, with effects copied out of `/effects`.
5. Check with `?static=1` first: every section should show, readable, nothing cut off.
6. Then turn motion on and tune it, one section at a time.

## 8. Check

- `npm run check` and `npm run build` both pass.
- Scroll the whole page at normal speed and at a crawl. Nothing should freeze, jump or overlap.
- Read every price: does it say "sample"?
- Make sure no keys, logins or private notes are in the project.

## 9. Post

Film the page with `npm run build && npm start`, then open `?record=1` at 1440 x 900 and record the screen. Write a short caption. Post it.
