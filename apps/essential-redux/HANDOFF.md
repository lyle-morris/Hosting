# Essential Redux Hosted Configuration Handoff

**Status:** 2.0.0 release-candidate QA  
**Prepared:** 2026-08-01

## Environments

| Environment | Path | Current instruction |
|---|---|---|
| QA | `apps/essential-redux/qa/app-config.html` | Active 2.0.0 testing surface; current cache label `qa-v9` |
| Versioned release | `apps/essential-redux/releases/2.0.0/app-config.html` | Do not create or update until QA readiness is declared |
| Production | `apps/essential-redux/prod/app-config.html` | Do not modify until the release copy is verified |

Keep QA, versioned release, and production promotion as separate operations. Never use a QA edit as an implicit production promotion.

## Current QA behavior

The configuration is self-contained and compatible with Pebble's embedded webview. It supports:

- two- and three-slot layouts;
- preset themes and custom theme ID 8;
- separate background, time box, border, time text, and three saved information colors;
- 30 Latin-script language choices with English first/default;
- optional manual location by country, ZIP/postal code, or city;
- leading zero, 12/24-hour display, Celsius, Bluetooth, and battery-indicator settings.

In two-slot mode the visible custom controls are Information 1 and Information 2. The second visible control maps to the right/configured Slot 3 color. Hiding the middle slot must not erase its saved color.

Custom icon selection remains automatic for 2.0.0. It must be based on the effective slot text color only; borders and other theme fields must not alter icon polarity.

## Defaults and reset behavior

New settings and **Reset layout** use:

- Blue theme;
- Calendar on the left and Weather on the right;
- two slots;
- leading zero enabled;
- 12-hour format;
- Celsius disabled;
- Bluetooth disabled;
- battery indicator disabled;
- English.

Resetting should produce these values consistently in the form and in the saved response.

## Manual location contract

- Country uses the same native select styling/caret as the other dropdowns.
- The default country value is empty and displays **Select a country**.
- ZIP/postal code and City use an inline × button that appears only when the field contains text.
- The last location field actively edited by the user wins when **Save settings** is pressed:
  - choosing a country clears ZIP/postal code, City, validation text, and resolved-location state while preserving the selected country;
  - entering ZIP/postal code clears Country and City;
  - entering City clears Country and ZIP/postal code.
- These edits update settings only on **Save settings**, not immediately.
- Switching location methods must not show a stale validation error.

## Response contract

Return an encoded JSON payload using:

`pebblejs://close#<encoded-json>`

The companion parser must split at the first `#` only. Hex colors contain `#` characters and previously exposed a parser bug when the complete response was split indiscriminately.

Key settings include:

- `themeMode`, `theme`, and custom color fields;
- `leftMetric`, `middleMetric`, `rightMetric`, `showMiddleSlot`, and `slotCount`;
- `language`;
- `manualLocation`, `manualCountry`, `manualPostalCode`, and `manualCity`;
- `hour24`, `showLeadingZero`, `celsius`, `showBluetooth`, and `showBatteryIndicator`.

The watch AppMessage schema is owned by the watch repository. For 2.0.0, keys 18–24 are custom colors, 15 is the middle metric, 16 controls the middle slot, and 17 controls Bluetooth.

## Language set

The 2.0.0 set is English plus 29 additional Latin-script languages. English is first and the default. Automatic remains available. Bosnian and Maltese must be labeled **Bosnian (BS)** and **Maltese (MT)**.

Languages requiring unverified symbol/font coverage are deferred to a later release.

## Promotion procedure

Only after QA readiness is explicitly declared:

1. Freeze the QA file and record its checksum.
2. Copy the exact reviewed content to `releases/2.0.0/app-config.html`.
3. Verify the versioned file byte-for-byte or by SHA-256 against the QA source.
4. Copy the same reviewed content to `prod/app-config.html`.
5. Verify all intended copies and URLs in the embedded Pebble webview.
6. Replace QA-only cache labeling with the approved production cache/version convention.
7. Update documentation with the three checksums and promotion commit.

Do not change the watch `appinfo.json` published version from 1.3.0 until QA readiness and the publishing step are explicitly approved.

## Rollback

If production validation fails, restore the previous production file from its known commit, verify the production URL in the embedded webview, and leave the failed candidate in the versioned release directory for diagnosis. Do not overwrite historical versioned releases.

## Remaining release gates

- Observe an automatic quarter-hour weather refresh without reopening configuration.
- Complete final physical-watch review as available.
- Confirm hosted QA and the final watch build are from the intended commits.
- Receive explicit approval before release/prod promotion or published-version change.

Do not describe emulator/Figma layout approval as physical Pebble Time 2 approval.
