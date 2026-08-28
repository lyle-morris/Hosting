# Redux app-config v11 QA

Source of truth: Figma file `xzRHQ8LtcLqtyn7TW0x9J5`, node `2036:14801`.

v11 restores the current Figma structure:

- Information first, then General settings, Theme, Manual location, Language, Analytics, Support.
- Information contains separate `Vertical layout` and `3 informational slots` switches.
- `Reset layout` is inside Information and only resets layout/metric selection.
- Theme and Custom panels include `Reset theme`.
- The fixed footer contains only `Save settings`.
- Theme button typography and page title sizing are aligned with the current Figma frame.
- Existing settings serialization, location, language, and custom-color logic continue to come from `app-config.html` while QA continues.
