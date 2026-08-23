# Chat export — cursor-following project preview

- **Date:** 2026-08-22
- **Repo:** `Tobilobaodu/Prtfl` (Gatsby 5 + Sanity + Netlify)
- **Scope:** codebase review → analysis of a reference interaction → implementation on the Home and Sandbox pages
- **Outcome:** built and verified, never committed. The working tree was later reset to `origin/master` (824e3c8) and cleaned, which removed the implementation. **Appendix A holds the complete source so it can be restored.**

---

## 1. Codebase review

> **User:** Read the codebase and confirm you understand everything about it

**Claude:**

Read the whole thing. Lint was clean and all 13 unit tests passed.

### What it is

A Gatsby 5 portfolio site for Tobiloba Odu, content-driven by Sanity, deployed on Netlify. The Sanity Studio lives in the same repo (`schemaTypes/`, `sanity.config.ts`, `src/structure.ts`) and deploys separately to `stuudio.sanity.studio` — `dist/` is the Studio's build output, `public/` is Gatsby's.

### Content model

Two document types drive everything:

- **`project`** — title, client, year, hero + hover images, `locked`, `password`, and three visibility booleans: `featured` → `/portfolio`, `showOnHomepage` → `/`, `showOnSandbox` → `/sndbx`
- **`caseStudy`** — references a project and holds a `components` page-builder array

Plus `experience` and `photography` as standalone lists.

Eleven block types render through the `switch` in `src/templates/case-study.js`: `heroSection`, `textBlock`, `sectionTitleBlock`, `tagBlock`, `imageComponent`, `videoComponent`, `sliderComponent`, `iconHeadingBlock`, `ndaNotice`, `spacer`, `sectionDivider`.

A schema-level validation enforces at most one `heroSection` and requires it be first; the template mirrors that assumption with `hasHeroSectionComponent`. **Adding a block type means touching four places:** the schema file, `schemaTypes/index.ts`, the `of:` list in `caseStudy.ts`, and the template switch — the 2026-05-04 checkpoint records exactly that being missed for the slider.

### The password gate — the architecturally interesting part

This is the design the codebase is built around, and it's genuinely sound:

1. `gatsby-node.js` builds a locked project's page with `contentSlug: "__locked__"`, a sentinel matching nothing. The page query's `sanityCaseStudy(...eq: $contentSlug)` resolves to null, so **the protected body never enters `public/page-data/`**. A second query on the real `$slug` supplies the public shell — only fields already visible on the listing pages.
2. `netlify/functions/verify-password.js` checks the password server-side against Sanity and returns an HMAC-SHA256 token scoped to one slug, 1h TTL.
3. `netlify/functions/get-case-study.js` trades a valid token for the body via a GROQ projection that mirrors `_rawComponents(resolveReferences: maxDepth: 10)`, so the same component code renders build-time and runtime content.

The details are careful:

