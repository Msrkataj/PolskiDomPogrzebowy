"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _link = _interopRequireDefault(require("next/link"));
var _image = _interopRequireDefault(require("next/image"));
var _data = _interopRequireDefault(require("../data/data.json"));
var _dynamic = _interopRequireDefault(require("next/dynamic"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Footer = function Footer(_ref) {
  var handleOpenChat = _ref.handleOpenChat;
  return /*#__PURE__*/_react["default"].createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "footer-background"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "footer-content"
  }, /*#__PURE__*/_react["default"].createElement(_link["default"], {
    href: "/"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "footer-logo"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "logo-image"
  }, /*#__PURE__*/_react["default"].createElement(_image["default"], {
    src: "/assets/logo.webp",
    alt: "Polskidompogrzebowy.pl",
    width: 300,
    height: 50,
    sizes: "(max-width: 768px) 205vw, 300px",
    priority: true,
    style: {
      objectFit: "contain"
    }
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "footer-columns"
  }, _data["default"].navigationData.map(function (section, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "footer-column",
      key: index
    }, /*#__PURE__*/_react["default"].createElement("h3", null, section.name), /*#__PURE__*/_react["default"].createElement("ul", null, section.links.map(function (link, linkIndex) {
      return /*#__PURE__*/_react["default"].createElement("li", {
        key: linkIndex
      }, /*#__PURE__*/_react["default"].createElement(_link["default"], {
        href: link.href
      }, link.name));
    })));
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "footer-buttons"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleOpenChat,
    className: "button-login"
  }, /*#__PURE__*/_react["default"].createElement(_image["default"], {
    src: "/assets/icons/consultant-white.png",
    alt: "Consultant",
    width: 25,
    height: 25
  }), " ", "Zapytaj teraz"), /*#__PURE__*/_react["default"].createElement(_link["default"], {
    href: "/login",
    className: "button-login"
  }, "Logowanie")))), /*#__PURE__*/_react["default"].createElement("p", {
    className: "footer-end"
  }, "\xA9 2024 Polskidompogrzebowy.pl by KamaLogic"));
};
var _default = exports["default"] = (0, _dynamic["default"])(function () {
  return Promise.resolve(Footer);
}, {
  ssr: false
});