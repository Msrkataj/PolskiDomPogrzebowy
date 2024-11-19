"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("react");
var _image = _interopRequireDefault(require("next/image"));
var _dynamic = _interopRequireDefault(require("next/dynamic"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var ProfessionalCeremony = function ProfessionalCeremony() {
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    selectedOption = _useState2[0],
    setSelectedOption = _useState2[1];
  var handleToggle = function handleToggle(option) {
    setSelectedOption(option === selectedOption ? null : option);
  };
  var getImageSrc = function getImageSrc() {
    switch (selectedOption) {
      case 'trumny':
        return '/assets/images/trumny-i-urny.webp';
      case 'dekoracje':
        return '/assets/images/akcesoria-pogrzebowe.webp';
      case 'mistrz':
        return '/assets/images/mistrz-ceremonii.webp';
      default:
        return '/assets/images/lilies-funeral.webp';
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("section", {
    id: "professional",
    className: "ceremony-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "content-wrapper flex-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ceremony-image"
  }, /*#__PURE__*/React.createElement(_image["default"], {
    src: getImageSrc(),
    alt: "Ceremony Image",
    fill: true,
    style: {
      objectFit: 'cover'
    },
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ceremony-text"
  }, /*#__PURE__*/React.createElement("h2", null, "Profesjonalna organizacja ceremonii"), /*#__PURE__*/React.createElement("p", null, "Zapewniamy kompleksow\u0105 i profesjonaln\u0105 organizacj\u0119 ceremonii pogrzebowych, wsp\xF3\u0142pracuj\u0105c wy\u0142\u0105cznie z zaufanymi i sprawdzonymi zak\u0142adami pogrzebowymi z ca\u0142ej Polski."), /*#__PURE__*/React.createElement("p", null, "Nasza platforma umo\u017Cliwia \u0142atwy wyb\xF3r i rezerwacj\u0119 us\u0142ug, takich jak:"), /*#__PURE__*/React.createElement("div", {
    className: "info-options "
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-option ".concat(selectedOption === 'trumny' ? 'active' : ''),
    onClick: function onClick() {
      return handleToggle('trumny');
    }
  }, /*#__PURE__*/React.createElement("h3", null, "Wyb\xF3r trumien i urn:"), /*#__PURE__*/React.createElement("span", {
    className: "plus"
  }, "+"), selectedOption === 'trumny' && /*#__PURE__*/React.createElement("p", null, "Oferujemy szeroki wyb\xF3r trumien i urn dostosowanych do r\xF3\u017Cnych preferencji i bud\u017Cet\xF3w. Niezale\u017Cnie od tego, czy szukasz czego\u015B tradycyjnego czy nowoczesnego, mamy odpowiednie opcje.")), /*#__PURE__*/React.createElement("div", {
    className: "info-option ".concat(selectedOption === 'dekoracje' ? 'active' : ''),
    onClick: function onClick() {
      return handleToggle('dekoracje');
    }
  }, /*#__PURE__*/React.createElement("h3", null, "Dekoracje i dodatki:"), /*#__PURE__*/React.createElement("span", {
    className: "plus"
  }, "+"), selectedOption === 'dekoracje' && /*#__PURE__*/React.createElement("p", null, "Dost\u0119pne s\u0105 r\xF3\u017Cnorodne dekoracje i dodatki, kt\xF3re mog\u0105 by\u0107 dostosowane do indywidualnych potrzeb i \u017Cycze\u0144, aby stworzy\u0107 wyj\u0105tkow\u0105 atmosfer\u0119 ceremonii.")), /*#__PURE__*/React.createElement("div", {
    className: "info-option ".concat(selectedOption === 'mistrz' ? 'active' : ''),
    onClick: function onClick() {
      return handleToggle('mistrz');
    }
  }, /*#__PURE__*/React.createElement("h3", null, "Mistrz ceremonii:"), /*#__PURE__*/React.createElement("span", {
    className: "plus"
  }, "+"), selectedOption === 'mistrz' && /*#__PURE__*/React.createElement("p", null, "Nasi do\u015Bwiadczeni mistrzowie ceremonii s\u0105 gotowi, aby prowadzi\u0107 uroczysto\u015Bci z pe\u0142nym szacunkiem i profesjonalizmem, zapewniaj\u0105c godne po\u017Cegnanie dla Twoich bliskich.")))))));
};
var _default = exports["default"] = (0, _dynamic["default"])(function () {
  return Promise.resolve(ProfessionalCeremony);
}, {
  ssr: false
});