import { site } from "@/lib/config";
import Reveal from "@/components/Reveal";

function ValueIcon({
  kind,
}: {
  kind: "noscroll" | "people" | "moments" | "smile";
}) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-6 w-6">
      {kind === "noscroll" && (
        <>
          <rect {...common} x="7" y="3" width="10" height="18" rx="2.5" />
          <path {...common} d="M4 4l16 16" />
        </>
      )}
      {kind === "people" && (
        <>
          <circle {...common} cx="8.5" cy="9" r="3" />
          <circle {...common} cx="16" cy="10.5" r="2.4" />
          <path {...common} d="M3.5 19c.8-3 2.6-4.5 5-4.5s4.2 1.5 5 4.5" />
          <path {...common} d="M14.5 18.6c.5-2.2 1.9-3.4 3.8-3.4 1 0 1.9.3 2.7 1" />
        </>
      )}
      {kind === "moments" && (
        <>
          <path
            {...common}
            d="M12 21s-6.2-5.4-6.2-10.2a6.2 6.2 0 1112.4 0C18.2 15.6 12 21 12 21z"
          />
          <path {...common} d="M12 8.2l.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3.9-1.9z" />
        </>
      )}
      {kind === "smile" && (
        <>
          <circle {...common} cx="12" cy="12" r="8.5" />
          <path {...common} d="M8.5 14c.9 1.4 2.1 2.1 3.5 2.1s2.6-.7 3.5-2.1" />
          <path {...common} d="M9 9.5h.01M15 9.5h.01" strokeWidth={2.6} />
        </>
      )}
    </svg>
  );
}

const VALUES: Array<{
  icon: "noscroll" | "people" | "moments" | "smile";
  label: string;
}> = [
  { icon: "noscroll", label: "Less Scrolling" },
  { icon: "people", label: "Real People" },
  { icon: "moments", label: "Real Moments" },
  { icon: "smile", label: "New Experiences" },
];

// The mockup's soft-gradient "Why Disconnect?" band.
export default function WhyDisconnect() {
  return (
    <section id="why" className="scroll-mt-24 py-8 sm:py-12">
      <div className="container-px">
        <Reveal className="rounded-[2rem] bg-[linear-gradient(105deg,#CFC6F5_0%,#CFE3FF_45%,#DDF3B5_100%)] p-6 sm:p-12">
          <div className="grid items-center gap-8 sm:grid-cols-[0.85fr_1.15fr] sm:gap-10">
            <div>
              <h2 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
                Why
                <br />
                Disconnect?
              </h2>
              <p className="mt-4 max-w-xs text-[15px] font-semibold leading-snug text-ink/85">
                Because the best memories aren&apos;t found online.
              </p>
              <a
                href={site.links.instagram}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black"
              >
                Our Story <span aria-hidden>↗</span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {VALUES.map((v) => (
                <div
                  key={v.label}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-lime text-ink">
                    <ValueIcon kind={v.icon} />
                  </span>
                  <span className="text-sm font-bold leading-tight text-ink">
                    {v.label.split(" ").map((w, i) => (
                      <span key={w}>
                        {i > 0 && <br />}
                        {w}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
