/**
 * All editable website content lives in this file.
 * Change text, dates, links or people here; the page updates on the next deploy.
 */

export type Pair = "yellow" | "teal" | "red" | "lime" | "coral";

export const PAIRS: Record<Pair, [bg: string, text: string]> = {
  yellow: ["#eda60e", "#341004"],
  teal: ["#96d0c2", "#2d6562"],
  red: ["#800d10", "#ec6d5e"],
  lime: ["#b4d030", "#546603"],
  coral: ["#ec6d5e", "#800d10"],
};

export const event = {
  name: "Festival of Life",
  year: 2026,
  theme: "Torrents of His Glory",
  tagline: "A life that has encountered the fullness of God’s goodness must find expression",
  campaign: "Extravagant grace calls for extravagant demonstration",
  dates: "23–27 Dec 2026",
  datesLong: "Wednesday 23 – Sunday 27 December 2026",
  start: "2026-12-23T09:00:00+01:00",
  morning: "9:00 AM WAT",
  evening: "5:00 PM WAT",
  city: "Ojodu, Lagos",
  address: "28 Efon Alaye Str., off Olajide, Ojodu, Lagos",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=28+Efon+Alaye+Street+Ojodu+Lagos",
  hosts: "Glory Realms Ministries & Glory Centre Community Church",
  siteUrl: "https://festival-of-life-sigma.vercel.app", // switch to the custom domain when it is set up
};

/**
 * Registration happens on an external form. Paste its link here and every "Register" button
 * on the site opens it in a new tab. While it is empty, those buttons scroll to the I'm Attending section.
 */
export const registration = {
  url: "",
};

export const song = {
  title: "Festival sound",
  artist: "Festival of Life 2026",
  src: "/audio/festival-of-life.mp3", // official festival audio (intro trimmed)
};

/** Livestream and social links. Leave a url empty ("") to hide that button. */
export const live = [
  { label: "YouTube", sub: "Glory Centre Community Church", url: "https://www.youtube.com/@glorycentrecommunitychurch", pair: "yellow" as Pair },
  { label: "Mixlr", sub: "Audio stream", url: "", pair: "lime" as Pair }, // paste the Mixlr link when ready
];

export const social = [
  { label: "Instagram", url: "" },
  { label: "YouTube", url: "https://www.youtube.com/@glorycentrecommunitychurch" },
  { label: "Contact", url: "" },
];

/** Set `revealed: false` to show a "to be announced" card instead of the photo and name. */
export const ministers: { name: string; photo: string; pair: Pair; host?: boolean; revealed?: boolean }[] = [
  { name: "Olakunle Zakariya", photo: "/assets/min-olakunle.webp", host: true, pair: "yellow" as Pair },
  { name: "Adesola Zakariya", photo: "/assets/min-adesola.webp", pair: "coral" as Pair },
];

export const days = [
  { short: "Wed", date: "23 Dec", pair: "yellow" as Pair },
  { short: "Thu", date: "24 Dec", pair: "lime" as Pair },
  { short: "Fri", date: "25 Dec", pair: "red" as Pair, badge: "Christmas Day" },
  { short: "Sat", date: "26 Dec", pair: "coral" as Pair },
  { short: "Sun", date: "27 Dec", pair: "teal" as Pair },
];

/** Session titles per day, in day order. Replace once the programme is confirmed. */
export const sessions = days.map(() => ({
  morning: "Morning session",
  evening: "Evening session",
}));

/** "Every shade of His goodness. Every expression of this life." */
export const voices = [
  { word: "See it.", pair: "yellow" as Pair, glyph: "eye", strip: "/assets/fabric-yellow-lit.webp",
    body: "Witness the beauty of a life shaped by God’s goodness, expressed through real people and real stories." },
  { word: "Hear it.", pair: "lime" as Pair, glyph: "ear", strip: "/assets/fabric-lime-lit.webp",
    body: "Let the voices of celebration, worship and testimony give expression to all God has done." },
  { word: "Feel it.", pair: "coral" as Pair, glyph: "heart", strip: "/assets/fabric-coral-lit.webp",
    body: "Experience the joy, gratitude, reverence and wonder that rise from a life overflowing with God’s goodness." },
  { word: "Experience it.", pair: "teal" as Pair, glyph: "hands", strip: "/assets/fabric-teal-lit.webp",
    body: "Come into the life and glory in the community of God’s family." },
];

