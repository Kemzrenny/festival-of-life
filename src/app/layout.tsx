import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { event } from "@/content/site";
import "./globals.css";

/* Free stand-ins for GT Walsheim (headlines) and Söhne (body). When licensed web fonts arrive,
   add them to src/fonts and load them here the same way; they take priority through the --head/--body stacks. */
const outfit = localFont({
  src: [
    { path: "../fonts/outfit-latin-500-normal.woff2", weight: "500" },
    { path: "../fonts/outfit-latin-700-normal.woff2", weight: "700" },
    { path: "../fonts/outfit-latin-800-normal.woff2", weight: "800" },
  ],
  variable: "--font-outfit", display: "swap",
});
const hanken = localFont({
  src: [
    { path: "../fonts/hanken-grotesk-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/hanken-grotesk-latin-500-normal.woff2", weight: "500" },
    { path: "../fonts/hanken-grotesk-latin-600-normal.woff2", weight: "600" },
    { path: "../fonts/hanken-grotesk-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-hanken", display: "swap",
});

const title = `${event.name} ${event.year} · ${event.tagline}`;
const description = `${event.tagline}. ${event.dates}, ${event.address}. Extravagant grace calls for extravagant celebration. Register and make your I'm Attending card.`;

export const metadata: Metadata = {
  metadataBase: new URL(event.siteUrl),
  title,
  description,
  openGraph: { title, description, type: "website", images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Festival of Life 2026" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#800d10", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${hanken.variable}`}>
      <body>{children}</body>
    </html>
  );
}
