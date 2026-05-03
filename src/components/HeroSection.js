import * as React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const HeroSection = ({ headline, subtext, heroImage }) => {
  const image = heroImage?.asset ? getImage(heroImage.asset.gatsbyImageData) : null

  return (
    <section className="cs-hero">
      <div className="cs-hero-left">
        {headline && <h1 className="cs-hero-headline">{headline}</h1>}
        {subtext && <p className="cs-hero-subtext">{subtext}</p>}
      </div>
      <div className="cs-hero-right">
        {image ? (
          <GatsbyImage
            image={image}
            alt={headline || 'Hero image'}
            className="cs-hero-image"
          />
        ) : null}
      </div>

      <style jsx="true">{`
        .cs-hero {
          display: grid;
          grid-template-columns: 1fr 465px;
          align-items: center;
          gap: 40px;
          padding: 120px 100px 80px;
          min-height: 100vh;
          box-sizing: border-box;
        }

        .cs-hero-left {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .cs-hero-headline {
          font-family: 'Neue Haas Grotesk Display Pro', 'Neue Haas Display', -apple-system, Helvetica, sans-serif;
          font-size: 80px;
          font-weight: 500;
          line-height: 100%;
          color: #FFFFFF;
          margin: 0;
        }

        .cs-hero-subtext {
          font-family: 'Neue Haas Grotesk Display Pro', 'Neue Haas Display', -apple-system, Helvetica, sans-serif;
          font-size: 20px;
          font-weight: 400;
          line-height: 25px;
          color: #FFFADB;
          margin: 0;
        }

        .cs-hero-right {
          width: 465px;
          height: 550px;
          flex-shrink: 0;
          overflow: hidden;
        }

        .cs-hero-image {
          width: 465px !important;
          height: 550px !important;
          object-fit: cover;
        }

        @media (max-width: 1024px) {
          .cs-hero {
            grid-template-columns: 1fr;
            padding: 100px 40px 60px;
            min-height: auto;
            gap: 40px;
          }

          .cs-hero-headline {
            font-size: 45px;
          }

          .cs-hero-right {
            width: 465px;
            height: 550px;
            margin: 0 auto;
          }

          .cs-hero-image {
            width: 465px !important;
            height: 550px !important;
          }
        }

        @media (max-width: 480px) {
          .cs-hero {
            padding: 90px 20px 40px;
            gap: 30px;
          }

          .cs-hero-headline {
            font-size: 45px;
          }

          .cs-hero-right {
            width: 313px;
            height: 350px;
            margin: 0 auto;
          }

          .cs-hero-image {
            width: 313px !important;
            height: 350px !important;
          }
        }
      `}</style>
    </section>
  )
}

export default HeroSection
