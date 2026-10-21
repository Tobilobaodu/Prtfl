export const metadata = {
  title: "Case study components",
  // A working page, not something to index.
  robots: { index: false, follow: false },
}

import * as React from "react"
import Layout from "../../components/Layout"
import {
  CaseStudyStyles,
  HeroSection,
  SectionDivider,
  SectionTitleBlock,
  TagBlock,
  TextBlock,
  Spacer,
  ImageComponent,
  VideoComponent,
  SliderComponent,
  IconHeadingBlock,
  NdaNotice,
} from "../../components/CaseStudyContent"
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
  CardGrid,
  HierarchyDiagram,
} from "../../components/case-study"
import SpacingGuides from "./SpacingGuides"

/**
 * Working page for reviewing every case-study component, and the spacing
 * between them, in isolation.
 *
 * The body sits in the real .cs-body-layout and .cs-content-col with the real
 * case study stylesheet (CaseStudyStyles), so each component renders at the
 * width it occupies in production (895px at 1440) and sits exactly as far from
 * its neighbours as it would on a case study. SpacingGuides paints that spacing
 * over the top.
 *
 * Not linked from the nav and marked noindex; it exists to be adjusted against.
 */

/** Portable text, as the Studio stores a textBlock's content. */
const portableText = (...paragraphs) =>
  paragraphs.map((text, i) => ({
    _type: "block",
    _key: `p${i}`,
    children: [{ _type: "span", _key: `s${i}`, text }],
  }))

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

const STAKEHOLDERS = [
  { heading: "Brokers", body: "Answer a client's question on the spot, without hunting through the site." },
  { heading: "Broker Liaison Team", body: "Get their week back for the complex cases the team was set up to handle." },
  { heading: "The business", body: "More cases submitted through the product page." },
  { heading: "Legal", body: "No copy that reads as advice or misrepresents a product." },
]

const HIERARCHY_SECTIONS = [
  { title: "Product transfers", items: ["Residential", "Buy-to-let"] },
  { title: "Submitting business", items: ["Porting applications", "Transfer of equity"] },
  { title: "Documents" },
  { title: "Contact us" },
]

const FLOW_STEPS = [
  { title: "Draft in plain English", owner: "Me, with Communications" },
  { title: "Compliance review", owner: "Legal", highlight: true },
  { title: "Live on the page", owner: "Signed off" },
]

// The Studio's default notice text (schemaTypes/ndaNotice.ts).
const NDA_TEXT =
  "To comply with my non-disclosure agreement, I have omitted and obfuscated confidential information in this case study. All information in this case study is my own and does not necessarily reflect the views & facts of the company."

/**
 * One component on the page. The data attributes are how SpacingGuides finds
 * and names it, so the type can be quoted in feedback.
 */
const Item = ({ type, note, children }) => (
  <div className="cs-demo-item" data-demo-type={type} data-demo-note={note}>
    {children}
  </div>
)