export const symbols = [
  { name: "Cup & Bread", glyph: "cup", line: "His body and blood, shared at His table." },
  { name: "Fire", glyph: "fire", line: "The Spirit who sets hearts burning." },
  { name: "Dove", glyph: "dove", line: "Peace, and the Spirit descending." },
  { name: "Cross", glyph: "cross", line: "Where extravagant grace was poured out." },
  { name: "Staff", glyph: "staff", line: "The Good Shepherd who leads us." },
  { name: "Crown of Thorns", glyph: "thorns", line: "The suffering He bore for us." },
  { name: "Crown", glyph: "crown", line: "The King we glorify." },
  { name: "Bible", glyph: "bible", line: "The Word that gives life." },
  { name: "Praying Hands", glyph: "hands", line: "A people who seek His face." },
  { name: "Tamarisk Tree", glyph: "tree", line: "Planted by Abraham where he called on the everlasting God." },
] as const;

export const looks: { name: string; pair: Pair }[] = [
  { name: "Mustard jacket", pair: "yellow" },
  { name: "Coral kaftan", pair: "coral" },
  { name: "Earth jacket", pair: "teal" },
  { name: "Rust trousers", pair: "lime" },
  { name: "Family set", pair: "coral" },
  { name: "Jewel gown", pair: "yellow" },
  { name: "Runner stoles", pair: "teal" },
  { name: "Gold agbada", pair: "lime" },
  { name: "Gold robes", pair: "teal" },
];

export const expect = [
  {
    kind: "deep", image: "/assets/env-corridor.webp", alt: "A lit approach lined with festival symbol panels",
    label: "Arrive early", title: "Find your seat in the church auditorium.",
    text: "Sessions start at 9 AM and 5 PM WAT. Come a little early to settle in before worship begins.",
    ms: 7000,
  },
  {
    kind: "pan", image: "/assets/env-wall.webp", alt: "Festival runners hung on a lit wall",
    label: "The photo wall", title: "Take your I'm Attending picture.",
    text: "Stop at the runner wall in your festival outfit, then post your card before you head in.",
    ms: 6500,
  },
  {
    kind: "in", image: "/assets/env-bunting.webp", alt: "Festival bunting and string lights",
    label: "Come dressed for it", title: "Wear your most extravagant outfit.",
    text: "Agbada, gele, aso-oke, the jacket you've been saving. Walk in ready to express God’s glory.",
    ms: 7000,
  },
];

export const faq = [
  { q: "What should I wear?", a: "Your most extravagant festival outfit. Agbada, gele, aso-oke, the jacket you've been saving: all welcome. Leave headroom for the Fila." },
  { q: "Is it free to attend?", a: "Yes, entry is free. Registering helps us prepare a seat and a welcome for you." },
  { q: "Can I come for only some days?", a: "Yes. Come for the days and sessions that work for you. We'll be glad to see you at any of them." },
  { q: "Where can I park?", a: "Parking and overflow arrangements will be shared closer to the date." },
  { q: "How do I get there by public transport?", a: "Directions from Ojodu Berger and the nearest bus stops will be shared closer to the date." },
  { q: "Is there a session on Christmas Day?", a: "Yes. There's a morning and an evening session on Christmas Day, just like every other day. What better day to express God’s glory?" },
  { q: "Can I bring the children?", a: "Children's church arrangements will be shared closer to the date." },
];

export const pastThemes = Array.from({ length: 8 }, (_, i) => `/assets/sod-${i}.png`);
