"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var DeleteConfirmationModal = function DeleteConfirmationModal(_ref) {
  var isOpen = _ref.isOpen,
    onClose = _ref.onClose,
    onConfirm = _ref.onConfirm;
  if (!isOpen) return null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "modal-delete"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "modal-delete__overlay"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "modal-delete__container"
  }, /*#__PURE__*/_react["default"].createElement("h2", {
    className: "modal-delete__title"
  }, "Czy na pewno chcesz usun\u0105\u0107 ten formularz?"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mmodal-delete__actions"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: "modal-delete__button modal__button--cancel",
    onClick: onClose
  }, "Anuluj"), /*#__PURE__*/_react["default"].createElement("button", {
    className: "modal-delete__button modal__button--confirm",
    onClick: onConfirm
  }, "Usu\u0144")))));
};
var _default = exports["default"] = DeleteConfirmationModal;