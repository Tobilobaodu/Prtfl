# Project Checkpoint — 2026-05-17

## Summary
Today focused on case study template updates, footer adjustments, and adding the new Icon Heading Block to the Sanity schema and Studio structure.

## Case study template updates
- Updated the `.container` max width in `src/templates/case-study.js` from `1029px` to `1155px`.
- Confirmed the style appeared in browser DevTools as `inline:93` because the template uses an inline `style jsx` block rather than a separate stylesheet.

## Footer updates
- Updated `.cs-footer` so the top border uses `border-top: solid #FFFDF175 0.5px`.
- Removed the footer copyright line: `© 2026 TXDI. All rights reserved.`

## Icon Heading Block
- Confirmed the earlier `ContentBlock` snippet had never been committed to the repository.
- Added `src/components/IconHeadingBlock.js` — renamed from `ContentBlock`, accepts `icon`, `heading`, and `bodyParagraphs` props.
- Added `schemaTypes/iconHeadingBlock.ts` — Sanity schema with `icon` (image), `heading` (string), and `bodyParagraphs` (array of text) fields.
- Registered `iconHeadingBlock` in `schemaTypes/index.ts`.
- Added `iconHeadingBlock` to the allowed `components` array in `schemaTypes/caseStudy.ts`.
- Added `iconHeadingBlock` to the Sanity Studio sidebar in `src/structure.ts` under Schema Types.

## Sanity Studio troubleshooting
- Confirmed `iconHeadingBlock` was missing from the case study component list initially.
- Identified that `schemaTypes/caseStudy.ts` needed updating to allow the component.
- Identified that `src/structure.ts` also needed updating as it manually lists all schema types for the sidebar.
- Resolved by pulling latest master and restarting Studio with `npx sanity dev`.

## Outstanding
- Styling update for `.ihb-heading` and `.ihb-icon` in the Icon Heading Block not yet completed — the CSS file location was not confirmed before the session ended.
