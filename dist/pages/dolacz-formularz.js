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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Importujemy Head z next/head

var JoinFormPage = function JoinFormPage() {
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_head["default"], null, /*#__PURE__*/_react["default"].createElement("title", null, "Do\u0142\u0105cz do nas - Formularz zg\u0142oszeniowy | Polski Dom Pogrzebowy"), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "description",
    content: "Wype\u0142nij formularz zg\u0142oszeniowy, aby do\u0142\u0105czy\u0107 do naszej sieci dom\xF3w pogrzebowych. Skorzystaj z mo\u017Cliwo\u015Bci wsp\xF3\u0142pracy i zwi\u0119ksz swoj\u0105 widoczno\u015B\u0107 w\u015Br\xF3d klient\xF3w."
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "keywords",
    content: "formularz zg\u0142oszeniowy, do\u0142\u0105cz do nas, wsp\xF3\u0142praca, dom pogrzebowy, Polski Dom Pogrzebowy"
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
    content: "https://polskidompogrzebowy.pl/dolacz-formularz"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "og:title",
    content: "Do\u0142\u0105cz do nas - Formularz zg\u0142oszeniowy | Polski Dom Pogrzebowy"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "og:description",
    content: "Wype\u0142nij formularz zg\u0142oszeniowy, aby do\u0142\u0105czy\u0107 do naszej sieci dom\xF3w pogrzebowych. Skorzystaj z mo\u017Cliwo\u015Bci wsp\xF3\u0142pracy i zwi\u0119ksz swoj\u0105 widoczno\u015B\u0107 w\u015Br\xF3d klient\xF3w."
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "og:image",
    content: "https://polskidompogrzebowy.pl/og-image.jpg"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:card",
    content: "summary_large_image"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:url",
    content: "https://polskidompogrzebowy.pl/dolacz-formularz"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:title",
    content: "Do\u0142\u0105cz do nas - Formularz zg\u0142oszeniowy | Polski Dom Pogrzebowy"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:description",
    content: "Wype\u0142nij formularz zg\u0142oszeniowy, aby do\u0142\u0105czy\u0107 do naszej sieci dom\xF3w pogrzebowych. Skorzystaj z mo\u017Cliwo\u015Bci wsp\xF3\u0142pracy i zwi\u0119ksz swoj\u0105 widoczno\u015B\u0107 w\u015Br\xF3d klient\xF3w."
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:image",
    content: "https://polskidompogrzebowy.pl/og-image.jpg"
  }), /*#__PURE__*/_react["default"].createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: "\n                        {\n                            \"@context\": \"https://schema.org\",\n                            \"@type\": \"WebPage\",\n                            \"name\": \"Do\u0142\u0105cz do nas - Formularz zg\u0142oszeniowy | Polski Dom Pogrzebowy\",\n                            \"description\": \"Wype\u0142nij formularz zg\u0142oszeniowy, aby do\u0142\u0105czy\u0107 do naszej sieci dom\xF3w pogrzebowych. Skorzystaj z mo\u017Cliwo\u015Bci wsp\xF3\u0142pracy i zwi\u0119ksz swoj\u0105 widoczno\u015B\u0107 w\u015Br\xF3d klient\xF3w.\",\n                            \"url\": \"https://polskidompogrzebowy.pl/dolacz-formularz\"\n                        }\n                        "
    }
  })), /*#__PURE__*/_react["default"].createElement("header", null, /*#__PURE__*/_react["default"].createElement(_Header["default"], null)), /*#__PURE__*/_react["default"].createElement("main", null, /*#__PURE__*/_react["default"].createElement(_JoinComponent["default"], null)), /*#__PURE__*/_react["default"].createElement("footer", null, /*#__PURE__*/_react["default"].createElement(_Footer["default"], null)));
};
var _default = exports["default"] = JoinFormPage;