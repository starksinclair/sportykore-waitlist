---
title: Maintaining these docs
description: Keep Sportykore docs in sync with the product reference.
---

These docs are generated from the Sportykore product reference. Treat that reference as the only source of product truth.

## Update process

1. Open the latest `SPORTYKORE_PRODUCT_REFERENCE.md`.
2. Read it fully before editing docs.
3. Build a list of sections tagged `[LIVE]`.
4. Document only `[LIVE]` features.
5. Mention `[BACKEND-ONLY]` only when it genuinely helps an organizer, and clearly say there is no mobile UI if that is true.
6. Do not write how-to content for `[SCHEMA-READY]` or planned items.
7. Add or update pages under `src/content/docs/docs`.
8. Update the Starlight sidebar in `astro.config.mjs` when pages are added, removed, or renamed.
9. Leave an HTML `TODO` comment where the reference is ambiguous or silent.
10. Use screenshot placeholders such as `<!-- SCREENSHOT: match center, live scoring -->` until real product screenshots are available.
11. Run the site build and visually check `/docs` at mobile and desktop widths.

## Writing rules

- Write for league organizers and players.
- Use short sentences and concrete app actions.
- Start how-to pages with a one-line summary.
- Include **Before you start**, **Steps**, **Rules & good to know**, and **Related pages** where relevant.
- Do not inspect the API or infer behavior from code while updating docs. The product reference is the boundary.
- Keep planned features on the limits/roadmap page as coming soon only.

## Brand rules

- Reuse Sportykore tokens from `src/styles/global.css`.
- Use Pacifico only for the wordmark.
- Use Playfair Display for headings and Open Sans for body/UI.
- Keep Score Gold `#E6A817` for identity/highlights.
- Keep CTA Gold `#F2A900` for buttons only.

## Related pages

- [Documentation home](/docs/)
- [Limits and roadmap](/docs/limits-roadmap/)

