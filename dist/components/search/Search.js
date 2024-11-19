"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _image = _interopRequireDefault(require("next/image"));
var _phone = _interopRequireDefault(require("../../../public/assets/icons/phone.png"));
var _link = _interopRequireDefault(require("next/link"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var SearchResults = function SearchResults() {
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    location = _useState2[0],
    setLocation = _useState2[1];
  (0, _react.useEffect)(function () {
    var storedLocation = localStorage.getItem('location');
    if (storedLocation) {
      setLocation(storedLocation);
    }
  }, []);
  var handleKeyDown = function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };
  var handleSearchClick = function handleSearchClick() {
    if (location.trim()) {
      localStorage.setItem('location', location);
      window.location.reload();
    }
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "search-results"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Proponowane pobliskie domy pogrzebowe"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "results-content"
  }, /*#__PURE__*/_react["default"].createElement("span", null, "Na podstawie Twojej lokalizacji, dobrali\u015Bmy dla Ciebie najbardziej odpowiedni dom pogrzebowy, z kt\xF3rym mamy podpisan\u0105 umow\u0119.", /*#__PURE__*/_react["default"].createElement("br", null), " Dzi\u0119ki temu masz pewno\u015B\u0107, \u017Ce otrzymasz najwy\u017Cszej jako\u015Bci us\u0142ugi.", /*#__PURE__*/_react["default"].createElement("h3", null, "Nast\u0119pnie b\u0119dziesz prowadzony krok po kroku przez formularz...")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "address-input"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "address"
  }, "Adres:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    id: "address",
    value: location,
    onChange: function onChange(e) {
      return setLocation(e.target.value);
    },
    onKeyDown: handleKeyDown
  }), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleSearchClick
  }, "Szukaj"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "contact-section"
  }, /*#__PURE__*/_react["default"].createElement("p", null, "Masz jakie\u015B pytania? Zadzwo\u0144"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "contact-option"
  }, /*#__PURE__*/_react["default"].createElement(_link["default"], {
    href: "tel:+48600000000"
  }, /*#__PURE__*/_react["default"].createElement(_image["default"], {
    src: _phone["default"],
    alt: "Phone",
    width: 32,
    height: 32
  }), /*#__PURE__*/_react["default"].createElement("p", null, "+48 600 000 000")))));
};
var _default = exports["default"] = SearchResults;