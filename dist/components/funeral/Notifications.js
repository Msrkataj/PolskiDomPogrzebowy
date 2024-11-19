"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _dayjs = _interopRequireDefault(require("dayjs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var Notifications = function Notifications(_ref) {
  var notifications = _ref.notifications,
    formCreatedTimestamp = _ref.formCreatedTimestamp;
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    sortedNotifications = _useState2[0],
    setSortedNotifications = _useState2[1];
  var _useState3 = (0, _react.useState)(1),
    _useState4 = _slicedToArray(_useState3, 2),
    currentPage = _useState4[0],
    setCurrentPage = _useState4[1];
  var notificationsPerPage = 10;
  (0, _react.useEffect)(function () {
    if (notifications.length > 0) {
      var sorted = _toConsumableArray(notifications).sort(function (a, b) {
        var dateA = a.timestamp ? typeof a.timestamp.toDate === 'function' ? a.timestamp.toDate() : new Date(a.timestamp) : new Date();
        var dateB = b.timestamp ? typeof b.timestamp.toDate === 'function' ? b.timestamp.toDate() : new Date(b.timestamp) : new Date();
        return dateB - dateA; // Sort by newest first
      });
      setSortedNotifications(sorted);
    }
  }, [notifications]);

  // Calculate the indices for the current page
  var indexOfLastNotification = currentPage * notificationsPerPage;
  var indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  var currentNotifications = sortedNotifications.slice(indexOfFirstNotification, indexOfLastNotification);
  var paginate = function paginate(pageNumber) {
    return setCurrentPage(pageNumber);
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "notifications-section"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Powiadomienia"), /*#__PURE__*/_react["default"].createElement("ul", null, currentNotifications.map(function (notification, index) {
    var _notification$timesta;
    return /*#__PURE__*/_react["default"].createElement("li", {
      key: index
    }, /*#__PURE__*/_react["default"].createElement("strong", null, (0, _dayjs["default"])((_notification$timesta = notification.timestamp) !== null && _notification$timesta !== void 0 && _notification$timesta.toDate ? notification.timestamp.toDate() : notification.timestamp).format('DD.MM.YYYY HH:mm'), ":"), notification.message);
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "pagination-controls"
  }, Array.from({
    length: Math.ceil(sortedNotifications.length / notificationsPerPage)
  }, function (_, index) {
    return /*#__PURE__*/_react["default"].createElement("button", {
      key: index + 1,
      onClick: function onClick() {
        return paginate(index + 1);
      },
      className: currentPage === index + 1 ? 'active' : ''
    }, index + 1);
  })));
};
var _default = exports["default"] = Notifications;