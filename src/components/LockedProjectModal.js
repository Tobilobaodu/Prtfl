import * as React from "react"
import { requestAccess } from "../utils/caseStudyAccess"
import * as styles from "./LockedProjectModal.module.css"

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'

const LockedProjectModal = ({ isOpen, onClose, projectSlug, onPasswordCorrect, projectTitle }) => {
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const dialogRef = React.useRef(null)
  const inputRef = React.useRef(null)
  const previouslyFocused = React.useRef(null)

  // Move focus into the dialog on open and restore it on close, so keyboard and
  // screen-reader users are not left behind on the page underneath.
  React.useEffect(() => {
    if (!isOpen) return

    previouslyFocused.current = document.activeElement
    inputRef.current?.focus()

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalOverflow
      if (previouslyFocused.current instanceof HTMLElement) {
        previouslyFocused.current.focus()
      }
    }
  }, [isOpen])

  // Escape closes; Tab cycles within the dialog.
  React.useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation()
        onClose?.()
        return
      }

      if (e.key !== "Tab") return

      const focusable = dialogRef.current?.querySelectorAll(FOCUSABLE)
      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  // Clear transient state whenever the dialog is dismissed or reopened.
  React.useEffect(() => {
    if (isOpen) return
    setPassword("")
    setError("")
    setLoading(false)
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!projectSlug) {
      setError("This project is missing its link. Please go back and try again.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const result = await requestAccess(projectSlug, password)
      if (result.success) {
        setPassword("")
        onPasswordCorrect?.(result.token)
        onClose?.()
      } else {
        setError(result.error || "Incorrect password. Please try again.")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Dismiss only when the backdrop itself is clicked, so clicks inside the
  // dialog do not need a stopPropagation handler on a non-interactive element.
  // The keyboard equivalent is the Escape handler above plus the close button.
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose?.()
  }

  return (
    <div className={styles.overlay} role="presentation" onClick={handleBackdropClick}>
      <div
        ref={dialogRef}
        className={styles.content}
        role="dialog"
        aria-modal="true"
        aria-labelledby="locked-project-title"
      >
        <button className={styles.close} onClick={onClose} type="button" aria-label="Close dialog">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="24" height="24" rx="12" fill="#ECF0F1" />
            <path d="M17.5563 7.75736L13.3137 12L17.5563 16.2426L16.1421 17.6569L11.8995 13.4142L7.65685 17.6569L6.24264 16.2426L10.4853 12L6.24264 7.75736L7.65685 6.34315L11.8995 10.5858L16.1421 6.34315L17.5563 7.75736Z" fill="#EE550E" />
          </svg>
        </button>

        <div className={styles.body}>
          <h2 id="locked-project-title" className={styles.title}>
            Sensitive material within
          </h2>
          <p className={styles.description}>
            {projectTitle ? `“${projectTitle}” is ` : "This case study is "}
            not publicly available due to a non-disclosure agreement. To access it, contact me for
            a password. Access is <span className={styles.highlight}>limited</span> to recruiters
            and potential clients.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.label} htmlFor="locked-project-password">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M2.6665 14.667V5.33366H4.6665V4.00033C4.6665 3.0781 4.99162 2.29188 5.64184 1.64166C6.29162 0.991881 7.07762 0.666992 7.99984 0.666992C8.92206 0.666992 9.70828 0.991881 10.3585 1.64166C11.0083 2.29188 11.3332 3.0781 11.3332 4.00033V5.33366H13.3332V14.667H2.6665ZM5.99984 5.33366H9.99984V4.00033C9.99984 3.44477 9.80539 2.97255 9.4165 2.58366C9.02762 2.19477 8.55539 2.00033 7.99984 2.00033C7.44428 2.00033 6.97206 2.19477 6.58317 2.58366C6.19428 2.97255 5.99984 3.44477 5.99984 4.00033V5.33366ZM3.99984 13.3337H11.9998V6.66699H3.99984V13.3337ZM7.99984 11.3337C8.3665 11.3337 8.6805 11.2032 8.94184 10.9423C9.20273 10.681 9.33317 10.367 9.33317 10.0003C9.33317 9.63366 9.20273 9.31966 8.94184 9.05833C8.6805 8.79744 8.3665 8.66699 7.99984 8.66699C7.63317 8.66699 7.31939 8.79744 7.0585 9.05833C6.79717 9.31966 6.6665 9.63366 6.6665 10.0003C6.6665 10.367 6.79717 10.681 7.0585 10.9423C7.31939 11.2032 7.63317 11.3337 7.99984 11.3337Z" fill="#A2A2A2" />
              </svg>
              <span>Password</span>
            </label>

            <div className={styles.inputWrapper}>
              <input
                id="locked-project-password"
                ref={inputRef}
                type="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={loading}
                aria-invalid={error ? "true" : undefined}
                aria-describedby={error ? "locked-project-error" : undefined}
              />
              {error && (
                <div id="locked-project-error" className={styles.error} role="alert">
                  {error}
                </div>
              )}
            </div>

            <button type="submit" className={styles.submit} disabled={loading || !password}>
              {loading ? "Checking…" : "Unlock case study"}
            </button>

            <a href="mailto:oluwatobiodu@outlook.com" className={styles.requestPassword}>
              Need access? <span className={styles.underline}>Request password</span>
            </a>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LockedProjectModal
