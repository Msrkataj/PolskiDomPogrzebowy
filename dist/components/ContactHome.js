"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _image = _interopRequireDefault(require("next/image"));
var _phone = _interopRequireDefault(require("../../public/assets/icons/phone.png"));
var _consultant = _interopRequireDefault(require("../../public/assets/icons/consultant.png"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _link = _interopRequireDefault(require("next/link"));
var _dynamic = _interopRequireDefault(require("next/dynamic"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PolskaMap = function PolskaMap() {
  return /*#__PURE__*/React.createElement("div", {
    className: "container flex-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contact-home flex-center"
  }, /*#__PURE__*/React.createElement("h2", {
    id: "nationwide-support",
    className: "contact-title"
  }, "Pomoc na terenie ca\u0142ej Polski"), /*#__PURE__*/React.createElement("section", {
    className: "polska-map-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "map"
  }, /*#__PURE__*/React.createElement(_image["default"], {
    src: "/assets/images/map.png",
    alt: "Mapa Polski",
    fill: true,
    style: {
      objectFit: "contain"
    },
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("div", {
    className: "contact-info-main"
  }, /*#__PURE__*/React.createElement("p", {
    className: "contact-info-text"
  }, "Dzia\u0142amy na terenie ca\u0142ej Polski, oferuj\u0105c kompleksowe us\u0142ugi pogrzebowe w ka\u017Cdym regionie. Wsp\xF3\u0142pracujemy z lokalnymi zak\u0142adami pogrzebowymi, aby zapewni\u0107 najwy\u017Csz\u0105 jako\u015B\u0107 us\u0142ug, niezale\u017Cnie od miejsca, w kt\xF3rym si\u0119 znajdujesz. Nasza platforma umo\u017Cliwia szybki i \u0142atwy dost\u0119p do sprawdzonych zak\u0142ad\xF3w pogrzebowych w Twojej okolicy."), /*#__PURE__*/React.createElement("div", {
    className: "contact-methods"
  }, /*#__PURE__*/React.createElement("h3", null, "Kontakt"), /*#__PURE__*/React.createElement("div", {
    className: "contact-methods-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contact-item"
  }, /*#__PURE__*/React.createElement(_link["default"], {
    href: "tel:+48600000000"
  }, /*#__PURE__*/React.createElement(_image["default"], {
    src: _phone["default"],
    alt: "Telefon",
    width: 32,
    height: 32,
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("div", {
    className: "contact-item-details"
  }, /*#__PURE__*/React.createElement("p", null, "+48 600 000 000"), /*#__PURE__*/React.createElement("span", null, "Telefon ca\u0142odobowy")))), /*#__PURE__*/React.createElement("div", {
    className: "contact-item"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_image["default"], {
    src: _consultant["default"],
    alt: "Czat na \u017Cywo",
    width: 32,
    height: 32,
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("div", {
    className: "contact-item-details"
  }, /*#__PURE__*/React.createElement("p", null, "Czat na \u017Cywo"), /*#__PURE__*/React.createElement("span", null, "W razie dost\u0119pno\u015Bci")))), /*#__PURE__*/React.createElement("div", {
    className: "contact-item"
  }, /*#__PURE__*/React.createElement(_link["default"], {
    href: "mailto:kontakt@pdpogrzebowy.pl"
  }, /*#__PURE__*/React.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faEnvelope,
    size: "2x"
  }), /*#__PURE__*/React.createElement("p", null, "kontakt@pdpogrzebowy.pl")))))))));
};
var _default = exports["default"] = (0, _dynamic["default"])(function () {
  return Promise.resolve(PolskaMap);
}, {
  ssr: false
});