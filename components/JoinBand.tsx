import { site } from "@/lib/config";
import Reveal from "@/components/Reveal";

// The enrollment band — every way into the club on one compact screen.
// Cards come from site.joinCards (WhatsApp / host form / creators form),
// plus the "got an idea" form as a one-line footer to the grid.
export default function JoinBand() {
  return (
    <section id="join" className="relative bg-night py-12 sm:py-14">
      <div className="container-px">
        <Reveal className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="gold-rule" />
            <p className="eyebrow">Get involved</p>
          </div>
          <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] text-cream sm:text-5xl">
            Come to the <span className="italic text-gold">next one.</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-mocha sm:text-base">
            Experiences drop in the WhatsApp community first. Join in — or
            bring your own idea, space or lens to the table.
          </p>
        </Reveal>

        <Reveal
          delay={0.08}
          className="mt-8 grid gap-[1px] border border-line bg-line sm:grid-cols-3"
        >
          {site.joinCards.map((c, i) => (
            <div
              key={c.title}
              className={`group relative flex flex-col p-6 transition-colors duration-300 sm:p-7 ${
                c.primary ? "bg-gold" : "bg-coal hover:bg-ember"
              }`}
            >
              {c.primary ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/logo.jpg"
                  alt=""
                  className="absolute right-5 top-5 h-9 w-9 rotate-6 border border-night/25 transition-transform duration-300 group-hover:-rotate-6"
                />
              ) : null}
              <span
                className={`font-mono text-[11px] uppercase tracking-widest ${
                  c.primary ? "text-night/70" : "text-gold"
                }`}
              >
                0{i + 1}
              </span>
              <h3
                className={`mt-4 font-display text-2xl font-medium ${
                  c.primary ? "text-night" : "text-cream"
                }`}
              >
                {c.title}
              </h3>
              <p
                className={`mt-2.5 flex-1 text-[13px] leading-relaxed ${
                  c.primary ? "text-night/75" : "text-mocha"
                }`}
              >
                {c.body}
              </p>
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className={`mt-6 flex items-center gap-1.5 self-start font-mono text-[11px] uppercase tracking-widest transition-colors ${
                  c.primary
                    ? "text-night hover:text-ink"
                    : "text-gold hover:text-amber"
                }`}
              >
                {c.cta}{" "}
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  &rarr;
                </span>
              </a>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-mocha">
            Got an idea worth a crowd?{" "}
            <a
              href={site.links.idea}
              target="_blank"
              rel="noreferrer"
              className="text-gold transition-colors hover:text-amber"
            >
              Tell us &rarr;
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
