import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const PhotographyPage = () => {
  const photos = [
    {
      title: "Not alone",
      location: "Tanzania",
      image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80",
      height: "555px"
    },
    {
      title: "Photo name",
      location: "Birmingham",
      image: "https://images.unsplash.com/photo-1682687221038-404cb8830901?w=800&q=80",
      height: "400px"
    },
    {
      title: "Droid",
      location: "Home",
      image: "https://images.unsplash.com/photo-1682687220566-5599dbbebf11?w=800&q=80",
      height: "400px"
    },
    {
      title: "Photo name",
      location: "Birmingham",
      image: "https://images.unsplash.com/photo-1682687220923-c58b9a4592ae?w=800&q=80",
      height: "400px"
    },
    {
      title: "Not alone",
      location: "Town/City",
      image: "https://images.unsplash.com/photo-1682687221080-5cb261c645cb?w=800&q=80",
      height: "400px"
    },
    {
      title: "Photo name",
      location: "Birmingham",
      image: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&q=80",
      height: "400px"
    }
  ]

  return (
    <Layout>
      <div className="photography-container">
        <div className="container">
          <div className="intro">
            <h1 className="page-title">phtgrphy</h1>
            <p className="page-description">
              Here is a collection of photos taken on my phone, most are visual representation of my interests, scenes that not just pique my interest but captures my attention. responsible for UX Strategy + Design, leading a team of three UX designers who are responsible for creating exceptional user experiences for OSB Group's digital products.
            </p>
          </div>

          <div className="images-container">
            <div className="images-grid">
              {photos.map((photo, index) => (
                <div key={index} className="image-pod">
                  <img 
                    src={photo.image} 
                    alt={photo.title} 
                    className="photo-image"
                    style={{ height: photo.height }}
                  />
                  <div className="photo-info">
                    <h3 className="photo-title">{photo.title}</h3>
                    <div className="photo-location">
                      <span>{photo.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .photography-container {
          width: 100%;
          background: var(--white-not-wyt);
          min-height: calc(100vh - 85px);
        }

        .container {
          max-width: 600px;
          margin: 0;
          margin-left: 0;
          padding: 101px 0px 60px 0px;
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
          font-weight: 400;
          line-height: 120%;
          color: var(--white-heavenly);
        }

        .photo-location {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2.5px;
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
            padding: 100px 20px 60px 20px;
          }

          .photo-image {
            height: auto !important;
            min-height: 250px;
          }
        }

        @media (max-width: 480px) {
          .photography-container {
            background: #F9F9F8;
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
            height: 400px !important;
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
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 120%;
            letter-spacing: 0.42px;
            color: #1D1C1C;
          }

          .photo-location {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 2.5px;
          }

          .photo-location span {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
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

export const Head = () => <Seo title="Photography" />

export default PhotographyPage
