"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/config";
import PixelSmiley from "@/components/PixelSmiley";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const nav = [
  { label: "Events", href: "#events" },
  { label: "About", href: "#why" },
  { label: "Community", href: "#join" },
  { label: "Contact", href: "#contact" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink/10 bg-cloud/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-px flex items-center justify-between py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="font-display text-2xl lowercase tracking-tight text-ink">
            disconnect
          </span>
          <PixelSmiley className="h-6 w-6" />
        </a>

        <nav className="hidden items-center gap-8 sm:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-semibold text-ink/70 transition-colors hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href={site.links.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="pill-lime px-5 py-2.5 text-[13px]"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Join us <span aria-hidden>↗</span>
        </a>
      </div>
    </header>
  );
}
