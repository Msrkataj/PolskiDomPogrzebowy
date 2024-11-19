"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _image = _interopRequireDefault(require("next/image"));
var _phone = _interopRequireDefault(require("../../public/assets/icons/phone.png"));
var _data = _interopRequireDefault(require("../data/data.json"));
var _link = _interopRequireDefault(require("next/link"));
var _dynamic = _interopRequireDefault(require("next/dynamic"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var SupportHome = function SupportHome() {
  var supportItems = _data["default"].supportItems;
  return /*#__PURE__*/_react["default"].createElement("div", {
    id: "pomoc-na-ktora-mozesz-liczyc",
    className: "support-component"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Pomoc, na kt\xF3r\u0105 mo\u017Cesz liczy\u0107"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "support-items flex-center"
  }, supportItems.map(function (item, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      className: "support-item"
    }, /*#__PURE__*/_react["default"].createElement(_link["default"], {
      href: item.anchor
    }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_image["default"], {
      src: item.icon,
      alt: item.text,
      width: 40,
      height: 40,
      sizes: "(max-width: 768px) 100vw, 150px",
      loading: "lazy"
    }), /*#__PURE__*/_react["default"].createElement("p", null, item.text))));
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "contact-call"
  }, /*#__PURE__*/_react["default"].createElement("h3", null, "Zadzwo\u0144 do nas, my zorganizujemy pogrzeb"), /*#__PURE__*/_react["default"].createElement(_link["default"], {
    href: "tel:+48600000000"
  }, /*#__PURE__*/_react["default"].createElement(_image["default"], {
    src: _phone["default"],
    alt: "Phone",
    width: 32,
    height: 32,
    sizes: "(max-width: 768px) 100vw, 40px",
    loading: "lazy"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "+48 600 000 000"))), /*#__PURE__*/_react["default"].createElement("p", {
    className: "or-title"
  }, "lub"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "start-yourself"
  }, /*#__PURE__*/_react["default"].createElement(_link["default"], {
    href: "/szukaj"
  }, /*#__PURE__*/_react["default"].createElement("h3", null, "Zacznij tutaj samodzielnie, my dalej wszystko zorganizujemy"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "information flex-center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "info-icon"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "info-text"
  }, /*#__PURE__*/_react["default"].createElement("h3", null, "Wiemy, jak trudne jest udanie si\u0119 osobi\u015Bcie do zak\u0142adu pogrzebowego. Dzi\u0119ki naszemu portalowi mo\u017Cesz po\u0142\u0105czy\u0107 si\u0119 z najbardziej profesjonalnym zak\u0142adem pogrzebowym bez wychodzenia z domu. Zapewniamy najlepszy asortyment w specjalnej cenie, wsp\xF3\u0142pracuj\u0105c tylko z do\u015Bwiadczonymi zak\u0142adami. U nas za\u0142atwisz wszystko, \u0142\u0105cznie z dokumentami i wyborem asortymentu, nie opuszczaj\u0105c domu."), /*#__PURE__*/_react["default"].createElement(_link["default"], {
    href: "#how-it-works",
    className: "check-how-it-works"
  }, "Sprawd\u017A jak to dzia\u0142a", /*#__PURE__*/_react["default"].createElement("span", {
    className: "arrow-icon"
  })))));
};
var _default = exports["default"] = (0, _dynamic["default"])(function () {
  return Promise.resolve(SupportHome);
}, {
  ssr: false
});