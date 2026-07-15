import { site } from "@/lib/config";
import Reveal from "@/components/Reveal";

export default function IntroStrip() {
  return (
    <section
      id="about"
      className="relative border-b border-line bg-night py-20 sm:py-28"
    >
      <div className="container-px">
        <Reveal className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="gold-rule" />
            <p className="eyebrow">The idea</p>
          </div>
          <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-cream sm:text-5xl lg:text-[3.25rem]">
            We spend all day{" "}
            <span className="italic font-normal text-sage">connected</span> and
            somehow feel further apart.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-mocha">
            Disconnect is the fix — an offline social club that throws real,
            playful experiences you actually leave your room for. No feed, no
            algorithm. Just a few good hours with people, and a plan for your
            Sunday that isn&apos;t your phone.
          </p>
        </Reveal>

        <Reveal className="mt-16 grid gap-[1px] border border-line bg-line sm:grid-cols-3">
          {site.values.map((v, i) => (
            <div key={v.title} className="bg-coal p-8">
              <span className="font-mono text-[11px] uppercase tracking-widest text-gold">
                0{i + 1}
              </span>
              <h3 className="mt-5 font-display text-2xl font-medium text-cream">
                {v.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mocha">{v.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
