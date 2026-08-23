import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const PhotographyPage = ({ data }) => {
  const photos = data?.allSanityPhotography?.nodes || []

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
            <div className="images-grid">
              {photos.map((photo, index) => (
                <div key={index} className="image-pod">
                  <img 
                    src={photo.image.asset.url} 
                    alt={photo.name || "Photo"} 
                    className="photo-image"
                  />
                  <div className="photo-info">
                    <h3 className="photo-title">{photo.name}</h3>
                    <div className="photo-location">
                      <img src="/Location.svg" alt="Location" className="location-icon" />
                      <span>{photo.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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

        .photo-image {
          width: 100%;
          object-fit: cover;
          border-radius: 4px;
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

          .page-title {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 28px;
            font-weight: 700;
            line-height: 95%;
            color: #1D1C1C;
          }

          .page-description {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 120%;
            letter-spacing: 0.42px;
            color: #1D1C1C;
          }

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
            color: #A3A3A3;
          }
        }
      `}</style>
    </Layout>
  )
}

export const Head = ({ location }) => <Seo title="Photography" pathname={location?.pathname} />

export const query = graphql`
  query PhotographyQuery {
    allSanityPhotography(sort: { order: ASC }) {
      nodes {
        name
        location
        image {
          asset {
            url
          }
        }
      }
    }
  }
`

export default PhotographyPage
