"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _head = _interopRequireDefault(require("next/head"));
var _dynamic = _interopRequireDefault(require("next/dynamic"));
var _Header = _interopRequireDefault(require("@/components/Header"));
var _Footer = _interopRequireDefault(require("@/components/Footer"));
var _ChooseFuneral = _interopRequireDefault(require("@/components/form/ChooseFuneral"));
var _FuneralDetailsForm = _interopRequireDefault(require("@/components/form/FuneralDetailsForm"));
var _aboutUs = _interopRequireDefault(require("@/components/mission/about-us"));
var _aboutUsSecond = _interopRequireDefault(require("@/components/mission/about-us-second"));
var _Trust = _interopRequireDefault(require("@/components/trust/Trust"));
var _TrustSecond = _interopRequireDefault(require("@/components/trust/TrustSecond"));
var _Policy_component = _interopRequireDefault(require("@/components/Policy_component"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Importujemy Head z next/head

var TrustUs = function TrustUs() {
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_head["default"], null, /*#__PURE__*/_react["default"].createElement("title", null, "Zaufali nam - Opinie i Lista Dom\xF3w Pogrzebowych | Polski Dom Pogrzebowy"), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "description",
    content: "Przeczytaj opinie naszych klient\xF3w i zobacz list\u0119 dom\xF3w pogrzebowych, kt\xF3re nam zaufa\u0142y. Do\u0142\u0105cz do grona zadowolonych u\u017Cytkownik\xF3w Polski Dom Pogrzebowy."
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "keywords",
    content: "opinie, domy pogrzebowe, zaufali nam, us\u0142ugi pogrzebowe, Polski Dom Pogrzebowy"
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
    content: "https://polskidompogrzebowy.pl/zaufali-nam"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "og:title",
    content: "Zaufali nam - Opinie i Lista Dom\xF3w Pogrzebowych | Polski Dom Pogrzebowy"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "og:description",
    content: "Przeczytaj opinie naszych klient\xF3w i zobacz list\u0119 dom\xF3w pogrzebowych, kt\xF3re nam zaufa\u0142y. Do\u0142\u0105cz do grona zadowolonych u\u017Cytkownik\xF3w Polski Dom Pogrzebowy."
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "og:image",
    content: "https://polskidompogrzebowy.pl/og-image.jpg"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:card",
    content: "summary_large_image"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:url",
    content: "https://polskidompogrzebowy.pl/zaufali-nam"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:title",
    content: "Zaufali nam - Opinie i Lista Dom\xF3w Pogrzebowych | Polski Dom Pogrzebowy"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:description",
    content: "Przeczytaj opinie naszych klient\xF3w i zobacz list\u0119 dom\xF3w pogrzebowych, kt\xF3re nam zaufa\u0142y. Do\u0142\u0105cz do grona zadowolonych u\u017Cytkownik\xF3w Polski Dom Pogrzebowy."
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:image",
    content: "https://polskidompogrzebowy.pl/og-image.jpg"
  }), /*#__PURE__*/_react["default"].createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: "\n                        {\n                            \"@context\": \"https://schema.org\",\n                            \"@type\": \"WebPage\",\n                            \"name\": \"Zaufali nam - Opinie i Lista Dom\xF3w Pogrzebowych | Polski Dom Pogrzebowy\",\n                            \"description\": \"Przeczytaj opinie naszych klient\xF3w i zobacz list\u0119 dom\xF3w pogrzebowych, kt\xF3re nam zaufa\u0142y. Do\u0142\u0105cz do grona zadowolonych u\u017Cytkownik\xF3w Polski Dom Pogrzebowy.\",\n                            \"url\": \"https://polskidompogrzebowy.pl/zaufali-nam\"\n                        }\n                        "
    }
  })), /*#__PURE__*/_react["default"].createElement("header", null, /*#__PURE__*/_react["default"].createElement(_Header["default"], null)), /*#__PURE__*/_react["default"].createElement("main", null, /*#__PURE__*/_react["default"].createElement(_Trust["default"], null), /*#__PURE__*/_react["default"].createElement(_TrustSecond["default"], null)), /*#__PURE__*/_react["default"].createElement("footer", null, /*#__PURE__*/_react["default"].createElement(_Footer["default"], null)));
};
var _default = exports["default"] = (0, _dynamic["default"])(function () {
  return Promise.resolve(TrustUs);
}, {
  ssr: false
});