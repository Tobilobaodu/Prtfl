import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const ExperiencePage = ({ data }) => {
  const experiences = [
    {
      startDate: "2022-04-01",
      endDate: null,
      current: true,
      role: "UX designer manager",
      company: "OSB Group",
      description: "I'm responsible for UX Strategy + Design, leading a team of three UX designers who are responsible for creating exceptional user experiences for OSB Group's digital products. I have established design standards to enhance our current design practices within the team, which has resulted in improved efficiency and consistency across all projects."
    },
    {
      startDate: "2023-07-01",
      endDate: null,
      current: true,
      role: "UX design mentor",
      company: "DesignLab & ADPList",
      description: "Thrilled to be part of a team of seasoned designers, committed to fostering growth and development. My role involves regularly engaging with mentees, offering constructive feedback and unwavering support in the following key areas: strength discovery, UX design expertise, portfolio enhancement, job Interview Preparation."
    },
    {
      startDate: "2021-03-01",
      endDate: "2022-03-01",
      current: false,
      role: "Lead UI/UX designer",
      company: "iSixty Visual Design Company",
      description: "As the lead designer, I was responsible for designing interactive prototypes, user interfaces, and information architecture for a range of web and mobile applications. I created wireframes and storyboards to conceptualize design, leading to an average of 25% increase in user satisfaction for most of our clients. I also analyzed user feedback, UX research, and business requirements to create end-to-end detailed designs and experience maps for clients in a variety of industries."
    },
    {
      startDate: "2020-02-01",
      endDate: "2021-02-01",
      current: false,
      role: "Product designer",
      company: "Acumen Digital",
      description: "Designed comprehensive end-to-end products for two fintech start-ups, resulting in a 50% boost in user retention for the client. In addition, I spearheaded a new process for design approvals and feedback, leading to a significant 50% improvement in output quality. This involved clarifying design roles and responsibilities, setting standards for feedback and approvals, and establishing a systematic review process."
    },
    {
      startDate: "2020-02-01",
      endDate: "2021-02-01",
      current: false,
      role: "Lead growth strategist",
      company: "Big Cabal Media",
      description: "As the Lead Growth Strategist at Big Cabal Media, I boosted user growth and brand awareness through engaging campaigns. I collaborated with various business teams to meet their marketing needs and developed and executed monthly, quarterly, and annual marketing strategies for customer acquisition. Additionally, I explored and tested new partnership and channel opportunities.\n\nI created and maintained daily, weekly, and monthly reports and KPI dashboards to track campaign performance. I also led creative rotation and A/B testing, including optimizing ad copy and landing pages for better conversion rates. Furthermore, I assisted in developing, implementing, and testing new creative concepts across multiple media platforms."
    },
    {
      startDate: "2020-02-01",
      endDate: "2021-02-01",
      current: false,
      role: "Lead Growth Strategist",
      company: "Big Cabal Media",
      description: "As the Lead Growth Strategist at Big Cabal Media, I boosted user growth and brand awareness through engaging campaigns. I collaborated with various business teams to meet their marketing needs and developed and executed monthly, quarterly, and annual marketing strategies for customer acquisition. Additionally, I explored and tested new partnership and channel opportunities.\n\nI created and maintained daily, weekly, and monthly reports and KPI dashboards to track campaign performance. I also led creative rotation and A/B testing, including optimizing ad copy and landing pages for better conversion rates. Furthermore, I assisted in developing, implementing, and testing new creative concepts across multiple media platforms."
    },
    {
      startDate: "2020-02-01",
      endDate: "2021-02-01",
      current: false,
      role: "Lead Growth Strategist",
      company: "RADP (Ringier Africa Digital Publishing)",
      description: "As the Lead Growth Strategist at Big Cabal Media, I boosted user growth and brand awareness through engaging campaigns. I collaborated with various business teams to meet their marketing needs and developed and executed monthly, quarterly, and annual marketing strategies for customer acquisition. Additionally, I explored and tested new partnership and channel opportunities.\n\nI created and maintained daily, weekly, and monthly reports and KPI dashboards to track campaign performance. I also led creative rotation and A/B testing, including optimizing ad copy and landing pages for better conversion rates. Furthermore, I assisted in developing, implementing, and testing new creative concepts across multiple media platforms."
    },
    {
      startDate: "2020-02-01",
      endDate: "2021-02-01",
      current: false,
      role: "Lead Growth Strategist",
      company: "JUMIA",
      description: "As the Lead Growth Strategist at Big Cabal Media, I boosted user growth and brand awareness through engaging campaigns. I collaborated with various business teams to meet their marketing needs and developed and executed monthly, quarterly, and annual marketing strategies for customer acquisition. Additionally, I explored and tested new partnership and channel opportunities.\n\nI created and maintained daily, weekly, and monthly reports and KPI dashboards to track campaign performance. I also led creative rotation and A/B testing, including optimizing ad copy and landing pages for better conversion rates. Furthermore, I assisted in developing, implementing, and testing new creative concepts across multiple media platforms."
    }
  ]

  // Helper function to format dates for display
  const formatDateForDisplay = (startDate, endDate, isCurrent) => {
    if (!startDate) return '';

    // Handle null/undefined endDate for current roles
    if (isCurrent) {
      const start = new Date(startDate);
      if (isNaN(start.getTime())) return startDate; // Fallback to string if invalid
      const startText = start.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      return `${startText} – Present`;
    }

    // Handle past roles with endDate
    const start = new Date(startDate);
    if (isNaN(start.getTime())) return startDate; // Fallback to string if invalid

    const startText = start.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });

    if (endDate && endDate !== 'null' && endDate !== '') {
      const end = new Date(endDate);
      if (isNaN(end.getTime())) return startText;
      const endText = end.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      return `${startText} – ${endText}`;
    }

    return startText;
  };

  // Fallback: Use Sanity data if available, otherwise use hardcoded data
  const sanityExperiences = data?.allSanityExperience?.nodes || []

  // Helper function to safely parse dates for sorting
  const parseDateForSorting = (dateString) => {
    if (!dateString) return new Date(0) // Earliest possible date
    const date = new Date(dateString)
    return isNaN(date.getTime()) ? new Date(0) : date
  }

  // Sort Sanity data: Current roles first, then by start date descending
  const sortedSanityExperiences = [...sanityExperiences].sort((a, b) => {
    if (a.current && !b.current) return -1
    if (!a.current && b.current) return 1
    return parseDateForSorting(b.startDate) - parseDateForSorting(a.startDate)
  })

  // Final list of experiences to display
  const displayExperiences = sortedSanityExperiences.length > 0 ? sortedSanityExperiences : experiences

  return (
    <Layout>
      <div className="experience-container">
        <div className="container">
          <div className="experience-list">
            {displayExperiences.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="experience-date">
                  <span className={exp.current ? "current" : "past"}>
                    {formatDateForDisplay(exp.startDate, exp.endDate, exp.current)}
                  </span>
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
            <svg width="80" height="32" viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.32 0.420583H20.9026V13.5066H17.32V0.420583Z" fill="#1D1C1C" />
              <path d="M13.7827 4.00059V0.417969H24.4399V4.00059H13.7827Z" fill="#1D1C1C" />
              <path d="M29.8021 3.25667L32.5949 0.463867L42.796 10.665L40.0032 13.4578L29.8021 3.25667Z" fill="#1D1C1C" />
              <path d="M39.641 0.467958L42.4338 3.26076L32.2327 13.4618L29.4399 10.669L39.641 0.467958Z" fill="#1D1C1C" />
              <path d="M47.8228 2.53329L50.3561 0L57.2972 6.94114L54.7639 9.47443L47.8228 2.53329Z" fill="#1D1C1C" />
              <path d="M54.737 4.45053L57.2703 6.98382L50.3292 13.925L47.7959 11.3917L54.737 4.45053Z" fill="#1D1C1C" />
              <path d="M62.2974 0.419922H65.88V13.5059H62.2974V0.419922Z" fill="#1D1C1C" />
              <path d="M0.467529 30.1208L12.0387 23.9991L21.05 30.2917L33.2018 23.9248L41.1544 30.5356L52.6744 23.9912L61.2189 30.4902L69.8286 24.2208L78.7221 29.8124L79.1951 29.2476" stroke="#EE550E" strokeWidth="2" />
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
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 3.75V12.5215L14.9375 8.58398L16.3535 10L10 16.3535L3.64648 10L5.0625 8.58398L9 12.5215V3.75H11Z" fill="white" stroke="white" strokeWidth="0.5" />
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
          font-size: 16px;
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
          top: 90%;
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
            font-size: 16px;
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

export const query = graphql`
  query ExperiencePageQuery {
    allSanityExperience {
      nodes {
        company
        role
        startDate
        endDate
        current
        description
      }
    }
  }
`
