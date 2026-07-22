# Pebble App Configuration Hosting

This repository is the canonical GitHub Pages host for configuration pages used by Lyle Morris's Pebble apps.

GitHub Pages must remain enabled from the `main` branch root.

## Directory structure

```text
Hosting/
├── .nojekyll
├── README.md
├── index.html
├── app-config.html
├── qa/
│   └── app-config.html
└── apps/
    ├── index.html
    ├── essential-redux/
    │   ├── prod/
    │   │   └── app-config.html
    │   ├── qa/
    │   │   └── app-config.html
    │   └── releases/
    │       └── 1.6.0/
    │           └── app-config.html
    └── daypal/
        ├── prod/
        │   └── app-config.html
        ├── qa/
        │   └── app-config.html
        └── releases/
            └── 1.6.0/
                └── app-config.html
```

## Current URLs

| App | Environment | URL |
| --- | --- | --- |
| Essential Redux | Legacy production | `https://lyle-morris.github.io/Hosting/app-config.html` |
| Essential Redux | Production | `https://lyle-morris.github.io/Hosting/apps/essential-redux/prod/app-config.html` |
| Essential Redux | QA | `https://lyle-morris.github.io/Hosting/apps/essential-redux/qa/app-config.html` |
| DayPal | Production | `https://lyle-morris.github.io/Hosting/apps/daypal/prod/app-config.html` |
| DayPal | QA | `https://lyle-morris.github.io/Hosting/apps/daypal/qa/app-config.html` |
| App directory | Production and QA links | `https://lyle-morris.github.io/Hosting/apps/` |

## Compatibility rules

- Do not remove or repurpose root `app-config.html`; published Essential Redux builds use it.
- Keep root `qa/app-config.html` available until no test build references it.
- Keep `DayPal-Hosting` online while published DayPal builds use that repository.
- Redirects must preserve both `location.search` and `location.hash`, because Pebble settings and responses can use them.
- Configuration pages should remain self-contained unless shared assets are explicitly versioned.
- Browser storage keys must be namespaced by app and environment. All project sites under `lyle-morris.github.io` share one browser origin.

## Environment workflow

1. Develop and test changes in `apps/<app>/qa/app-config.html`.
2. Validate the page in a browser and through the Pebble mobile app.
3. Copy the tested file unchanged into `apps/<app>/releases/<version>/app-config.html`.
4. Promote the same tested contents into `apps/<app>/prod/app-config.html`.
5. Update the companion cache label when publishing a watch app release.
6. Never edit an existing release snapshot; create a new version directory.
7. Roll back production by restoring a known release snapshot.

## Release snapshots

Release directories are immutable records of the configuration shipped with a watch app version. Production remains a stable URL so a hosted-page fix can be promoted without reorganizing the repository.

## Migration status

- Essential Redux 1.6.0 continues to use root `app-config.html`.
- The canonical Essential Redux production, QA, and 1.6.0 snapshot paths are available under `apps/essential-redux/`.
- Published DayPal builds continue to use `DayPal-Hosting`.
- The canonical DayPal production, QA, and 1.6.0 snapshot paths are available under `apps/daypal/`.
- A future watch app release can move each companion's `CONFIG_URL` to its canonical production path.
