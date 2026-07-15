import { site } from "@/lib/config";
import curated from "@/lib/curated.json";
import Reveal from "@/components/Reveal";

const sectionImages: Record<string, string> = curated.sectionImages || {};

export default function Experiences() {
  return (
    <section
      id="experiences"
      className="relative border-b border-line bg-ink py-20 sm:py-28"
    >
      <div className="container-px">
        <Reveal className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="gold-rule" />
            <p className="eyebrow">What we do</p>
          </div>
          <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-cream sm:text-5xl">
            Experiences, not <span className="italic text-sage">events.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-mocha">
            Every gathering is designed to get a room of strangers talking,
            moving and laughing together. Here&apos;s the kind of thing you can
            expect to show up to.
          </p>
        </Reveal>

        <Reveal className="mt-16 grid gap-[1px] border border-line bg-line sm:grid-cols-2">
          {site.experiences.map((e, i) => {
            const img = sectionImages[e.key];
            return (
              <div key={e.key} className="group relative bg-coal">
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line">
                  {img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={img}
                      alt={e.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="h-full w-full bg-ember" />
                  )}
                  <span className="absolute right-0 top-0 border-b border-l border-line bg-night px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-gold">
                    0{i + 1}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="font-display text-2xl font-medium text-cream">
                    {e.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-mocha">
                    {e.body}
                  </p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
