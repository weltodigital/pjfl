# PJFL Accountants

Marketing site for PJFL Accountants, Egham, Surrey.

Vite + React + TypeScript + Tailwind CSS, with shadcn-style UI primitives.

## Running it

```bash
npm install
npm run dev      # http://localhost:8080
npm run build    # outputs to dist/
npm run preview  # serve the production build
```

## Pages

| Route       | File                    |
| ----------- | ----------------------- |
| `/`         | `src/pages/Index.tsx`    |
| `/services` | `src/pages/Services.tsx` |
| `/contact`  | `src/pages/Contact.tsx`  |
| `*`         | `src/pages/NotFound.tsx` |

## Brand colours

| Use                       | Hex       |
| ------------------------- | --------- |
| Headers, primary elements | `#345e7d` |
| Darker blue (hover/grad)  | `#2a4c66` |
| Backgrounds               | `#fcfef1` |
| CTAs and accents          | `#bc1823` |
| CTA hover                 | `#a01520` |

Also available as Tailwind tokens: `brand`, `brand-dark`, `ivory`, `accent`, `accent-dark`.

## Logo

`PJFL.logo.png` in the project root is the client's master artwork: an ivory wordmark on a
solid blue field (`#3e5d7a` — note this is *not* the brand blue `#345e7d`, so pasting it
straight onto the navy sections would show a seam).

Two transparent variants were derived from it and live in `src/assets/`:

| File                  | Type colour       | Used on                     |
| --------------------- | ----------------- | --------------------------- |
| `pjfl-logo.png`       | brand blue        | navbar (white background)   |
| `pjfl-logo-light.png` | ivory             | hero and footer (navy)      |

`src/components/Logo.tsx` picks between them via its `variant` prop. If the client ever
supplies new artwork, regenerate both variants rather than dropping a single file in — the
blue background needs keying out either way.

## Things to swap before go-live

- **Contact form** — `src/pages/Contact.tsx` currently opens the visitor's email client with
  the enquiry pre-filled, since there's no server. To capture submissions properly, replace the
  body of `handleSubmit` with a `fetch()` to Formspree / Netlify Forms / your own endpoint.
- **"20+ years of experience"** — copy claim on the homepage; confirm before publishing.

All contact details (phone, email, address, map link) live in `src/lib/site.ts` — change them
once there and they update everywhere.

## Deploying

Any static host works. `public/_redirects` is included so Netlify serves the SPA routes
correctly; on Vercel add a rewrite of `/(.*)` → `/index.html`, on Apache/Nginx point all
unmatched routes at `index.html`.
