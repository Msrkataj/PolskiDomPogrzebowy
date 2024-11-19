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
var _ChooseFuneral = _interopRequireDefault(require("@/components/form/ChooseFuneral"));
var _FuneralDetailsForm = _interopRequireDefault(require("@/components/form/FuneralDetailsForm"));
var _aboutUs = _interopRequireDefault(require("@/components/mission/about-us"));
var _aboutUsSecond = _interopRequireDefault(require("@/components/mission/about-us-second"));
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
var MissionHome = function MissionHome() {
  var _useState = (0, _react.useState)(true),
    _useState2 = _slicedToArray(_useState, 2),
    minimized = _useState2[0],
    setMinimized = _useState2[1];
  var handleOpenChat = function handleOpenChat() {
    setMinimized(false);
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_head["default"], null, /*#__PURE__*/_react["default"].createElement("title", null, "O nas - Misja i Warto\u015Bci | Polski Dom Pogrzebowy"), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "description",
    content: "Poznaj nasz\u0105 misj\u0119, histori\u0119 i warto\u015Bci. Dowiedz si\u0119 wi\u0119cej o naszym zespole i wsp\xF3\u0142pracy z domami pogrzebowymi. Polski Dom Pogrzebowy - Twoje wsparcie w trudnych chwilach."
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "keywords",
    content: "o nas, misja, warto\u015Bci, historia, zesp\xF3\u0142, wsp\xF3\u0142praca, dom pogrzebowy, us\u0142ugi pogrzebowe, Polski Dom Pogrzebowy"
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
    content: "https://polskidompogrzebowy.pl/misja"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "og:title",
    content: "O nas - Misja i Warto\u015Bci | Polski Dom Pogrzebowy"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "og:description",
    content: "Poznaj nasz\u0105 misj\u0119, histori\u0119 i warto\u015Bci. Dowiedz si\u0119 wi\u0119cej o naszym zespole i wsp\xF3\u0142pracy z domami pogrzebowymi. Polski Dom Pogrzebowy - Twoje wsparcie w trudnych chwilach."
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "og:image",
    content: "https://polskidompogrzebowy.pl/og-image.jpg"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:card",
    content: "summary_large_image"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:url",
    content: "https://polskidompogrzebowy.pl/misja"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:title",
    content: "O nas - Misja i Warto\u015Bci | Polski Dom Pogrzebowy"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:description",
    content: "Poznaj nasz\u0105 misj\u0119, histori\u0119 i warto\u015Bci. Dowiedz si\u0119 wi\u0119cej o naszym zespole i wsp\xF3\u0142pracy z domami pogrzebowymi. Polski Dom Pogrzebowy - Twoje wsparcie w trudnych chwilach."
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    property: "twitter:image",
    content: "https://polskidompogrzebowy.pl/og-image.jpg"
  }), /*#__PURE__*/_react["default"].createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: "\n                        {\n                            \"@context\": \"https://schema.org\",\n                            \"@type\": \"AboutPage\",\n                            \"name\": \"O nas - Misja i Warto\u015Bci | Polski Dom Pogrzebowy\",\n                            \"description\": \"Poznaj nasz\u0105 misj\u0119, histori\u0119 i warto\u015Bci. Dowiedz si\u0119 wi\u0119cej o naszym zespole i wsp\xF3\u0142pracy z domami pogrzebowymi. Polski Dom Pogrzebowy - Twoje wsparcie w trudnych chwilach.\",\n                            \"url\": \"https://polskidompogrzebowy.pl/misja\"\n                        }\n                        "
    }
  })), /*#__PURE__*/_react["default"].createElement("header", null, /*#__PURE__*/_react["default"].createElement(_Header["default"], null)), /*#__PURE__*/_react["default"].createElement("main", null, /*#__PURE__*/_react["default"].createElement(_aboutUs["default"], null), /*#__PURE__*/_react["default"].createElement(_aboutUsSecond["default"], {
    handleOpenChat: handleOpenChat
  })), /*#__PURE__*/_react["default"].createElement("footer", null, /*#__PURE__*/_react["default"].createElement(_Footer["default"], null)), /*#__PURE__*/_react["default"].createElement(_ChatComponent["default"], {
    minimized: minimized,
    setMinimized: setMinimized
  }));
};
var _default = exports["default"] = (0, _dynamic["default"])(function () {
  return Promise.resolve(MissionHome);
}, {
  ssr: false
});