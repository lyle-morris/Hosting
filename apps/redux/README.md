# Redux production app-config

Current production release: **Redux 2.1.2**

This directory is the production configuration environment for the Redux Pebble Time 2 watchface.

## Production files

- `app-config-2.1.2.html` — versioned entrypoint opened by the installed 2.1.2 companion
- `app-config.html` — production loader
- `app-config-base.html` — frozen production base UI
- `app-config-patch.js` — production UI/behavior patch
- `app-config-analytics.js` — GA4 runtime
- `app-config-i18n-source.html` — frozen localization source
- `images/` — production app-config images

Current production build token at closeout:

`redux-2.1.2-prod-20260829h`

## Rules

1. Production must not execute UI assets directly from `apps/redux/qa/`.
2. Do not point production localization back to Essential Redux QA.
3. Increment the production build token when changing runtime HTML/JS so Pebble's embedded WebView receives a new cache key.
4. Keep the versioned entrypoint stable for installed 2.1.2 companions unless a replacement PBW updates the companion URL.
5. Hosted config-only fixes do not require a new PBW if the existing companion contract remains compatible.

## Analytics

GA4 Measurement ID: `G-37VYMTXT5S`

Production Analytics tracks config/settings usage, layout changes, preset/Custom theme use, and actual Custom-theme Pebble color values when anonymous Analytics is enabled.

## 2.1.2 hosted hotfixes

The production environment includes fixes for:

- Pebble WebView stale-cache behavior
- Production/QA isolation
- Redux-owned localization
- GA4 runtime restoration
- Theme usage + Custom color Analytics
- Custom-theme state rehydration so Time box and slot text colors are not reset when the user changes an unrelated setting

The last issue was fixed by rehydrating flattened companion color fields into the active `customTheme` orientation before base normalization/render/save.

## Technical debt

`app-config.html` still performs compatibility rewrites/interception against the frozen base for historical QA/Essential Redux references. This is intentional for 2.1.2, but the next substantial app-config revision should replace the compatibility layer with a clean production source that directly owns all final paths and normalization logic.

Full watchface release handoff:

`lyle-morris/Redux/docs/release-2.1.2-handoff.md`
