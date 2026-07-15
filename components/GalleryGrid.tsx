import curated from "@/lib/curated.json";
import Reveal from "@/components/Reveal";

// A tidy masonry-style grid of real moments from the community.
export default function GalleryGrid() {
  const photos = curated.gallery.slice(0, 12);
  if (photos.length < 3) return null;

  return (
    <section id="gallery" className="relative bg-ink py-24 sm:py-32">
      <div className="container-px">
        <Reveal className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="rule" />
            <p className="eyebrow">The album</p>
          </div>
          <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-paper sm:text-5xl">
            Moments from the club.
          </h2>
        </Reveal>

        <div className="mt-12 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {photos.map((p, i) => (
            <Reveal
              key={`${p.src}-${i}`}
              delay={(i % 3) * 0.06}
              className="break-inside-avoid overflow-hidden rounded-2xl border border-line"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.caption?.slice(0, 80) || "Disconnect moment"}
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
