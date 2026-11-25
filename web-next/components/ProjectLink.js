import Link from "next/link"

/**
 * The link on a project row or card, in every list that shows projects: the
 * homepage, Portfolio, Sandbox and a case study's "More projects".
 *
 * A project set to open a live demo (`demoUrl`, see sanity/queries.js) links
 * straight to it in a new tab. A plain <a>, not next/link: the demos are
 * static HTML outside the app, so there is no route to prefetch or navigate to
 * client-side. Everything else opens its case study as before.
 *
 * `label` is the accessible name the row already used. For a demo it gains
 * "opens in a new tab"; a row without a label gets the same words as hidden
 * text so its visible content still names it.
 */
export default function ProjectLink({ project, label, children, ...rest }) {
  if (project.demoUrl) {
    return (
      <a
        href={project.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label ? `${label} (live demo, opens in a new tab)` : undefined}
        {...rest}
      >
        {children}
        {!label && <span className="sr-only"> (live demo, opens in a new tab)</span>}
      </a>
    )
  }

  return (
    <Link href={`/case-study/${project.slug?.current || ""}`} aria-label={label} {...rest}>
      {children}
    </Link>
  )
}

/** The ↗ shown beside a demo project's year, where a locked one shows its lock. */
export const DemoIcon = ({ className = "demo-icon", size = 14 }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)
