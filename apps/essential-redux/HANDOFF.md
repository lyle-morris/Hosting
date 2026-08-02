# Essential Redux Hosted Configuration Handoff

**Status:** 2.0.0 promoted and archived  \
**Closed:** 2026-08-02  \
**Watch source:** `lyle-morris/Essential-Redux` commit `f51547e17f7d0615384ddb2c02a8d021053b120a`

## Environments

| Environment | Path | 2.0.0 state |
|---|---|---|
| QA | `apps/essential-redux/qa/app-config.html` | Reviewed source retained for future comparison |
| Versioned release | `apps/essential-redux/releases/2.0.0/app-config.html` | Immutable 2.0.0 snapshot |
| Production | `apps/essential-redux/prod/app-config.html` | Active production configuration |

All three 2.0.0 HTML files share blob SHA:

`b89c153c032bcdd89bdd476ec7951c4563a5fbcf`

Production promotion commit: `82c60b7f25013360a5028e718651e13e108ff321`  
Immutable snapshot commit: `287a213273035b615d50f56205a520231860cd27`

The watch companion uses production with cache label `release-2.0.0-prod-v1`.

## Released behavior

The configuration supports:

- two- and three-slot layouts;
- eight preset themes and Custom theme ID 8;
- background, time-box, border, time-text, and three saved information colors;
- 30 Latin-script languages with English first/default;
- automatic or manual location by country, ZIP/postal code, or city;
- leading zero, 12/24-hour display, Celsius, Bluetooth, and battery-indicator settings.

In two-slot mode, Custom displays Information 1 and Information 2. The second visible control maps to the right/configured Slot 3 color, and hiding the middle slot preserves its saved color.

Custom icon selection is automatic and depends only on the effective slot-text color. Borders and unrelated colors do not alter icon polarity.

## Defaults and reset

New settings and **Reset layout** use:

- Blue theme.
- Calendar left and Weather right.
- Two slots.
- Leading zero on.
- 12-hour format.
- Celsius off.
- Bluetooth off.
- Battery indicator off.
- English.
- Automatic location.

## Manual location contract

- Country uses the standard select styling and begins at **Select a country**.
- ZIP/postal code and City use inline × controls.
- The last location field edited wins when **Save settings** is pressed.
- Choosing Country clears ZIP/postal code and City while preserving Country.
- Entering ZIP/postal code clears Country and City.
- Entering City clears Country and ZIP/postal code.
- Competing fields and stale validation reset only at save-time precedence.
- Inputs do not commit automatically.

## Response contract

Return encoded JSON using:

`pebblejs://close#<encoded-json>`

The companion parser must split only at the response-prefix hash. Encoded settings can contain `#hex` colors.

The watch AppMessage schema is owned by the watch repository. For 2.0.0:

- key 15: middle metric;
- key 16: middle-slot visibility;
- key 17: Bluetooth;
- keys 18–24: Custom colors;
- key 25: weather request;
- key 26: companion ready;
- key 27: weather updated timestamp.

## Environment isolation note

The HTML is identical across QA, release, and production. Its seven preview images first load from each page’s relative `./images/` path and currently fall back to the QA image directory. This does not affect settings collection or the watch payload, but future Hosting maintenance should copy/version the image bundle per environment and remove cross-environment fallback dependence.

## Future promotion procedure

1. Develop in the app-specific QA path.
2. Validate in browser, Pebble embedded webview, watch runtime, and target hardware as available.
3. Freeze and checksum the QA candidate.
4. Copy the exact HTML to a new immutable version directory.
5. Copy the same HTML to production.
6. Verify QA, release, and production checksums.
7. Update the companion production cache label.
8. Update both repositories’ release documentation.

Never overwrite an existing immutable release snapshot.

## Rollback

If production validation fails, restore the previous known production file, verify the production URL in the embedded webview, and retain the failed candidate separately for diagnosis.

Emulator/Figma approval must never be described as physical Pebble Time 2 approval without explicit physical evidence.
