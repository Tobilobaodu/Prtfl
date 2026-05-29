# Responsiveness Fix Plan

**Primary target:** `src/templates/case-study.js`
**Secondary targets:** `src/components/layout.js`, `src/pages/index.js`, `src/pages/about.js`, `src/pages/portfolio.js`

**Inspected at:** 1440px, 1200px, 1024px, 768px, 480px, 375px — live dev server screenshots + full code review.

---

## CASE STUDY TEMPLATE (Primary)

### Fix 1: Image grids too tall on mobile

**Priority: High**

**Location:** `src/templates/case-study.js` lines 812–831

**Problem:** `.image-grid` and `.height-fixed-800` are both hardcoded to `height: 800px` with no responsive override. At 480px the content column is ~402px wide, so an 800px-tall grid occupies nearly 2x the viewport height — severely excessive on mobile.

**Solution:** Add into the existing `@media (max-width: 768px)` block (around line 1161):

```css
.image-grid { height: auto; }
.height-fixed-800 { height: auto; max-height: 450px; }
.image-single.height-fixed-800 { max-height: 450px; }
```

Add into the existing `@media (max-width: 480px)` block (around line 1172):

```css
.height-fixed-800 { max-height: 350px; }
.image-single.height-fixed-800 { max-height: 350px; }
```

---

### Fix 2: Hero section image width hardcoded on mobile

**Priority: Medium**

**Location:** `src/templates/case-study.js` lines 615–618

**Problem:** The `@media (max-width: 1024px)` breakpoint (line 601) correctly uses `width: min(313px, 100%)` to make the hero image fluid. The `@media (max-width: 480px)` override at line 617 regresses this to a fixed `width: 313px`, which overflows a 375px viewport with 39px side padding (313 + 78 = 391px > 375px).

**Solution:** Change lines 615–618 from:

```css
@media (max-width: 480px) {
  .hero-section-headline { font-size: 45px; }
  .hero-section-image { width: 313px; height: 350px; }
}
```

To:

```css
@media (max-width: 480px) {
  .hero-section-headline { font-size: 45px; }
  .hero-section-image {
    width: 100%;
    max-width: 313px;
    height: auto;
    max-height: 350px;
    justify-self: stretch;
  }
}
```

---

### Fix 3: Multi-column image grids do not collapse on mobile

**Priority: Medium**

**Location:** `src/templates/case-study.js` lines 820–826

**Problem:** `grid-2`, `grid-3`, `grid-4-horizontal`, `grid-4-square`, and `grid-5` all keep their desktop column counts at 480px. At 375px, a `grid-4-horizontal` renders four ~80px-wide columns — images are unreadably small.

**Solution:** Add into the existing `@media (max-width: 480px)` block (around line 1172):

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

**Priority: Low**

**Location:** `src/templates/case-study.js` lines 1032–1037

**Problem:** At 480px the slider uses `width: calc(100% + 78px); margin-left: -39px` to bleed full-width. Without `overflow-x: hidden` on an ancestor, this produces a horizontal scrollbar — common on iOS Safari and some Android browsers.

**Solution:** Add `overflow-x: hidden` to `.case-study-page` (line 546):

```css
.case-study-page {
  overflow-x: hidden;
  /* ...existing properties */
}
```

---

### Fix 5: TOC sticky offset is a fragile magic number

**Priority: Low**

**Location:** `src/templates/case-study.js` line 648

**Problem:** `.cs-toc-col { position: sticky; top: 739px; }` — 739px is larger than most viewport heights, which effectively disables stickiness on any screen shorter than 739px. The value appears to be the hero image height plus some content offset, but it will break if the hero or intro content changes height.

**Solution:** Replace with a value just below the fixed nav height:

```css
.cs-toc-col {
  position: sticky;
  top: 120px;
}
```

If the intent is for the TOC to only appear after scrolling past the hero, add a comment explaining the reasoning and derive the value from a CSS variable rather than a raw pixel number.

---

### Fix 6: Typography line-height conflict

**Priority: Low**

**Location:** `src/templates/case-study.js` line 807 vs `src/components/layout.css` line 313

**Problem:** `.type-display-small` is defined in both files with conflicting `line-height` values — `layout.css` sets `120%`, the template's `<style jsx>` sets `95%`. The template always wins, making the global token unreliable wherever this class is used (notably `.ihb-heading`).

**Solution:** Decide which value is correct and remove the duplicate. If `95%` is right for the case study context, update `layout.css` to match. If the two contexts genuinely need different values, apply a scoped override on `.ihb-heading` instead of redefining the utility class in both files.

