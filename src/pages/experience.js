import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const ExperiencePage = () => {
  const experiences = [
    {
      date: "APR '22 – Present",
      current: true,
      role: "UX designer manager",
      company: "OSB Group",
      description: "I'm responsible for UX Strategy + Design, leading a team of three UX designers who are responsible for creating exceptional user experiences for OSB Group's digital products. I have established design standards to enhance our current design practices within the team, which has resulted in improved efficiency and consistency across all projects."
    },
    {
      date: "Jul '23 – Present",
      current: true,
      role: "UX design mentor",
      company: "DesignLab & ADPList",
      description: "Thrilled to be part of a team of seasoned designers, committed to fostering growth and development. My role involves regularly engaging with mentees, offering constructive feedback and unwavering support in the following key areas: strength discovery, UX design expertise, portfolio enhancement, job Interview Preparation."
    },
    {
      date: "Mar 2021 - '22",
      current: false,
      role: "Lead UI/UX designer",
      company: "iSixty Visual Design Company",
      description: "As the lead designer, I was responsible for designing interactive prototypes, user interfaces, and information architecture for a range of web and mobile applications. I created wireframes and storyboards to conceptualize design, leading to an average of 25% increase in user satisfaction for most of our clients. I also analyzed user feedback, UX research, and business requirements to create end-to-end detailed designs and experience maps for clients in a variety of industries."
    },
    {
      date: "FEB 2020 - '21",
      current: false,
      role: "Product designer",
      company: "Acumen Digital",
      description: "Designed comprehensive end-to-end products for two fintech start-ups, resulting in a 50% boost in user retention for the client. In addition, I spearheaded a new process for design approvals and feedback, leading to a significant 50% improvement in output quality. This involved clarifying design roles and responsibilities, setting standards for feedback and approvals, and establishing a systematic review process."
    },
    {
      date: "FEB 2020 - '21",
      current: false,
      role: "Lead growth strategist",
      company: "Big Cabal Media",
      description: "As the Lead Growth Strategist at Big Cabal Media, I boosted user growth and brand awareness through engaging campaigns. I collaborated with various business teams to meet their marketing needs and developed and executed monthly, quarterly, and annual marketing strategies for customer acquisition. Additionally, I explored and tested new partnership and channel opportunities.\n\nI created and maintained daily, weekly, and monthly reports and KPI dashboards to track campaign performance. I also led creative rotation and A/B testing, including optimizing ad copy and landing pages for better conversion rates. Furthermore, I assisted in developing, implementing, and testing new creative concepts across multiple media platforms."
    },
    {
      date: "FEB 2020 - '21",
      current: false,
      role: "Lead Growth Strategist",
      company: "Big Cabal Media",
      description: "As the Lead Growth Strategist at Big Cabal Media, I boosted user growth and brand awareness through engaging campaigns. I collaborated with various business teams to meet their marketing needs and developed and executed monthly, quarterly, and annual marketing strategies for customer acquisition. Additionally, I explored and tested new partnership and channel opportunities.\n\nI created and maintained daily, weekly, and monthly reports and KPI dashboards to track campaign performance. I also led creative rotation and A/B testing, including optimizing ad copy and landing pages for better conversion rates. Furthermore, I assisted in developing, implementing, and testing new creative concepts across multiple media platforms."
    },
    {
      date: "FEB 2020 - '21",
      current: false,
      role: "Lead Growth Strategist",
      company: "RADP (Ringier Africa Digital Publishing)",
      description: "As the Lead Growth Strategist at Big Cabal Media, I boosted user growth and brand awareness through engaging campaigns. I collaborated with various business teams to meet their marketing needs and developed and executed monthly, quarterly, and annual marketing strategies for customer acquisition. Additionally, I explored and tested new partnership and channel opportunities.\n\nI created and maintained daily, weekly, and monthly reports and KPI dashboards to track campaign performance. I also led creative rotation and A/B testing, including optimizing ad copy and landing pages for better conversion rates. Furthermore, I assisted in developing, implementing, and testing new creative concepts across multiple media platforms."
    },
    {
      date: "FEB 2020 - '21",
      current: false,
      role: "Lead Growth Strategist",
      company: "JUMIA",
      description: "As the Lead Growth Strategist at Big Cabal Media, I boosted user growth and brand awareness through engaging campaigns. I collaborated with various business teams to meet their marketing needs and developed and executed monthly, quarterly, and annual marketing strategies for customer acquisition. Additionally, I explored and tested new partnership and channel opportunities.\n\nI created and maintained daily, weekly, and monthly reports and KPI dashboards to track campaign performance. I also led creative rotation and A/B testing, including optimizing ad copy and landing pages for better conversion rates. Furthermore, I assisted in developing, implementing, and testing new creative concepts across multiple media platforms."
    }
  ]

  return (
    <Layout>
      <div className="experience-container">
        <div className="container">
          <div className="experience-list">
            {experiences.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="experience-date">
                  <span className={exp.current ? "current" : "past"}>{exp.date}</span>
                </div>
                <div className="experience-details">
                  <div className="role-company">
                    <h3 className={`role-title ${exp.current && index === 0 ? "highlighted" : ""}`}>
                      {exp.role}
                    </h3>
                    <span className="at-symbol">@</span>
                    <span className="company-name">{exp.company}</span>
                  </div>
                  <p className="experience-description">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="end-section">
            <svg width="79" height="24" viewBox="0 0 79 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.97874 1.0038H10.0213V20H4.97874V1.0038Z" fill="#EE550E"/>
              <path d="M0 6.20068V1H15V6.20068H0Z" fill="#EE550E"/>
              <path d="M20.5423 5.08242L24.7244 1L40 15.9116L35.8179 19.994L20.5423 5.08242Z" fill="#EE550E"/>
              <path d="M35.2756 1.00598L39.4577 5.0884L24.1821 20L20 15.9176L35.2756 1.00598Z" fill="#EE550E"/>
              <path d="M45.0396 3.82042L48.7724 0L59 10.4678L55.2672 14.2882L45.0396 3.82042Z" fill="#EE550E"/>
              <path d="M55.2276 6.71177L58.9604 10.5322L48.7328 21L45 17.1796L55.2276 6.71177Z" fill="#EE550E"/>
              <path d="M64 1H69V20H64V1Z" fill="#EE550E"/>
            </svg>
            <p className="footer-text">
              Before Jumia I was with Start-up partner looking after digital channels and digital product, before SPA, I was with Kantar as a data analyst and running Zeus & Solace, a bespoke gentleman's clothing brand, this was 2 years after I finished uni.
            </p>
          </div>

          <div className="download-button-wrapper">
            <button className="download-button">
              <div className="button-bg-orange"></div>
              <div className="button-bg-black"></div>
              <div className="button-content">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 14L6 10H8V6H12V10H14L10 14Z" fill="#FFF"/>
                  <path d="M4 16H16V18H4V16Z" fill="#FFF"/>
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
          padding: 97px 0 60px 0;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .experience-list {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .experience-item {
          display: flex;
          gap: 50px;
        }

        .experience-date {
          min-width: 100px;
        }

        .experience-date span {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 12px;
          line-height: 120%;
          text-transform: uppercase;
        }

        .experience-date .current {
          font-weight: 400;
          color: var(--black-pitch-nah);
        }

        .experience-date .past {
          font-weight: 400;
          color: var(--grey-misty);
        }

        .experience-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .role-company {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .role-title {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 18px;
          font-weight: 700;
          line-height: 95%;
          color: var(--black-pitch-nah);
        }

        .role-title.highlighted {
          color: var(--orange);
        }

        .at-symbol,
        .company-name {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--black-pitch-nah);
        }

        .experience-description {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--black-pitch-nah);
          white-space: pre-line;
        }

        .end-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          padding: 26px 0 50px 119px;
        }

        .end-section svg {
          width: 78.728px;
          height: auto;
        }

        .footer-text {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          text-align: center;
          color: var(--black-pitch-nah);
          max-width: 433px;
        }

        .download-button-wrapper {
          position: fixed;
          right: 100px;
          top: 50%;
          transform: translateY(-50%);
        }

        .download-button {
          position: relative;
          width: 164px;
          height: 55px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .button-bg-orange {
          position: absolute;
          width: 153px;
          height: 45px;
          background: var(--orange);
          left: 8px;
          top: 3px;
        }

        .button-bg-black {
          position: absolute;
          width: 153px;
          height: 45px;
          background: var(--black-nue-ish-black);
          left: 11px;
          top: 0;
        }

        .button-content {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2px;
          left: 20px;
          top: 13px;
          color: var(--white-heavenly);
        }

        .button-content span {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
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
            gap: 10px;
          }

          .end-section {
            padding: 26px 0 50px 0;
          }

          .download-button-wrapper {
            position: relative;
            right: auto;
            top: auto;
            transform: none;
            display: flex;
            justify-content: center;
            margin-top: 40px;
          }
        }

        @media (max-width: 480px) {
          .experience-container {
            background: #F9F9F8;
            min-height: calc(100vh - 84px);
          }

          .container {
            max-width: 100%;
            padding: 134px 40px 0 40px;
            gap: 20px;
          }

          .experience-list {
            gap: 20px;
          }

          .experience-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
          }

          .experience-date {
            min-width: auto;
            text-align: center;
          }

          .experience-date span {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 12px;
            font-weight: 400;
            line-height: 120%;
            text-transform: uppercase;
          }

          .experience-date .current {
            color: #1D1C1C;
          }

          .experience-date .past {
            color: #A3A3A3;
          }

          .experience-details {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            text-align: center;
          }

          .role-company {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }

          .role-title {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 18px;
            font-weight: 700;
            line-height: 95%;
            color: #1D1C1C;
          }

          .role-title.highlighted {
            color: #EE550E;
          }

          .at-symbol,
          .company-name {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 120%;
            letter-spacing: 0.42px;
            color: #1D1C1C;
          }

          .experience-description {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 120%;
            letter-spacing: 0.42px;
            color: #1D1C1C;
            text-align: center;
          }

          .end-section {
            display: flex;
            padding-top: 26px;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            padding-bottom: 25px;
          }

          .end-section svg {
            width: 78.728px;
            height: auto;
          }

          .footer-text {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 120%;
            letter-spacing: 0.42px;
            text-align: center;
            color: #1D1C1C;
            max-width: 100%;
          }

          .download-button-wrapper {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            transform: none;
            display: flex;
            justify-content: flex-start;
            margin-top: 0;
            z-index: 100;
          }

          .download-button {
            position: relative;
            width: 100%;
            height: 50px;
            background: #EE550E;
            border: none;
            cursor: pointer;
            padding: 15px 20px;
          }

          .button-bg-orange,
          .button-bg-black {
            display: none;
          }

          .button-content {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 2px;
            left: 0;
            top: 0;
            color: #FFF;
          }

          .button-content span {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 700;
            line-height: 90%;
            text-transform: uppercase;
          }
        }
      `}</style>
    </Layout>
  )
}

export const Head = () => <Seo title="Experience" />

export default ExperiencePage
