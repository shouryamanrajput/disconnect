import { site } from "@/lib/config";
import PixelSmiley from "@/components/PixelSmiley";

// The mockup's lavender footer — brand, links, and the lime ticket sticker.
export default function SiteFooter() {
  return (
    <footer id="contact" className="mt-6 scroll-mt-24 bg-lavender sm:mt-10">
      <div className="container-px grid gap-7 py-10 sm:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] sm:gap-10 sm:py-12">
        <div>
          <a href="#top" className="flex items-center gap-2">
            <span className="font-display text-2xl lowercase tracking-tight text-ink">
              disconnect
            </span>
            <PixelSmiley className="h-6 w-6" />
          </a>
          <p className="mt-3 max-w-[220px] text-sm text-ink/70">
            Log out to plug into something real.
          </p>
        </div>

        <div>
          <p className="text-sm font-extrabold text-ink">Quick Links</p>
          <ul className="mt-3 space-y-2 text-sm text-ink/70">
            <li>
              <a href="#events" className="transition-colors hover:text-ink">
                Events
              </a>
            </li>
            <li>
              <a href="#why" className="transition-colors hover:text-ink">
                About
              </a>
            </li>
            <li>
              <a href="#join" className="transition-colors hover:text-ink">
                Community
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phone}`}
                className="transition-colors hover:text-ink"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-extrabold text-ink">Follow Us</p>
          <ul className="mt-3 space-y-2 text-sm text-ink/70">
            <li>
              <a
                href={site.links.instagram}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-ink"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={site.links.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-ink"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phone}`}
                className="transition-colors hover:text-ink"
              >
                {site.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>

        <div className="flex items-start justify-start sm:justify-end">
          <span className="inline-block -rotate-6 rounded-md bg-lime px-5 py-3 text-xs font-extrabold uppercase leading-snug tracking-wide text-ink shadow-md">
            Offline
            <br />
            is the new
            <br />
            luxury ☺
          </span>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="container-px py-4">
          <p className="text-xs text-ink/60">
            © 2026 {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
