"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var servicesList = ["Organizacja ceremonii pogrzebowej", "Kremacja", "Transport zwłok", "Pomoc w załatwianiu formalności", "Ekshumacja", "Usługi florystyczne", "Przewozy międzynarodowe", "Usługi balsamowania", "Odzyskiwanie szczątków", "Sprzedaż trumien i urn", "Wynajem karawanu", "Muzyka pogrzebowa", "Dekoracje pogrzebowe"];
var Modal = function Modal(_ref) {
  var services = _ref.services,
    onSave = _ref.onSave,
    onCancel = _ref.onCancel;
  var _useState = (0, _react.useState)(services),
    _useState2 = _slicedToArray(_useState, 2),
    selectedServices = _useState2[0],
    setSelectedServices = _useState2[1];
  var handleServiceChange = function handleServiceChange(service) {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(function (s) {
        return s !== service;
      }));
    } else {
      setSelectedServices([].concat(_toConsumableArray(selectedServices), [service]));
    }
  };
  var handleSubmit = function handleSubmit() {
    onSave(selectedServices);
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "modal-overlay"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "modal"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Edytuj us\u0142ugi"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "services"
  }, servicesList.map(function (service) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: service
    }, /*#__PURE__*/_react["default"].createElement("input", {
      type: "checkbox",
      checked: selectedServices.includes(service),
      onChange: function onChange() {
        return handleServiceChange(service);
      }
    }), /*#__PURE__*/_react["default"].createElement("label", null, service));
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "modal-actions"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleSubmit
  }, "Zapisz"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: onCancel
  }, "Anuluj"))));
};
var _default = exports["default"] = Modal;