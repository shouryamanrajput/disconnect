import curated from "@/lib/curated.json";

// A gentle, continuously-scrolling strip of real photos from the community.
export default function PhotoMarquee() {
  const photos = curated.gallery.slice(0, 14).map((g) => g.src);
  if (photos.length < 4) return null;

  // Duplicate the set so the loop is seamless.
  const strip = [...photos, ...photos];

  return (
    <section
      id="gallery"
      className="marquee-group overflow-hidden bg-night py-8"
    >
      <div className="grad-rule mb-8" />
      <div className="flex w-max animate-marquee gap-4 pr-4">
        {strip.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative h-44 w-64 shrink-0 overflow-hidden border border-line bg-coal sm:h-56 sm:w-80"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
      <div className="grad-rule mt-8" />
    </section>
  );
}
