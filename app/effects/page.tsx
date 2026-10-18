import Link from "next/link";
import { GROUPS, EXTRAS } from "@/components/effects/registry";

export default function EffectsIndex() {
  return (
    <main className="min-h-[100svh] bg-[#05080f] px-[96px] py-[96px] text-white" style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      <p className="text-[13px] uppercase tracking-[0.2em] text-white/50">Scroll Starter</p>
      <h1 className="mt-4 text-[96px] font-[800] leading-[0.9] tracking-[-0.03em]">Effects gallery</h1>
      <p className="mt-4 max-w-[64ch] text-white/65">
        Every effect in this copy, as a small live demo with a two-line how-to. Open a group and scroll. Add <code>?static=1</code> to any address to switch motion off.
        All text and prices in the demos are samples.
      </p>
      <h2 className="mt-14 text-[13px] uppercase tracking-[0.2em] text-white/50">Groups</h2>
      <ul className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
        {GROUPS.map((g) => (
          <li key={g.slug}>
            <Link href={`/effects/${g.slug}`} className="flex h-full items-baseline gap-4 bg-[#05080f] px-6 py-5 transition-colors hover:bg-white/5">
              <span className="text-[17px]">{g.title}</span>
              <span className="ml-auto text-[12px] uppercase tracking-[0.14em] text-white/40">{g.tier}</span>
            </Link>
          </li>
        ))}
      </ul>
      {EXTRAS.length > 0 && (
        <>
          <h2 className="mt-14 text-[13px] uppercase tracking-[0.2em] text-white/50">Bigger demos</h2>
          <ul className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
            {EXTRAS.map((g) => (
              <li key={g.href}>
                <Link href={g.href} className="block h-full bg-[#05080f] px-6 py-5 transition-colors hover:bg-white/5">
                  <span className="text-[17px]">{g.title}</span>
                  <span className="mt-1 block text-[13px] text-white/50">{g.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
