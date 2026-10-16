# Festival of Life 2026 website

A celebration of the life of Jesus · 23–27 December 2026 · Ojodu, Lagos.

Built with Next.js 15 (App Router), TypeScript and Tailwind CSS 4. The whole site is one statically
generated page, so it deploys anywhere and loads fast.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build check
```

## Deploy on Vercel

1. Go to vercel.com → **Add New… → Project** and import this GitHub repo.
2. Keep the defaults (Framework: Next.js). Click **Deploy**.
3. Add your domain under **Settings → Domains**, then update `siteUrl` in `src/content/site.ts`
   so share previews use the right address.

Every push to `main` redeploys automatically.

## Editing content

Almost everything people read is in **`src/content/site.ts`**:

| What | Where in `site.ts` |
| --- | --- |
| Dates, venue, address, map link, hosts | `event` |
| Ministers (order, photo, host badge) | `ministers` |
| Session titles for each day | `sessions` |
| Livestream links (empty url = "Link coming soon") | `live` |
| Social links (empty url = hidden) | `social` |
| Five ways we celebrate | `voices` |
| Symbols and their meanings | `symbols` |
| What to expect film captions | `expect` |
| FAQ | `faq` |
| Song played by the sound button | `song` |

Images live in `public/assets/`. To replace one, keep the same file name, or update the path in `site.ts`.

## Daily check-in (/checkin)

The check-in page lives at `/checkin`. It is not linked anywhere on the site yet and is hidden from search engines.

People type their name and pick the morning (9 AM WAT) or evening (5 PM WAT) session, then see a Bible verse.
Rules: the same name can check in once per session per day (case and extra spaces are ignored); the same person
can check in to both sessions; a different spelling or an extra name counts as a different person.

Storage is a Google Sheet. Follow the steps at the top of `docs/checkin-sheet.gs` (paste the script into the
Sheet's Apps Script, deploy it as a web app), then add `CHECKIN_SHEET_WEBHOOK` in Vercel → Settings →
Environment Variables and redeploy. The script blocks duplicates and adds each check-in as a row.

Until it is connected, the page shows "Check-in isn't switched on yet".

## Registration

Registration happens on an external form. Paste its link into `registration.url` in
`src/content/site.ts` and every "Register" button opens it in a new tab. While it is empty the
buttons scroll to the I'm Attending section.

The I'm Attending card maker is separate and needs no registration: anyone can add a photo and
name and download the card (`src/components/CardMaker.tsx`).

## Fonts

The brand fonts are GT Walsheim (headlines) and Söhne (body). Until web licences are in place the site
uses close free stand-ins, self-hosted in `src/fonts/` (Outfit and Hanken Grotesk). To switch:
add the licensed `.woff2` files to `src/fonts/`, load them in `src/app/layout.tsx` with `localFont`
as GT Walsheim / Söhne, and the CSS font stacks pick them up first.

## Before launch checklist

- [ ] Confirm the venue address (site uses **28** Efon Alaye Str.; the flyers say 12)
- [ ] Add livestream links in `live`
- [ ] Add social links in `social`
- [ ] Confirm FAQ answers (cost, parking, transport, children)
- [ ] Replace session titles if the programme names them
- [ ] High-resolution minister photos
- [ ] Final logo SVG and photo-shoot images from the creative team
- [ ] Paste the registration form link into `registration.url` in `src/content/site.ts`
- [ ] Set the real domain in `event.siteUrl`
