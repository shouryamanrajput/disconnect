"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { site } from "@/lib/config";
import WhatsAppIcon from "@/components/WhatsAppIcon";

// Confetti burst on join — deterministic, no libs.
function Burst({ onDone }: { onDone: () => void }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        angle: (i / 22) * Math.PI * 2 + (i % 3) * 0.3,
        dist: 58 + (i % 5) * 24,
        color: ["#CDFF5C", "#6C4FF0", "#141414"][i % 3],
        rot: (i % 2 ? 1 : -1) * (110 + i * 12),
        size: 5 + (i % 3) * 3,
      })),
    [],
  );
  useEffect(() => {
    const t = setTimeout(onDone, 900);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
          animate={{
            x: Math.cos(p.angle) * p.dist,
            y: Math.sin(p.angle) * p.dist - 24,
            opacity: 0,
            rotate: p.rot,
            scale: 0.5,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: p.size,
            height: p.size,
            background: p.color,
          }}
        />
      ))}
    </span>
  );
}

// The mockup's "Join the Community" band — white card, ticket sticker,
// doodle arrow, one lime CTA into WhatsApp.
export default function JoinCommunity() {
  const reduce = useReducedMotion();
  const [bursts, setBursts] = useState<number[]>([]);

  return (
    <section id="join" className="scroll-mt-24 py-8 sm:py-12">
      <div className="container-px">
        <div className="relative rounded-[2rem] border border-ink/10 bg-paper px-6 py-12 text-center shadow-[0_24px_60px_-30px_rgba(20,20,20,0.25)] sm:px-12 sm:py-14">
          {/* ticket sticker */}
          <div className="absolute -top-5 left-4 -rotate-6 sm:left-8">
            <span className="inline-block rounded-md bg-lime px-4 py-2.5 text-[11px] font-extrabold uppercase leading-tight tracking-wide text-ink shadow-md">
              ☺ Be part of
              <br />
              the real ones
            </span>
          </div>

          {/* doodle arrow */}
          <svg
            viewBox="0 0 120 90"
            aria-hidden
            className="absolute right-8 top-1/2 hidden h-20 w-24 -translate-y-1/2 text-violet sm:block"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M112 10c-8 34-38 54-84 56" />
            <path d="M40 54l-14 13 19 4" />
          </svg>

          <h2 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
            Join the Community
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] text-ink/75">
            Be the first to know about hidden events and exclusive invites.
          </p>

          <div className="mt-7 flex flex-col items-center gap-3">
            <span className="relative inline-flex">
              <a
                href={site.links.whatsapp}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  if (!reduce) setBursts((b) => [...b, Date.now()]);
                }}
                className="pill-lime px-8 py-3.5 text-base"
              >
                <WhatsAppIcon className="h-5 w-5" />
                I&apos;m in <span aria-hidden>↗</span>
              </a>
              {bursts.map((id) => (
                <Burst
                  key={id}
                  onDone={() => setBursts((b) => b.filter((x) => x !== id))}
                />
              ))}
            </span>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
              Free to join — the club lives on WhatsApp
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
