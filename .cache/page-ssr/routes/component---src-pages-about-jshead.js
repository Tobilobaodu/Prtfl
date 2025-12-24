exports.id = "component---src-pages-about-jshead";
exports.ids = ["component---src-pages-about-jshead"];
exports.modules = {

/***/ "./public/page-data/sq/d/63159454.json":
/*!*********************************************!*\
  !*** ./public/page-data/sq/d/63159454.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"data":{"site":{"siteMetadata":{"title":"TOBI - UX Designer Portfolio","description":"Multidisciplinary designer passionate about design, technology, and how they shape our lives. Portfolio showcasing UX design work, case studies, and photography.","author":"Tobi"}}}}');

/***/ }),

/***/ "./src/components/layout.css":
/*!***********************************!*\
  !*** ./src/components/layout.css ***!
  \***********************************/
/***/ (() => {



/***/ }),

/***/ "./src/components/layout.js":
/*!**********************************!*\
  !*** ./src/components/layout.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var _layout_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout.css */ "./src/components/layout.css");
/* harmony import */ var _layout_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_layout_css__WEBPACK_IMPORTED_MODULE_2__);



const Layout = ({
  children
}) => {
  const [menuOpen, setMenuOpen] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("nav", {
    className: "navigation"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/",
    className: "logo"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    width: "69",
    height: "21",
    viewBox: "0 0 69 21",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M4.97874 1.0038H10.0213V20H4.97874V1.0038Z",
    fill: "#EE550E"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M0 6.20068V1H15V6.20068H0Z",
    fill: "#EE550E"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M20.5423 5.08242L24.7244 1L40 15.9116L35.8179 19.994L20.5423 5.08242Z",
    fill: "#EE550E"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M35.2756 1.00598L39.4577 5.0884L24.1821 20L20 15.9176L35.2756 1.00598Z",
    fill: "#EE550E"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M45.0396 3.82042L48.7724 0L59 10.4678L55.2672 14.2882L45.0396 3.82042Z",
    fill: "#EE550E"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M55.2276 6.71177L58.9604 10.5322L48.7328 21L45 17.1796L55.2276 6.71177Z",
    fill: "#EE550E"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M64 1H69V20H64V1Z",
    fill: "#EE550E"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    className: `menu-icon ${menuOpen ? 'open' : ''}`,
    onClick: () => setMenuOpen(!menuOpen),
    "aria-label": "Toggle menu"
  }, menuOpen ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M13.5 4.5V10.5H19.5V13.5H13.5V19.5H10.5V13.5H4.5V10.5H10.5V4.5H13.5Z",
    fill: "#EE550E",
    stroke: "#EE550E",
    transform: "rotate(45 12 12)"
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    clipPath: "url(#clip0)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M13.5 4.5V10.5H19.5V13.5H13.5V19.5H10.5V13.5H4.5V10.5H10.5V4.5H13.5Z",
    fill: "#EE550E",
    stroke: "#EE550E"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("clipPath", {
    id: "clip0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
    width: "24",
    height: "24",
    fill: "white"
  })))))), menuOpen && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "menu-blur-overlay",
    onClick: () => setMenuOpen(false)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "menu-panel"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("nav", {
    className: "menu-nav"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/portfolio",
    className: "menu-link",
    onClick: () => setMenuOpen(false)
  }, "WRKS"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/experience",
    className: "menu-link",
    onClick: () => setMenuOpen(false)
  }, "XPRNC"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/sndbx",
    className: "menu-link",
    onClick: () => setMenuOpen(false)
  }, "SNDBX"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/photography",
    className: "menu-link",
    onClick: () => setMenuOpen(false)
  }, "PHTGRPHY"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/ntpd",
    className: "menu-link",
    onClick: () => setMenuOpen(false)
  }, "NTPD"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/cntct",
    className: "menu-link",
    onClick: () => setMenuOpen(false)
  }, "CNTCT")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("main", null, children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("style", {
    jsx: "true"
  }, `
        .navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 32px 100px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: var(--white-not-wyt);
        }

        .logo {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo svg {
          height: 21px;
          width: auto;
        }

        .menu-icon {
          width: 24px;
          height: 24px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          z-index: 101;
          position: relative;
          transition: transform 0.3s ease;
        }

        .menu-icon.open {
          transform: rotate(45deg);
        }

        .menu-blur-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(2.5px);
          z-index: 99;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .menu-panel {
          position: fixed;
          top: 57px;
          right: 100px;
          width: 76px;
          background: transparent;
          z-index: 100;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .menu-nav {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
        }

        .menu-link {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          line-height: 120%;
          color: var(--black-pitch-nah);
          text-decoration: none;
          transition: color 0.2s ease;
          padding: 5px 0;
        }

        .menu-link:hover {
          color: var(--orange);
        }

        main {
          padding-top: 0px;
          min-height: calc(100vh - 0px);
        }

        @media (max-width: 768px) {
          .navigation {
            padding: 32px 20px;
          }

          .menu-panel {
            right: 20px;
            top: 70px;
          }

          .menu-link {
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .navigation {
            display: flex;
            width: 100%;
            padding: 30px 40px;
            justify-content: space-between;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 84px;
            z-index: 100;
            background: var(--white-not-wyt);
          }

          .logo {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
          }

          .logo svg {
            height: auto;
            width: auto;
          }

          .menu-icon {
            width: 24px;
            height: 24px;
            flex-shrink: 0;
          }

          .menu-panel {
            right: 40px;
            top: 84px;
          }

          .menu-nav {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 10px;
          }

          .menu-link {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 600;
            line-height: 120%;
            color: var(--black-pitch-nah);
          }

          main {
            padding-top: 0;
            min-height: calc(100vh - 84px);
          }
        }
      `));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

