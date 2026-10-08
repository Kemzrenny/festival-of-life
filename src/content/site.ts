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
  tagline: "A celebration of the life of Jesus",
  campaign: "Extravagant grace calls for extravagant celebration",
  dates: "23–27 Dec 2026",
  datesLong: "Wednesday 23 – Sunday 27 December 2026",
  start: "2026-12-23T09:00:00+01:00",
  morning: "9:00 AM",
  evening: "5:00 PM",
  city: "Ojodu, Lagos",
  address: "28 Efon Alaye Str., off Olajide, Ojodu, Lagos",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=28+Efon+Alaye+Street+Ojodu+Lagos",
  hosts: "Glory Realms Ministries & Glory Centre Community Church",
  siteUrl: "https://festivaloflife.org", // update when the domain is confirmed
};

export const song = {
  title: "Hosanna",
  artist: "Toyosi Oseni",
  youtubeId: "oulcfTfVXAM",
  externalUrl: "https://music.youtube.com/watch?v=MtYjlIoAMJ4",
};

/** Livestream and social links. Leave a url empty ("") to hide that button. */
export const live = [
  { label: "Live", sub: "Website stream", url: "", pair: "coral" as Pair },
  { label: "YouTube", sub: "Video stream", url: "", pair: "yellow" as Pair },
  { label: "Mixlr", sub: "Audio stream", url: "", pair: "lime" as Pair },
];

export const social = [
  { label: "Instagram", url: "" },
  { label: "YouTube", url: "" },
  { label: "Contact", url: "" },
];

export const ministers = [
  { name: "Olakunle Zakariya", photo: "/assets/min-olakunle.webp", host: true, pair: "yellow" as Pair },
  { name: "Adesola Zakariya", photo: "/assets/min-adesola.webp", pair: "coral" as Pair },
  { name: "Joshua Obeng", photo: "/assets/min-obeng.webp", pair: "teal" as Pair },
  { name: "Chris Delvan", photo: "/assets/min-delvan.webp", pair: "lime" as Pair },
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
  morning: "Morning celebration",
  evening: "Evening celebration",
}));

export const voices = [
  {
    word: "Celebration", pair: "yellow" as Pair, glyph: "crown", strip: "/assets/strip-crown.webp",
    quote: "“It’s time for the celebration of the life of Jesus.”",
    body: "Five days, ten sessions, one reason. Bring your loudest praise, your family and your best outfit, because the King is worth celebrating.",
    verse: "“Hosanna to the Son of David! Blessed is He who comes in the name of the Lord!”", ref: "Matthew 21:9",
  },
  {
    word: "Alive", pair: "lime" as Pair, glyph: "tree", strip: "/assets/strip-tree.webp",
    quote: "“Was dead, now alive, need more headroom for my Fila.”",
    body: "Life in Him isn’t quiet and it isn’t small. Come as someone who has been raised up, and dress like it.",
    verse: "“Even when we were dead in trespasses, made us alive together with Christ.”", ref: "Ephesians 2:5",
  },
  {
    word: "Rejoicing", pair: "coral" as Pair, glyph: "fire", strip: "/assets/strip-fire.webp",
    quote: "“The joy of the Lord is my strength. My agbada speaks for me.”",
    body: "Joy you can see from the gate. Dance like nobody is checking the time, because nobody is.",
    verse: "“Do not sorrow, for the joy of the Lord is your strength.”", ref: "Nehemiah 8:10",
  },
  {
    word: "Salvation", pair: "red" as Pair, glyph: "cross", strip: "/assets/strip-cross.webp",
    quote: "“By grace I’ve been saved through faith. This calls for celebration!”",
    body: "We didn’t earn it and we can’t repay it. Grace this extravagant deserves an extravagant thank you.",
    verse: "“For by grace you have been saved through faith, and that not of yourselves; it is the gift of God.”", ref: "Ephesians 2:8",
  },
  {
    word: "Newness", pair: "teal" as Pair, glyph: "dove", strip: "/assets/strip-dove.webp",
    quote: "“Watch me rejoice like a newborn baby that has no worries.”",
    body: "Leave the weight of the year at the door. Walk out of December new, light and full of Him.",
    verse: "“If anyone is in Christ, he is a new creation; old things have passed away.”", ref: "2 Corinthians 5:17",
  },
];

export const symbols = [
  { name: "Cup & Bread", glyph: "cup", line: "His body and blood, shared at His table." },
  { name: "Fire", glyph: "fire", line: "The Spirit who sets hearts burning." },
  { name: "Dove", glyph: "dove", line: "Peace, and the Spirit descending." },
  { name: "Cross", glyph: "cross", line: "Where extravagant grace was poured out." },
  { name: "Staff", glyph: "staff", line: "The Good Shepherd who leads us." },
  { name: "Crown of Thorns", glyph: "thorns", line: "The price He paid to wear it." },
  { name: "Crown", glyph: "crown", line: "The King we celebrate." },
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
    kind: "in", image: "/assets/env-bunting.webp", alt: "A street under festival bunting and string lights",
    label: "At the gate", title: "Arrive early. Walk in under the bunting.",
    text: "The welcome street opens 30 minutes before each session, with music, greeters and your first photos of the day.",
    ms: 7000,
  },
  {
    kind: "pan", image: "/assets/env-wall.webp", alt: "Festival runners hung on a lit wall",
    label: "The photo wall", title: "Take your I'm Attending picture.",
    text: "Stop at the runner wall in your festival outfit, then post your card before you head in.",
    ms: 6500,
  },
  {
    kind: "deep", image: "/assets/env-corridor.webp", alt: "A corridor of illuminated symbol panels",
    label: "The symbol corridor", title: "Follow the symbols into the main hall.",
    text: "Ten panels, one story: from the cup and bread to the tamarisk tree. Find a seat and get ready to celebrate.",
    ms: 7000,
  },
];

export const faq = [
  { q: "What should I wear?", a: "Your most extravagant celebration outfit. Agbada, gele, aso-oke, the jacket you've been saving: all welcome. Leave headroom for the Fila." },
  { q: "Is it free to attend?", a: "Entry details to be confirmed. Registering helps us prepare a seat and a welcome for you." },
  { q: "Can I come for only some days?", a: "Yes. When you register, pick the days and sessions you're coming for. We'll be glad to see you at any of them." },
  { q: "Where can I park?", a: "Parking and overflow arrangements will be shared closer to the date." },
  { q: "How do I get there by public transport?", a: "Directions from Ojodu Berger and the nearest bus stops will be shared closer to the date." },
  { q: "Is there a session on Christmas Day?", a: "Yes. Sessions run every day from 23 to 27 December. What better day to celebrate the life of Jesus?" },
  { q: "Can I bring the children?", a: "Children's church arrangements will be shared closer to the date." },
];

export const pastThemes = Array.from({ length: 8 }, (_, i) => `/assets/sod-${i}.png`);
