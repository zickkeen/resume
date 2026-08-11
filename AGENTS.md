# AGENTS.md

Personal bilingual (Indonesian default / English) portfolio + printable resume for Muhamad Tuhfatur Roziqin. Static Jekyll 4 site, Tailwind via CDN script (no CSS build step), deployed at `about.fatur.my.id` (CNAME).

## Commands

```sh
jekyll build        # renders to _site/ (gitignored)
jekyll serve        # dev server, watch mode
```

No Gemfile / plugins; use the system Jekyll. Pages carry no YAML front matter beyond what's below.

## Routing & structure

- `home.html` (`permalink: /`) meta-refresh + JS language sniff → `/id/` or `/en/`.
- Each of `id/` and `en/` contains `index.html` (journey, `layout: journey`) and `resume/index.html` (printable resume, `layout: resume`). Pages set `layout` and `lang` in front matter; `_config.yml` sets a global `layout: null` default, so every page **must** declare its layout.
- Lang switching is client-side: `assets/js/index.js` (journey, preserves `#section-N`), `assets/js/resume.js` (resume, preserves scroll ratio).

## Where content lives

- **Journey page**: `_data/journey/sections/NN.yml`. Each file has `order`, `title` (per-lang), and full HTML blocks under both `id:` and `en:` (YAML `|` scalars). Ordering comes from `| sort` on the hash key = **zero-padded filename stem** (`00`, `01`, …), NOT the `order` field; `order` only drives dot-nav `scrollToSection(N)`. New sections must be added to both language blocks, in a zero-padded file. A section may instead set `include: path/to.html` — `_includes/journey/content-dynamic.html` renders it via `{% include %}` instead of the raw HTML blocks (required when a section needs Liquid; see `10.yml` contact section).
- **Resume page**: `_includes/resume/content-id.html` and `content-en.html` are near-identical hardcoded HTML (sidebar, education, header, summary). Editing one usually means editing the other. Data-driven parts (skills, `experiences`, `organizations`, `labels`) are rendered from `_data/…`.
- **Tech Arsenal (skills)**: `_data/skills/NN.yml` is the single source for both the resume sidebar and the journey skills cloud — edit here, not in the HTML. Each file has `name` (per-lang) and a `tags` list with `label`, `title` (tooltip), and `class` (Tailwind classes used by the journey cloud). Rendered by `_includes/resume/skills.html` and `_includes/journey/skills-cloud.html` (included via `_includes/journey/contact-section.html`). Same zero-padded ordering rule; no `order` field needed.
- **Resume data**: `_data/resume/experiences/NN.yml`, `_data/resume/organizations/NN.yml`, `_data/resume/labels.yml`. Text keys are per-language (`title.id`, `bullets.en`, …). If `summary` is present it's rendered as paragraphs and `bullets` is ignored. Same zero-padded-filename ordering rule applies. `badge_class`/`card_class` hold Tailwind classes.

## Gotchas

- Raw HTML stored in `_data` YAML `|` scalars is output verbatim — Liquid tags inside it are **not** processed. Liquid-dependent content must live in an `_include` (see the section `include:` mechanism).
- Tailwind classes are written inline as arbitrary values (e.g. `text-[10px]`) — no config to regenerate.
- Assets: plain CSS in `assets/css/`, no preprocessor; JS in `assets/js/`.
- Git: active work happens on `dev`. `main` contains the legacy pre-Jekyll static HTML version (`index.html`, `resume.html`, `index-en.html`, `resume-en.html`) — do not build on it. A `publish` branch mirrors the Jekyll source.
