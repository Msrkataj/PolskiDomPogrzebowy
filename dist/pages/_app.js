"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("../../styles/globals.scss");
var _react = _interopRequireWildcard(require("react"));
var _script = _interopRequireDefault(require("next/script"));
var _head = _interopRequireDefault(require("next/head"));
var _fontawesomeSvgCore = require("@fortawesome/fontawesome-svg-core");
require("@fortawesome/fontawesome-svg-core/styles.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
// Importujemy next/head do zarządzania tagami w <head>

_fontawesomeSvgCore.config.autoAddCss = false;
function MyApp(_ref) {
  var Component = _ref.Component,
    pageProps = _ref.pageProps;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("link", {
    rel: "icon",
    href: "/favicon.ico",
    sizes: "any"
  }), /*#__PURE__*/_react["default"].createElement("link", {
    rel: "icon",
    type: "image/webp",
    sizes: "32x32",
    href: "/favicon.webp"
  }), /*#__PURE__*/_react["default"].createElement("link", {
    rel: "icon",
    type: "image/webp",
    sizes: "16x16",
    href: "/favicon.webp"
  }), /*#__PURE__*/_react["default"].createElement("link", {
    rel: "apple-touch-icon",
    href: "/favicon.ico"
  }), /*#__PURE__*/_react["default"].createElement("link", {
    rel: "manifest",
    href: "/manifest.json"
  }), /*#__PURE__*/_react["default"].createElement("title", null, "Polski Dom Pogrzebowy - Wyszukiwarka dom\xF3w pogrzebowych i formalno\u015Bci online"), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "description",
    content: "Polski Dom Pogrzebowy to kompleksowe narz\u0119dzie umo\u017Cliwiaj\u0105ce wyszukiwanie dom\xF3w pogrzebowych w pobli\u017Cu i za\u0142atwianie wszelkich formalno\u015Bci online. Zaufaj profesjonalizmowi i do\u015Bwiadczeniu."
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "og:title",
    content: "Polski Dom Pogrzebowy - Wyszukiwarka dom\xF3w pogrzebowych"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "og:description",
    content: "Znajd\u017A najbli\u017Csze domy pogrzebowe i za\u0142atw wszystkie formalno\u015Bci online. Polski Dom Pogrzebowy - Tw\xF3j partner w trudnych chwilach."
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "og:type",
    content: "website"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "og:url",
    content: "https://polskidompogrzebowy24.pl"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "og:image",
    content: "https://polskidompogrzebowy24.pl/og-image.jpg"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "og:locale",
    content: "pl_PL"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "twitter:card",
    content: "summary_large_image"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "twitter:title",
    content: "Polski Dom Pogrzebowy - Wyszukiwarka dom\xF3w pogrzebowych"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "twitter:description",
    content: "Znajd\u017A najbli\u017Csze domy pogrzebowe i za\u0142atw wszystkie formalno\u015Bci online. Polski Dom Pogrzebowy - Tw\xF3j partner w trudnych chwilach."
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "twitter:image",
    content: "https://polskidompogrzebowy24.pl/og-image.jpg"
  }), /*#__PURE__*/_react["default"].createElement(_script["default"], {
    src: "https://maps.googleapis.com/maps/api/js?key=".concat(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, "&libraries=places"),
    strategy: "lazyOnload"
  }), /*#__PURE__*/_react["default"].createElement(Component, pageProps));
}
var _default = exports["default"] = MyApp;