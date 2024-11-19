"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _router = require("next/router");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ClientActions = function ClientActions() {
  var router = (0, _router.useRouter)();
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "actions"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return router.push('/new-submission');
    }
  }, "Nowe zg\u0142oszenie"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return router.push('/contact-consultant');
    }
  }, "Tw\xF3j osobisty konsultant"));
};
var _default = exports["default"] = ClientActions;