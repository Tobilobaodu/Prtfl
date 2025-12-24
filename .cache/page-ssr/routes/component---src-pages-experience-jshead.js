exports.id = "component---src-pages-experience-jshead";
exports.ids = ["component---src-pages-experience-jshead"];
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

/***/ "./src/pages/experience.js?export=head":
/*!*********************************************!*\
  !*** ./src/pages/experience.js?export=head ***!
  \*********************************************/
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



const ExperiencePage = () => {
  const experiences = [{
    date: "APR '22 – Present",
    current: true,
    role: "UX designer manager",
    company: "OSB Group",
    description: "I'm responsible for UX Strategy + Design, leading a team of three UX designers who are responsible for creating exceptional user experiences for OSB Group's digital products. I have established design standards to enhance our current design practices within the team, which has resulted in improved efficiency and consistency across all projects."
  }, {
    date: "Jul '23 – Present",
    current: true,
    role: "UX design mentor",
    company: "DesignLab & ADPList",
    description: "Thrilled to be part of a team of seasoned designers, committed to fostering growth and development. My role involves regularly engaging with mentees, offering constructive feedback and unwavering support in the following key areas: strength discovery, UX design expertise, portfolio enhancement, job Interview Preparation."
  }, {
    date: "Mar 2021 - '22",
    current: false,
    role: "Lead UI/UX designer",
    company: "iSixty Visual Design Company",
    description: "As the lead designer, I was responsible for designing interactive prototypes, user interfaces, and information architecture for a range of web and mobile applications. I created wireframes and storyboards to conceptualize design, leading to an average of 25% increase in user satisfaction for most of our clients. I also analyzed user feedback, UX research, and business requirements to create end-to-end detailed designs and experience maps for clients in a variety of industries."
  }, {
    date: "FEB 2020 - '21",
    current: false,
    role: "Product designer",
    company: "Acumen Digital",
    description: "Designed comprehensive end-to-end products for two fintech start-ups, resulting in a 50% boost in user retention for the client. In addition, I spearheaded a new process for design approvals and feedback, leading to a significant 50% improvement in output quality. This involved clarifying design roles and responsibilities, setting standards for feedback and approvals, and establishing a systematic review process."
  }, {
    date: "FEB 2020 - '21",
    current: false,
    role: "Lead growth strategist",
    company: "Big Cabal Media",
    description: "As the Lead Growth Strategist at Big Cabal Media, I boosted user growth and brand awareness through engaging campaigns. I collaborated with various business teams to meet their marketing needs and developed and executed monthly, quarterly, and annual marketing strategies for customer acquisition. Additionally, I explored and tested new partnership and channel opportunities.\n\nI created and maintained daily, weekly, and monthly reports and KPI dashboards to track campaign performance. I also led creative rotation and A/B testing, including optimizing ad copy and landing pages for better conversion rates. Furthermore, I assisted in developing, implementing, and testing new creative concepts across multiple media platforms."
  }, {
    date: "FEB 2020 - '21",
    current: false,
    role: "Lead Growth Strategist",
    company: "Big Cabal Media",
    description: "As the Lead Growth Strategist at Big Cabal Media, I boosted user growth and brand awareness through engaging campaigns. I collaborated with various business teams to meet their marketing needs and developed and executed monthly, quarterly, and annual marketing strategies for customer acquisition. Additionally, I explored and tested new partnership and channel opportunities.\n\nI created and maintained daily, weekly, and monthly reports and KPI dashboards to track campaign performance. I also led creative rotation and A/B testing, including optimizing ad copy and landing pages for better conversion rates. Furthermore, I assisted in developing, implementing, and testing new creative concepts across multiple media platforms."
  }, {
    date: "FEB 2020 - '21",
    current: false,
    role: "Lead Growth Strategist",
    company: "RADP (Ringier Africa Digital Publishing)",
    description: "As the Lead Growth Strategist at Big Cabal Media, I boosted user growth and brand awareness through engaging campaigns. I collaborated with various business teams to meet their marketing needs and developed and executed monthly, quarterly, and annual marketing strategies for customer acquisition. Additionally, I explored and tested new partnership and channel opportunities.\n\nI created and maintained daily, weekly, and monthly reports and KPI dashboards to track campaign performance. I also led creative rotation and A/B testing, including optimizing ad copy and landing pages for better conversion rates. Furthermore, I assisted in developing, implementing, and testing new creative concepts across multiple media platforms."
  }, {
    date: "FEB 2020 - '21",
    current: false,
    role: "Lead Growth Strategist",
    company: "JUMIA",
    description: "As the Lead Growth Strategist at Big Cabal Media, I boosted user growth and brand awareness through engaging campaigns. I collaborated with various business teams to meet their marketing needs and developed and executed monthly, quarterly, and annual marketing strategies for customer acquisition. Additionally, I explored and tested new partnership and channel opportunities.\n\nI created and maintained daily, weekly, and monthly reports and KPI dashboards to track campaign performance. I also led creative rotation and A/B testing, including optimizing ad copy and landing pages for better conversion rates. Furthermore, I assisted in developing, implementing, and testing new creative concepts across multiple media platforms."
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
    className: "experience-date"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: exp.current ? "current" : "past"
  }, exp.date)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "experience-details"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "role-company"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", {
    className: `role-title ${exp.current && index === 0 ? "highlighted" : ""}`
  }, exp.role), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "at-symbol"
  }, "@"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "company-name"
  }, exp.company)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "experience-description"
  }, exp.description))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "end-section"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    width: "79",
    height: "24",
    viewBox: "0 0 79 24",
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
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "footer-text"
  }, "Before Jumia I was with Start-up partner looking after digital channels and digital product, before SPA, I was with Kantar as a data analyst and running Zeus & Solace, a bespoke gentleman's clothing brand, this was 2 years after I finished uni.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "download-button-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    className: "download-button"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "button-bg-orange"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "button-bg-black"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "button-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M10 14L6 10H8V6H12V10H14L10 14Z",
    fill: "#FFF"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M4 16H16V18H4V16Z",
    fill: "#FFF"
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
      `));
};
const Head = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_seo__WEBPACK_IMPORTED_MODULE_2__["default"], {
  title: "Experience"
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ExperiencePage);

/***/ })

};
;
//# sourceMappingURL=component---src-pages-experience-jshead.js.map