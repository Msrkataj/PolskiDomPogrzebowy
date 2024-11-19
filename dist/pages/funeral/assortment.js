"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _Header = _interopRequireDefault(require("@/components/Header"));
var _Footer = _interopRequireDefault(require("@/components/Footer"));
var _FuneralHomeAssortment = _interopRequireDefault(require("@/components/funeral/FuneralHomeAssortment"));
var _dynamic = _interopRequireDefault(require("next/dynamic"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Assortment = function Assortment() {
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("header", null, /*#__PURE__*/_react["default"].createElement(_Header["default"], null)), /*#__PURE__*/_react["default"].createElement("main", null, /*#__PURE__*/_react["default"].createElement(_FuneralHomeAssortment["default"], null)), /*#__PURE__*/_react["default"].createElement("footer", null, /*#__PURE__*/_react["default"].createElement(_Footer["default"], null)));
};
var _default = exports["default"] = (0, _dynamic["default"])(function () {
  return Promise.resolve(Assortment);
}, {
  ssr: false
});