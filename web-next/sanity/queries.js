/**
 * GROQ ports of the seven Gatsby page queries.
 *
 * ORDERING — READ THIS.
 * The Gatsby queries carried no `sort`, so their order came from whatever
 * sequence gatsby-source-sanity happened to create nodes in. That order matches
 * none of _createdAt, _updatedAt or _id, which means it was never derived from
 * the content and could change on any rebuild without an edit.
 *
 * These queries therefore sort explicitly by `year desc`, newest work first.
 * That is deterministic and conventional for a portfolio, but it IS a visible
 * change from the current (accidental) order. If you want manual control, add
 * an `orderRank` number field to the project schema and sort on it instead —
 * that is the only way to get a stable order you actually choose.
 */

// Shared image projection.
//
// The nesting here is deliberate and reproduces the shape gatsby-source-sanity
// produced, because the ported components read it directly:
//   HoverReel: project.hoverImage.asset.url
//              image.asset.metadata.palette.dominant.background
// Matching the query to existing markup keeps the migration diff small.
// Flattening these projections is a tidy-up for after parity, not during.
const IMAGE = `{
  "asset": {
    "url": asset->url,
    "metadata": {
      "palette": {
        "dominant": {
          "background": asset->metadata.palette.dominant.background
        }
      }
    }
  }
}`

// `slug` is nested for the same reason — the markup reads project.slug.current.
const PROJECT_CARD = `{
  "id": _id,
  title,
  client,
  year,
  locked,
  "slug": { "current": slug.current },
  heroImage ${IMAGE},
  hoverImage ${IMAGE}
}`

/** Homepage — was allSanityProject(filter: {showOnHomepage: {eq: true}}, limit: 10) */
export const HOME_PROJECTS = `
  *[_type == "project" && showOnHomepage == true]
    | order(year desc)[0...10] ${PROJECT_CARD}
`

/**
 * Portfolio — featured projects.
 *
 * The Gatsby query asked for `heroImage.asset.gatsbyImageData`, which does not
 * exist outside Gatsby's image pipeline. It is replaced by the raw CDN url,
 * which next/image turns into a Sanity transform via utils/sanityImageLoader.
 */
export const PORTFOLIO_PROJECTS = `
  *[_type == "project" && featured == true]
    | order(year desc){
      "id": _id,
      title,
      client,
      year,
      locked,
      shortDescription,
      "slug": { "current": slug.current },
      heroImage ${IMAGE}
    }
`

/** cs-components — the block review page just needs a few hero images. */
export const CS_COMPONENT_SAMPLES = `
  *[_type == "project" && defined(heroImage)][0...3]{
    "id": _id,
    heroImage ${IMAGE}
  }
`

/** Sandbox */
export const SANDBOX_PROJECTS = `
  *[_type == "project" && showOnSandbox == true]
    | order(year desc) ${PROJECT_CARD}
`

/**
 * Photography — was allSanityPhotography(sort: {order: ASC}).
 * This one is a faithful port: the schema has a real `order` field, so the
 * sequence is authored rather than accidental.
 */
export const PHOTOGRAPHY = `
  *[_type == "photography"] | order(order asc){
    name,
    location,
    "image": { "asset": { "url": image.asset->url } }
  }
`
// The nested asset wrapper is deliberate: it reproduces the shape the Gatsby
// GraphQL layer produced, so the ported JSX (photo.image.asset.url) needs no
// edits. Matching the query to existing markup keeps the migration diff small;
// flattening it is a tidy-up for after parity, not during.

/**
 * Experience — was allSanityExperience with no sort.
 *
 * ORDERING CHANGE, and this one probably fixes a live bug. The Gatsby page
 * renders roles in node-creation order, which currently comes out as
 * 2019, 2013, 2019, 2014, 2020, 2020, 2021, 2022, 2026 — not chronological in
 * either direction. `startDate desc` puts the newest role first, which is what
 * a reader expects of a CV. The schema has no explicit rank field to honour.
 */
export const EXPERIENCE = `
  *[_type == "experience"] | order(startDate desc){
    company,
    role,
    startDate,
    endDate,
    current,
    description
  }
`

/** Every project with a slug — drives generateStaticParams for case studies. */
export const ALL_PROJECT_SLUGS = `
  *[_type == "project" && defined(slug.current)]{
    "slug": slug.current,
    locked
  }
`

/**
 * The gated body of a case study. Ported from CASE_STUDY_QUERY in
 * netlify/functions/get-case-study.js, unchanged.
 *
 * This is the payload the password gate protects. It must only ever be fetched
 * from a route handler AFTER verifyToken has passed — never from a page, and
 * never with the public client.
 *
 * Note it deliberately does not select `password` from the project.
 */
export const CASE_STUDY_BODY = `
  *[_type == "caseStudy" && project->slug.current == $slug][0]{
    "id": _id,
    "components": components[]{
      ...,
      heroImage{ ..., asset-> },
      icon{ ..., asset-> },
      posterImage{ ..., asset-> },
      videoFile{ ..., asset-> },
      images[]{ ..., asset-> },
      slides[]{ ..., image{ ..., asset-> } },
      image{ ..., asset-> },
      pods[]{ ..., image{ ..., asset-> }, icon{ ..., asset-> } }
    },
    project->{ "id": _id, title, client, year, projectType, introText, shortDescription },
    "relatedProjects": relatedProjects[]->{ "id": _id, title, client, year, slug }
  }
`

/**
 * The public shell of a case study. Safe for anonymous rendering: it carries no
 * body components and no password.
 */
export const CASE_STUDY_SHELL = `
  *[_type == "project" && slug.current == $slug][0]{
    "id": _id,
    title,
    client,
    year,
    projectType,
    introText,
    shortDescription,
    locked,
    "slug": slug.current,
    heroImage ${IMAGE}
  }
`

/**
 * Fallback for the case study footer when a case study has no
 * relatedProjects set — the schema note says "leave empty to auto-populate
 * from featured/homepage/sandbox projects".
 */
export const AUTO_RELATED_PROJECTS = `
  *[_type == "project"
    && defined(slug.current)
    && slug.current != $slug
    && (featured == true || showOnHomepage == true || showOnSandbox == true)]
    | order(year desc)[0...8]{
      "id": _id,
      title,
      client,
      year,
      slug
    }
`
