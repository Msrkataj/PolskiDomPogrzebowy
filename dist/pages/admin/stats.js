"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _Header = _interopRequireDefault(require("@/components/Header"));
var _Footer = _interopRequireDefault(require("@/components/Footer"));
var _stats = _interopRequireDefault(require("@/components/admin/stats"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var StatsSite = function StatsSite() {
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("header", null, /*#__PURE__*/_react["default"].createElement(_Header["default"], null)), /*#__PURE__*/_react["default"].createElement("main", null, /*#__PURE__*/_react["default"].createElement(_stats["default"], null)), /*#__PURE__*/_react["default"].createElement("footer", null, /*#__PURE__*/_react["default"].createElement(_Footer["default"], null)));
};
var _default = exports["default"] = StatsSite;