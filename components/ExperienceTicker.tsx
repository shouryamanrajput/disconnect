import { site } from "@/lib/config";
import curated from "@/lib/curated.json";

const sectionImages: Record<string, string> = curated.sectionImages || {};

// The whole "what we do" section compressed into one thin, continuously
// scrolling strip — mono titles with a small real photo beside each.
export default function ExperienceTicker() {
  const items = site.experiences.map((e) => ({
    title: e.title,
    img: sectionImages[e.key],
  }));
  // Repeat so the -50% marquee loop lands on an identical frame (seamless).
  const strip = [...items, ...items, ...items, ...items];

  return (
    <section
      aria-label="What we do"
      className="marquee-group overflow-hidden border-b border-line bg-ink py-2.5"
    >
      <div className="flex w-max animate-marquee items-center gap-8">
        {strip.map((it, i) => (
          <span key={`${it.title}-${i}`} className="flex items-center gap-8">
            <span className="flex items-center gap-4">
              {it.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={it.img}
                  alt=""
                  loading="lazy"
                  className="h-12 w-20 border border-line object-cover"
                />
              ) : null}
              <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.3em] text-cream/80">
                {it.title}
              </span>
            </span>
            <span aria-hidden className="text-[10px] text-gold">
              ✦
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
