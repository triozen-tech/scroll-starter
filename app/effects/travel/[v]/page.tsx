import type { Metadata } from "next";
import Loader from "@/components/engine/Loader";
import SmoothScroll from "@/components/engine/SmoothScroll";
import RecordMode from "@/components/engine/RecordMode";
import "@/components/fx/fx.css";
import TravelDemo from "./TravelDemo";

// /effects/travel/f1 · f3 · f6: one product travels through a six-section page.
export const metadata: Metadata = { title: "Travel demo", robots: { index: false, follow: false, nocache: true } };
export const generateStaticParams = () => ["f1", "f3", "f6"].map((v) => ({ v }));

export default async function Page({ params }: { params: Promise<{ v: string }> }) {
  const { v } = await params;
  return (
    <>
      <Loader text="Lab" enabled={false} />
      <SmoothScroll />
      <RecordMode />
      <TravelDemo v={v} />
    </>
  );
}
