# Sportykore Waitlist

Landing page and waitlist signup for [Sportykore](https://waitlist.sportykore.com) — grassroots football competitions with live scores and permanent player profiles. Collects signups and stores them in Google Sheets.

## Stack

- [Astro](https://astro.build) (SSR on Vercel)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Vercel Analytics](https://vercel.com/docs/analytics)
- Google Sheets API (waitlist storage)

**Node:** `>=22.12.0`

## Pages

| Route | Description |
| :--- | :--- |
| `/` | Waitlist landing page |
| `/thanks` | Post-submit confirmation |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `POST /api/waitlist` | Form submission API |

## Getting started

```sh
npm install
cp .env.example .env
# Fill in Google Sheets credentials (see below)
npm run dev
```

Dev server runs at [http://localhost:4321](http://localhost:4321).

## Environment variables

Copy `.env.example` to `.env` for local development. In production, set the same keys in Vercel → Project → Settings → Environment Variables.

**Google auth** (use one approach):

- `GOOGLE_SERVICE_ACCOUNT_BASE64` — recommended on Vercel
- `GOOGLE_SERVICE_ACCOUNT` — raw JSON on one line
- `GOOGLE_CLIENT_EMAIL` + `GOOGLE_PRIVATE_KEY` — split fields

**Sheet target:**

- `GOOGLE_SHEETS_SPREADSHEET_ID` — from the spreadsheet URL
- `GOOGLE_SHEETS_SHEET_NAME` — exact tab name (case-sensitive)

Share the sheet with the service account email as Editor.

## Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |

## Project structure

```text
/
├── public/              # Static assets, favicons, sitemap
├── src/
│   ├── assets/          # Screenshots, testimonials
│   ├── components/      # WaitlistForm, SiteFooter, LegalPage
│   ├── content/legal/   # Privacy & terms HTML bodies
│   ├── layouts/         # Shared page layout
│   ├── lib/             # Waitlist validation, Google Sheets, env
│   ├── pages/           # Routes + /api/waitlist
│   └── styles/          # Global and legal page CSS
├── .env.example
├── design.md            # Brand & design tokens
└── development.md       # Build brief for AI-assisted development
```

## Deployment

Configured for [Vercel](https://vercel.com) via `@astrojs/vercel`. Push to your connected repo or run `vercel` from the project root. Set environment variables in the Vercel dashboard before deploying.

Production site: **https://waitlist.sportykore.com**

## Waitlist form

Submissions include name, email, phone (normalized to E.164), and role (`fan`, `organizer`, `player`, `coach`, `other`). Successful signups redirect to `/thanks`.
