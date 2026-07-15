import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light "poster" palette from the client's mockup: warm off-white
        // canvas, jet-black type, purple + lavender + lime accents, and
        // near-black cards for the event grid.
        cloud: "#F4F2EE", // page base — warm off-white
        ink: "#141414", // text + dark cards
        coal: "#1B1B1B", // card surface (dark)
        violet: "#6C4FF0", // purple accent (subhead, buttons)
        grape: "#5238C9", // deeper purple (hover)
        lavender: "#CFC6F5", // soft periwinkle (footer, blobs)
        blue: "#CFE3FF", // soft blue (gradient)
        lime: "#CDFF5C", // lime accent (chips, buttons, stickers)
        limedark: "#B3E840", // deeper lime (hover)
        paper: "#FFFFFF", // white cards
        mist: "#5F5C55", // muted body text on light
        // Legacy aliases so older utility classes keep compiling.
        night: "#141414",
        cream: "#F4F2EE",
        line: "#E3E0D8",
        gold: "#CDFF5C",
        amber: "#B3E840",
        mocha: "#5F5C55",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.3em",
      },
      maxWidth: {
        container: "1180px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        kenburns: {
          "0%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1.16)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        float: "float 9s ease-in-out infinite",
        kenburns: "kenburns 18s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
