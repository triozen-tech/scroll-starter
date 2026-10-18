import { content } from "./content";
import { meta } from "./config";

/** The page of your site. Start from the sections in /patterns and the effects in /effects: copy, then restyle. */
export default function Page() {
  return (
    <main>
      <section className="grid min-h-screen place-items-center px-6 text-center">
        <div>
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <h1 className="font-display mt-4 text-[clamp(40px,6vw,88px)] leading-none">{content.hero.title}</h1>
          <p className="mt-6 text-muted">{content.hero.text}</p>
          <p className="mt-10 text-muted">
            <a className="underline" href="/effects">Effects gallery</a> · <a className="underline" href="/patterns">Patterns</a>
          </p>
        </div>
      </section>
      <section className="container-x section-y">
        <ul className="grid grid-cols-3 gap-6">
          {content.products.map((p) => (
            <li key={p.name} className="border border-line p-6">
              <p>{p.name}</p>
              <p className="mt-2 text-muted">{p.price}</p>
            </li>
          ))}
        </ul>
      </section>
      {meta.credit ? <footer className="container-x py-10 text-[13px] text-muted">{meta.credit}</footer> : null}
    </main>
  );
}