export default async function CsComponentsPage() {
  // Real Sanity assets rather than grey boxes, so the CDN transforms, aspect
  // ratios and cropping are all exercised the way they will be in production.
  const { projects = [], video, icon } = await client.fetch(CS_COMPONENT_SAMPLES)
  const images = projects.map((p) => p.heroImage)
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

  return (
    <Layout>
      <CaseStudyStyles />
      <div className="cs-demo-page">
        <div className="cs-demo-intro">
          <h1 className="page-title">Case study components</h1>
          <p className="page-description">
            Every component a case study can use, at the width and spacing it gets on a real case
            study. Orange is the space between two components, with its size in the pill; green is
            padding that reads as space. Sample copy; the images, video and icon come from existing
            projects.
          </p>
        </div>

        <SpacingGuides>
          <Item type="heroSection" note="Full width above the body, as when it is the first component">
            <HeroSection
              headline="A product page brokers can use mid conversation"
              subtext="Rebuilding the route to a product page, and the page itself, so a broker can answer a client without picking up the phone."
              date="2024"
              heroImage={images[0]}
            />
          </Item>

          <div className="cs-body-layout">
            {/* Where the table of contents sits; the guides put labels here. */}
            <aside className="cs-toc-col" aria-hidden="true" />

            <div className="cs-content-col">
              <Item type="sectionDivider" note="dividerStyle: line (also double-line, dotted, none)">
                <SectionDivider tag="Research" title="What brokers told us" dividerStyle="line" />
              </Item>

              <Item type="sectionTitleBlock">
                <SectionTitleBlock title="The problem" />
              </Item>

              <Item type="tagBlock">
                <TagBlock tag="Discovery" />
              </Item>

              <Item type="textBlock" note="type: type-title-medium">
                <TextBlock
                  type="type-title-medium"
                  content={portableText("Brokers were ringing for answers the page already had")}
                />
              </Item>

              <Item type="textBlock" note="type: type-body-small (the default)">
                <TextBlock
                  type="type-body-small"
                  content={portableText(
                    "Six in ten inbound calls asked for a guide, a criteria sheet or a form that was already on the site. The answer existed; brokers could not find it in the time a client would wait.",
                    "Each call took a Broker Liaison lead away from new business, and each one ended with the same document being read out over the phone."
                  )}
                />
              </Item>

              <Item type="imageComponent" note="layout: single">
                <ImageComponent layout="single" images={images.slice(0, 1)} />
              </Item>

              <Item type="imageComponent" note="layout: grid-2">
                <ImageComponent layout="grid-2" images={images.slice(0, 2)} />
              </Item>

              <Item type="imageComponent" note="layout: grid-3, fullHeightImage: 1">
                <ImageComponent layout="grid-3" images={images.slice(0, 3)} fullHeightImage={1} />
              </Item>

              <Item type="imageComponent" note="layout: grid-4-horizontal">
                <ImageComponent layout="grid-4-horizontal" images={images.slice(0, 4)} />
              </Item>

              <Item type="imageComponent" note="layout: grid-4-square">
                <ImageComponent layout="grid-4-square" images={images.slice(0, 4)} />
              </Item>

              <Item type="imageComponent" note="layout: grid-5">
                <ImageComponent layout="grid-5" images={images.slice(0, 5)} />
              </Item>

              {video && (
                <Item type="videoComponent" note="Uploaded file, with caption">
                  <VideoComponent
                    videoFile={video.videoFile}
                    muted
                    caption="Sample caption under the video."
                  />
                </Item>
              )}

              <Item type="sliderComponent" note="3 slides">
                <SliderComponent slides={images.slice(0, 3).map((image, i) => ({ _key: `s${i}`, image }))} />
              </Item>

              <Item type="iconHeadingBlock" note="Adds an entry to the table of contents">
                <IconHeadingBlock
                  icon={icon}
                  heading="A support team spending its days reading out documents"
                  bodyParagraphs={[
                    "Brokers rang for answers the product page already held, so the Broker Liaison team spent its days finding documents and reading them out.",
                    "Every one of those calls was a broker who had given up on the page, which made the call log the most honest measure of where it was failing.",
                  ]}
                />
              </Item>

              <Item type="ndaNotice" note="Studio default text">
                <NdaNotice text={NDA_TEXT} />
              </Item>

              {/* Spacers are only for the end of a section. The column's 20px
                  gap still applies either side, so this one puts 80px between
                  the notice above and the divider below. */}
              <Item type="spacer" note="size: 40, ending a section">
                <Spacer size={40} />
              </Item>

              <Item type="sectionDivider" note="Opening the next section">
                <SectionDivider tag="Design" title="What changed" dividerStyle="line" />
              </Item>

              <Item type="splitHero" note="Figma 3813-77">
                <SplitHero
                  headline="Answers in the room, not after it"
                  body="Brokers advise with a client in front of them. The page had to resolve a question in the time it takes to say one out loud, or it would keep losing to the phone."
                  image={images[0]}
                  ctaLabel="Request access"
                  ctaUrl="#"
                  ctaLocked
                />
              </Item>

              <Item type="numberedFindings">
                <NumberedFindings items={FINDINGS} />
              </Item>

              <Item type="pullQuote" note="Figma 3835-26; avatar is a stand-in project image">
                <PullQuote
                  name="James Hardley"
                  avatar={images[1]}
                  quote="I need to answer my client's question right now, not go hunting through a website while they're sat in front of me."
                  attribution="Independent mortgage broker"
                />
              </Item>

              <Item type="objectivesList">
                <ObjectivesList items={OBJECTIVES} />
              </Item>

              <Item type="imagePodGrid" note="Figma 3813-95; 3 up, 2 up ≤1024, 1 up ≤768">
                <ImagePodGrid pods={imagePods} />
              </Item>

              <Item type="iconPodGrid" note="Figma 3813-155; icons omitted in this sample">
                <IconPodGrid pods={ICON_PODS} />
              </Item>

              <Item type="statsBand" note="layout: row, with footnote">
                <StatsBand
                  layout="row"
                  stats={HEADLINE_STATS}
                  footnote="Measured over the first 30 days after launch."
                />
              </Item>

              <Item type="detailsGrid" note="layout: compact">
                <DetailsGrid layout="compact" items={PROJECT_DETAILS} />
              </Item>

              <Item type="journeyCards">
                <JourneyCards title="Where brokers dropped out" steps={JOURNEY} />
              </Item>

              <Item type="cardGrid" note="KRFI design; 4 across, 2 by 2 when narrow">
                <CardGrid cards={STAKEHOLDERS} />
              </Item>

              <Item type="calloutBanner">
                <CalloutBanner label="Shared target" statement="A product page a broker can use mid conversation" />
              </Item>

              <Item type="detailsGrid" note="layout: wide, with note">
                <DetailsGrid
                  title="How I ran it"
                  layout="wide"
                  items={METHOD_DETAILS}
                  note="The sample leans toward brokers already engaged with KRFI. I flagged that at the time and used the interviews to explain the problem. The analytics had already sized it."
                />
              </Item>

              <Item type="keyQuestion">
                <KeyQuestion
                  label="The question I designed for"
                  statement="How might we let a broker answer a client's question without leaving the page?"
                  highlight="without leaving the page?"
                />
              </Item>

              <Item type="optionsComparison">
                <OptionsComparison options={OPTIONS} />
              </Item>

              <Item type="findingDecisionMap">
                <FindingDecisionMap rows={MAP_ROWS} />
              </Item>

              <Item type="decisionBlock">
                <DecisionBlock number={1} title="Two clicks to a product page, down from five" columns={DECISION_COLUMNS} />
              </Item>

              <Item type="hierarchyDiagram" note="KRFI design; with click comparison">
                <HierarchyDiagram
                  title="New hierarchy"
                  note="Click 1: a section. Click 2: a product or task."
                  root="Homepage"
                  sections={HIERARCHY_SECTIONS}
                  clicksBefore={5}
                  clicksBeforeLabel="5 clicks on average"
                  clicksAfter={2}
                />
              </Item>

              <Item type="processFlow">
                <ProcessFlow
                  title="How every line got to the page"
                  steps={FLOW_STEPS}
                  loopNote="Each review round sent amendments back to the draft, often toward jargon."
                />
              </Item>

              <Item type="statsBand" note="layout: cards, with tags">
                <StatsBand layout="cards" stats={RESULT_STATS} />
              </Item>

              <Item type="statsBand" note="layout: list">
                <StatsBand layout="list" stats={SECONDARY_STATS} />
              </Item>
            </div>
          </div>
        </SpacingGuides>
      </div>

      <style>{`
        .cs-demo-page {
          width: 100%;
          padding-top: 140px;
        }

        .cs-demo-intro {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 60px;
          padding-inline: var(--page-inline);
        }

        /* The wrappers are what .cs-content-col spaces here, so its 20px gap
           falls between them exactly as it falls between components on a real
           case study. flow-root keeps any margin a component does set inside
           its wrapper, where the guides will show it, rather than letting it
           escape. */
        .cs-demo-item {
          display: flow-root;
        }

        /* ── Spacing guides (SpacingGuides.js) ── */
        .cs-guides {
          position: relative;
        }

        .cs-guides-layer {
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
        }

        /* Each component's own box. Inset by a pixel so it does not add to
           the width a component appears to take. */
        .cs-guides--on .cs-demo-item > * {
          outline: 1px dashed rgba(29, 28, 28, 0.3);
          outline-offset: -1px;
        }

        /* A spacer is nothing but space, so it takes the same colour. */
        .cs-guides--on .cs-demo-item > .spacer {
          background:
            repeating-linear-gradient(-45deg, rgba(238, 85, 14, 0.22) 0 1px, transparent 1px 6px),
            rgba(238, 85, 14, 0.06);
        }

        .cs-guide-band {
          position: absolute;
          display: flex;
          align-items: center;
          padding-left: 6px;
        }

        .cs-guide-band--gap {
          background:
            repeating-linear-gradient(-45deg, rgba(238, 85, 14, 0.22) 0 1px, transparent 1px 6px),
            rgba(238, 85, 14, 0.06);
        }

        .cs-guide-band--padding {
          background:
            repeating-linear-gradient(-45deg, rgba(47, 138, 79, 0.22) 0 1px, transparent 1px 6px),
            rgba(47, 138, 79, 0.06);
          color: #2f8a4f;
        }

        .cs-guide-band span,
        .cs-guide-gap,
        .cs-guide-label code {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
          line-height: 1.2;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }

        /* Against the column's right edge, centred on the gap it measures. */
        .cs-guide-gap {
          position: absolute;
          transform: translate(calc(-100% - 8px), -50%);
          padding: 3px 7px;
          border-radius: 3px;
          background: var(--orange);
          color: #fff;
          font-weight: 600;
        }

        .cs-guide-gap--outside {
          transform: translate(8px, -50%);
        }

        /* Components that touch, with no space between them. */
        .cs-guide-gap--none {
          background: var(--black-pitch-nah);
        }

        .cs-guide-label {
          position: absolute;
          display: flex;
          flex-direction: column;
          gap: 4px;
          /* Sits just above the component's top edge, in its top margin where
             it has one, rather than over its content. */
          transform: translateY(-100%);
          padding: 2px 6px;
          border-radius: 3px;
          background: #fff;
        }

        .cs-guide-label--gutter {
          transform: none;
          padding: 0;
          background: none;
        }

        .cs-guide-label code {
          color: var(--orange);
        }

        .cs-guide-label span {
          font-family: var(--font-nhd);
          font-size: 11px;
          line-height: 1.4;
          letter-spacing: 0.5px;
          color: var(--grey-misty);
        }

        .cs-guides-toggle {
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 50;
          padding: 10px 16px;
          border: none;
          border-radius: 5px;
          background: var(--black-pitch-nah);
          color: #fff;
          font-family: var(--font-nhd);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
        }

        @media (max-width: 767px) {
          .cs-demo-page { padding-top: 120px; }
          .cs-demo-intro { margin-bottom: 40px; }
        }
      `}</style>
    </Layout>
  )
}
