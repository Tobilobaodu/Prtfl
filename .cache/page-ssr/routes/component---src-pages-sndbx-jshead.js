exports.id = "component---src-pages-sndbx-jshead";
exports.ids = ["component---src-pages-sndbx-jshead"];
exports.modules = {

/***/ "./public/page-data/sq/d/63159454.json":
/*!*********************************************!*\
  !*** ./public/page-data/sq/d/63159454.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"data":{"site":{"siteMetadata":{"title":"TOBI - UX Designer Portfolio","description":"Multidisciplinary designer passionate about design, technology, and how they shape our lives. Portfolio showcasing UX design work, case studies, and photography.","author":"Tobi"}}}}');

/***/ }),

/***/ "./src/components/LockedProjectModal.js":
/*!**********************************************!*\
  !*** ./src/components/LockedProjectModal.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const LockedProjectModal = ({
  isOpen,
  onClose
}) => {
  const [password, setPassword] = react__WEBPACK_IMPORTED_MODULE_0__.useState("");
  if (!isOpen) return null;
  const handleSubmit = e => {
    e.preventDefault();
    console.log("Password submitted:", password);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "modal-overlay",
    onClick: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "modal-content",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    className: "modal-close",
    onClick: onClose,
    "aria-label": "Close modal"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
    width: "24",
    height: "24",
    rx: "12",
    fill: "#ECF0F1"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M17.5563 7.75736L13.3137 12L17.5563 16.2426L16.1421 17.6569L11.8995 13.4142L7.65685 17.6569L6.24264 16.2426L10.4853 12L6.24264 7.75736L7.65685 6.34315L11.8995 10.5858L16.1421 6.34315L17.5563 7.75736Z",
    fill: "#EE550E"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", {
    className: "modal-title"
  }, "Sensitive material within"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "modal-description"
  }, "This case study is not publicly available due to a non-disclosure agreement. To access this case study, contact me for a password. Access is ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "highlight"
  }, "limited"), " to recruiters and potential clients."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
    onSubmit: handleSubmit,
    className: "password-form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "password-label"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M2.6665 14.667V5.33366H4.6665V4.00033C4.6665 3.0781 4.99162 2.29188 5.64184 1.64166C6.29162 0.991881 7.07762 0.666992 7.99984 0.666992C8.92206 0.666992 9.70828 0.991881 10.3585 1.64166C11.0083 2.29188 11.3332 3.0781 11.3332 4.00033V5.33366H13.3332V14.667H2.6665ZM5.99984 5.33366H9.99984V4.00033C9.99984 3.44477 9.80539 2.97255 9.4165 2.58366C9.02762 2.19477 8.55539 2.00033 7.99984 2.00033C7.44428 2.00033 6.97206 2.19477 6.58317 2.58366C6.19428 2.97255 5.99984 3.44477 5.99984 4.00033V5.33366ZM3.99984 13.3337H11.9998V6.66699H3.99984V13.3337ZM7.99984 11.3337C8.3665 11.3337 8.6805 11.2032 8.94184 10.9423C9.20273 10.681 9.33317 10.367 9.33317 10.0003C9.33317 9.63366 9.20273 9.31966 8.94184 9.05833C8.6805 8.79744 8.3665 8.66699 7.99984 8.66699C7.63317 8.66699 7.31939 8.79744 7.0585 9.05833C6.79717 9.31966 6.6665 9.63366 6.6665 10.0003C6.6665 10.367 6.79717 10.681 7.0585 10.9423C7.31939 11.2032 7.63317 11.3337 7.99984 11.3337Z",
    fill: "#A2A2A2"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, "Password")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "password-input-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "password",
    className: "password-input",
    value: password,
    onChange: e => setPassword(e.target.value),
    placeholder: "\u25CF \u25CF \u25CF \u25CF \u25CF \u25CF \u25CF \u25CF",
    "aria-label": "Password"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
    href: "mailto:oluwatobiodu@outlook.com",
    className: "request-password"
  }, "Need access? ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "underline"
  }, "Request password")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("style", {
    jsx: "true"
  }, `
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.15) 100%);
          backdrop-filter: blur(5px);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-content {
          position: relative;
          background: #2E2A2A;
          border-radius: 5px;
          padding: 31px 35px 25px 35px;
          max-width: 429px;
          width: 90%;
          animation: slideUp 0.3s ease-in-out;
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .modal-close {
          position: absolute;
          top: -12px;
          right: -12px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ECF0F1;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          transition: transform 0.2s ease;
        }

        .modal-close:hover {
          transform: scale(1.1);
        }

        .modal-body {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .modal-title {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 20px;
          font-weight: 600;
          line-height: 120%;
          letter-spacing: 0.6px;
          color: #FFF;
          margin: 0;
        }

        .modal-description {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: #FFF;
          margin: 0;
        }

        .modal-description .highlight {
          color: #EE550E;
        }

        .password-form {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .password-label {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          line-height: 120%;
          color: #FFF;
        }

        .password-label svg {
          width: 16px;
          height: 16px;
        }

        .password-input-wrapper {
          width: 100%;
        }

        .password-input {
          width: 100%;
          height: 45px;
          padding: 19px 20px;
          border-radius: 5px;
          background: #F9F9F8;
          border: none;
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          color: #A2A2A2;
          outline: none;
        }

        .password-input::placeholder {
          color: #A2A2A2;
          letter-spacing: 4px;
        }

        .request-password {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: #FFF;
          text-decoration: none;
          margin-top: 5px;
        }

        .request-password .underline {
          color: #FAF8ED;
          text-decoration: underline;
        }

        .request-password:hover .underline {
          color: #EE550E;
        }

        @media (max-width: 768px) {
          .modal-content {
            padding: 25px 20px;
            max-width: 95%;
          }

          .modal-title {
            font-size: 18px;
          }

          .modal-description {
            font-size: 13px;
          }
        }
      `));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LockedProjectModal);

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

/***/ "./src/pages/sndbx.js?export=head":
/*!****************************************!*\
  !*** ./src/pages/sndbx.js?export=head ***!
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
/* harmony import */ var _components_LockedProjectModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/LockedProjectModal */ "./src/components/LockedProjectModal.js");




