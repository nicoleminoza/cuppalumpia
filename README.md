# Cuppa Lumpia — Landing Page

Single-page site for Cuppa Lumpia, a small-batch Filipino farm stand on
Bainbridge Island.

Both HTML files are **self-contained single files** — every script, font, and
style is inlined. Just double-click `index.html` to open it locally (works on
`file://`), or drop the folder on any static host / GitHub Pages.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The landing page. Open this. |
| `Cuppa Lumpia - Three Directions.html` | Side-by-side compare of the three color moods (Optic White / Ink Gallery / Kraft Market). |

## Notable behavior

- **Live status** — reads the device clock. Before the launch
  (June 27, 2026, 11:00 AM) the header/hero/stand show "Opening June 27"; on
  launch day it switches automatically to the weekend 11–2 open / sold-out logic.
- **Reservations** — fresh-fried (Half/Full Dozen + Pinoy Palmer) is weekend
  pickup only, 11:00–1:30; the Frozen Dozen ($20) can be picked up any day with
  the time confirmed by email. Catering is an email link
  (catering@cuppalumpia.com). Mock only — no backend; the form shows a success
  screen and collects payment at the stand.
- **Tweaks panel** — toggle in the toolbar to flip Background (Optic / Ink /
  Kraft), Accent, Display font, Whitespace, and the hero tagline live.
- **Directions** — `index.html?dir=white|ink|kraft` presets the theme; the
  Three Directions page uses this to render all three at once.

## Brand tokens

Ink `#161310` · Cream/paper `#F4EFE3` · Kraft `#B07A4A` · Banana-leaf green
`#3C5A34` · Mango `#E7A11D` · Rust `#A8431F`.
Type: Alfa Slab One (display), Yellowtail (script), Oswald (labels), Lora (body).

## Editing

These are compiled builds. The editable React/JSX source lives in the working
design project (`cl-*.jsx`, `tweaks-panel.jsx`, `design-canvas.jsx` + the
un-bundled HTML shell); edit there and re-export to refresh these files.
