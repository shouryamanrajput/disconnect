import { site } from "@/lib/config";
import Reveal from "@/components/Reveal";

// Tiny line icons for the card badges.
function CardIcon({ kind }: { kind: "star" | "note" | "bolt" | "spark" }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
      {kind === "star" && (
        <path
          {...common}
          d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8L12 3z"
        />
      )}
      {kind === "note" && (
        <>
          <path {...common} d="M9 18V6l9-2.5V16" />
          <circle {...common} cx="6.8" cy="18" r="2.2" />
          <circle {...common} cx="15.8" cy="16" r="2.2" />
        </>
      )}
      {kind === "bolt" && (
        <path {...common} d="M13 2.5L4.5 14H11l-1 7.5L18.5 10H12l1-7.5z" />
      )}
      {kind === "spark" && (
        <>
          <path {...common} d="M12 4l1.8 4.9L18.7 11l-4.9 1.8L12 17.7l-1.8-4.9L5.3 11l4.9-2.1L12 4z" />
          <path {...common} d="M19 16.5l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9z" />
        </>
      )}
    </svg>
  );
}

function Pin() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path d="M12 21s-6.2-5.4-6.2-10.2a6.2 6.2 0 1112.4 0C18.2 15.6 12 21 12 21z" />
      <circle cx="12" cy="10.6" r="2.2" />
    </svg>
  );
}

const EVENTS: Array<{
  icon: "star" | "note" | "bolt" | "spark";
  title: string;
  place: string;
  img: string;
}> = [
  {
    icon: "star",
    title: "Paint & Create",
    place: "Cafe By The Bae, Rohtak",
    img: "/photos/post-6-15.jpg",
  },
  {
    icon: "note",
    title: "Dance Workshops",
    place: "नच गाँव Arts Studio",
    img: "/photos/post-1.jpg",
  },
  {
    icon: "bolt",
    title: "Trampoline Rave",
    place: "Plutus, Rohtak",
    img: "/photos/post-22.jpg",
  },
  {
    icon: "spark",
    title: "Collabs & Pop-ups",
    place: "All over Rohtak",
    img: "/photos/post-6-17.jpg",
  },
];

// The mockup's "Trending Experiences" grid — dark cards, lime badges.
export default function TrendingExperiences() {
  return (
    <section id="events" className="scroll-mt-24 py-14 sm:py-20">
      <div className="container-px">
        <Reveal className="flex flex-wrap items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-lime px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-ink">
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2.5c1.2 4.5-3.6 5.6-3.6 9.6a3.6 3.6 0 007.2 0c0-1 .4-2 1-3 1.7 2 2.6 4 2.6 5.7A7.2 7.2 0 015 14.8c0-5.5 5.8-8 7-12.3z" />
            </svg>
            Trending Experiences
          </span>
          <a
            href={site.links.instagram}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-ink transition-colors hover:text-violet"
          >
            View all events <span aria-hidden>→</span>
          </a>
        </Reveal>

        <div className="mt-7 grid gap-5 sm:grid-cols-4">
          {EVENTS.map((e, i) => (
            <Reveal
              key={e.title}
              delay={i * 0.07}
              className="group relative overflow-hidden rounded-2xl bg-ink text-white shadow-[0_18px_40px_-18px_rgba(20,20,20,0.5)]"
            >
              <div className="relative h-56 overflow-hidden sm:h-60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={e.img}
                  alt={e.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-lime text-ink">
                  <CardIcon kind={e.icon} />
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold">{e.title}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-white/70">
                  <Pin />
                  {e.place}
                </p>
                <a
                  href={site.links.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-lime transition-colors hover:text-limedark"
                >
                  Book Now <span aria-hidden>↗</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
