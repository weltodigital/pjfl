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

## Contact form

Enquiries POST to `api/contact.ts`, a Vercel serverless function that emails them to
**info@pjfl.co.uk** via [Resend](https://resend.com), with the visitor's address set as
`Reply-To` so hitting Reply goes straight back to them.

> **The form is currently hidden.** `CONTACT_FORM_ENABLED` at the top of
> `src/pages/Contact.tsx` is `false`, so the page offers call and email buttons instead.
> Flip it to `true` once the Resend setup below is done — that's the only change needed;
> the form and the function are both already in place and tested.

### One-time setup

1. **Resend account** — sign up at resend.com (free tier covers 3,000 emails/month).
2. **Verify pjfl.co.uk** — Domains > Add Domain, then add the DNS records Resend gives you
   (an SPF `TXT` and a DKIM record) wherever pjfl.co.uk's DNS is managed. Verification is
   usually minutes but can take up to 24 hours. This step is what stops enquiries landing in
   spam — don't skip it.
3. **Create an API key** — Resend > API Keys. Copy it; you only see it once.
4. **Add environment variables in Vercel** — Settings > Environment Variables, for both
   Production and Preview:
   - `RESEND_API_KEY` — the key from step 3
   - `CONTACT_FROM` — `PJFL Website <website@pjfl.co.uk>`
5. **Redeploy** so the new variables are picked up.
6. **Set `CONTACT_FORM_ENABLED` to `true`** in `src/pages/Contact.tsx`, push, then send
   yourself a test enquiry.

Until the domain is verified you can set `CONTACT_FROM` to `onboarding@resend.dev` to test
the whole flow. Resend will only deliver to your own signup address in that mode.

### Local development

`npm run dev` serves the frontend only — `/api/contact` doesn't exist, so the form will
report an error. To run the function locally:

```bash
npm i -g vercel
cp .env.example .env.local   # add your real key
vercel dev
```

### Notes

- A hidden honeypot field silently discards bot submissions.
- The function validates and length-caps every field server-side, so the API can't be abused
  by posting to it directly.
- There's no rate limiting. If the form ever attracts abuse, add Vercel's firewall rules or
  a KV-backed counter.
- Enquiries contain personal data. Resend is the processor — worth a line in the client's
  privacy policy, and the retention settings are in the Resend dashboard.

## Things to swap before go-live

- **Resend setup** — the contact form needs the steps under "Contact form" above completed
  before it can deliver anything.
- **"20+ years of experience"** — copy claim on the homepage; confirm before publishing.
- **MTD wording** — confirm the client handles MTD for Income Tax Self Assessment as well as
  VAT; the services copy currently implies both.

All contact details (phone, email, address, map link) live in `src/lib/site.ts` — change them
once there and they update everywhere.

## Deploying

Built for **Vercel**: import the repo and it picks up the Vite build automatically. `vercel.json`
rewrites unmatched routes to `index.html` for client-side routing, while leaving `/api/*` alone
so the contact function still resolves. Remember the environment variables from the contact form
setup above.

`public/_redirects` is also present, so the site still works on Netlify — but the contact form
would need porting, since `api/contact.ts` is a Vercel function.
