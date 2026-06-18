import * as React from "react"
import loaderGif from "../Assets/loader/loader.gif"

const LOADER_DURATION_MS = 2500
const FADE_DURATION_MS = 500

const PageLoader = ({ onDone }) => {
  const [visible, setVisible] = React.useState(false)
  const [fading, setFading] = React.useState(false)

  React.useEffect(() => {
    if (!visible) return

    sessionStorage.setItem("loader_shown", "true")

    const fadeTimer = setTimeout(() => {
      setFading(true)
    }, LOADER_DURATION_MS)

    const removeTimer = setTimeout(() => {
      setVisible(false)
    }, LOADER_DURATION_MS + FADE_DURATION_MS)

    // Notify parent that transition is starting (so homepage can prepare)
    const doneTimer = setTimeout(() => {
      onDone?.()
    }, LOADER_DURATION_MS)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`page-loader ${fading ? "page-loader--fading" : ""}`}>
      <div className="page-loader-center">
        <img src={loaderGif} alt="" className="page-loader-gif" />
      </div>
      <p className="page-loader-tagline">
        Passionate about design and technology,
        <br />
        and how they both shape our lives.
      </p>

      <style>{`
        .page-loader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #FFF;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: transform ${FADE_DURATION_MS}ms cubic-bezier(0.65, 0, 0.35, 1);
        }

        .page-loader--fading {
          transform: translateY(-100%);
          pointer-events: none;
        }

        .page-loader-center {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
        }

        .page-loader-gif {
          width: 90px;
          height: auto;
          max-width: 150px;
        }

        .page-loader-tagline {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 140%;
          color: var(--grey-misty);
          text-align: center;
          margin: 0 0 40px;
        }
      `}</style>
    </div>
  )
}

export default PageLoader
