import SmoothScroll from "@/components/engine/SmoothScroll";
import FrameScrub from "@/components/video/FrameScrub";

// Two placeholder clips chained along one scroll, with a crossfade on the join.
// Make your own frames with:  npm run film-frames -- --src raw/<clip>.mp4 --name my-clip   (then use /frames/my-clip)
export default function ScrubDemo() {
  return (
    <>
      <SmoothScroll />
      <section className="relative" style={{ height: "500vh" }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-bg">
          <FrameScrub frames={["/frames/sample-a", "/frames/sample-b"]} hoverNudge={0.01} />
        </div>
      </section>
    </>
  );
}
