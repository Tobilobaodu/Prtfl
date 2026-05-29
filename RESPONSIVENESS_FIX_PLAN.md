# Responsiveness Fix Plan

**Primary target:** `src/templates/case-study.js`
**Secondary targets:** `src/components/layout.js`, `src/pages/index.js`, `src/pages/about.js`, `src/pages/portfolio.js`

**Inspected at:** 1440px, 1200px, 1024px, 768px, 480px, 375px — live dev server screenshots + full code review.

---

## ✅ STATUS: ALL FIXES APPLIED

All 10 fixes from this plan have been implemented. Below is a summary of what was fixed and where.

---

## CASE STUDY TEMPLATE (Primary)

### Fix 1: Image grids too tall on mobile

**✅ Applied to `src/templates/case-study.js`** — 768px and 480px breakpoints

Added responsive overrides:
```css
@media (max-width: 768px) {
  .image-grid { height: auto; }
  .height-fixed-800 { height: auto; max-height: 450px; }
  .image-single.height-fixed-800 { max-height: 450px; }
}

@media (max-width: 480px) {
  .height-fixed-800 { max-height: 350px; }
  .image-single.height-fixed-800 { max-height: 350px; }
}
```

---

### Fix 2: Hero section image width hardcoded on mobile

**✅ Applied to `src/templates/case-study.js`** — 480px breakpoint

Changed:
```css
.hero-section-image { width: 313px; height: 350px; }
```
To:
```css
.hero-section-image {
  width: 100%;
  max-width: 313px;
  height: auto;
  max-height: 350px;
  justify-self: stretch;
}
```

---

### Fix 3: Multi-column image grids do not collapse on mobile

**✅ Applied to `src/templates/case-study.js`** — 480px breakpoint

Added:
```css
.image-grid.grid-2 { grid-template-columns: 1fr; }
.image-grid.grid-3 { grid-template-columns: 1fr; grid-template-rows: auto; }
.image-grid.grid-3 .grid-item.full-height { grid-row: auto; }
.image-grid.grid-4-horizontal { grid-template-columns: 1fr 1fr; }
.image-grid.grid-4-square { grid-template-columns: 1fr 1fr; }
.image-grid.grid-5 { grid-template-columns: 1fr 1fr; }
.image-grid.grid-5 .grid-item.full-width { grid-column: 1 / -1; }
```

---

### Fix 4: Slider can cause horizontal scrollbar

**✅ Applied to `src/templates/case-study.js`** — line 558

Added `overflow-x: clip` to `.case-study-page`.

---

### Fix 5: TOC sticky offset is a fragile magic number

**✅ Applied to `src/templates/case-study.js`** — line 660

Changed:
```css
.cs-toc-col { position: sticky; top: 739px; }
```
To:
```css
.cs-toc-col { position: sticky; top: 120px; }
```

---

### Fix 6: Typography line-height conflict

**✅ Applied to `src/templates/case-study.js`** — line 819

Changed:
```css
.type-display-small { font-size: 32.5px; line-height: 95%; font-weight: 700; }
```
To:
```css
.type-display-small { font-size: 32.5px; line-height: 120%; font-weight: 700; }
```
Now matches `src/components/layout.css` line 313.

---

## SHARED INFRASTRUCTURE

### Fix 7: Nav padding misaligns with content at 1200px

**✅ Already present in `src/components/layout.js`** — lines 187-195

```css
@media (max-width: 1200px) {
  .navigation { padding: 32px 20px; }
  .menu-panel { right: 20px; }
}
```

---

## OTHER PAGES (Secondary)

### Fix 8: Font family name mismatch in mobile styles

**✅ Applied to `src/pages/case-study.js`** — 7 instances at 480px breakpoint

Replaced all 7 occurrences of `'Neue Haas Grotesk Display Pro'` with `'Neue Haas Display'`.

Files `src/pages/index.js`, `src/pages/portfolio.js`, and `src/pages/about.js` already used the correct `'Neue Haas Display'` name — no change needed.

---

### Fix 9: Social links stack vertically on tablet but wrap on mobile

**✅ Already correct in `src/pages/index.js`** — line 330

The 768px breakpoint uses `flex-wrap: wrap` (not `flex-direction: column`), so no fix was needed.

---

### Fix 10: Negative margin layout hack in about.js

**✅ Already correct in `src/pages/about.js`** — lines 194-201

Uses `position: absolute; right: 0; top: 101px; margin-top: 0;` (not `margin-top: -580px`). The 768px breakpoint correctly resets to `position: static; justify-content: center; margin-top: 40px;`. No fix was needed.

---

## Implementation Order (Complete)

| Priority | Fix | File | Status |
|----------|-----|------|--------|
| 1 HIGH | Fix 1 — Image grid height on mobile | `src/templates/case-study.js` | ✅ Done |
| 2 HIGH | Fix 8 — Font family name mismatch | `src/pages/case-study.js` | ✅ Done |
| 3 MED | Fix 2 — Hero image fluid on mobile | `src/templates/case-study.js` | ✅ Done |
| 4 MED | Fix 3 — Grid column collapse | `src/templates/case-study.js` | ✅ Done |
| 5 LOW | Fix 7 — Nav padding at 1200px | `src/components/layout.js` | ✅ Already present |
| 6 LOW | Fix 4 — Slider overflow-x | `src/templates/case-study.js` | ✅ Done |
| 7 LOW | Fix 5 — TOC sticky offset | `src/templates/case-study.js` | ✅ Done |
| 8 LOW | Fix 6 — Typography line-height conflict | `src/templates/case-study.js` | ✅ Done |
| 9 LOW | Fix 9 — Social links direction | `src/pages/index.js` | ✅ Already correct |
| 10 LOW | Fix 10 — Negative margin hack | `src/pages/about.js` | ✅ Already correct |