import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const AboutPage = () => {
  const experiences = [
    {
      period: "APR '22 – Present",
      title: "UX designer manager",
      company: "OSB Group",
      description: "I'm responsible for UX Strategy + Design, leading a team of three UX designers who are responsible for creating exceptional user experiences for OSB Group's digital products. I have established design standards to enhance our current design practices within the team, which has resulted in improved efficiency and consistency across all projects.",
      current: true
    },
    {
      period: "Jul '23 – Present",
      title: "UX design mentor",
      company: "DesignLab & ADPList",
      description: "Thrilled to be part of a team of seasoned designers, committed to fostering growth and development. My role involves regularly engaging with mentees, offering constructive feedback and unwavering support in the following key areas: strength discovery, UX design expertise, portfolio enhancement, job Interview Preparation.",
      current: true
    },
    {
      period: "Mar 2021 - '22",
      title: "Lead UI/UX designer",
      company: "iSixty Visual Design Company",
      description: "As the lead designer, I was responsible for designing interactive prototypes, user interfaces, and information architecture for a range of web and mobile applications. I created wireframes and storyboards to conceptualize design, leading to an average of 25% increase in user satisfaction for most of our clients. I also analyzed user feedback, UX research, and business requirements to create end-to-end detailed designs and experience maps for clients in a variety of industries.",
      current: false
    },
    {
      period: "FEB 2020 - '21",
      title: "Product designer",
      company: "Acumen Digital",
      description: "Designed comprehensive end-to-end products for two fintech start-ups, resulting in a 50% boost in user retention for the client. In addition, I spearheaded a new process for design approvals and feedback, leading to a significant 50% improvement in output quality. This involved clarifying design roles and responsibilities, setting standards for feedback and approvals, and establishing a systematic review process.",
      current: false
    },
    {
      period: "FEB 2020 - '21",
      title: "Lead growth strategist",
      company: "Big Cabal Media",
      description: "As the Lead Growth Strategist at Big Cabal Media, I boosted user growth and brand awareness through engaging campaigns. I collaborated with various business teams to meet their marketing needs and developed and executed monthly, quarterly, and annual marketing strategies for customer acquisition. Additionally, I explored and tested new partnership and channel opportunities. I created and maintained daily, weekly, and monthly reports and KPI dashboards to track campaign performance. I also led creative rotation and A/B testing, including optimizing ad copy and landing pages for better conversion rates. Furthermore, I assisted in developing, implementing, and testing new creative concepts across multiple media platforms.",
      current: false
    }
  ]

  return (
    <Layout>
      <div className="experience-container">
        <div className="container">
          <div className="experience-list">
            {experiences.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="period" style={{ color: exp.current ? '#1D1C1C' : '#A3A3A3' }}>
                  {exp.period}
                </div>
                <div className="job-info">
                  <div className="title-company">
                    <h3 className="job-title" style={{ color: exp.current ? '#EE550E' : '#1D1C1C' }}>
                      {exp.title}
                    </h3>
                    <span className="at-symbol">@</span>
                    <span className="company-name">{exp.company}</span>
                  </div>
                  <p className="job-description">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="download-cv-section">
            <div className="cv-footer">
              <svg width="79" height="79" viewBox="0 0 79 79" fill="none">
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="40" fill="#EE550E">TOBI</text>
              </svg>
              <p className="footer-text">
                Before Jumia I was with Start-up partner looking after digital channels and digital product, before SPA, I was with Kantar as a data analyst and running Zeus & Solace, a bespoke gentleman's clothing brand, this was 2 years after I finished uni.
              </p>
            </div>
          </div>

          <div className="download-button-wrapper">
            <button className="download-cv-button">
              <div className="button-shadow"></div>
              <div className="button-main">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 14L6 10H8V6H12V10H14L10 14Z" fill="white"/>
                  <path d="M4 16H16V18H4V16Z" fill="white"/>
                </svg>
                <span>Download CV</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .experience-container {
          width: 100%;
          background: var(--white-not-wyt);
          min-height: calc(100vh - 85px);
        }

        .container {
          max-width: 600px;
          margin: 0;
          margin-left: 0;
          padding: 101px 0px 60px 0px;
          position: relative;
        }

        .experience-list {
          display: flex;
          flex-direction: column;
          gap: 40px;
          margin-bottom: 100px;
        }

        .experience-item {
          display: flex;
          align-items: flex-start;
          gap: 50px;
        }

        .period {
          font-size: 12px;
          font-weight: 400;
          line-height: 120%;
          text-transform: uppercase;
          min-width: 120px;
        }

        .job-info {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .title-company {
          display: flex;
          align-items: center;
          gap: 5px;
          flex-wrap: wrap;
        }

        .job-title {
          font-size: 18px;
          font-weight: 700;
          line-height: 95%;
        }

        .at-symbol,
        .company-name {
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--black-pitch-nah);
        }

        .job-description {
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--black-pitch-nah);
        }

        .download-cv-section {
          display: flex;
          padding: 26px 0 0 119px;
          flex-direction: column;
          align-items: flex-end;
          gap: 15px;
          margin-bottom: 50px;
        }

        .cv-footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          max-width: 433px;
          padding-bottom: 50px;
        }

        .footer-text {
          text-align: center;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--black-pitch-nah);
        }

        .download-button-wrapper {
          display: flex;
          justify-content: flex-end;
          position: absolute;
          right: 0;
          top: 101px;
          margin-top: 0;
        }

        .download-cv-button {
          position: relative;
          width: 164px;
          height: 55px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .button-shadow {
          position: absolute;
          width: 153px;
          height: 45px;
          background: var(--orange);
          left: 8px;
          top: 3px;
        }

        .button-main {
          position: absolute;
          width: 153px;
          height: 45px;
          background: var(--black-nue-ish-black);
          left: 11px;
          top: 0px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2px;
          transition: all 0.2s ease;
        }

        .download-cv-button:hover .button-main {
          left: 8px;
          top: 3px;
        }

        .button-main span {
          color: var(--white-heavenly);
          font-size: 14px;
          font-weight: 700;
          line-height: 90%;
          letter-spacing: 0.28px;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .container {
            padding: 100px 20px 60px 20px;
          }

          .experience-item {
            flex-direction: column;
            gap: 20px;
          }

          .period {
            min-width: auto;
          }

          .download-cv-section {
            padding: 20px 0;
          }

          .download-button-wrapper {
            position: static;
            justify-content: center;
            margin-top: 40px;
          }
        }
      `}</style>
    </Layout>
  )
}

export const Head = () => <Seo title="About" />

export default AboutPage
