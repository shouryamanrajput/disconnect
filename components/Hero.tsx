"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/config";
import PixelSmiley from "@/components/PixelSmiley";

const ease = [0.16, 1, 0.3, 1] as const;

// Small four-point sparkle.
function Sparkle({ className = "h-5 w-5 text-ink" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="currentColor"
        d="M12 2l2.3 7.7L22 12l-7.7 2.3L12 22l-2.3-7.7L2 12l7.7-2.3L12 2z"
      />
    </svg>
  );
}

const AVATARS = [
  "/photos/post-6-8.jpg",
  "/photos/post-7.jpg",
  "/photos/post-6-6.jpg",
  "/photos/post-6-3.jpg",
];

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden pb-8 pt-24 sm:pb-24 sm:pt-32"
    >
      {/* Soft gradient blobs, like the mockup's airy backdrop. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-lavender/70 blur-[110px]" />
        <div className="absolute -left-44 top-24 h-[26rem] w-[26rem] rounded-full bg-blue/70 blur-[110px]" />
        <div className="absolute bottom-[-8rem] right-1/4 h-[22rem] w-[22rem] rounded-full bg-violet/25 blur-[120px]" />
      </div>

      <div className="container-px">
        {/* Giant wordmark. */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="font-display text-[3rem] uppercase leading-[0.95] tracking-tight text-ink sm:text-[7.4rem]"
        >
          Disconnect
        </motion.h1>

        <div className="mt-4 grid items-start gap-6 sm:mt-6 sm:grid-cols-[1.05fr_0.95fr] sm:gap-8">
          {/* Left — pitch. */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="font-display text-4xl leading-[1.12] text-violet sm:text-5xl"
            >
              Log out.
              <br />
              Plug into real life.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease }}
              className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/80"
            >
              We curate the coolest offline experiences in {site.city} — from
              paint afternoons and dance workshops to trampoline raves,
              pop-up collabs, and more.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.26, ease }}
              className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8"
            >
              <a href="#events" className="pill-primary">
                Explore Events <span aria-hidden>↗</span>
              </a>
              <a href="#why" className="pill-outline">
                Learn More
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
              className="mt-7 flex items-center gap-3 sm:mt-9"
            >
              <span className="flex -space-x-2.5">
                {AVATARS.map((src) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="h-9 w-9 rounded-full border-2 border-cloud object-cover"
                  />
                ))}
              </span>
              <span className="text-sm font-semibold leading-snug text-ink">
                +1k real ones
                <br />
                <span className="font-medium text-ink/70">
                  already offline with us
                </span>{" "}
                <span aria-hidden>💚</span>
              </span>
            </motion.div>
          </div>

          {/* Right — the pixel smiley with orbit, sparkles and sticker. */}
          <div className="relative mx-auto h-[250px] w-full max-w-[430px] sm:h-[360px]">
            {/* orbit ring */}
            <svg
              viewBox="0 0 460 300"
              aria-hidden
              className="absolute inset-0 h-full w-full"
            >
              <ellipse
                cx="230"
                cy="170"
                rx="215"
                ry="72"
                fill="none"
                stroke="#6C4FF0"
                strokeWidth="1.6"
                transform="rotate(-10 230 170)"
              />
              <path
                fill="#6C4FF0"
                d="M36 118l1.8 5.9 5.9 1.8-5.9 1.8-1.8 5.9-1.8-5.9-5.9-1.8 5.9-1.8 1.8-5.9z"
              />
            </svg>

            {/* Plain wrapper owns the centering (framer would clobber
                Tailwind translate classes with its own transform). */}
            <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.25,
                  type: "spring",
                  stiffness: 90,
                  damping: 13,
                }}
              >
                <motion.div
                  animate={reduce ? undefined : { y: [0, -10, 0] }}
                  transition={
                    reduce
                      ? undefined
                      : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
                  }
                >
                  <PixelSmiley className="h-44 w-44 drop-shadow-[0_18px_30px_rgba(108,79,240,0.25)] sm:h-60 sm:w-60" />
                </motion.div>
              </motion.div>
            </div>

            {/* sticker */}
            <motion.div
              initial={{ opacity: 0, y: -14, rotate: 18 }}
              animate={{ opacity: 1, y: 0, rotate: 12 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 120, damping: 12 }}
              className="absolute right-0 top-0 rotate-12"
            >
              <div className="rounded-xl bg-violet px-4 py-3 text-[11px] font-extrabold uppercase leading-tight text-white shadow-lg shadow-violet/30">
                ✦ Real
                <br />
                moments
                <br />
                &gt; screen
                <br />
                time ☺
              </div>
            </motion.div>

            {/* sparkles */}
            <Sparkle className="absolute left-[6%] top-[24%] h-4 w-4 text-ink" />
            <Sparkle className="absolute bottom-[6%] right-[10%] h-6 w-6 text-ink" />
            <Sparkle className="absolute right-[24%] top-[8%] h-3.5 w-3.5 text-violet" />
          </div>
        </div>
      </div>
    </section>
  );
}
