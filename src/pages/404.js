import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="not-found-page">
        <div className="not-found-container">
          <img 
            src="/404-image.png" 
            alt="404 Error" 
            className="not-found-image"
          />
          <p className="not-found-text">
            Mistakes happen, we’ve all made one.
          </p>
          <Link to="/" className="not-found-button">
            <span className="button-bg-orange"></span>
            <span className="button-bg-black"></span>
            <span className="button-content">Homepage</span>
          </Link>
        </div>
      </div>

      <style jsx="true">{`
        .not-found-page {
          background: #F9F9F8;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          margin: 0;
        }

        .not-found-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          text-align: center;
        }

        .not-found-image {
          width: 281px;
          height: 281px;
          object-fit: cover;
          border-radius: 4px;
        }

        .not-found-text {
          font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
          font-size: 12px;
          font-weight: 500;
          line-height: 1.2em;
          letter-spacing: 3%;
          color: #A3A3A3;
          text-transform: uppercase;
          margin: 0;
        }

        .not-found-button {
          position: relative;
          width: 141px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .button-bg-orange {
          position: absolute;
          width: 138px;
          height: 45px;
          background: #EE550E;
          left: 0.19px;
          top: 3.19px;
          transition: all 0.3s ease;
        }

        .button-bg-black {
          position: absolute;
          width: 138px;
          height: 45px;
          background: #26282B;
          left: 3px;
          top: 0;
          transition: all 0.3s ease;
        }

        .button-content {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          left: 32px;
          top: 13px;
          font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
          font-size: 14px;
          font-weight: 700;
          line-height: 0.9em;
          letter-spacing: 2%;
          text-transform: uppercase;
          color: #FFFFFF;
          transition: all 0.3s ease;
        }

        .not-found-button:hover .button-bg-orange {
          background: #26282B;
        }

        .not-found-button:hover .button-bg-black {
          background: #EE550E;
        }

        .not-found-button:hover .button-content {
          color: #FFFFFF;
        }

        @media (max-width: 768px) {
          .not-found-page {
            padding: 40px 20px;
          }

          .not-found-container {
            gap: 30px;
          }

          .not-found-image {
            width: 200px;
            height: 200px;
          }

          .not-found-text {
            font-size: 11px;
            letter-spacing: 2.5%;
          }

          .not-found-button {
            width: 120px;
            height: 40px;
          }

          .button-bg-orange,
          .button-bg-black {
            width: 117px;
            height: 37px;
          }

          .button-content {
            font-size: 12px;
            left: 25px;
            top: 10px;
          }
        }

        @media (max-width: 480px) {
          .not-found-page {
            padding: 20px 15px;
          }

          .not-found-container {
            gap: 25px;
          }

          .not-found-image {
            width: 160px;
            height: 160px;
          }

          .not-found-text {
            font-size: 10px;
            letter-spacing: 2%;
          }

          .not-found-button {
            width: 100px;
            height: 35px;
          }

          .button-bg-orange,
          .button-bg-black {
            width: 97px;
            height: 32px;
          }

          .button-content {
            font-size: 11px;
            left: 20px;
            top: 8px;
          }
        }
      `}</style>
    </Layout>
  )
}

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage