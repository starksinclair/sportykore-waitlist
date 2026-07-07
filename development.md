# Cursor AI briefing — Sportykore waitlist (premium direction)

Use this file **with** [`design.md`](./design.md). The brand guide is the source of truth for tokens; **this** file is what you copy into Cursor so the output stays restrained, editorial, and on-brand.

---

## How to use in Cursor

1. **@ mention** `design.md` in your chat.
2. **@ mention** this file after you’ve filled the bracketed sections below (or paste those blocks inline).
3. Add **3–8 reference URLs** or attach screenshots in the chat if you have them.
4. State your **stack** (Next.js, Astro, vanilla, etc.) once; don’t assume Cursor knows.

Optional one-liner prompt pattern:

> Build a single-page waitlist for Sportykore using @design.md and my filled @development.md. Follow the “Do not” list. Mobile-first, accessible contrast, one primary CTA.

---

## 1. Goal & success

**Primary goal:** `[e.g. collect emails for App Store launch / notify when Android drops / invite competition admins first]`

**Success metric:** `[e.g. submit rate, qualitative feedback, influencer shares]`

**Launch scope:** `page + thanks`

---

## 2. Audience

**Who lands here:** `[fans / competition organizers / both — be specific]`

**Primary geography:** `[e.g. Nigeria first, West Africa, global]`

**Languages:** `[e.g. English (UK) only for v1]`

---

## 3. Hero & copy (fill before build)

**Chosen slogan line (one):**  
`[Paste one line from the brand guide table or your final line]`

**Headline (≤8 words if possible):**  
`[Your headline]`

**Subhead (1–2 sentences, specific):**  
`[Your subhead — avoid “revolutionary platform”]`

**Primary CTA label:** `[e.g. Join the waitlist]`  
**Secondary CTA (optional):** `[e.g. Watch a 30s clip — link TBD]`

**Micro-trust line (optional, only if honest):**  
`[e.g. Built with local organizers in Lagos / In private beta with N competitions]`

---

## 4. Value props (exactly 3 bullets)

Keep them **concrete** (what the user gets), not feature soup.

1. `Connect with local competitions, track live matches, and dive into broadcast-level stats.`
2. `See clear stats built for organizers and fans.`
3. `Join the waitlist to be the first to know when the app launches.`

---

## 5. Form & backend

**Fields:** `[name + email or phone number / + role dropdown: fan | organizer | player | coach | other]`

**Submit behaviour:** `redirect to thank-you`

**Integrations:** `Google Sheets`

---

## 6. Tech stack (pick and state)

**Framework:** `Astro`

**Styling:** `Tailwind`

**Hosting:** `Vercel`

**Analytics:** `Vercel Analytics`

**Domain:** `waitlist.sportykore.com`

**DB:** `Google Sheets`

---

## 7. Assets

/_ export const fonts = {
brand: "Pacifico_400Regular",
body: "OpenSans_400Regular",
bodySemibold: "OpenSans_600SemiBold",
bodyBold: "OpenSans_700Bold",
display: "PlayfairDisplay_400Regular",
displayBold: "PlayfairDisplay_700Bold",
} _/
**Logo:** `use Sportykore text in the Pacifico font`

**Hero image:** `a photo of a local football match`

**OG image:** `[1200×630 — use brand purple + gold wordmark or hero still]`

**Favicon:** `a purple and gold icon`

**app screenshot:** `a photo of the app`

---

## 8. Reference sites (premium bar)

1. `https://www.superhuman.com/` — Borrow the sparse premium hero, tight copy hierarchy, and controlled reveal of signup/onboarding steps. [web:11]
2. `https://www.robinhood.com/` — Borrow the ultra-simple waitlist capture flow and referral-style momentum that makes joining feel competitive and shareable. [web:21][web:27]
3. `https://www.hey.com/` — Borrow the opinionated editorial copy style, strong typographic rhythm, and confident page pacing. [web:23]
4. `https://www.stripe.com/` — Borrow the crisp section hierarchy, clean product storytelling, and subtle motion that helps dense content still feel premium. [web:8]
5. `https://www.notion.com/` — Borrow the calm whitespace, product-first layout, and restrained interface framing that keeps the page modern and credible. [web:8][web:12]
6. `https://www.clubhouse.com/` — Borrow the invite-only framing and community-access feel so the waitlist feels like entry into a live network. [web:25]
7. `https://www.linear.app/` — Borrow the precision in typography, restrained motion, and serious product polish that makes a simple page feel high-end. [web:9]
8. `https://www.vercel.com/` — Borrow the premium dark-surface composition, clean technical layout, and subtle scroll motion for a sharper modern feel. [web:9]

---

## 9. “Premium” direction (non-negotiables)

Tell Cursor to treat these as requirements:

- **Editorial restraint:** one hero, strong type hierarchy, generous whitespace, no “five equal cards in a row” unless justified.
- **Typography:** follow the brand guide (Open Sans body; Pacifico **only** for the wordmark if used; Playfair optional sparingly).
- **Color:** purple + gold system from the brand guide; dark sections may use `#121212` and stripe pattern from the guide.
- **Motion:** subtle fades / small parallax max — no flashy autoplay gimmicks.
- **Accessibility:** visible focus rings, semantic headings (`h1` once), WCAG-ish contrast on buttons and links.
- **Performance:** optimize hero image (responsive `srcset`, modern format), lazy below fold.

---

## 10. Do not (anti-patterns)

Customize this list — it stops “generic SaaS landing page” drift.

- `[ ] No Inter / Roboto / system-font-only stack unless you explicitly choose it`
- `[ ] No rainbow gradients unrelated to Sportykore palette`
- `[ ] No fake metrics (“10,000+ users”) unless verified`
- `[ ] No wall of emoji icons`
- `[ ] No lorem ipsum — use plausible placeholder copy if needed`

---

## 11. FAQs (optional block)

Paste 4–6 real questions **or** ask Cursor to draft from product facts and tag `[REVIEW]` for you.

---

## 12. Post-build QA (ask Cursor to self-check)

- [ ] Lighthouse: performance / accessibility sanity (no obsession, no lying scores)
- [ ] Mobile viewport: tap targets, no horizontal scroll
- [ ] Form: empty state, error state, loading state, success state
- [ ] Meta: title, description, OG tags, favicon link

---

_Companion to `design.md` — edit the bracketed fields per launch._
