Profile structure
-----------------

Each professional profile lives under `src/profiles/<slug>/` and should include at least a `config.json` with the following fields:

- `slug`: folder slug (matches URL)
- `profesionalId`: unique id used by EG-HEALTH widget
- `name`: display name
- `heroImage`: path to the hero image (should be placed in `public/profesionales/<slug>/`)
- `location`: human readable location
- `virtual`: boolean — whether virtual attention is available
- `theme` (optional): `{ "accent": "#hex" }` for per-profile accent color

Optional files:
- `overrides.css`: per-profile CSS loaded by profile page when present
- `assets/`: images or other assets used by this profile

Workflow to add a profile
1. Create `src/profiles/<new-slug>/config.json` and add assets to `public/profesionales/<new-slug>/`.
2. Open a branch and PR; CI will deploy the site on merge.
