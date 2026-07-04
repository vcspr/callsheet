# PITCHBLACK

**ONE JSON. EIGHT PAGES. A TREATMENT THAT LANDS ON THE TABLE LIKE IT MEANS IT.**

[![License: MIT](https://img.shields.io/badge/MIT-000000.svg?label=license)](LICENSE)
[![Node >= 18](https://img.shields.io/badge/node-%3E%3D18-FFE600.svg)](pitchblack.mjs)

![Deck flip](media/deckflip.gif)

---

## 01 / THE PITCH

Music video and commercial treatments are design documents with a 60-second
attention window, and most of them are built at 2am in software that fights
back. pitchblack renders the whole deck from one flat JSON file: landscape
Letter, flood color, 900-weight caps, ink-fill spreads. Fill in the tokens,
get a PDF you can send before the reference tracks stop playing.

## 02 / THE LOOK

![All eight pages](media/pages.png)

Cover · Contents · Manifesto · Values · Concept split · Shorts board ·
Attitude · End card. The manifesto and attitude pages invert to ink. The
shorts board takes three reference images and gives each a cut number and a
one-line shot recipe.

## 03 / RUN IT

```bash
git clone https://github.com/vcspr/pitchblack && cd pitchblack
npm install && npx playwright install chromium

node pitchblack.mjs example/treatment.json
open out/treatment.pdf
```

Then copy `example/treatment.json`, replace the fiction with your project, and
drop your reference frames into a `refs/` folder next to it. Every value is a
flat string. No nesting, no schema to learn.

## 04 / THE SYSTEM

The skin is one HTML file with `{{TOKENS}}`. The renderer replaces every token
from your JSON, copies `refs/` beside the output, and prints through headless
Chromium so the PDF is exactly what the CSS says. Tokens you skip are warned
about and blanked, never invented.

| Token group | Drives |
|---|---|
| `PAPER_HEX` `INK_HEX` `ACCENT_HEX` | The whole palette. Two hex codes change the deck's mood. |
| `ARTIST_L1/L2` `PROJECT_TITLE` `DIRECTOR_NAME` `CONTACT` `STUDIO` | Cover and end card |
| `MANIFESTO_*` `ATTITUDE_*` | The two ink-fill statement spreads, three lines each |
| `VALUE_01..05` | The values ledger |
| `CONCEPT_A_*` `CONCEPT_B_*` | The split spread: two directions, side by side |
| `S1..S3 _REF/_LABEL/_ID/_TAG` | The shorts board image slots |

## 05 / MAKE IT YOURS

![Drench and blackout palettes](media/skins.png)

Same JSON, two hex codes apart. `#FFE600` on black is the drench look;
`#0E0E0E` paper with `#F4F4F4` ink is the blackout. Skins live in `skins/` as
plain HTML; copy `drench.html`, change the bones, and pass `--skin yours`.

The example refs are hand-built SVG frames, so the repo ships zero
photography and clones with nothing to license.

## 06 / END CARD

Coming attractions: a storyboard skin (6-up grid pages), a schedule/budget
page, and a 16:9 variant for screeners.

[MIT](LICENSE) © 2026 Victor Uwakwe

**QUESTIONS? COMMENTS? CONCERNS?**