---

## SHARED INFRASTRUCTURE

### Fix 7: Nav padding misaligns with content at 1200px

**Priority: Low**

**Location:** `src/components/layout.js` lines 187–200

**Problem:** At 1200px, the case study body layout shifts to `padding: 40px 20px` (case-study.js line 1151) and the footer shifts to `padding: 0 20px 60px`. But the nav keeps `padding: 32px 100px` until 768px, so the logo and menu icon sit 100px from the page edges while all content below sits 20px from the edges. The misalignment is visible across the 769px–1200px range on every page that adjusts at 1200px.

**Solution:** Add a 1200px breakpoint in `src/components/layout.js`:

```css
@media (max-width: 1200px) {
  .navigation {
    padding: 32px 20px;
  }
}
```

---

## OTHER PAGES (Secondary)

### Fix 8: Font family name mismatch in mobile styles

**Priority: Medium**

**Location:** `src/pages/index.js` lines 361, 396, 411, 450 and `src/pages/portfolio.js` lines 403, 411, 481, 488

**Problem:** `@font-face` declarations in `layout.css` register the family as `'Neue Haas Display'`, and the CSS variable `--font-nhd` uses this name correctly. But every `@media (max-width: 480px)` override in `index.js` and `portfolio.js` hardcodes `'Neue Haas Grotesk Display Pro'` — a different family name with no matching `@font-face`. The browser silently falls back to `-apple-system`, so mobile users see a system font instead of Neue Haas.

**Solution:** Replace every instance of `'Neue Haas Grotesk Display Pro'` in those files with `var(--font-nhd)`. If the CSS variable is not in scope at those points, use `'Neue Haas Display'` directly.

---

### Fix 9: Social links stack vertically on tablet but wrap on mobile

**Priority: Low**

**Location:** `src/pages/index.js` line 331

**Problem:** At 768px, `.social-links` is set to `flex-direction: column` (links stack vertically). At 480px it resets to `flex-wrap: wrap` (links flow horizontally in a row). Tablet users get a more restrictive layout than mobile users — the opposite of the expected progression.

**Solution:** Change the 768px override:

```css
/* Before: */
@media (max-width: 768px) {
  .social-links { flex-direction: column; gap: 12px; }
}

/* After: */
@media (max-width: 768px) {
  .social-links { flex-wrap: wrap; gap: 12px; }
}
```

---

### Fix 10: Negative margin layout hack in about.js

**Priority: Low**

**Location:** `src/pages/about.js` line 196

**Problem:** `.download-button-wrapper { margin-top: -580px; }` pulls the download button up to visually overlap the experience list. This only works if the experience list is exactly ~580px tall. Any content length change on desktop breaks the overlap. The 768px media query correctly resets it to `margin-top: 40px`, so mobile is fine, but the desktop layout is fragile.

**Solution:** Replace the negative-margin approach with `position: absolute` scoped to the container:

```css
.container {
  position: relative;
}

.download-button-wrapper {
  position: absolute;
  right: 0;
  top: 101px;
  margin-top: 0;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .container { position: static; }
  .download-button-wrapper {
    position: static;
    justify-content: center;
    margin-top: 40px;
  }
}
```

---

## Implementation Order

| Priority | Fix | File | Effort |
|----------|-----|------|--------|
| 1 HIGH | Fix 1 — Image grid height on mobile | `src/templates/case-study.js` | ~6 lines |
| 2 HIGH | Fix 8 — Font family name mismatch | `src/pages/index.js`, `src/pages/portfolio.js` | find & replace |
| 3 MED | Fix 2 — Hero image fluid on mobile | `src/templates/case-study.js` | ~5 lines |
| 4 MED | Fix 3 — Grid column collapse | `src/templates/case-study.js` | ~7 lines |
| 5 LOW | Fix 7 — Nav padding at 1200px | `src/components/layout.js` | ~4 lines |
| 6 LOW | Fix 4 — Slider overflow-x | `src/templates/case-study.js` | 1 line |
| 7 LOW | Fix 5 — TOC sticky offset | `src/templates/case-study.js` | 1 line |
| 8 LOW | Fix 6 — Typography line-height conflict | `src/templates/case-study.js` or `layout.css` | 1 line |
| 9 LOW | Fix 9 — Social links direction | `src/pages/index.js` | 1 line |
| 10 LOW | Fix 10 — Negative margin hack | `src/pages/about.js` | ~8 lines |

Fixes 1–7 cover the case study template and shared nav. Fixes 8–10 cover other pages and can be addressed in a separate pass.
