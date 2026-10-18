import type { Metadata } from "next";
import "@/components/fx/fx.css";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/fraunces";
import "@fontsource/instrument-serif";
import "@fontsource-variable/syne";
import "@fontsource-variable/manrope";
import "@fontsource-variable/instrument-sans/wdth.css";
import SmoothScroll from "@/components/engine/SmoothScroll";
import RecordMode from "@/components/engine/RecordMode";

// The effects gallery is a work page for you: it is not linked from the site and search engines are told to skip it.
export const metadata: Metadata = { title: "Effects gallery", robots: { index: false, follow: false } };

export default function EffectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <RecordMode />
      {children}
    </>
  );
}