const SndbxPage = ({
  data
}) => {
  var _data$allSanityProjec, _data$allSanityProjec2;
  const [modalOpen, setModalOpen] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
  const projects = (data === null || data === void 0 ? void 0 : (_data$allSanityProjec = data.allSanityProject) === null || _data$allSanityProjec === void 0 ? void 0 : (_data$allSanityProjec2 = _data$allSanityProjec.edges) === null || _data$allSanityProjec2 === void 0 ? void 0 : _data$allSanityProjec2.map(edge => edge.node)) || [];
  const handleProjectClick = (project, e) => {
    if (project.locked) {
      e.preventDefault();
      setModalOpen(true);
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_layout__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "sndbx-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "section-intro"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", {
    className: "section-title"
  }, "sndbx"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "section-description"
  }, "I'm responsible for UX Strategy + Design, leading a team of three UX designers who are responsible for creating exceptional user experiences for OSB Group's digital products.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "projects-list"
  }, projects.map((project, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    key: index,
    className: "project-item",
    onClick: e => handleProjectClick(project, e),
    style: {
      cursor: project.locked ? 'pointer' : 'default'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "project-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "project-name"
  }, project.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "project-metadata"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "brand-name"
  }, project.client), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "dot-separator"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "project-year"
  }, project.year), project.locked && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    className: "lock-icon",
    width: "16",
    height: "17",
    viewBox: "0 0 16 17",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M2.66699 15.167V5.83366H4.66699V4.50033C4.66699 3.5781 4.9921 2.79188 5.64233 2.14166C6.2921 1.49188 7.0781 1.16699 8.00033 1.16699C8.92255 1.16699 9.70877 1.49188 10.359 2.14166C11.0088 2.79188 11.3337 3.5781 11.3337 4.50033V5.83366H13.3337V15.167H2.66699ZM6.00033 5.83366H10.0003V4.50033C10.0003 3.94477 9.80588 3.47255 9.41699 3.08366C9.0281 2.69477 8.55588 2.50033 8.00033 2.50033C7.44477 2.50033 6.97255 2.69477 6.58366 3.08366C6.19477 3.47255 6.00033 3.94477 6.00033 4.50033V5.83366ZM4.00033 13.8337H12.0003V7.16699H4.00033V13.8337ZM8.00033 11.8337C8.36699 11.8337 8.68099 11.7032 8.94233 11.4423C9.20321 11.181 9.33366 10.867 9.33366 10.5003C9.33366 10.1337 9.20321 9.81966 8.94233 9.55833C8.68099 9.29744 8.36699 9.16699 8.00033 9.16699C7.63366 9.16699 7.31988 9.29744 7.05899 9.55833C6.79766 9.81966 6.66699 10.1337 6.66699 10.5003C6.66699 10.867 6.79766 11.181 7.05899 11.4423C7.31988 11.7032 7.63366 11.8337 8.00033 11.8337Z",
    fill: "#A3A3A3"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "project-divider"
  })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_LockedProjectModal__WEBPACK_IMPORTED_MODULE_3__["default"], {
    isOpen: modalOpen,
    onClose: () => setModalOpen(false)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("style", {
    jsx: "true"
  }, `
        .sndbx-container {
          width: 100%;
          background: var(--white-not-wyt);
          min-height: calc(100vh - 85px);
        }

        .container {
          max-width: 600px;
          margin: 0;
          margin-left: 0;
          padding: 111px 0 60px 0;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .section-intro {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .section-title {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 28px;
          font-weight: 700;
          line-height: 95%;
          color: var(--black-pitch-nah);
        }

        .section-description {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--black-pitch-nah);
        }

        .projects-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .project-item {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .project-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .project-name {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          line-height: 120%;
          color: var(--black-pitch-nah);
        }

        .project-metadata {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .brand-name,
        .project-year {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: var(--grey-misty);
        }

        .dot-separator {
          width: 2.73px;
          height: 2.67px;
          background: var(--grey-misty);
        }

        .lock-icon {
          width: 16px;
          height: 16px;
        }

        .project-divider {
          width: 100%;
          height: 0;
          opacity: 0.5;
          border-top: 0.5px solid rgba(29, 28, 28, 0.5);
        }

        @media (max-width: 768px) {
          .container {
            padding: 100px 20px 60px 20px;
          }

          .project-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }

        @media (max-width: 480px) {
          .sndbx-container {
            background: #F9F9F8;
            min-height: calc(100vh - 84px);
          }

          .container {
            max-width: 100%;
            padding: 134px 40px 0 40px;
            gap: 20px;
          }

          .section-intro {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .section-title {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 28px;
            font-weight: 700;
            line-height: 95%;
            color: #1D1C1C;
          }

          .section-description {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 120%;
            letter-spacing: 0.42px;
            color: #1D1C1C;
          }

          .projects-list {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .project-item {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }

          .project-row {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
          }

          .project-name {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 120%;
            color: #1D1C1C;
          }

          .project-metadata {
            display: flex;
            align-items: center;
            gap: 5px;
          }

          .brand-name,
          .project-year {
            font-family: 'Neue Haas Grotesk Display Pro', -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 120%;
            letter-spacing: 0.42px;
            color: #A3A3A3;
          }

          .dot-separator {
            width: 2.73px;
            height: 2.674px;
            background: #A3A3A3;
          }

          .lock-icon {
            width: 16px;
            height: 16px;
          }

          .project-divider {
            width: 100%;
            height: 1px;
            opacity: 0.5;
            background: rgba(236, 240, 241, 0.5);
          }
        }
      `));
};
const query = "2602833249";
const Head = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_seo__WEBPACK_IMPORTED_MODULE_2__["default"], {
  title: "Sandbox"
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SndbxPage);

/***/ })

};
;
//# sourceMappingURL=component---src-pages-sndbx-jshead.js.map