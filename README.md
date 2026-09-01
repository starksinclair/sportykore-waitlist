# Sportykore Website

Marketing website and contact form for [Sportykore](https://www.sportykore.com), the grassroots football competition platform for live scores, automatic standings, team-admin lineups, match stats, and permanent player profiles.

Sportykore is available on the App Store and Google Play. Contact submissions are stored in Google Sheets.

## Stack

- [Astro](https://astro.build) (SSR on Vercel)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Vercel Analytics](https://vercel.com/docs/analytics)
- Google Sheets API for contact storage

**Node:** `>=22.12.0`

## Pages

| Route | Description |
| :--- | :--- |
| `/` | Main marketing page |
| `/download` | Smart app-download page with mobile store redirect |
| `/players` | Player and coach page |
| `/organizers` | Organizer page |
| `/faq` | Frequently asked questions |
| `/thanks` | Post-contact confirmation |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `POST /api/contact` | Contact form submission API |

## Getting Started

```sh
npm install
cp .env.example .env
# Fill in Google Sheets credentials
npm run dev
```

Dev server runs at [http://localhost:4321](http://localhost:4321).

## Environment Variables

Copy `.env.example` to `.env` for local development. In production, set the same keys in Vercel Project Settings.

**Google auth** (use one approach):

- `GOOGLE_SERVICE_ACCOUNT_BASE64` - recommended on Vercel
- `GOOGLE_SERVICE_ACCOUNT` - raw JSON on one line
- `GOOGLE_CLIENT_EMAIL` + `GOOGLE_PRIVATE_KEY` - split fields

**Sheet target:**

- `GOOGLE_SHEETS_SPREADSHEET_ID` - from the spreadsheet URL
- `GOOGLE_SHEETS_SHEET_NAME` - exact tab name

Share the sheet with the service account email as Editor.

## Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |

## Project Structure

```text
/
├── public/              # Static assets, favicons, sitemap
├── src/
│   ├── assets/          # Screenshots and brand assets
│   ├── components/      # ContactForm, SiteFooter, LegalPage
│   ├── content/legal/   # Privacy and terms HTML bodies
│   ├── layouts/         # Shared page layout
│   ├── lib/             # Contact validation, Google Sheets, env
│   ├── pages/           # Routes plus /api/contact
│   └── styles/          # Global and legal page CSS
├── .env.example
├── design.md            # Brand and design tokens
└── development.md       # Build brief for assisted development
```

## Deployment

Configured for [Vercel](https://vercel.com) via `@astrojs/vercel`. Push to the connected repo or run `vercel` from the project root. Set environment variables in the Vercel dashboard before deploying.

Production site: **https://www.sportykore.com**

## Contact Form

Submissions include name, email, phone normalized to E.164, role, and message. Successful submissions redirect to `/thanks`. The older public form endpoint remains as a server-side alias for compatibility, but the site should only link to `/api/contact`.
