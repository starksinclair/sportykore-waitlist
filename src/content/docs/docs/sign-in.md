---
title: Sign in with email code
description: Sign in, sign up, recover access, log out, or delete your account.
---

This page helps you get into Sportykore with an email code instead of a password.

## Before you start

- Have access to the email address for your Sportykore account.
- New users need to enter a name during signup.
- A recovery email only helps if it was added during signup.

## Steps

1. Open the login screen.
2. Enter your email address.
3. If the email is new, enter your name and optional recovery email.
4. Check your email for the 6-digit code.
5. Enter the code in the app.
6. Continue into Sportykore.

<!-- SCREENSHOT: login email screen and OTP screen -->

## Recover access

1. Open the forgot or recovery screen.
2. Enter your recovery email.
3. Check the primary account email for the OTP.
4. Enter the primary email and OTP on the OTP screen.

<!-- TODO: The reference says recovery email is collected at signup, but no mobile edit flow was found. Add update steps only after the app supports them. -->

## Log out

1. Open **Profile**.
2. Choose **Log out**.
3. Confirm.

## Delete your account

1. Open **Profile**.
2. Choose **Delete account**.
3. Confirm the destructive action.

## Rules & good to know

- OTP codes expire after 10 minutes.
- Requesting a new OTP marks old unused codes for that email as used.
- The app stores a bearer token for 30 days after successful sign-in.
- Logout invalidates the current token and clears local auth/query data.
- Account deletion removes the user, player profile, OTP rows, and invited-user references on invites.
- Sportykore does not use passwords.

## Related pages

- [Getting started](/docs/getting-started/)
- [Teams, rosters, and invites](/docs/teams-rosters-invites/)