- identical `{success: false}` for "no project" / "not locked" / "wrong password" so slugs can't be enumerated
- fail-closed when `CASE_STUDY_SECRET` is missing
- constant-time compares on both sides (hashing to a fixed width first so `timingSafeEqual` can't throw on length mismatch)
- scrypt with plaintext still accepted for migration
- a CI step that greps `public/page-data/` for `"password"` to guard against regressing the original leak

Two things bound the guarantee, both consequences of the design rather than bugs: `verifyPassword` runs `scryptSync` on the request path (blocking, and the rate limit is what stands between that and a CPU-exhaustion lever), and a token holder can keep re-fetching for an hour after unlock — expected, since the content is in their browser anyway.

### Styling

Global tokens and nav/typography live in `src/components/layout.css` (988 lines, `:root` palette + a full `--type-*` scale). Everything else is a per-page `<style>` block with unscoped global class names — `.container`, `.project-title`, `.page-description` are redefined in several files. It works because one page renders at a time, but it's the main structural fragility, and it's why the checkpoint notes DevTools showing rules as `inline:93`.

### Things that looked unintended

- **`src/pages/contact.js` is placeholder content** — `your.email@example.com` and a bare `https://linkedin.com`. It's linked from the main menu as CNTCT, so it's live.
- **Three different email addresses** across the site: `oluwatobiodu@outlook.com` (index, modal), `tobilobaodu@gmail.com` (`case-study.js:434`), and the placeholder above.
- **`src/pages/experience.js` hardcoded fallback has duplicate entries** — "Lead Growth Strategist / Big Cabal Media" appears twice, and the RADP and JUMIA entries carry Big Cabal's description verbatim.
- **The lock icon's `d` path in `src/pages/index.js:85` is corrupted** relative to the identical icon in `sndbx.js` — the keyhole arc segment is mangled, so it renders wrong on the homepage only.
- **`.hero-section-image` is declared twice back-to-back** in the case-study CSS with conflicting widths (565px then 500px); the second wins.
- **`src/pages/about.js` is unreachable** — no nav link, duplicates the experience page's content.
- **`src/components/header.js` is unused** Gatsby starter leftover, still shipping an inline Gatsby logo.
- The Behance/Dribbble/GitHub icons are all the same arrow-out glyph.

---

## 2. The reference interaction (video)

> **User:** *[attached `AwesomeScreenshot-8_22_2026,9_54_07AM.webm`]* watch this video and explain how this can be implemented for the following pages — Home page and the sandbox page

**Claude:**

No ffmpeg on the machine, so I stepped the video frame-by-frame in a browser: served it over a local HTTP server and had the page draw frames into canvases as a contact sheet (18.6s, 797×720).

### What the video showed

A project index rendered as a text table — `CLIENT | LOCATION | SERVICES | YEAR` — with five behaviours layered on hover:

1. **A floating preview card tracks the cursor.** Fixed-position, ~200×200 in a 797px-wide frame (~25% of container width), pointer-events off. It lags behind the cursor rather than pinning to it.
2. **A blue circular "View" pill sits at the cursor**, layered on the card, following with less lag.
3. **Swapping projects is a vertical slide.** Frames at t=13.90→14.20 showed the outgoing image sliding up while the incoming one climbed in from below.
4. **The hovered row's text dims** to light grey.
5. **The card vanishes when the pointer leaves the list.**

*(This reading was later corrected — see section 3.)*

### First implementation sketch

- Extract a shared component (CSS module, matching `LockedProjectModal` / `PageLoader`)
- Never re-render React on mousemove — pointer coords in a ref, `transform` written in a `requestAnimationFrame` lerp loop
- Home already tracks `hoveredProject` and has a fixed `.project-image-preview` panel; Sandbox has neither and its query has no image fields
- Gate on `matchMedia('(hover: hover) and (pointer: fine)')`, not a width breakpoint
- Keyboard: anchor to the focused row's rect; honour `prefers-reduced-motion`
- Keep the card `aria-hidden` + `pointer-events: none`

---

## 3. The reference source (DOM paste) — correction

> **User:** *[pasted the live DOM of `dennissnellenberg.com/work`]*

Key excerpt:

```html
<div class="mouse-pos-list-image no-select" style="top: 135px; left: 798px;">
  <div class="mouse-pos-list-image-bounce overlay">
    <div class="float-image-wrap" style="transform: translate(0px, -18.1818%);">
      <li class="mouse-pos-list-image-inner development interaction visible">
        <div class="overlay overlay-image lazy entered loaded"
             style="background-color: rgb(241, 241, 241);
                    background-image: url(...thumbnail-twice-810x810-crop-q72.jpg);"></div>
      </li>
      <!-- x11 -->
    </div>
  </div>
</div>
<div class="mouse-pos-list-btn no-select" style="top: 135px; left: 798px;"></div>
<div class="mouse-pos-list-span no-select" style="top: 135px; left: 798px;"><p>View</p></div>
```

*(Full paste elided — stack was jQuery + GSAP 3.9.1 + Barba.js + locomotive-scroll + vanilla-lazyload.)*

**Claude:**

### What the DOM corrected

I read the swap as a two-layer slide. **It isn't — it's a single reel containing every thumbnail**, and the math is exact:

11 items, and `-18.1818%` = `-(2/11) × 100`. Index 2 is FABRIC™ — the third row, which is what the cursor is on at `top: 135px; left: 798px`. So:

```
translateY(-(activeIndex / totalItems) * 100%)
```

on a wrap that is `N × cardHeight` tall, inside a container of `cardHeight` with `overflow: hidden`. One transform, one transition, no layer bookkeeping.

The grey band seen mid-slide wasn't a gap — it was an intermediate reel item's placeholder colour scrolling past. Each item carries a solid `background-color` from its thumbnail's dominant colour (`rgb(126,126,126)` for GraphicHunters, `#101010` for Aanstekelijk) under the lazy-loaded image.

### The rest of the mechanism

- **Three independent followers**, identical coordinates. The staggered lag comes from each being tweened to the same target with a different duration/ease (GSAP), not different targets. `.mouse-pos-list-image-bounce` is the spring wrapper.
- They animate `top`/`left` rather than `transform` — a GSAP-era choice not worth copying.
- **Filtering is index-parallel.** Each row `<li class="design development interaction visible">` has a twin reel `<li>` with the same service classes. If filters are ever added, the reel index must be computed over *visible* items only.
- **The grid/list toggle is two fully pre-rendered sections** swapped by class.
- **`.no-touch` on `<main>`** gates the whole hover system; `.no-select` stops text selection as the cursor sweeps rows.

None of jQuery / GSAP / Barba / locomotive-scroll / vanilla-lazyload is needed for the effect itself.

### Verified against the Sanity schema

`metadata.palette.dominant.background` exists on Sanity image assets — it's what `gatsbyImageData(placeholder: DOMINANT_COLOR)` reads at `node_modules/gatsby-source-sanity/lib/images/getGatsbyImageProps.js:102`.

---

## 4. Implementation

> **User:** Yea built it, do not commit

### Files

**New:** `src/components/HoverReel.js` (202 lines), `src/components/HoverReel.module.css` (116 lines) — both in Appendix A.

**Modified:**

| File | Change |
| --- | --- |
| `src/pages/index.js` | Replaced the static `.project-image-preview` panel; query fetches `asset.url` + dominant colour instead of `gatsbyImageData`; dropped the `GatsbyImage`/`getImage` imports |
| `src/pages/sndbx.js` | Gained hover state and the preview it never had; query gained `heroImage`/`hoverImage` |
| `src/utils/sanityImage.js` | `height` option on `sanityImageUrl()` for square crops |
| `src/components/layout.css` | Removed 45 lines of dead panel CSS; added row-dim rules |

### Core mechanism

Every thumbnail stacked in one strip `N × --reel-size` tall inside a 260px `overflow: hidden` card, translated by `-(index / N) × 100%`. Two fixed followers — card and pill — lerp toward the same pointer target at different rates (0.14 / 0.32), written straight to the DOM in a rAF loop so the list never re-renders on mousemove. Each cell carries its asset's dominant colour behind the image.

### Decisions worth recording

- **Plain `<img>`, not `GatsbyImage`** — the wrapper markup needed three `!important` overrides just to behave in the old static panel, and would fight the reel harder. The component builds its own CDN transform: `?w=640&h=640&q=72&fit=crop&auto=format`.
- **The card owns `transform` from JS**, so the scale/opacity reveal lives on inner elements (`.cardInner`, `.pillInner`) — nothing fights over the same property. This mirrors the reference's `.mouse-pos-list-image-bounce` wrapper.
- **`enabled` starts `false` on server and first client render**, then flips in an effect — no hydration mismatch, and touch devices mount nothing at all.
- **`fetchPriority="low"`** on the thumbnails so ten previews never compete with the LCP image.
- **The pill carries lock state** — a lock glyph appears for `project.locked`, since clicking opens the password modal rather than navigating.
- **No new data exposure** — the reel only uses `heroImage`/`hoverImage`, both already public on the listing pages and both in the shell `gatsby-node.js` keeps static for locked projects.

---

## 5. Verification

Ran a dev server on port 8010 (8000 was occupied) against real Sanity data and drove it through the browser.

| Check | Result |
| --- | --- |
| Reel offset, 3 projects | `translateY(0%)` → `-33.3333%` → `-66.6667%` |
| Thumbnails | `w=640&h=640&q=72&fit=crop&auto=format`, all decode |
| Dominant colour per cell | distinct per project — e.g. `rgb(226,107,40)` |
| Pill lock state | present on locked rows, absent on the unlocked one |
| Row dim | only the hovered row, `[false,true,false]` |
| Pointer leaves list | card + pill hide, no row dimmed |
| Keyboard focus | card converges to `(rect.left+140, rect.top+height/2)` exactly |
| Touch emulation | component doesn't mount, **0 image requests** |
| Sandbox page | 3 rows, 3 cells, all wired |

`gatsby build` exits 0, all queries compile, every page emits, and CI's password-leak grep passes. `metadata.palette.dominant.background` resolves — the field is real.

`npx eslint` on the four changed files: clean. `npm test`: 13/13.

---

## 6. Open items

### The production build produced a content-less site — not the code

`gatsby clean` failed with:

```
EBUSY: resource busy or locked, unlink '.cache\caches-lmdb\data.mdb'
```

Another Node process on the machine holds the LMDB cache. The source plugin then delta-synced against an empty cache:

```
info [sanity] 0 documents updated.
warning The gatsby-source-sanity plugin has generated no Gatsby nodes.
```

`allSanityExperience` and `allSanityPhotography` came back empty too — pages that were never touched. The export endpoint and token are both fine (HTTP 200, real documents; 6 published projects, 3 with `showOnHomepage`). No processes were killed since ownership couldn't be determined.

Fix: close other Gatsby processes against this repo, then

```bash
npx gatsby clean && npm run build
```

### `npm run lint` was red on two pre-existing errors

Not touched by this work:

- `netlify/functions/get-case-study.js:59` — `no-extra-semi`
- `netlify/functions/verify-password.js:44` — `no-extra-semi`

Both are the `;({ slug, password } = ...)` destructuring idiom. Lint passed at the start of the session, so the ESLint config changed on disk partway through. These will fail CI.

*(Note: after the reset to `origin/master`, whether these still reproduce depends on which ESLint config is now checked out. Re-run `npm run lint` to confirm.)*

---

## 7. Current status

The working tree was reset to `origin/master` (824e3c8) and cleaned. `git status` is clean, and **none of the implementation survives on disk**:

- `src/components/HoverReel.js` — gone
- `src/components/HoverReel.module.css` — gone
- `src/pages/index.js` — back to the `GatsbyImage` static preview panel
- `src/pages/sndbx.js` — back to no hover state, no image fields in its query
- `src/utils/sanityImage.js` — back to no `height` option
- `src/components/layout.css` — `.project-image-preview` rules restored

Appendix A below is a complete reconstruction kit.

---

## Appendix A — full source

### A.1 `src/components/HoverReel.js`

```jsx
import * as React from "react"
import { sanityImageUrl } from "../utils/sanityImage"
import * as styles from "./HoverReel.module.css"

// Rendered size is 260px (see --reel-size); 640 covers a 2x display with room
// to spare. Square crop, so the strip cells never letterbox.
const THUMB_SIZE = 640
const THUMB_QUALITY = 72

// How much of the remaining distance each follower closes per frame. The pill
// is faster than the card, which is what produces the trailing-card feel.
const CARD_EASE = 0.14
const PILL_EASE = 0.32

// Roughly where the card should sit when a row is reached by keyboard rather
// than by pointer: just inside the row, vertically centred on it.
const FOCUS_ANCHOR_X = 140

const LockGlyph = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M2.6665 14.667V5.33366H4.6665V4.00033C4.6665 3.0781 4.99162 2.29188 5.64184 1.64166C6.29162 0.991881 7.07762 0.666992 7.99984 0.666992C8.92206 0.666992 9.70828 0.991881 10.3585 1.64166C11.0083 2.29188 11.3332 3.0781 11.3332 4.00033V5.33366H13.3332V14.667H2.6665ZM5.99984 5.33366H9.99984V4.00033C9.99984 3.44477 9.80539 2.97255 9.4165 2.58366C9.02762 2.19477 8.55539 2.00033 7.99984 2.00033C7.44428 2.00033 6.97206 2.19477 6.58317 2.58366C6.19428 2.97255 5.99984 3.44477 5.99984 4.00033V5.33366ZM3.99984 13.3337H11.9998V6.66699H3.99984V13.3337Z"
      fill="currentColor"
    />
  </svg>
)

const thumbFor = (project) => {
  const image = project?.hoverImage?.asset ? project.hoverImage : project?.heroImage
  const url = image?.asset?.url
  return {
    src: url
      ? sanityImageUrl(url, {
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          fit: "crop",
          quality: THUMB_QUALITY,
        })
      : null,
    // Sanity ships a dominant colour with every asset, so a thumbnail that has
    // not arrived yet degrades to a solid swatch rather than a white hole —
    // which matters most while the strip is sliding past it.
    background: image?.asset?.metadata?.palette?.dominant?.background || undefined,
  }
}

/**
 * A pointer-following preview for a list of projects.
 *
 * `active` is `{ id, rect }` — `rect` is set only when the row was reached by
 * keyboard, in which case the followers anchor to the row instead of the
 * cursor. Pass null when nothing is hovered.
 *
 * Decorative: the whole thing is aria-hidden and pointer-events: none, so it
 * never intercepts a click meant for the row underneath.
 */
const HoverReel = ({ projects = [], active = null }) => {
  const cardRef = React.useRef(null)
  const pillRef = React.useRef(null)

  const target = React.useRef({ x: 0, y: 0 })
  const cardPos = React.useRef({ x: 0, y: 0 })
  const pillPos = React.useRef({ x: 0, y: 0 })
  const frame = React.useRef(null)
  const seeded = React.useRef(false)

  // Resolved on the client only, so the server and the first client render
  // agree (both render the markup inert) and hydration stays clean.
  const [enabled, setEnabled] = React.useState(false)
  const [reduced, setReduced] = React.useState(false)

  React.useEffect(() => {
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)")
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")

    const sync = () => {
      setEnabled(hover.matches)
      setReduced(motion.matches)
    }
    sync()

    hover.addEventListener("change", sync)
    motion.addEventListener("change", sync)
    return () => {
      hover.removeEventListener("change", sync)
      motion.removeEventListener("change", sync)
    }
  }, [])

  const activeIndex = active ? projects.findIndex((p) => p.id === active.id) : -1
  const visible = enabled && activeIndex >= 0
  const activeProject = activeIndex >= 0 ? projects[activeIndex] : null

  // Pointer position is kept in a ref and written straight to the DOM below.
  // Putting it in state would re-render the whole list on every mouse move.
  React.useEffect(() => {
    if (!enabled) return

    const handleMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }

    window.addEventListener("pointermove", handleMove, { passive: true })
    return () => window.removeEventListener("pointermove", handleMove)
  }, [enabled])

  // A row reached by Tab has no cursor to follow, so aim at the row itself.
  React.useEffect(() => {
    if (!active?.rect) return
    target.current.x = active.rect.left + FOCUS_ANCHOR_X
    target.current.y = active.rect.top + active.rect.height / 2
    seeded.current = false
  }, [active])

  React.useEffect(() => {
    if (!visible) {
      seeded.current = false
      return
    }

    // Appear at the cursor rather than gliding in from wherever the last hover
    // ended, which would read as a stray element flying across the page.
    if (!seeded.current) {
      cardPos.current = { ...target.current }
      pillPos.current = { ...target.current }
      seeded.current = true
    }

    const cardEase = reduced ? 1 : CARD_EASE
    const pillEase = reduced ? 1 : PILL_EASE

    const tick = () => {
      cardPos.current.x += (target.current.x - cardPos.current.x) * cardEase
      cardPos.current.y += (target.current.y - cardPos.current.y) * cardEase
      pillPos.current.x += (target.current.x - pillPos.current.x) * pillEase
      pillPos.current.y += (target.current.y - pillPos.current.y) * pillEase

      if (cardRef.current) {
        cardRef.current.style.transform = `translate3d(${cardPos.current.x}px, ${cardPos.current.y}px, 0) translate(-50%, -50%)`
      }
      if (pillRef.current) {
        pillRef.current.style.transform = `translate3d(${pillPos.current.x}px, ${pillPos.current.y}px, 0) translate(-50%, -50%)`
      }

      frame.current = requestAnimationFrame(tick)
    }

    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [visible, reduced])

  // Nothing to preview, or a device with no pointer to follow.
  if (!enabled || projects.length === 0) return null

  const offset = activeIndex >= 0 ? (activeIndex / projects.length) * 100 : 0

  return (
    <>
      <div
        ref={cardRef}
        className={`${styles.card} ${visible ? styles.isVisible : ""}`}
        aria-hidden="true"
      >
        <div className={styles.cardInner}>
          <div className={styles.reel} style={{ transform: `translateY(-${offset}%)` }}>
            {projects.map((project) => {
              const { src, background } = thumbFor(project)
              return (
                <div key={project.id} className={styles.cell} style={{ background }}>
                  {src && (
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      // Never let ten previews compete with the LCP image.
                      fetchPriority="low"
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div
        ref={pillRef}
        className={`${styles.pill} ${visible ? styles.isVisible : ""}`}
        aria-hidden="true"
      >
        <div className={styles.pillInner}>
          {activeProject?.locked && <LockGlyph />}
          <span>View</span>
        </div>
      </div>
    </>
  )
}

export default HoverReel
```

### A.2 `src/components/HoverReel.module.css`

```css
/**
 * Cursor-following project preview.
 *
 * Two fixed followers (the card and the "View" pill) are positioned by JS in a
 * rAF loop — see HoverReel.js — so nothing here may set `transform` on .card or
 * .pill themselves. The scale/opacity reveal lives on the inner elements
 * instead, which keeps the JS-owned transform and the CSS-owned transition from
 * fighting over the same property.
 */

.card {
  --reel-size: 260px;
  position: fixed;
  top: 0;
  left: 0;
  /* Below the nav (z-index: 100 in layout.css), above the page content. */
  z-index: 50;
  pointer-events: none;
  user-select: none;
  will-change: transform;
}

.cardInner {
  width: var(--reel-size);
  height: var(--reel-size);
  overflow: hidden;
  border-radius: 5px;
  background: var(--grey-misty);
  opacity: 0;
  transform: scale(0.82);
  transition: opacity 0.3s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.card.isVisible .cardInner {
  opacity: 1;
  transform: scale(1);
}

/*
 * Every thumbnail is stacked in one strip that is N × --reel-size tall, and the
 * strip is translated by -(index / N) * 100% of its own height. One transform
 * per project change, no per-layer bookkeeping.
 */
.reel {
  display: flex;
  flex-direction: column;
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.cell {
  position: relative;
  width: 100%;
  height: var(--reel-size);
  flex: 0 0 auto;
  overflow: hidden;
}

.cell img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.pill {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 51;
  pointer-events: none;
  user-select: none;
  will-change: transform;
}

.pillInner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--orange);
  color: var(--white-heavenly);
  font-family: var(--font-nhd);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  opacity: 0;
  transform: scale(0.6);
  transition: opacity 0.25s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.pill.isVisible .pillInner {
  opacity: 1;
  transform: scale(1);
}

/* Belt and braces: the JS gate already refuses to mount on touch devices. */
@media (hover: none), (pointer: coarse) {
  .card,
  .pill {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cardInner,
  .pillInner,
  .reel {
    transition: none;
  }
}
```

---

## Appendix B — edits to existing files

### B.1 `src/utils/sanityImage.js`

Add a `height` option:

```diff
 /**
+ * `height` is only meaningful alongside `fit: 'crop'` (or another fit that
+ * honours both dimensions) — it exists so callers can ask for a fixed aspect
+ * ratio, e.g. the square thumbnails in HoverReel.
+ *
  * @returns {string} the URL with transform params applied, or the input
  *   unchanged if it is not a Sanity CDN image.
  */
-export const sanityImageUrl = (url, { width, quality = 80, fit = 'max' } = {}) => {
+export const sanityImageUrl = (url, { width, height, quality = 80, fit = 'max' } = {}) => {
   if (!isSanityImage(url)) return url || ''
 
   const parsed = new URL(url)
   if (width) parsed.searchParams.set('w', String(width))
+  if (height) parsed.searchParams.set('h', String(height))
   parsed.searchParams.set('q', String(quality))
```

### B.2 `src/pages/index.js`

Imports and state:

```diff
 import { graphql, navigate } from "gatsby"
-import { GatsbyImage, getImage } from "gatsby-plugin-image"
 import Layout from "../components/layout"
 import Seo from "../components/seo"
 import LockedProjectModal from "../components/LockedProjectModal"
 import PageLoader from "../components/PageLoader"
+import HoverReel from "../components/HoverReel"
 
 const IndexPage = ({ data }) => {
   const [modalOpen, setModalOpen] = React.useState(false)
-  const [hoveredProject, setHoveredProject] = React.useState(null)
+  // { id, rect } — rect is set only for keyboard focus, where there is no
+  // cursor for the preview to follow. See HoverReel.
+  const [hovered, setHovered] = React.useState(null)
   const [selectedProject, setSelectedProject] = React.useState(null)
   const [emailCopied, setEmailCopied] = React.useState(false)
 
   const projects = data?.allSanityProject?.edges?.map(edge => edge.node) || []
-  const preview = projects.find(p => p.id === hoveredProject)
```

Row handlers:

```diff
-                  className={`project-item clickable ${project.locked ? 'locked' : ''}`}
-                  onMouseEnter={() => setHoveredProject(project.id)}
-                  onMouseLeave={() => setHoveredProject(null)}
-                  onFocus={() => setHoveredProject(project.id)}
-                  onBlur={() => setHoveredProject(null)}
+                  className={`project-item clickable ${project.locked ? 'locked' : ''} ${hovered?.id === project.id ? 'is-previewing' : ''}`}
+                  onMouseEnter={() => setHovered({ id: project.id, rect: null })}
+                  onMouseLeave={() => setHovered(null)}
+                  onFocus={(e) => setHovered({ id: project.id, rect: e.currentTarget.getBoundingClientRect() })}
+                  onBlur={() => setHovered(null)}
```

Replace the static panel:

```diff
-            {preview && (preview.hoverImage?.asset?.gatsbyImageData || preview.heroImage?.asset?.gatsbyImageData) && (
-              <div className="project-image-preview">
-                <GatsbyImage
-                  image={getImage((preview.hoverImage || preview.heroImage).asset.gatsbyImageData)}
-                  alt=""
-                  className="project-image"
-                />
-              </div>
-            )}
+            <HoverReel projects={projects} active={hovered} />
           </section>
```

Query — replace both `gatsbyImageData` selections:

```graphql
          heroImage {
            asset {
              url
              metadata { palette { dominant { background } } }
            }
          }
          hoverImage {
            asset {
              url
              metadata { palette { dominant { background } } }
            }
          }
```

### B.3 `src/pages/sndbx.js`

Import + state:

```diff
 import LockedProjectModal from "../components/LockedProjectModal"
+import HoverReel from "../components/HoverReel"
 
 const SndbxPage = ({ data }) => {
   const [modalOpen, setModalOpen] = React.useState(false)
   const [selectedProject, setSelectedProject] = React.useState(null)
+  // { id, rect } — rect is set only for keyboard focus. See HoverReel.
+  const [hovered, setHovered] = React.useState(null)
```

Row handlers:

```diff
-                className="project-item"
+                className={`project-item ${hovered?.id === project.id ? 'is-previewing' : ''}`}
                 onClick={(e) => handleProjectClick(project, e)}
                 onKeyDown={(e) => handleProjectKeyDown(project, e)}
+                onMouseEnter={() => setHovered({ id: project.id, rect: null })}
+                onMouseLeave={() => setHovered(null)}
+                onFocus={(e) => setHovered({ id: project.id, rect: e.currentTarget.getBoundingClientRect() })}
+                onBlur={() => setHovered(null)}
```

Mount after the `.projects-list` div, still inside `.container`:

```jsx
          <HoverReel projects={projects} active={hovered} />
```

Add to its `<style>` block, after `.project-item`:

```css
        /* The preview card covers the hovered row, so the row steps back
           rather than competing with it. Pointer-capable devices only —
           HoverReel does not mount anywhere else. */
        @media (hover: hover) and (pointer: fine) {
          .project-item .project-name,
          .project-item .project-metadata {
            transition: opacity 0.25s ease;
          }

          .project-item.is-previewing .project-name,
          .project-item.is-previewing .project-metadata {
            opacity: 0.35;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .project-item .project-name,
          .project-item .project-metadata {
            transition: none;
          }
        }
```

Query — add the same `heroImage` / `hoverImage` selections as B.2 (sndbx has none today).

### B.4 `src/components/layout.css`

Delete, in order:

1. The `.project-image-preview` rule block
2. `@keyframes fadeInImage`
3. `.project-image-preview img`
4. The three `.project-image-preview .gatsby-image-wrapper*` blocks (incl. the three `!important` overrides)
5. The three `.project-image-preview { display: none; }` overrides inside the `max-width: 1200px`, `768px` and `480px` media queries
6. The `@media (max-width: 1200px)` wrapper, which is left empty by step 5

Add in their place:

```css
/*
 * The static hover panel that used to live here (.project-image-preview, fixed
 * at right: 100px) was replaced by src/components/HoverReel.js, which follows
 * the cursor and owns its own styles as a CSS module. What remains is the row
 * treatment: the preview card covers the hovered row, so the row steps back
 * rather than competing with it.
 */
@media (hover: hover) and (pointer: fine) {
  .project-item .project-title,
  .project-item .project-meta {
    transition: opacity 0.25s ease;
  }

  .project-item.is-previewing .project-title,
  .project-item.is-previewing .project-meta {
    opacity: 0.35;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-item .project-title,
  .project-item .project-meta {
    transition: none;
  }
}
```
