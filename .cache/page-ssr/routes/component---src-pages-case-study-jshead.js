exports.id = "component---src-pages-case-study-jshead";
exports.ids = ["component---src-pages-case-study-jshead"];
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

/***/ "./src/pages/case-study.js?export=head":
/*!*********************************************!*\
  !*** ./src/pages/case-study.js?export=head ***!
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
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/layout */ "./src/components/layout.js");
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/seo */ "./src/components/seo.js");




const CaseStudyPage = () => {
  const [isMenuOpen, setIsMenuOpen] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const relatedProjects = [{
    title: "The name of project",
    brand: "Brand name",
    year: "2021"
  }, {
    title: "Banking the right way",
    brand: "Prosperity Bank",
    year: "2021"
  }, {
    title: "Learning the right way",
    brand: "Sterling University",
    year: "2020"
  }, {
    title: "Servicing new customer",
    brand: "Motomi",
    year: "2019"
  }, {
    title: "Calabar coaster road",
    brand: "Brand name",
    year: "2018"
  }, {
    title: "Calabar coaster road",
    brand: "Brand name",
    year: "2018"
  }, {
    title: "Calabar coaster road",
    brand: "Brand name",
    year: "2018"
  }, {
    title: "Calabar coaster road",
    brand: "Brand name",
    year: "2018"
  }];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "case-study-page"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("nav", {
    className: "case-study-nav"
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
    className: "menu-icon",
    onClick: toggleMenu
  }, isMenuOpen ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M6 18L18 6M6 6L18 18",
    stroke: "#EE550E",
    strokeWidth: "2",
    strokeLinecap: "round"
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M3 12H21M3 6H21M3 18H21",
    stroke: "#EE550E",
    strokeWidth: "2",
    strokeLinecap: "round"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "hero-image"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&q=80",
    alt: "Case study hero"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "main-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "project-intro"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", {
    className: "project-title"
  }, "The name of the project goes here"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "project-meta-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "meta-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "meta-label"
  }, "Client:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "meta-value"
  }, " Sterling University Learning App")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "meta-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "meta-label"
  }, "Project type:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "meta-value"
  }, " Mobile & Desktop"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "project-intro-text"
  }, "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "image-gallery-hero"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    src: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=1200&q=80",
    alt: "Project showcase"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "gallery-indicators"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "indicator active"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "indicator"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "indicator"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("section", {
    className: "content-section"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", {
    className: "section-title"
  }, "The Ask:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "section-text"
  }, "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    src: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1200&q=80",
    alt: "The Ask",
    className: "section-image"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("section", {
    className: "content-section"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "tag"
  }, "01 Discovery"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", {
    className: "section-title"
  }, "Discovery stage: statement"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "section-text"
  }, "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "image-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    src: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=300&q=80",
    alt: "Discovery 1"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    src: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=300&q=80",
    alt: "Discovery 2"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    src: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=300&q=80",
    alt: "Discovery 3"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&q=80",
    alt: "Discovery 4"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    src: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=1200&q=80",
    alt: "Discovery full",
    className: "section-image"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("section", {
    className: "content-section"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "tag"
  }, "02 Strategy"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", {
    className: "section-title"
  }, "Strategy: statement"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "section-text"
  }, "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "image-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    src: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=300&q=80",
    alt: "Strategy 1"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    src: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=300&q=80",
    alt: "Strategy 2"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("section", {
    className: "content-section"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "tag"
  }, "03 Strategy"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", {
    className: "section-title"
  }, "Strategy: statement"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "section-text"
  }, "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "image-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    src: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=300&q=80",
    alt: "Strategy 3"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&q=80",
    alt: "Strategy 4"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", {
    className: "subsection-title"
  }, "Section title"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "section-text"
  }, "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("section", {
    className: "content-section"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", {
    className: "section-title"
  }, "Gallery"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "image-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    src: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=300&q=80",
    alt: "Gallery 1"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    src: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=300&q=80",
    alt: "Gallery 2"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", {
    className: "subsection-title"
  }, "Section title"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "section-text"
  }, "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: `side-panel ${isMenuOpen ? 'open' : ''}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", {
    className: "panel-title"
  }, "more projects"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "view-more"
  }, "View more"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "panel-projects"
  }, relatedProjects.map((project, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    key: index,
    className: "panel-project"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "panel-project-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "panel-project-name"
  }, project.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "panel-project-meta"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "panel-brand"
  }, project.brand), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "panel-year"
  }, project.year))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "panel-divider"
  })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("style", {
    jsx: "true"
  }, `
        .case-study-page {
          background: var(--black-nue-black);
          min-height: 100vh;
          margin: -100px 0 0 -100px;
          position: relative;
        }

        .case-study-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 32px 100px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: transparent;
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
        }

        .hero-image {
          width: 100%;
          height: 434px;
          overflow: hidden;
        }

        .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .main-content {
          padding: 40px 100px 100px;
          position: relative;
        }

        .container {
          max-width: 1029px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 50px;
        }

        .project-intro {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .project-title {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 65px;
          font-weight: 700;
          line-height: 100%;
          color: var(--white-heavenly);
          max-width: 590px;
        }

        .project-meta-row {
          display: flex;
          gap: 10px;
        }

        .meta-item {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--white-heavenly);
        }

        .meta-label {
          color: var(--orange);
        }

        .project-intro-text {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--white-heavenly);
        }

        .image-gallery-hero {
          position: relative;
          height: 439px;
        }

        .image-gallery-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 4px;
        }

        .gallery-indicators {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 5px;
        }

        .indicator {
          height: 2.5px;
          width: 42px;
          background: var(--white-heavenly);
        }

        .indicator.active {
          background: var(--orange);
        }

        .content-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .tag {
          display: inline-flex;
          padding: 5px;
          background: var(--yellow);
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          line-height: 120%;
          color: var(--black-pitch-nah);
          width: fit-content;
        }

        .section-title {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 33px;
          font-weight: 700;
          line-height: 95%;
          color: var(--white-heavenly);
        }

        .subsection-title {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 20px;
          font-weight: 700;
          line-height: 95%;
          color: var(--white-heavenly);
        }

        .section-text {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--white-heavenly);
        }

        .section-image {
          width: 100%;
          height: 385px;
          object-fit: cover;
          border-radius: 4px;
        }

        .image-row {
          display: flex;
          gap: 20px;
        }

        .image-row img {
          flex: 1;
          height: 272px;
          object-fit: cover;
          border-radius: 5px;
        }

        .image-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .image-grid img {
          width: 100%;
          height: 272px;
          object-fit: cover;
          border-radius: 4px;
        }

        .side-panel {
          position: fixed;
          right: -607px;
          top: 0;
          width: 607px;
          height: 100vh;
          background: var(--black-nue-ish-black);
          padding: 116px 109px 0;
          transition: right 0.3s ease-in-out;
          z-index: 50;
        }

        .side-panel.open {
          right: 0;
        }

        .panel-title {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 33px;
          font-weight: 700;
          line-height: 95%;
          color: var(--grey-just);
          margin-bottom: 106px;
        }

        .view-more {
          position: absolute;
          left: 19px;
          top: 352px;
          transform: rotate(-90deg);
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 20px;
          font-weight: 700;
          line-height: 95%;
          color: var(--white-heavenly);
        }

        .panel-projects {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .panel-project-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .panel-project-name {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          line-height: 120%;
          color: var(--white-not-wyt);
        }

        .panel-project-meta {
          display: flex;
          gap: 5px;
        }

        .panel-brand,
        .panel-year {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--grey-misty);
        }

        .panel-divider {
          width: 100%;
          height: 0;
          opacity: 0.5;
          border-top: 0.5px solid rgba(236, 240, 241, 0.5);
          margin-top: 10px;
        }

        @media (max-width: 1200px) {
          .side-panel {
            position: relative;
            width: 100%;
            height: auto;
            padding: 60px 20px;
          }

          .main-content {
            padding: 40px 20px 100px;
          }

          .project-title {
            font-size: 45px;
          }

          .image-row {
            flex-wrap: wrap;
          }

          .image-row img {
            flex: 1 1 calc(50% - 10px);
          }
        }

        @media (max-width: 768px) {
          .case-study-nav {
            padding: 32px 20px;
          }

          .project-title {
            font-size: 35px;
          }

          .image-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .case-study-page {
            background: #232020;
            margin: 0;
            padding: 0;
          }

          .case-study-nav {
            display: flex;
            width: 100%;
            padding: 30px 20px;
            justify-content: space-between;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 84px;
            z-index: 100;
            background: transparent;
          }

          .hero-image {
            width: 100%;
            height: 346px;
            margin-top: 0;
          }

          .hero-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .main-content {
            padding: 40px 39px 100px;
          }

          .container {
            max-width: 100%;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 165px;
          }

          .project-intro {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .project-title {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 32.5px;
            font-weight: 700;
            line-height: 95%;
            color: #FFF;
            max-width: 100%;
          }

          .project-meta-row {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .meta-item {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 120%;
            letter-spacing: 0.42px;
            color: #FFF;
          }

          .meta-label {
            color: #EE550E;
          }

          .project-intro-text {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 120%;
            letter-spacing: 0.42px;
            color: #FFF;
          }

          .image-gallery-hero {
            position: relative;
            height: 439px;
          }

          .image-gallery-hero img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .gallery-indicators {
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 5px;
          }

          .indicator {
            height: 2.5px;
            width: 13.667px;
            background: #FFF;
          }

          .indicator.active {
            background: #EE550E;
          }

          .content-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }

          .tag {
            display: flex;
            padding: 5px;
            justify-content: center;
            align-items: center;
            background: #FBBF24;
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 120%;
            color: #1D1C1C;
            align-self: flex-start;
          }

          .section-title {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 28px;
            font-weight: 700;
            line-height: 95%;
            color: #FFF;
            align-self: flex-start;
          }

          .subsection-title {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 20px;
            font-weight: 700;
            line-height: 95%;
            color: #FFF;
            align-self: flex-start;
          }

          .section-text {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 120%;
            letter-spacing: 0.42px;
            color: #FFF;
            align-self: flex-start;
          }

          .section-image {
            width: 100%;
            height: 385px;
            object-fit: cover;
            align-self: stretch;
          }

          .image-row {
            display: flex;
            height: 82.868px;
            justify-content: flex-end;
            align-items: center;
            gap: 20px;
            align-self: stretch;
          }

          .image-row img {
            flex: 1 0 0;
            height: 100%;
            object-fit: cover;
            border-radius: 5px;
          }

          .image-grid {
            display: grid;
            height: 564px;
            row-gap: 20px;
            column-gap: 20px;
            align-self: stretch;
            grid-template-rows: repeat(2, minmax(0, 1fr));
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .image-grid img {
            flex: 1 0 0;
            align-self: stretch;
            object-fit: cover;
          }

          .side-panel {
            display: none;
          }
        }
      `));
};
const Head = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_seo__WEBPACK_IMPORTED_MODULE_3__["default"], {
  title: "Case Study"
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CaseStudyPage);

/***/ })

};
;
//# sourceMappingURL=component---src-pages-case-study-jshead.js.map