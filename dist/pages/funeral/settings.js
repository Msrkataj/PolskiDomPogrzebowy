"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _Header = _interopRequireDefault(require("@/components/Header"));
var _Footer = _interopRequireDefault(require("@/components/Footer"));
var _Dashboard = _interopRequireDefault(require("@/components/funeral/Dashboard"));
var _Orders = _interopRequireDefault(require("@/components/funeral/Orders"));
var _OrderDetails = _interopRequireDefault(require("@/components/funeral/OrderDetails"));
var _ClientsComponet = _interopRequireDefault(require("@/components/funeral/ClientsComponet"));
var _SettingsModal = _interopRequireDefault(require("@/components/funeral/SettingsModal"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Home = function Home() {
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("header", null, /*#__PURE__*/_react["default"].createElement(_Header["default"], null)), /*#__PURE__*/_react["default"].createElement("main", null, /*#__PURE__*/_react["default"].createElement(_SettingsModal["default"], null)), /*#__PURE__*/_react["default"].createElement("footer", null, /*#__PURE__*/_react["default"].createElement(_Footer["default"], null)));
};
var _default = exports["default"] = Home;