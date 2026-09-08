import { notFound } from 'next/navigation'
import { client, publicClient } from '../../../sanity/client'
import {
  ALL_PROJECT_SLUGS,
  CASE_STUDY_SHELL,
  CASE_STUDY_BODY,
  AUTO_RELATED_PROJECTS,
} from '../../../sanity/queries'
import CaseStudyContent from '../../../components/CaseStudyContent'

/**
 * One page per project, generated at build time.
 *
 * THE SENTINEL IS GONE. gatsby-node.js had to pass `contentSlug: "__locked__"`
 * for locked projects — a slug matching nothing — because a Gatsby page query
 * could not be conditional, and without the trick the protected body would have
 * been written into public/page-data. A server component just branches, so the
 * workaround collapses into the `if (!shell.locked)` below.
 */

export async function generateStaticParams() {
  const projects = await publicClient.fetch(ALL_PROJECT_SLUGS)
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = await publicClient.fetch(CASE_STUDY_SHELL, { slug })
  if (!project) return { title: 'Case study' }
  return {
    title: project.title,
    description: project.shortDescription || undefined,
    openGraph: {
      title: project.title,
      description: project.shortDescription || undefined,
      images: project.heroImage?.asset?.url
        ? [project.heroImage.asset.url]
        : undefined,
    },
  }
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params

  // The shell is public by definition — same title/client/year/hero already on
  // the listing pages — so it is fetched with the credential-free client.
  const shellProject = await publicClient.fetch(CASE_STUDY_SHELL, { slug })
  if (!shellProject) notFound()

  const isLocked = shellProject.locked === true

  // The body is fetched ONLY for unlocked projects. For a locked one it is
  // never requested here at all, so it cannot reach the static output; the
  // browser gets it from /api/get-case-study after the password check.
  const staticCaseStudy = isLocked
    ? null
    : await client.fetch(CASE_STUDY_BODY, { slug })

  const autoRelatedProjects = await publicClient.fetch(AUTO_RELATED_PROJECTS, {
    slug,
  })

  return (
    <CaseStudyContent
      slug={slug}
      isLocked={isLocked}
      staticCaseStudy={staticCaseStudy}
      shellProject={shellProject}
      autoRelatedProjects={autoRelatedProjects}
    />
  )
}