/***/ }),

/***/ "./src/components/seo.js":
/*!*******************************!*\
  !*** ./src/components/seo.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_63159454_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/page-data/sq/d/63159454.json */ "./public/page-data/sq/d/63159454.json");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */


function Seo({
  description,
  title,
  children
}) {
  var _site$siteMetadata, _site$siteMetadata2;
  const {
    site
  } = _public_page_data_sq_d_63159454_json__WEBPACK_IMPORTED_MODULE_0__.data;
  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = (_site$siteMetadata = site.siteMetadata) === null || _site$siteMetadata === void 0 ? void 0 : _site$siteMetadata.title;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("title", null, defaultTitle ? `${title} | ${defaultTitle}` : title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("meta", {
    name: "description",
    content: metaDescription
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("meta", {
    property: "og:title",
    content: title
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("meta", {
    property: "og:description",
    content: metaDescription
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("meta", {
    property: "og:type",
    content: "website"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("meta", {
    name: "twitter:card",
    content: "summary"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("meta", {
    name: "twitter:creator",
    content: ((_site$siteMetadata2 = site.siteMetadata) === null || _site$siteMetadata2 === void 0 ? void 0 : _site$siteMetadata2.author) || ``
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("meta", {
    name: "twitter:title",
    content: title
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("meta", {
    name: "twitter:description",
    content: metaDescription
  }), children);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Seo);

/***/ }),

/***/ "./src/pages/about.js?export=head":
/*!****************************************!*\
  !*** ./src/pages/about.js?export=head ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Head: () => (/* binding */ Head),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/layout */ "./src/components/layout.js");
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/seo */ "./src/components/seo.js");



const AboutPage = () => {
  const experiences = [{
    period: "APR '22 – Present",
    title: "UX designer manager",
    company: "OSB Group",
    description: "I'm responsible for UX Strategy + Design, leading a team of three UX designers who are responsible for creating exceptional user experiences for OSB Group's digital products. I have established design standards to enhance our current design practices within the team, which has resulted in improved efficiency and consistency across all projects.",
    current: true
  }, {
    period: "Jul '23 – Present",
    title: "UX design mentor",
    company: "DesignLab & ADPList",
    description: "Thrilled to be part of a team of seasoned designers, committed to fostering growth and development. My role involves regularly engaging with mentees, offering constructive feedback and unwavering support in the following key areas: strength discovery, UX design expertise, portfolio enhancement, job Interview Preparation.",
    current: true
  }, {
    period: "Mar 2021 - '22",
    title: "Lead UI/UX designer",
    company: "iSixty Visual Design Company",
    description: "As the lead designer, I was responsible for designing interactive prototypes, user interfaces, and information architecture for a range of web and mobile applications. I created wireframes and storyboards to conceptualize design, leading to an average of 25% increase in user satisfaction for most of our clients. I also analyzed user feedback, UX research, and business requirements to create end-to-end detailed designs and experience maps for clients in a variety of industries.",
    current: false
  }, {
    period: "FEB 2020 - '21",
    title: "Product designer",
    company: "Acumen Digital",
    description: "Designed comprehensive end-to-end products for two fintech start-ups, resulting in a 50% boost in user retention for the client. In addition, I spearheaded a new process for design approvals and feedback, leading to a significant 50% improvement in output quality. This involved clarifying design roles and responsibilities, setting standards for feedback and approvals, and establishing a systematic review process.",
    current: false
  }, {
    period: "FEB 2020 - '21",
    title: "Lead growth strategist",
    company: "Big Cabal Media",
    description: "As the Lead Growth Strategist at Big Cabal Media, I boosted user growth and brand awareness through engaging campaigns. I collaborated with various business teams to meet their marketing needs and developed and executed monthly, quarterly, and annual marketing strategies for customer acquisition. Additionally, I explored and tested new partnership and channel opportunities. I created and maintained daily, weekly, and monthly reports and KPI dashboards to track campaign performance. I also led creative rotation and A/B testing, including optimizing ad copy and landing pages for better conversion rates. Furthermore, I assisted in developing, implementing, and testing new creative concepts across multiple media platforms.",
    current: false
  }];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_layout__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "experience-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "experience-list"
  }, experiences.map((exp, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    key: index,
    className: "experience-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "period",
    style: {
      color: exp.current ? '#1D1C1C' : '#A3A3A3'
    }
  }, exp.period), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "job-info"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "title-company"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", {
    className: "job-title",
    style: {
      color: exp.current ? '#EE550E' : '#1D1C1C'
    }
  }, exp.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "at-symbol"
  }, "@"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "company-name"
  }, exp.company)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "job-description"
  }, exp.description))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "download-cv-section"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "cv-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    width: "79",
    height: "79",
    viewBox: "0 0 79 79",
    fill: "none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("text", {
    x: "50%",
    y: "50%",
    dominantBaseline: "middle",
    textAnchor: "middle",
    fontSize: "40",
    fill: "#EE550E"
  }, "TOBI")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "footer-text"
  }, "Before Jumia I was with Start-up partner looking after digital channels and digital product, before SPA, I was with Kantar as a data analyst and running Zeus & Solace, a bespoke gentleman's clothing brand, this was 2 years after I finished uni."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "download-button-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    className: "download-cv-button"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "button-shadow"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "button-main"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M10 14L6 10H8V6H12V10H14L10 14Z",
    fill: "white"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M4 16H16V18H4V16Z",
    fill: "white"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, "Download CV")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("style", {
    jsx: "true"
  }, `
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
          margin-top: -580px;
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
            justify-content: center;
            margin-top: 40px;
          }
        }
      `));
};
const Head = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_seo__WEBPACK_IMPORTED_MODULE_2__["default"], {
  title: "About"
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AboutPage);

/***/ })

};
;
//# sourceMappingURL=component---src-pages-about-jshead.js.map