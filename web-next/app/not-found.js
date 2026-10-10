export const metadata = { title: "404: Not Found" }

import Link from "next/link"
import Layout from "../components/Layout"

/**
 * Built from the Figma frame "404" (node 3470:14, 1440×800).
 *
 * The heading, image and caption are one group centred in the viewport; the
 * button hangs 91px below that group rather than being centred with it, which
 * is why it is positioned off the group instead of sitting in the flex column.
 */
const NotFoundPage = () => {
  return (
    <Layout>
      <div className="not-found-page">
        <div className="not-found-group">
          <h1 className="not-found-title">404?</h1>
          {/* fetchPriority="low" stops React's server renderer from emitting a
              <link rel="preload"> for this image. The root not-found boundary
              is carried by every page, so without it every route preloaded an
              image only this page shows. */}
          <img
            src="/404-image.png"
            alt=""
            className="not-found-image"
            width={281}
            height={281}
            fetchPriority="low"
          />
          <p className="not-found-text">
            Mistakes happen, we’ve all made one.
          </p>
          <Link href="/portfolio" className="not-found-button">
            <span className="button-bg-orange"></span>
            <span className="button-bg-black"></span>
            <span className="button-content">View my work here</span>
          </Link>
        </div>
      </div>

      <style>{`
        /* padding-block reserves the button's 91px gap + 48px height on both
           sides, so the group stays centred and a short viewport still has
           room for the button below it. */
        .not-found-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 139px var(--gutter);
        }

        .not-found-group {
          position: relative;
          width: 281px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          text-align: center;
        }

        /* Figma sets 95 Black; the site only ships Roman, Medium and Bold, so
           this uses Bold, the heaviest weight available. */
        .not-found-title {
          font-family: 'Neue Haas Display', -apple-system, Roboto, Helvetica, sans-serif;
          font-size: 55px;
          font-weight: 700;
          line-height: 0.95;
          color: var(--orange);
          margin: 0;
        }

        .not-found-image {
          display: block;
          width: 281px;
          height: 281px;
          object-fit: cover;
        }

        .not-found-text {
          font-family: 'Neue Haas Display', -apple-system, Roboto, Helvetica, sans-serif;
          font-size: 12px;
          font-weight: 400;
          line-height: normal;
          letter-spacing: 0.36px;
          color: var(--grey-misty);
          margin: 0;
        }

        .not-found-button {
          position: absolute;
          top: calc(100% + 91px);
          left: 50%;
          transform: translateX(-50%);
          width: 190px;
          height: 48px;
          text-decoration: none;
          cursor: pointer;
        }

        .button-bg-orange,
        .button-bg-black {
          position: absolute;
          width: 186px;
          height: 45px;
          transition: background 0.3s ease;
        }

        .button-bg-orange {
          background: var(--orange);
          left: 0.19px;
          top: 3.09px;
        }

        .button-bg-black {
          background: var(--black-nue-ish-black);
          left: 4px;
          top: 0.09px;
        }

        .button-content {
          position: absolute;
          left: 24px;
          top: 16.5px;
          font-family: 'Neue Haas Display', -apple-system, Roboto, Helvetica, sans-serif;
          font-size: 14px;
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: 0.28px;
          text-transform: uppercase;
          white-space: nowrap;
          color: #FFFFFF;
        }

        .not-found-button:hover .button-bg-orange {
          background: var(--black-nue-ish-black);
        }

        .not-found-button:hover .button-bg-black {
          background: var(--orange);
        }

        .not-found-button:focus-visible {
          outline: 2px solid var(--orange);
          outline-offset: 4px;
        }
      `}</style>
    </Layout>
  )
}

export default NotFoundPage
