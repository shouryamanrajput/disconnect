/**
 * SITE CONFIG  ──  This is the one file you can safely edit yourself.
 *
 * It holds the community name, the words on the page, the links the buttons
 * open, and the experiences you run. Change anything here and the site
 * updates. You can also just ask me to change any of it for you.
 *
 * The photos/videos come from Instagram automatically (see lib/curated.json,
 * refreshed by `npm run scrape && npm run download && npm run curate`).
 *
 * Details pulled straight from @disconnectfr. Anything marked // CONFIRM is
 * worth a quick double-check.
 */

export const site = {
  name: "Disconnect",
  fullName: "Disconnect — Fun Offline Experiences",
  handle: "@disconnectfr",

  // Straight from the Instagram bio.
  tagline: "An offline social club for humans.",
  // The brand lockup line from the guidelines.
  motto: "Offline is the vibe",
  bioLines: ["Offline social club for humans 🦦", "Touch some grass 🌿"],

  description:
    "Disconnect throws fun offline experiences — paint afternoons, dance " +
    "workshops, trampoline raves — where you put the phone down, touch some " +
    "grass, and go from strangers to a crew in a couple of hours.",

  // The community mostly runs in Rohtak.
  city: "Rohtak",

  // Contact + the single most important action: join the WhatsApp community.
  phone: "918168133686", // used by call/WhatsApp buttons (no spaces)
  phoneDisplay: "+91 81681 33686",

  links: {
    instagram: "https://www.instagram.com/disconnectfr",
    // Main call to action — the WhatsApp community from the IG bio.
    whatsapp: "https://chat.whatsapp.com/CidRJyLYXGa1jFY7TY8m7U",
    // "Host or Partner with Disconnect" form from the bio.
    host: "https://forms.gle/AY8TZp1frXnbvJ8o8",
    // "Disconnect Creators' Club" form from the bio.
    creators: "https://forms.gle/Gmwo2ADFN6aBuDsWA",
    // "Got an Idea? Tell Us!" form from the bio.
    idea: "https://forms.gle/wVV6u1nsCtVNhbyaA",
  },

  // A few numbers for the stat row. Keep them honest. // CONFIRM
  stats: [
    { value: "1k+", label: "humans in the club" },
    { value: "20+", label: "offline experiences" },
    { value: "0", label: "doom-scrolling" },
  ],

  // What Disconnect actually does (Experiences section). The `image` key is
  // matched to a photo in lib/curated.json → sectionImages.
  experiences: [
    {
      key: "paint",
      title: "Paint & create",
      body: "Cafés turned into little art studios — brushes moving, coffees brewing, smiles everywhere. Pot painting, art dates, and slow creative afternoons.",
    },
    {
      key: "dance",
      title: "Dance workshops",
      body: "From strangers to a dance crew in two hours. Learn the viral choreography together — no experience needed, just show up and vibe.",
    },
    {
      key: "rave",
      title: "Trampoline raves",
      body: "Sunday mornings that beat any brunch. Bounce, dance and make a core memory at Rohtak's first-ever trampoline rave.",
    },
    {
      key: "collabs",
      title: "Collabs & pop-ups",
      body: "One-off experiences with local spots and brands — themed surprises, seasonal editions and the odd delightful stunt.",
    },
  ],

  // The three ideas the club stands for (About / IntroStrip).
  values: [
    {
      title: "Leave the feed",
      body: "The best moments don't fit in a story. We build evenings worth being fully present for.",
    },
    {
      title: "Strangers to crew",
      body: "Come alone, leave with people. Every experience is built to get a room talking, moving and laughing together.",
    },
    {
      title: "Touch some grass",
      body: "Real rooms, real people, real fun — the antidote to another night lost to the scroll.",
    },
  ],

  // The ways to get involved (Join section). Pulled from the IG bio links.
  joinCards: [
    {
      title: "Join the community",
      body: "Hop into the WhatsApp group to hear about every upcoming experience first.",
      cta: "Join on WhatsApp",
      href: "https://chat.whatsapp.com/CidRJyLYXGa1jFY7TY8m7U",
      primary: true,
    },
    {
      title: "Host or partner",
      body: "Got a space, a brand or an idea worth gathering people around? Let's build it together.",
      cta: "Partner with us",
      href: "https://forms.gle/AY8TZp1frXnbvJ8o8",
      primary: false,
    },
    {
      title: "Creators' club",
      body: "Shoot, edit or just love good vibes? Join the crew that captures every experience.",
      cta: "Apply to create",
      href: "https://forms.gle/Gmwo2ADFN6aBuDsWA",
      primary: false,
    },
  ],
};

export type Site = typeof site;
