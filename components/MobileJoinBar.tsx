"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/config";
import WhatsAppIcon from "@/components/WhatsAppIcon";

// A sticky bottom bar on phones with the one action that matters: join.
export default function MobileJoinBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-cloud/90 px-4 py-3 backdrop-blur-md transition-transform duration-300 sm:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg lowercase text-ink">
            disconnect
          </p>
          <p className="truncate text-xs text-ink/60">{site.tagline}</p>
        </div>
        <a
          href={site.links.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="pill-lime shrink-0 px-5 py-2.5 text-[13px]"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Join
        </a>
      </div>
    </div>
  );
}
