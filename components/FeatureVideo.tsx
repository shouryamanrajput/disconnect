"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/config";
import curated from "@/lib/curated.json";

// A large, immersive band built around one standout reel from the feed.
export default function FeatureVideo() {
  const video = curated.feature?.video || null;
  const image = curated.feature?.image || null;
  if (!video && !image) return null;

  return (
    <section className="relative flex min-h-[60svh] items-center overflow-hidden border-b border-line bg-ink">
      <div className="absolute inset-0">
        {video ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={image ?? undefined}
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" className="h-full w-full object-cover" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/30" />
      </div>

      <div className="container-px relative z-10 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3">
            <span className="gold-rule" />
            <p className="eyebrow">Paint. Chat. Create. Repeat.</p>
          </div>
          <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] text-paper sm:text-6xl">
            From strangers to a crew in{" "}
            <span className="italic font-normal text-sage">two hours.</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-paper/85">
            That&apos;s the whole promise. Show up on your own, leave with a
            group chat that actually makes plans.
          </p>
          <a
            href={site.links.instagram}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest text-gold transition-colors hover:text-amber"
          >
            Watch more on Instagram
            <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
