import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import {
  SplitHero,
  ImagePodGrid,
  IconPodGrid,
  NumberedFindings,
  PullQuote,
  ObjectivesList,
} from "../components/case-study"

/**
 * Working page for reviewing the case-study block components in isolation.
 *
 * It reproduces the measuring context of a real case study — the same
 * `var(--cs-toc-w) 1fr` grid and `--page-inline` gutter as `.cs-body-layout` in
 * src/templates/case-study.js — so each block renders at exactly the width it
 * will occupy in production (~820px at 1440). Reviewing them full-bleed would
 * flatter layouts that do not actually fit.
 *
 * Not linked from the nav and marked noindex; it exists to be adjusted against.
 */

const FINDINGS = [
  {
    heading: "Brokers cannot self serve, so they default to the phone",
    body: "When the product page did not answer the question, brokers went to the Contact page or picked up the phone rather than keep looking.",
  },
  {
    heading: "Lender jargon triggers confirmation calls",
    body: "Brokers did not distrust the information. They distrusted their reading of it, so they rang to confirm before advising a client.",
  },
  {
    heading: "There is no fast path to a document",
    body: "Getting a form meant navigating away and losing your place mid conversation, which is a cost brokers will not pay while a client waits.",
  },
]

const OBJECTIVES = [
  "Cut inbound calls asking for guides and documents",
  "Increase case submissions made through the product page",
  "Raise scroll depth and cut dead clicks",
]

const ICON_PODS = [
  {
    heading: "Discovery interviews",
    body: "Eleven sessions with intermediaries across the panel, split between high volume and occasional users so the findings were not skewed by either group.",
  },
  {
    heading: "Call log analysis",
    body: "Six weeks of inbound call reasons coded against the page a broker was most likely on when they rang, which is what turned anecdote into volume.",
  },
  {
    heading: "Comparative teardown",
    body: "Six lender portals reviewed against the same task list, to separate what brokers disliked about us from what they disliked about the category.",
  },
  {
    heading: "Prototype testing",
    body: "Two rounds against the same task set, so a change could be attributed to the design rather than to a friendlier round of participants.",
  },
]

/** Small caption above each block so the type is nameable in feedback. */
const Block = ({ type, note, children }) => (
  <section className="cs-demo-block">
    <header className="cs-demo-head">
      <code className="cs-demo-type">{type}</code>
      {note && <span className="cs-demo-note">{note}</span>}
    </header>
    {children}
  </section>
)

const CsComponentsPage = ({ data }) => {
  // Real Sanity images rather than grey boxes, so the CDN transforms, aspect
  // ratios and cropping are all exercised the way they will be in production.
  const projects = data?.allSanityProject?.edges?.map((e) => e.node) || []
  const imagePods = projects.slice(0, 3).map((p, i) => ({
    _key: p.id,
    image: p.heroImage,
    title: [
      "The product page brokers actually landed on",
      "Documents surfaced in place, not a page away",
      "Criteria written in broker language",
    ][i],
    description:
      "Sample copy standing in for the real caption so the block can be judged at a realistic length.",
  }))
  const heroImage = projects[0]?.heroImage

  return (
    <Layout>
      <div className="cs-demo-page">
        <div className="cs-demo-intro">
          <h1 className="page-title">Case study blocks</h1>
          <p className="page-description">
            Six components rendered at the width they occupy inside a case study. Sample
            content only — nothing here is authored in Sanity.
          </p>
        </div>

        <div className="cs-demo-layout">
          <aside className="cs-demo-gutter" aria-hidden="true" />
          <div className="cs-demo-col">
            <Block type="splitHero" note="Figma 3813-77">
              <SplitHero
                headline="Answers in the room, not after it"
                body="Brokers advise with a client in front of them. The page had to resolve a question in the time it takes to say one out loud, or it would keep losing to the phone."
                image={heroImage}
                ctaLabel="Request access"
                ctaUrl="#"
                ctaLocked
              />
            </Block>

            <Block type="numberedFindings" note="From your screenshot">
              <NumberedFindings items={FINDINGS} />
            </Block>

            <Block type="pullQuote" note="From your screenshot">
              <PullQuote
                quote="I need to answer my client's question right now, not go hunting through a website while they're sat in front of me."
                attribution="Independent mortgage broker"
              />
            </Block>

            <Block type="objectivesList" note="From your screenshot">
              <ObjectivesList items={OBJECTIVES} />
            </Block>

            <Block type="imagePodGrid" note="Figma 3813-95 — 3 up, 2 up ≤1024, 1 up ≤768">
              <ImagePodGrid pods={imagePods} />
            </Block>

            <Block type="iconPodGrid" note="Figma 3813-155 — icons omitted in this sample">
              <IconPodGrid pods={ICON_PODS} />
            </Block>
          </div>
        </div>
      </div>

      <style>{`
        .cs-demo-page {
          width: 100%;
          padding-top: 140px;
          padding-bottom: 120px;
        }

        .cs-demo-intro {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 60px;
          padding-inline: var(--page-inline);
        }

        /* Mirrors .cs-body-layout in src/templates/case-study.js so the blocks
           render at their true production width. Both read --cs-toc-w from
           layout.css, so the two cannot drift apart. */
        .cs-demo-layout {
          display: grid;
          grid-template-columns: var(--cs-toc-w) 1fr;
          gap: 0 60px;
          padding-inline: var(--page-inline);
          align-items: start;
        }

        .cs-demo-col {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .cs-demo-block {
          border-top: 1px dashed rgba(29, 28, 28, 0.2);
          padding-top: 14px;
        }

        .cs-demo-head {
          display: flex;
          align-items: baseline;
          gap: 12px;
          flex-wrap: wrap;
        }

        .cs-demo-type {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
          letter-spacing: 0.5px;
          color: var(--orange);
        }

        .cs-demo-note {
          font-family: var(--font-nhd);
          font-size: 11px;
          letter-spacing: 0.5px;
          color: var(--grey-misty);
        }

        @media (max-width: 1199px) {
          .cs-demo-layout { grid-template-columns: 1fr; }
          .cs-demo-gutter { display: none; }
        }

        @media (max-width: 768px) {
          .cs-demo-page { padding-top: 120px; }
          .cs-demo-intro { margin-bottom: 40px; }
        }
      `}</style>
    </Layout>
  )
}

export const query = graphql`
  query {
    allSanityProject(limit: 3) {
      edges {
        node {
          id
          heroImage {
            asset {
              url
            }
          }
        }
      }
    }
  }
`

export const Head = ({ location }) => (
  <Seo title="Case study blocks" pathname={location?.pathname}>
    {/* A working page, not something to index. */}
    <meta name="robots" content="noindex, nofollow" />
  </Seo>
)

export default CsComponentsPage
