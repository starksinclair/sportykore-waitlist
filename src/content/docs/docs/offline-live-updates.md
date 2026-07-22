---
title: Offline and live updates
description: Understand cached browsing, connection limits, and live match refreshes.
---

This page explains what Sportykore can still show on patchy data and what needs a connection.

## Before you start

- Browse important pages while online if you may need them later.
- Do not plan to score a whole match offline.

## Use cached browsing

1. Open leagues, matches, teams, or players while online.
2. Later, open the app with limited or no connection.
3. Recently loaded data may still be visible.

## Follow live updates

1. Open a match, league, or match center screen.
2. Keep the screen open while the match is active.
3. Sportykore listens for game updates and refreshes affected views.

<!-- SCREENSHOT: public match page receiving live score update -->

## Rules & good to know

- The app persists read data through TanStack Query.
- Cached data is kept for up to 24 hours.
- Default stale time is 5 minutes.
- Reads may use cached data when offline.
- This is not full offline write/sync.
- Creating leagues, scoring games, recording stats, and editing rosters call the API directly and require connectivity.
- Backend game updates are broadcast through server-sent events.
- Match Center applies local patches for score/status and invalidates public live queries.

## Related pages

- [Fixtures and live match day](/docs/fixtures-match-day/)
- [Public discovery](/docs/public-discovery/)
- [Limits and roadmap](/docs/limits-roadmap/)

