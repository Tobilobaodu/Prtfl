export const metadata = { title: "Photography" }

import { client } from "../../sanity/client"
import { PHOTOGRAPHY } from "../../sanity/queries"
import Layout from "../../components/Layout"
import PhotoGrid from "../../components/PhotoGrid"

export default async function PhotographyPage() {
  const photos = await client.fetch(PHOTOGRAPHY)

  return (
    <Layout>
      <div className="photography-container">
        <div className="container">
          <div className="intro">
            <h1 className="page-title">phtgrphy</h1>
            <p className="page-description">
              A collection of photos taken on my phone, mostly from everyday scenes and places.
              They're visual notes of light, texture, and small details that catch my attention.
            </p>
          </div>

          <div className="images-container">
            <PhotoGrid photos={photos} />
          </div>
        </div>
      </div>

      <style>{`
        .photography-container {
          width: 100%;
          min-height: calc(100vh - 85px);
        }

        .container {
          max-width: var(--container-max);
          margin: 0;
          margin-left: 0;
          padding: 101px var(--gutter) 60px;
        }

        .intro {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }

        .page-title {
          font-size: 28px;
          font-weight: 700;
          line-height: 95%;
          color: var(--black-pitch-nah);
        }

        .page-description {
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--black-pitch-nah);
        }

        .images-container {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .images-grid {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 20px;
          width: 100%;
        }

        .image-pod {
          display: flex;
          flex-direction: column;
          gap: 11px;
          width: 100%;
        }

        .image-pod {
          cursor: zoom-in;
        }

        /* Wraps each photo so the grid can be opened from the keyboard. The
           resets keep it out of the layout: the photo inside sizes exactly as
           it did as a direct child of .image-pod. */
        .photo-open {
          display: block;
          width: 100%;
          padding: 0;
          margin: 0;
          border: 0;
          background: none;
          font: inherit;
          color: inherit;
          cursor: inherit;
          border-radius: 4px;
        }

        .photo-open:focus-visible {
          outline: 2px solid var(--orange);
          outline-offset: 2px;
        }

        .photo-image {
          display: block;
          width: 100%;
          object-fit: cover;
          border-radius: 4px;
        }

        /* The expanded view. Its geometry is set and animated by PhotoGrid.js;
           this only styles it. */
        .photo-view {
          position: fixed;
          inset: 0;
          z-index: 1000;
        }

        .photo-view-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(29, 28, 28, 0.85);
          cursor: zoom-out;
        }

        /* Laid out once at the expanded size; only the transforms move. The
           frame clips, so the counter-scaled image inside crops to it. */
        .photo-view-frame {
          position: fixed;
          overflow: hidden;
          transform-origin: 0 0;
          will-change: transform;
          cursor: zoom-out;
        }

        .photo-view-frame > img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform-origin: 50% 50%;
          will-change: transform;
        }

        /* Positioned under the frame's expanded rect by PhotoGrid.js. */
        .photo-view-caption {
          position: fixed;
          padding-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .photo-view-caption .photo-title {
          color: var(--white-not-wyt);
        }

        .photo-view-close {
          position: fixed;
          top: 16px;
          right: 16px;
          z-index: 1;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          border: 0;
          background: none;
          cursor: pointer;
        }

        .photo-view-close:focus-visible {
          outline: 2px solid var(--orange);
          outline-offset: 2px;
        }

        .photo-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .photo-title {
          font-size: 14px;
          font-weight: 700;
          line-height: 120%;
        }

        .photo-location {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .location-icon {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
        }

        .photo-location span {
          font-size: 12px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.36px;
          color: var(--grey-misty);
        }

        @media (max-width: 768px) {
          .container {
            padding: 100px var(--gutter) 60px;
          }

          .photo-image {
            height: auto;
            min-height: 250px;
          }
        }

        @media (max-width: 480px) {
          .photography-container {
            min-height: calc(100vh - 84px);
          }

          .container {
            max-width: 100%;
            padding: 0;
            display: flex;
            flex-direction: column;
          }

          .intro {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 275px 40px 0 40px;
            margin-bottom: 168px;
          }

          /* .page-title and .page-description restated the shared rules from
             layout.css exactly, except that they asked for
             'Neue Haas Grotesk Display Pro' — a family with no @font-face
             anywhere in the project — so both fell through to the system UI
             font below 480px only. Removed; the shared rules now apply. */

          .images-container {
            width: 100%;
            padding: 0 40px 60px 40px;
          }

          .images-grid {
            display: flex;
            width: 100%;
            padding-bottom: 20px;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap: 20px;
          }

          .image-pod {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 11px;
            width: 100%;
          }

          .photo-open {
            border-radius: 0;
          }

          .photo-image {
            height: 400px;
            width: 100%;
            object-fit: cover;
            border-radius: 0;
            min-height: auto;
          }

          .photo-info {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }

          .photo-title {
            font-family: 'Neue Haas Display', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 700;
            line-height: 120%;
            letter-spacing: 0.42px;
          }

          .photo-location {
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .location-icon {
            width: 14px;
            height: 14px;
            flex-shrink: 0;
          }

          .photo-location span {
            font-family: 'Neue Haas Display', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 12px;
            font-weight: 400;
            line-height: 120%;
            letter-spacing: 0.36px;
            color: var(--grey-misty);
          }
        }
      `}</style>
    </Layout>
  )
}



