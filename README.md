# NextWav Clippers

**A multi-page marketing site for a short-form video "clipping" platform** — where brands
launch viral campaigns and creators clip, post, and earn per view across TikTok, YouTube
Shorts, and Instagram Reels.

Hand-coded in plain HTML, CSS, and JavaScript — **no framework, no build step** — to keep
it fast and dependency-free.

<!-- TODO: live link + screenshot -->
<!-- 🔗 **Live:** https://nextwaveclippers.com -->

## What it is

A complete, conversion-focused landing experience for a two-sided marketplace:

- **Home** — hero, animated stat counters, "how it works," brand/clipper split, pricing teaser, testimonials, FAQ.
- **For Brands** / **For Clippers** — tailored pages for each side of the marketplace.
- **Pricing** — plans and a custom-quote call to action.
- **Blog** + **About** — supporting content pages.
- **Clipper application form** with niche selection (incl. Music/Artists) and conversion tracking on submit.

## What I focused on

- **Hand-written responsive CSS** — CSS custom properties power a full **light/dark theme**,
  a mobile slide-out nav, and a layout that holds up from phone to desktop.
- **Motion & polish** — scroll-reveal animations, animated number counters, a marquee ticker,
  floating cards, and hover states, all done with vanilla JS + CSS (no animation libraries).
- **A real design system** — consistent type scale (Barlow Condensed / DM Mono / Instrument
  Serif), spacing, and a violet accent, shared across every page via `shared.css`.
- **Conversion tracking** — Meta (Facebook) Pixel with events fired on form submissions.
- **Performance** — static files only, so it loads instantly and deploys anywhere.

## Tech

- **HTML5** (semantic, multi-page)
- **CSS3** — custom properties, grid/flexbox, theming, keyframe animations (no framework)
- **Vanilla JavaScript** — theme toggle, mobile nav, scroll reveals, counters (`shared.js`)
- **Meta Pixel** — conversion tracking
- **Fonts:** Barlow Condensed, DM Mono, Instrument Serif (Google Fonts)

## Running locally

It's a static site — no install needed. Just open `index.html` in a browser, or serve the
folder:

```bash
# any static server works, e.g.:
npx serve .
# then open the printed localhost URL
```

## Structure

```
index.html          # home
for-brands.html     # brand-side landing
for-clippers.html   # clipper-side landing + application form
pricing.html        # pricing + custom quote
about.html          # about
blog/               # blog
shared.css          # shared design system
shared.js           # shared interactions (theme, nav, reveals)
logo.png
```

---

*Built by [Christian Kearns](https://github.com/Chri2K02).*
