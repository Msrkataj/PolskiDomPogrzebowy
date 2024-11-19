"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var AlertMessage = function AlertMessage(_ref) {
  var message = _ref.message,
    type = _ref.type;
  if (!message) return null;
  var getAlertStyle = function getAlertStyle() {
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'error':
        return 'alert-error';
      default:
        return 'alert-info';
    }
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "alert ".concat(getAlertStyle())
  }, message);
};
var _default = exports["default"] = AlertMessage;