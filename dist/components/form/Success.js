"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _router = require("next/router");
var _link = _interopRequireDefault(require("next/link"));
var _ChooseFuneral = _interopRequireDefault(require("@/components/form/ChooseFuneral"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Success = function Success() {
  var router = (0, _router.useRouter)();
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "message-success"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "message"
  }, "Formularz zosta\u0142 wys\u0142any, skontaktujemy si\u0119 z Tob\u0105 jak najszybciej"), /*#__PURE__*/_react["default"].createElement(_ChooseFuneral["default"], {
    success: true
  }), /*#__PURE__*/_react["default"].createElement(_link["default"], {
    href: "/login",
    className: "change-button"
  }, "Sprawd\u017A swoje zg\u0142oszenie")));
};
var _default = exports["default"] = Success;