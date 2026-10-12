export const metadata = {
  title: "Photography",
  description:
    "Phone photography by Tobiloba Odu: everyday scenes and places, kept as visual notes of light, texture and the small details that catch the eye.",
}

import { client } from "../../sanity/client"
import { PHOTOGRAPHY } from "../../sanity/queries"
import Layout from "../../components/Layout"
import PhotoGrid from "../../components/PhotoGrid"

export default async function PhotographyPage() {
  const photos = await client.fetch(PHOTOGRAPHY)

  return (
    <Layout footer>
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

        /* Layout, title and description come from the shared .intro /
           .page-title / .page-description in globals.css. */
        .intro {
          margin-bottom: 20px;
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

        /* Every photo is a square of at most 400px, cropped from the centre
           to fill it whatever its shape. */
        .photo-image {
          display: block;
          width: 100%;
          max-width: 400px;
          aspect-ratio: 1 / 1;
          object-fit: cover;
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

        @media (max-width: 767px) {
          .container {
            padding: 100px var(--gutter) 60px;
          }
        }

        @media (max-width: 767px) {
          .photography-container {
            min-height: calc(100vh - 84px);
          }

          /* 134px, the shared mobile title offset, carried by the container
             as on every other page. The intro used to carry its own
             hard-coded padding: 275px 40px 0 instead, with a 168px gap below
             it, which put this title 140px lower than wrk or sndbx. */
          .container {
            max-width: 100%;
            padding: 134px var(--gutter) 0;
            display: flex;
            flex-direction: column;
          }

          .intro {
            margin-bottom: 20px;
          }

          /* .page-title and .page-description restated the shared rules from
             layout.css exactly, except that they asked for
             'Neue Haas Grotesk Display Pro' — a family with no @font-face
             anywhere in the project — so both fell through to the system UI
             font below 480px only. Removed; the shared rules now apply. */

          .images-container {
            width: 100%;
            padding: 0 0 60px;
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



