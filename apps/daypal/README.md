# DayPal Hosting

This directory is the consolidated hosting environment for DayPal configuration pages.

## Environment roles

### Stable production copy

`apps/daypal/prod/app-config.html`

This is the consolidated stable production copy. At the August 29, 2026 audit its blob SHA was:

`07d5f06a9530bf5043511cde6126fd32fd92b5b2`

The legacy `lyle-morris/DayPal-Hosting` live `app-config.html` currently has the same blob. Existing DayPal 1.6.x installations may still open the legacy URL directly, so the legacy repository must remain online.

### DayPal 2.0 QA

`apps/daypal/qa/app-config.html`

This is the active DayPal 2.0 development/QA page. It is **not production**.

At the August 29 audit, it was byte-identical to the app repository's checked-in QA source:

- `lyle-morris/DayPal` → `app-config/index.html`
- `lyle-morris/Hosting` → `apps/daypal/qa/app-config.html`
- Blob SHA: `dc6c4e1981ef63fdbb6b3bb2646d24b91062a0f2`

If either copy changes intentionally, re-establish and document which file is authoritative before QA continues.

### Immutable release snapshots

`apps/daypal/releases/<version>/app-config.html`

Current snapshots:

- `1.6.0`
- `1.6.1`

There is currently **no `2.0.0` snapshot**. Do not create one until the DayPal 2.0 QA release gate passes.

## DayPal 2.0 promotion contract

DayPal 2.0 currently remains on `lyle-morris/DayPal` branch `daypal-2.0.0-dev` and its companion opens this QA environment.

Before promotion:

1. Complete all watchface/companion/app-config blockers in `DayPal/docs/2.0.0/DayPal-Handoff-2.0.0.md`.
2. Complete formal browser, Pebble WebView, functional, migration, Analytics/privacy, and native visual QA.
3. Freeze the exact approved QA `app-config.html` bytes.
4. Copy those exact bytes to `apps/daypal/releases/2.0.0/app-config.html`.
5. Copy the same exact bytes to `apps/daypal/prod/app-config.html`.
6. Verify QA/release/prod blob SHAs match at the promotion point.
7. Switch the DayPal companion from QA to production with a fresh production cache token.
8. Build a fresh Emery PBW and complete physical Pebble Time 2 signoff.
9. Do not edit the immutable `releases/2.0.0` snapshot after release.

## Current 2.0 blockers relevant to hosting

The QA page is not ready to be promoted because the overall 2.0 application still has unresolved release contracts, including:

- QA-only three-slot forcing on the watch.
- No real persisted 3/4-slot layout key.
- Hidden Slot 4 persistence bug across Save/reopen.
- Unfrozen fresh-install/Reset Layout defaults.
- Unfinished Sleep/Activity Time/Distance runtime data.
- Placeholder Language and Country controls.
- Analytics not yet implemented as real GA4 telemetry.
- Weather refresh/retry contract incomplete.
- App/package version still 1.6.0.
- Companion intentionally still points to QA.
- Formal visual/device signoff incomplete.

Do not use a Hosting-only change to work around an application-side release blocker. Fix the owning layer and retest the full round trip.

## Legacy compatibility host

Repository: `lyle-morris/DayPal-Hosting`

Published compatibility URL:

`https://lyle-morris.github.io/DayPal-Hosting/app-config.html`

The current stable DayPal companion on `main` still opens that URL. Do not remove, rename, or redirect it without first proving all installed versions that need it can safely follow the change.

New DayPal 2.0 development belongs here in consolidated Hosting, not in the legacy repository.

## Release safety checklist

Before changing `prod`:

- Confirm which DayPal PBW/version will consume the URL.
- Confirm the AppMessage/settings schema matches the page being promoted.
- Confirm cache behavior with the Pebble mobile WebView.
- Verify the production file came from the exact approved QA bytes.
- Preserve legacy endpoints used by older builds.
- Record blob SHAs in the DayPal release handoff/QA record.
