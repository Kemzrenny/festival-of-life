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

## Registration

The form and the I'm Attending card work now. Storage is still to be decided, so registrations are
**not saved yet**. To start saving them, set one environment variable in Vercel
(**Settings → Environment Variables**):

```
NEXT_PUBLIC_REGISTRATION_ENDPOINT=https://your-endpoint
```

Any URL that accepts a JSON `POST` works (Google Apps Script web app, Supabase edge function,
Formspree, etc.). The payload shape is the `Registration` type in `src/lib/registration.ts`.

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
- [ ] Set `NEXT_PUBLIC_REGISTRATION_ENDPOINT` once storage is chosen
- [ ] Set the real domain in `event.siteUrl`
