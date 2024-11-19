"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _head = _interopRequireDefault(require("next/head"));
var _dynamic = _interopRequireDefault(require("next/dynamic"));
var _Header = _interopRequireDefault(require("@/components/Header"));
var _Footer = _interopRequireDefault(require("@/components/Footer"));
var _Contact = _interopRequireDefault(require("@/components/contact/Contact"));
var _ChatComponent = _interopRequireDefault(require("@/components/common/ChatComponent"));
var _Policy_component = _interopRequireDefault(require("@/components/Policy_component"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } // Importujemy Head z next/head
var ContactPage = function ContactPage() {
  var _useState = (0, _react.useState)(true),
    _useState2 = _slicedToArray(_useState, 2),
    minimized = _useState2[0],
    setMinimized = _useState2[1];
  var handleOpenChat = function handleOpenChat() {
    setMinimized(false);
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_head["default"], null, /*#__PURE__*/_react["default"].createElement("title", null, "Kontakt - Skontaktuj si\u0119 z nami | Polski Dom Pogrzebowy"), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "description",
    content: "Skontaktuj si\u0119 z nami: adres, godziny otwarcia, e-mail, telefon i media spo\u0142eczno\u015Bciowe. Wype\u0142nij formularz kontaktowy lub skorzystaj z czatu na \u017Cywo. Jeste\u015Bmy do Twojej dyspozycji."
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "keywords",
    content: "kontakt, adres, godziny otwarcia, e-mail, telefon, media spo\u0142eczno\u015Bciowe, formularz kontaktowy, czat na \u017Cywo, Polski Dom Pogrzebowy"
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
    content: "https://polskidompogrzebowy.pl/kontakt"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "og:title",
    content: "Kontakt - Skontaktuj si\u0119 z nami | Polski Dom Pogrzebowy"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "og:description",
    content: "Skontaktuj si\u0119 z nami: adres, godziny otwarcia, e-mail, telefon i media spo\u0142eczno\u015Bciowe. Wype\u0142nij formularz kontaktowy lub skorzystaj z czatu na \u017Cywo. Jeste\u015Bmy do Twojej dyspozycji."
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "og:image",
    content: "https://polskidompogrzebowy.pl/og-image.jpg"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:card",
    content: "summary_large_image"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:url",
    content: "https://polskidompogrzebowy.pl/kontakt"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:title",
    content: "Kontakt - Skontaktuj si\u0119 z nami | Polski Dom Pogrzebowy"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:description",
    content: "Skontaktuj si\u0119 z nami: adres, godziny otwarcia, e-mail, telefon i media spo\u0142eczno\u015Bciowe. Wype\u0142nij formularz kontaktowy lub skorzystaj z czatu na \u017Cywo. Jeste\u015Bmy do Twojej dyspozycji."
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:image",
    content: "https://polskidompogrzebowy.pl/og-image.jpg"
  }), /*#__PURE__*/_react["default"].createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: "\n                        {\n                            \"@context\": \"https://schema.org\",\n                            \"@type\": \"ContactPage\",\n                            \"name\": \"Kontakt - Skontaktuj si\u0119 z nami | Polski Dom Pogrzebowy\",\n                            \"description\": \"Skontaktuj si\u0119 z nami: adres, godziny otwarcia, e-mail, telefon i media spo\u0142eczno\u015Bciowe. Wype\u0142nij formularz kontaktowy lub skorzystaj z czatu na \u017Cywo. Jeste\u015Bmy do Twojej dyspozycji.\",\n                            \"url\": \"https://polskidompogrzebowy.pl/kontakt\",\n                            \"contactPoint\": {\n                                \"@type\": \"ContactPoint\",\n                                \"telephone\": \"+48 123 456 789\",\n                                \"contactType\": \"Obs\u0142uga klienta\",\n                                \"email\": \"kontakt@polskidompogrzebowy.pl\",\n                                \"areaServed\": \"PL\",\n                                \"availableLanguage\": [\"Polish\"]\n                            }\n                        }\n                        "
    }
  })), /*#__PURE__*/_react["default"].createElement("header", null, /*#__PURE__*/_react["default"].createElement(_Header["default"], null)), /*#__PURE__*/_react["default"].createElement("main", null, /*#__PURE__*/_react["default"].createElement(_Contact["default"], {
    handleOpenChat: handleOpenChat
  })), /*#__PURE__*/_react["default"].createElement("footer", null, /*#__PURE__*/_react["default"].createElement(_Footer["default"], null)), /*#__PURE__*/_react["default"].createElement(_ChatComponent["default"], {
    minimized: minimized,
    setMinimized: setMinimized
  }));
};
var _default = exports["default"] = (0, _dynamic["default"])(function () {
  return Promise.resolve(ContactPage);
}, {
  ssr: false
});