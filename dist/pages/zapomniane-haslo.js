"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _head = _interopRequireDefault(require("next/head"));
var _Header = _interopRequireDefault(require("@/components/Header"));
var _Footer = _interopRequireDefault(require("@/components/Footer"));
var _JoinComponent = _interopRequireDefault(require("@/components/JoinComponent"));
var _Password = _interopRequireDefault(require("@/components/common/Password"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Importujemy Head z next/head

var JoinFormPage = function JoinFormPage() {
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_head["default"], null, /*#__PURE__*/_react["default"].createElement("title", null, "Do\u0142\u0105cz do nas - Formularz zg\u0142oszeniowy | Polski Dom Pogrzebowy"), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "description",
    content: "Wype\u0142nij formularz o nowe has\u0142o"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "keywords",
    content: "Wype\u0142nij formularz o nowe has\u0142o"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "author",
    content: "Polski Dom Pogrzebowy"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    charSet: "UTF-8"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "og:type",
    content: "website"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "og:url",
    content: "https://polskidompogrzebowy.pl/zapomiane-haslo"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "og:title",
    content: "Zapomniales has\u0142a - Formularz | Polski Dom Pogrzebowy"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "og:description",
    content: "Wype\u0142nij formularz o nowe has\u0142o"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "og:image",
    content: "https://polskidompogrzebowy.pl/og-image.jpg"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:card",
    content: "summary_large_image"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:url",
    content: "https://polskidompogrzebowy.pl/zapomiane-haslo"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:title",
    content: "Zapomniales has\u0142a - Formularz | Polski Dom Pogrzebowy"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:description",
    content: "Wype\u0142nij formularz o nowe has\u0142o"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:image",
    content: "https://polskidompogrzebowy.pl/og-image.jpg"
  }), /*#__PURE__*/_react["default"].createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: "\n                        {\n                            \"@context\": \"https://schema.org\",\n                            \"@type\": \"WebPage\",\n                            \"name\": \"Zapomniales has\u0142a - Formularz | Polski Dom Pogrzebowy\",\n                            \"description\": \"Wype\u0142nij formularz o nowe has\u0142o\",\n                            \"url\": \"https://polskidompogrzebowy.pl/zapomiane-haslo\"\n                        }\n                        "
    }
  })), /*#__PURE__*/_react["default"].createElement("header", null, /*#__PURE__*/_react["default"].createElement(_Header["default"], null)), /*#__PURE__*/_react["default"].createElement("main", null, /*#__PURE__*/_react["default"].createElement(_Password["default"], null)), /*#__PURE__*/_react["default"].createElement("footer", null, /*#__PURE__*/_react["default"].createElement(_Footer["default"], null)));
};
var _default = exports["default"] = JoinFormPage;