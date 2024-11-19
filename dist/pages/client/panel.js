"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _Header = _interopRequireDefault(require("@/components/Header"));
var _Footer = _interopRequireDefault(require("@/components/Footer"));
var _Dashboard = _interopRequireDefault(require("@/components/client/Dashboard"));
var _Reports = _interopRequireDefault(require("@/components/client/Reports"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Home = function Home() {
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("header", null, /*#__PURE__*/_react["default"].createElement(_Header["default"], null)), /*#__PURE__*/_react["default"].createElement("main", {
    className: "main-mobile"
  }, /*#__PURE__*/_react["default"].createElement(_Dashboard["default"], null), /*#__PURE__*/_react["default"].createElement(_Reports["default"], null)), /*#__PURE__*/_react["default"].createElement("footer", null, /*#__PURE__*/_react["default"].createElement(_Footer["default"], null)));
};
var _default = exports["default"] = Home;