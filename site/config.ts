import type { SiteMeta, Theme } from "@/lib/site";

// The settings for YOUR site. Change the names, colours and fonts here; everything reads from this file.

export const meta: SiteMeta = {
  name: "My Site",
  title: "My Site",
  description: "A sample site built with Scroll Starter.",
  loaderText: "My Site",
  loader: true,
  cursor: true,
  // Footer credit line. Left empty on purpose: put your own text here (for example your studio name).
  // Nothing is shown in the footer while this is empty.
  credit: "",
  // ?record=1 scrolls the page by itself so you can film it. `duration` = seconds for the whole page.
  record: { duration: 30 },
};

export const theme: Theme = {
  bg: "#0e0e0f",
  surface: "#18181a",
  text: "#f2f2f0",
  muted: "#9a9a96",
  accent: "#f2f2f0",
  accentText: "#0e0e0f",
  line: "#2a2a2c",
  fontDisplay: "system-ui, sans-serif",
  fontBody: "system-ui, sans-serif",
  radius: 0,
};
