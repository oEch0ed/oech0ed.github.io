# Design

Dark studio portfolio after the pinned "AV" reference: giant condensed silver name, lit cut-out portrait, hairline panels, one cold accent.

## Color

| Token | Value | Use |
|---|---|---|
| `--ground` | #0d0e10 | page background |
| `--ground-2` | #131518 | research band, card art ground, tool chips |
| `--panel` | #16181c | panels, cards, transcript semesters |
| `--line` / `--line-soft` | #2a2d33 / #1f2226 | 1px borders and row dividers |
| `--ink` / `--ink-2` / `--ink-3` | #e8eaee / #a9aeb7 / #868c96 | text: primary, secondary, tertiary |
| `--steel` / `--steel-dim` | #a9c4e4 / #5d7593 | the only accent: grades, meta lines, chart curve |
| `--spot` | #3a4351 | radial spotlight behind the portrait |

Strategy: restrained. Steel-blue is reserved for grades, data and meta; never decoration.

## Type

- Display: Big Shoulders Display 800/900, uppercase, line-height ~.8–1. Hero name `clamp(6.5rem, 17.5vw, 15.5rem)`; section titles `clamp(2.8rem, 6vw, 4.6rem)`.
- Body: Hanken Grotesk 400/500/600, 1rem/1.6.
- Data: Azeret Mono, only for grades, credits and averages (tabular numerals).
- Labels: body face .7–.8rem, uppercase, letter-spacing .1–.14em.

## Shape and depth

- Radius 14px on panels and cards; pills (99px) for buttons and the segmented control.
- Elevation is a 1px `--line` border; the stats panel alone adds a soft offset shadow.

## Components

- `.pill--light` primary, `.pill--ghost` secondary, `.textlink` tertiary.
- `.card`: authored SVG art (diagram or real data) on top, display title, steel meta line, dash-bulleted points.
- `.sem` / `.row`: transcript rows with credits, an 80–100 scaled bar and the grade; pass and in-progress rows use uppercase labels instead of numbers.
- `.seg`: segmented toggle (`aria-pressed`); also used as the project tablist in "Inside the code".
- `.snip` / `.code`: real code excerpts with a file + line-range caption, Prism highlighting themed from the palette (keywords steel, strings sage, numbers sand), ligatures off so code reads literally.

## Motion

One authored moment: hero name lines rise from a clip and the portrait develops from blur on load; grade bars draw in once per semester on first view. All disabled under `prefers-reduced-motion`.

## Layout

Max width 1240px, gutter `clamp(16px, 4vw, 48px)`. Breakpoints 1080 / 860 / 720px. On ≤720px the portrait drops below the name; the name and face never overlap.

## Assets

- `assets/portrait.png`: Apple Vision foreground cut-out of `~/Downloads/Screenshot 2026-11-18 at 14.49.33.png` (user-supplied photo), resized to 1000px.
- Double-descent chart: NumPy simulation (min-norm least squares on Gaussian features, n = 60), labelled on the page.
