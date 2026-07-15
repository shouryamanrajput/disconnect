import type { Metadata, Viewport } from "next";
import { Alfa_Slab_One, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/config";
import SmoothScroll from "@/components/SmoothScroll";

// Chunky, friendly slab display — the closest web face to the mockup's
// Cooper Black headlines.
const display = Alfa_Slab_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F4F2EE",
  width: "device-width",
  initialScale: 1,
};

// Fixed-canvas fit: the page is designed on a locked 1440px frame (420px on
// phones). This scales that frame uniformly to the window, so zooming or
// resizing never reflows the layout — the whole poster just scales.
const FIT_SCRIPT = `(function(){function fit(){var doc=document.documentElement;doc.style.zoom="";var w=doc.clientWidth||window.innerWidth;var d=w<640?420:1440;doc.style.zoom=String(w/d);doc.style.overflowX="hidden";if(document.body){document.body.style.width=d+"px";}}fit();window.addEventListener("resize",fit);})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <body
        className="font-sans antialiased bg-cloud text-ink"
        suppressHydrationWarning
      >
        <script dangerouslySetInnerHTML={{ __html: FIT_SCRIPT }} />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
