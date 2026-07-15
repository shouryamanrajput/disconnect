import { site } from "@/lib/config";
import Reveal from "@/components/Reveal";

export default function Join() {
  return (
    <section
      id="join"
      className="relative border-b border-line bg-night py-20 sm:py-28"
    >
      <div className="container-px relative">
        <Reveal className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="gold-rule" />
            <p className="eyebrow">Get involved</p>
          </div>
          <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-cream sm:text-5xl">
            Come to the <span className="italic text-sage">next one.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-mocha">
            Experiences drop in the WhatsApp community first. Join in, or bring
            your own idea, space or lens to the table.
          </p>
        </Reveal>

        <Reveal className="mt-16 grid gap-[1px] border border-line bg-line sm:grid-cols-3">
          {site.joinCards.map((c, i) => (
            <div
              key={c.title}
              className={`flex flex-col p-8 ${
                c.primary ? "bg-gold" : "bg-coal"
              }`}
            >
              <span
                className={`font-mono text-[11px] uppercase tracking-widest ${
                  c.primary ? "text-night/70" : "text-gold"
                }`}
              >
                0{i + 1}
              </span>
              <h3
                className={`mt-5 font-display text-2xl font-medium ${
                  c.primary ? "text-night" : "text-cream"
                }`}
              >
                {c.title}
              </h3>
              <p
                className={`mt-3 flex-1 text-sm leading-relaxed ${
                  c.primary ? "text-night/75" : "text-mocha"
                }`}
              >
                {c.body}
              </p>
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className={`mt-7 self-start font-mono text-[11px] uppercase tracking-widest transition-colors ${
                  c.primary
                    ? "text-night hover:text-ink"
                    : "text-gold hover:text-amber"
                }`}
              >
                {c.cta} &rarr;
              </a>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-16 flex flex-col items-center gap-7 border border-line bg-coal px-8 py-16 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.jpg"
            alt=""
            width={52}
            height={52}
            className="h-12 w-12 border border-line"
          />
          <h3 className="max-w-2xl font-display text-4xl font-normal leading-[1.1] text-paper sm:text-5xl">
            One good evening beats a{" "}
            <span className="italic text-sage">thousand notifications.</span>
          </h3>
          <p className="max-w-md text-mocha">
            Follow along on Instagram and join the community to catch the next
            experience.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <a
              href={site.links.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              Join the WhatsApp community
            </a>
            <a
              href={site.links.instagram}
              target="_blank"
              rel="noreferrer"
              className="btn-outline w-full sm:w-auto"
            >
              Follow {site.handle}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
