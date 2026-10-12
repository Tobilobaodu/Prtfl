export const metadata = {
  title: "Case study blocks",
  // A working page, not something to index.
  robots: { index: false, follow: false },
}

import * as React from "react"
import Layout from "../../components/Layout"
import { client } from "../../sanity/client"
import { CS_COMPONENT_SAMPLES } from "../../sanity/queries"
import {
  SplitHero,
  ImagePodGrid,
  IconPodGrid,
  NumberedFindings,
  PullQuote,
  ObjectivesList,
  DecisionBlock,
  StatsBand,
  DetailsGrid,
  JourneyCards,
  CalloutBanner,
  KeyQuestion,
  OptionsComparison,
  FindingDecisionMap,
  ProcessFlow,
} from "../../components/case-study"

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

// Samples for the blocks added from the KRFI case study design, using that
// design's own copy so each block is judged at its real length.

const HEADLINE_STATS = [
  { value: "60%", label: "fewer calls asking for guides and documents" },
  { value: "15%", label: "more case submissions" },
  { value: "5 → 2", label: "clicks from the homepage to a product page" },
  { value: "55%", label: "fewer dead clicks" },
]

const RESULT_STATS = [
  { tag: "Goal 01", value: "60%", label: "fewer calls asking for guides and documents" },
  { tag: "Goal 02", value: "15%", label: "more case submissions" },
]

const SECONDARY_STATS = [
  { value: "55%", label: "fewer dead clicks" },
  { value: "5 → 2", label: "clicks from the homepage to a product page" },
]

const PROJECT_DETAILS = [
  { label: "Role", body: "Design lead, end to end" },
  { label: "Timeline", body: "Four week design sprint" },
  { label: "Team", body: "Three Broker Liaison leads, a CRO analyst, Head of Communications and Legal" },
  { label: "Constraint", body: "Every line of copy needed legal sign off" },
]

const METHOD_DETAILS = [
  { label: "Interviews", body: "Five brokers, remote and one to one, moderated by me. Each session followed the last real case they had placed." },
  { label: "Usability testing", body: "Four moderated sessions on a low fidelity wireframe, before any visual design." },
  { label: "Tasks tested", body: "Find the early repayment charge on a two year fixed buy-to-let. Then find the product transfer form." },
  { label: "Data", body: "Call data from the Broker Liaison workshop and site analytics." },
]

const JOURNEY = [
  { step: "Homepage", value: "5 clicks", body: "on average to reach a product page" },
  { step: "Product page", value: "35%", body: "scroll depth, so most brokers never reached the rates" },
  { step: "Contact page", value: "8 in 10", body: "journeys ended here, short of a submission" },
  { step: "Phone call", value: "6 in 10", body: "inbound calls asked for guides, criteria or forms" },
]

const OPTIONS = [
  {
    status: "Explored and ruled out",
    title: "Printed product pamphlet",
    body: "Covering the criteria properly made it bulky. Every rate change meant reprinting for every office, and a lost or damaged copy meant another reprint.",
  },
  {
    status: "The direction I took",
    title: "Rebuild the route and the page",
    body: "The pamphlet set the standard: everything a broker needs, in reach, without leaving the conversation. A page can meet it, update the moment policy changes and be measured.",
    chosen: true,
  },
]

const MAP_ROWS = [
  { finding: "Five clicks to reach a product page", source: "analytics", decision: "01 · Two clicks to a product page" },
  { finding: "Brokers can't self serve, so they phone", source: "interviews", decision: "02 · Rates and criteria above the fold" },
  { finding: "Jargon triggers confirmation calls", source: "interviews", decision: "03 · Plain copy that legal could sign off" },
  { finding: "No fast path to a document", source: "interviews, then testing", decision: "04 · Documents one tap away" },
]

const DECISION_COLUMNS = [
  { label: "The problem", body: "Reaching a product page or submitting business took five clicks on average from the homepage." },
  { label: "What I did", body: "Restructured the navigation so both take two. Related actions sit together under clear parent pages, with no menus nested inside menus." },
  { label: "Evidence", body: "In testing, brokers completed both tasks without prompting and the new hierarchy held." },
]

const FLOW_STEPS = [
  { title: "Draft in plain English", owner: "Me, with Communications" },
  { title: "Compliance review", owner: "Legal", highlight: true },
  { title: "Live on the page", owner: "Signed off" },
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

export default async function CsComponentsPage() {
  // Real Sanity images rather than grey boxes, so the CDN transforms, aspect
  // ratios and cropping are all exercised the way they will be in production.
  const projects = await client.fetch(CS_COMPONENT_SAMPLES)
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
            Case study components rendered at the width they occupy inside a case study.
            Sample content only — nothing here is authored in Sanity.
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

            <Block type="statsBand" note="KRFI design — layout: row, with footnote">
              <StatsBand
                layout="row"
                stats={HEADLINE_STATS}
                footnote="Measured over the first 30 days after launch."
              />
            </Block>

            <Block type="detailsGrid" note="KRFI design — layout: compact">
              <DetailsGrid layout="compact" items={PROJECT_DETAILS} />
            </Block>

            <Block type="journeyCards" note="KRFI design">
              <JourneyCards title="Where brokers dropped out" steps={JOURNEY} />
            </Block>

            <Block type="calloutBanner" note="KRFI design">
              <CalloutBanner label="Shared target" statement="A product page a broker can use mid conversation" />
            </Block>

            <Block type="detailsGrid" note="KRFI design — layout: wide, with note">
              <DetailsGrid
                title="How I ran it"
                layout="wide"
                items={METHOD_DETAILS}
                note="The sample leans toward brokers already engaged with KRFI. I flagged that at the time and used the interviews to explain the problem. The analytics had already sized it."
              />
            </Block>

            <Block type="keyQuestion" note="KRFI design">
              <KeyQuestion
                label="The question I designed for"
                statement="How might we let a broker answer a client's question without leaving the page?"
                highlight="without leaving the page?"
              />
            </Block>

            <Block type="optionsComparison" note="KRFI design">
              <OptionsComparison options={OPTIONS} />
            </Block>

            <Block type="findingDecisionMap" note="KRFI design">
              <FindingDecisionMap rows={MAP_ROWS} />
            </Block>

            <Block type="decisionBlock" note="KRFI design">
              <DecisionBlock number={1} title="Two clicks to a product page, down from five" columns={DECISION_COLUMNS} />
            </Block>

            <Block type="processFlow" note="KRFI design">
              <ProcessFlow
                title="How every line got to the page"
                steps={FLOW_STEPS}
                loopNote="Each review round sent amendments back to the draft, often toward jargon."
              />
            </Block>

            <Block type="statsBand" note="KRFI design — layout: cards, with tags">
              <StatsBand layout="cards" stats={RESULT_STATS} />
            </Block>

            <Block type="statsBand" note="KRFI design — layout: list">
              <StatsBand layout="list" stats={SECONDARY_STATS} />
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

        @media (max-width: 767px) {
          .cs-demo-page { padding-top: 120px; }
          .cs-demo-intro { margin-bottom: 40px; }
        }
      `}</style>
    </Layout>
  )
}


