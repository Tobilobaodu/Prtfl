import * as React from "react"
import * as styles from "./blocks.module.css"

/**
 * The project's details (role, timeline, team, constraint) and its headline
 * results in one block, so the top of a case study answers "what did you do"
 * and "what changed" in the same place.
 *
 * Six layouts from the KRFI review options, all from the same content:
 *   - statsLead: results lead, the details become a quiet strip under them (A)
 *   - sidebar:   details in a ruled column, results as a 2 by 2 grid (B)
 *   - panel:     details open across the top, results in a dark panel (C)
 *   - statement: one written statement with the numbers picked out, the
 *                details joined into a line beneath it (D)
 *   - ledger:    details and results in one ruled list at two weights (E)
 *   - timeline:  phases along a track, the results pinned at its end (F)
 *
 * The details are a <dl> and the results a <ul> in every layout except
 * statement, where the results are the sentence itself.
 */

const Details = ({ items, className }) => (
  <dl className={className}>
    {items.map((item, i) => (
      <div key={item._key || i} className={styles.rrDetail}>
        <dt className={styles.label}>{item.label}</dt>
        <dd className={styles.rrDetailBody}>{item.body}</dd>
      </div>
    ))}
  </dl>
)

const Stats = ({ items, className }) => (
  <ul className={className}>
    {items.map((s, i) => (
      <li key={s._key || i} className={styles.rrStat}>
        <p className={styles.rrStatValue}>{s.value}</p>
        {s.label && <p className={styles.rrStatLabel}>{s.label}</p>}
      </li>
    ))}
  </ul>
)

/**
 * Picks each highlight out of the statement in the accent. Highlights are
 * plain text matched against the statement, as in KeyQuestion; one that no
 * longer matches is skipped rather than losing words.
 */
const highlighted = (text, highlights = []) => {
  const marks = highlights
    .filter(Boolean)
    .map((h) => ({ h, at: text.indexOf(h) }))
    .filter((m) => m.at !== -1)
    .sort((a, b) => a.at - b.at)

  const out = []
  let pos = 0
  marks.forEach(({ h, at }, i) => {
    if (at < pos) return // overlaps the previous highlight
    out.push(text.slice(pos, at))
    out.push(
      <span key={i} className={styles.rrHighlight}>
        {h}
      </span>
    )
    pos = at + h.length
  })
  out.push(text.slice(pos))
  return out
}

const RoleResults = ({
  layout = "statsLead",
  details = [],
  stats = [],
  footnote,
  resultsLabel = "Results",
  statement,
  highlights,
  phases = [],
}) => {
  const rows = (details || []).filter((d) => d?.label || d?.body)
  const results = (stats || []).filter((s) => s?.value)
  const steps = (phases || []).filter((p) => p?.label || p?.body)
  const foot = footnote && <p className={styles.footnote}>{footnote}</p>

  if (layout === "statement") {
    if (!statement) return null
    return (
      <div className={`${styles.block} ${styles.rrStatement}`}>
        <p className={styles.rrStatementText}>{highlighted(statement, highlights)}</p>
        {rows.length > 0 && (
          <p className={styles.rrStatementMeta}>
            {rows.map((d) => d.body).filter(Boolean).join(" · ")}
          </p>
        )}
      </div>
    )
  }

  if (!rows.length && !results.length) return null

  if (layout === "sidebar") {
    return (
      <div className={`${styles.block} ${styles.rrSidebar}`}>
        {rows.length > 0 && <Details items={rows} className={styles.rrSidebarDetails} />}
        <div>
          <Stats items={results} className={styles.rrStatsGrid2} />
          {foot}
        </div>
      </div>
    )
  }

  if (layout === "panel") {
    return (
      <div className={`${styles.block} ${styles.rrPanelBlock}`}>
        {rows.length > 0 && <Details items={rows} className={styles.rrDetailsRow} />}
        {results.length > 0 && (
          <div className={styles.rrPanel}>
            <Stats items={results} className={styles.rrStatsRow} />
            {foot}
          </div>
        )}
      </div>
    )
  }

  if (layout === "ledger") {
    return (
      <div className={`${styles.block} ${styles.rrLedger}`}>
        {rows.length > 0 && <Details items={rows} className={styles.rrLedgerDetails} />}
        {results.length > 0 && (
          <ul className={styles.rrLedgerStats}>
            {results.map((s, i) => (
              <li key={s._key || i} className={styles.rrLedgerStat}>
                <p className={styles.rrStatValue}>{s.value}</p>
                <p className={styles.rrStatLabel}>{s.label}</p>
                {s.category && <p className={styles.rrLedgerCategory}>{s.category}</p>}
              </li>
            ))}
          </ul>
        )}
        {foot}
      </div>
    )
  }

  if (layout === "timeline") {
    return (
      <div className={`${styles.block} ${styles.rrTimeline}`}>
        <ol className={styles.rrTrack}>
          {steps.map((p, i) => (
            <li key={p._key || i} className={styles.rrPhase}>
              <span className={styles.rrDot} aria-hidden="true" />
              <p className={styles.label}>{p.label}</p>
              {p.body && <p className={styles.rrPhaseBody}>{p.body}</p>}
              {p.note && <p className={styles.rrPhaseNote}>{p.note}</p>}
            </li>
          ))}
          {results.length > 0 && (
            <li className={`${styles.rrPhase} ${styles.rrPhaseResults}`}>
              <span className={styles.rrDot} aria-hidden="true" />
              <p className={styles.label}>{resultsLabel}</p>
              <Stats items={results} className={styles.rrTimelineStats} />
            </li>
          )}
        </ol>
        {foot}
      </div>
    )
  }

  // statsLead (A)
  return (
    <div className={`${styles.block} ${styles.rrLead}`}>
      {results.length > 0 && (
        <>
          <div className={styles.rrLeadHead}>
            <p className={styles.label}>{resultsLabel}</p>
            {footnote && <p className={styles.rrLeadNote}>{footnote}</p>}
          </div>
          <Stats items={results} className={styles.rrStatsRow} />
        </>
      )}
      {rows.length > 0 && <Details items={rows} className={styles.rrLeadDetails} />}
    </div>
  )
}

export default RoleResults
