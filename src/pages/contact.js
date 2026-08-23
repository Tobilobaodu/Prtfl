import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const ContactPage = () => {
  return (
    <Layout>
      <div className="contact-container">
        <div className="container">
          <div className="intro">
            <h1 className="page-title">Let's Connect</h1>
            <p className="page-description">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out through any of the channels below.
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-card">
              <div className="icon-wrapper">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="14" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 6L12 13L21 6" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="contact-title">Email</h3>
              <p className="contact-info">your.email@example.com</p>
              <a href="mailto:your.email@example.com" className="contact-link">
                Send a message →
              </a>
            </div>

            <div className="contact-card">
              <div className="icon-wrapper">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M16 8C16 10.21 14.21 12 12 12C9.79 12 8 10.21 8 8C8 5.79 9.79 4 12 4C14.21 4 16 5.79 16 8Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 14C8.13 14 5 17.13 5 21H19C19 17.13 15.87 14 12 14Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="contact-title">LinkedIn</h3>
              <p className="contact-info">Connect with me professionally</p>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                View profile →
              </a>
            </div>

            <div className="contact-card">
              <div className="icon-wrapper">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="contact-title">Behance</h3>
              <p className="contact-info">View my design work</p>
              <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="contact-link">
                View portfolio →
              </a>
            </div>

            <div className="contact-card">
              <div className="icon-wrapper">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="3" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="contact-title">Dribbble</h3>
              <p className="contact-info">Check out my shots</p>
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                View work →
              </a>
            </div>

            <div className="contact-card">
              <div className="icon-wrapper">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.58 9.5 21.27 9.5 21C9.5 20.77 9.5 20.14 9.5 19.31C6.73 19.91 6.14 17.97 6.14 17.97C5.68 16.81 5.03 16.5 5.03 16.5C4.12 15.88 5.1 15.9 5.1 15.9C6.1 15.97 6.63 16.93 6.63 16.93C7.5 18.45 8.97 18 9.54 17.76C9.63 17.11 9.89 16.67 10.17 16.42C7.95 16.17 5.62 15.31 5.62 11.5C5.62 10.39 6 9.5 6.65 8.79C6.55 8.54 6.2 7.5 6.75 6.15C6.75 6.15 7.59 5.88 9.5 7.17C10.29 6.95 11.15 6.84 12 6.84C12.85 6.84 13.71 6.95 14.5 7.17C16.41 5.88 17.25 6.15 17.25 6.15C17.8 7.5 17.45 8.54 17.35 8.79C18 9.5 18.38 10.39 18.38 11.5C18.38 15.32 16.04 16.16 13.81 16.41C14.17 16.72 14.5 17.33 14.5 18.26C14.5 19.6 14.5 20.68 14.5 21C14.5 21.27 14.66 21.59 15.17 21.5C19.14 20.16 22 16.42 22 12C22 6.48 17.52 2 12 2Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="contact-title">GitHub</h3>
              <p className="contact-info">Explore my code</p>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                View repos →
              </a>
            </div>

            <div className="contact-card">
              <div className="icon-wrapper">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M22 4C22 2.9 21.1 2 20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="contact-title">ADPList</h3>
              <p className="contact-info">Book a mentorship session</p>
              <a href="https://adplist.org" target="_blank" rel="noopener noreferrer" className="contact-link">
                Schedule call →
              </a>
            </div>
          </div>

          <div className="cta-section">
            <h2 className="cta-title">Ready to start a project?</h2>
            <p className="cta-description">
              Whether you need a complete product design, want to improve an existing experience, or just want to discuss ideas, I'm here to help.
            </p>
            <a href="mailto:your.email@example.com" className="cta-button">
              Get in touch
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .contact-container {
          width: 100%;
          background: var(--white-not-wyt);
          min-height: calc(100vh - 85px);
        }

        .container {
          max-width: var(--container-max);
          margin: 0;
          margin-left: 0;
          padding: 101px var(--gutter) 60px;
        }

        .intro {
          text-align: center;
          margin-bottom: 60px;
        }

        .page-title {
          font-size: 48px;
          font-weight: 700;
          line-height: 95%;
          color: var(--black-pitch-nah);
          margin-bottom: 20px;
        }

        .page-description {
          font-size: 16px;
          font-weight: 400;
          line-height: 140%;
          letter-spacing: 0.32px;
          color: var(--grey-just);
          max-width: 600px;
          margin: 0 auto;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-bottom: 80px;
        }

        .contact-card {
          background: white;
          padding: 40px 30px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .contact-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(238, 85, 14, 0.15);
        }

        .icon-wrapper {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--orange);
        }

        .contact-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--black-pitch-nah);
        }

        .contact-info {
          font-size: 14px;
          font-weight: 400;
          line-height: 140%;
          color: var(--grey-just);
        }

        .contact-link {
          font-size: 14px;
          font-weight: 600;
          color: var(--orange);
          text-decoration: none;
          transition: opacity 0.3s ease;
        }

        .contact-link:hover {
          opacity: 0.7;
        }

        .cta-section {
          background: var(--black-nue-ish-black);
          padding: 60px;
          border-radius: 12px;
          text-align: center;
        }

        .cta-title {
          font-size: 36px;
          font-weight: 700;
          color: var(--white-heavenly);
          margin-bottom: 20px;
        }

        .cta-description {
          font-size: 16px;
          font-weight: 400;
          line-height: 150%;
          color: var(--grey-misty);
          margin-bottom: 40px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-button {
          display: inline-block;
          background: var(--orange);
          color: white;
          padding: 16px 48px;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          background: #d94a0c;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .container {
            padding: 100px 20px 60px 20px;
          }

          .page-title {
            font-size: 32px;
          }

          .contact-grid {
            grid-template-columns: 1fr;
          }

          .cta-section {
            padding: 40px 20px;
          }

          .cta-title {
            font-size: 28px;
          }
        }
      `}</style>
    </Layout>
  )
}

export const Head = ({ location }) => <Seo title="Contact" pathname={location?.pathname} />

export default ContactPage
