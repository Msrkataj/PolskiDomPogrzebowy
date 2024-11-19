"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("react");
var _image = _interopRequireDefault(require("next/image"));
var _heart = _interopRequireDefault(require("../../public/assets/icons/heart.png"));
var _phone = _interopRequireDefault(require("../../public/assets/icons/phone.png"));
var _consultant = _interopRequireDefault(require("../../public/assets/icons/consultant.png"));
var _SupportModal = _interopRequireDefault(require("@/components/SupportModal"));
var _link = _interopRequireDefault(require("next/link"));
var _dynamic = _interopRequireDefault(require("next/dynamic"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var FotoHome = function FotoHome(_ref) {
  var handleOpenChat = _ref.handleOpenChat;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isModalOpen = _useState2[0],
    setIsModalOpen = _useState2[1];
  var openModal = function openModal() {
    return setIsModalOpen(true);
  };
  var closeModal = function closeModal() {
    return setIsModalOpen(false);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("section", {
    id: "emotional-support",
    className: "support-section flex-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "content-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "support-text"
  }, /*#__PURE__*/React.createElement(_image["default"], {
    src: _heart["default"],
    alt: "Heart Icon",
    width: 32,
    height: 32,
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("h3", null, "Wsparcie emocjonalne i psychologiczne"), /*#__PURE__*/React.createElement("p", null, "Naszym celem jest wsparcie w najtrudniejszych chwilach. Oferujemy kompleksowe us\u0142ugi pogrzebowe na terenie ca\u0142ej Polski, dbaj\u0105c o ka\u017Cdy szczeg\xF3\u0142, aby po\u017Cegnanie by\u0142o godne i pe\u0142ne szacunku. Nasza platforma ma na celu usprawnienie procesu organizacji pogrzebu, oferuj\u0105c pomoc w ka\u017Cdej fazie, od formalno\u015Bci po ceremonie."), /*#__PURE__*/React.createElement("button", {
    onClick: openModal,
    className: "support-button"
  }, "Uzyskaj wsparcie i wskaz\xF3wki")), /*#__PURE__*/React.createElement("div", {
    className: "support-image"
  }, /*#__PURE__*/React.createElement(_image["default"], {
    src: "/assets/images/wsparcie-pychologiczne.webp",
    alt: "wsparcie-pychologiczne",
    fill: true,
    style: {
      objectFit: 'cover',
      objectPosition: 'center'
    },
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    loading: "lazy"
  }))), /*#__PURE__*/React.createElement("div", {
    id: "customer-support",
    className: "contact-options flex-center"
  }, /*#__PURE__*/React.createElement("h2", null, "24/7 Obs\u0142uga klienta"), /*#__PURE__*/React.createElement("p", {
    className: "option-main-p"
  }, "Jeste\u015Bmy dost\u0119pni dla Ciebie przez ca\u0142\u0105 dob\u0119, siedem dni w tygodniu. Nasz czat jest zawsze otwarty, a w razie potrzeby nasi pracownicy s\u0105 gotowi, aby odpowiedzie\u0107 na Twoje pytania na \u017Cywo. Niezale\u017Cnie od pory dnia czy nocy, mo\u017Cesz liczy\u0107 na pe\u0142ne wsparcie w trudnych chwilach."), /*#__PURE__*/React.createElement("div", {
    className: "option-main flex-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "option option-down"
  }, /*#__PURE__*/React.createElement("div", {
    className: "option-select"
  }, /*#__PURE__*/React.createElement(_link["default"], {
    href: "tel:+48600000000"
  }, /*#__PURE__*/React.createElement(_image["default"], {
    src: _phone["default"],
    alt: "Phone",
    width: 32,
    height: 32
  }), /*#__PURE__*/React.createElement("p", null, "+48 600 000 000")))), /*#__PURE__*/React.createElement("div", {
    className: "option option-down "
  }, /*#__PURE__*/React.createElement("div", {
    className: "option-select",
    onClick: handleOpenChat
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_image["default"], {
    src: _consultant["default"],
    alt: "Consultant",
    width: 32,
    height: 32
  }), /*#__PURE__*/React.createElement("p", null, "Doradca"))))))), /*#__PURE__*/React.createElement(_SupportModal["default"], {
    isOpen: isModalOpen,
    onClose: closeModal
  }));
};
var _default = exports["default"] = (0, _dynamic["default"])(function () {
  return Promise.resolve(FotoHome);
}, {
  ssr: false
});