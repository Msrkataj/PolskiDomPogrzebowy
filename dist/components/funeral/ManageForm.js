"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _router = require("next/router");
var _firestore = require("firebase/firestore");
var _link = _interopRequireDefault(require("next/link"));
var _firebase = require("../../../firebase");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var ManageForm = function ManageForm() {
  var router = (0, _router.useRouter)();
  var formId = router.query.formId;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    formData = _useState2[0],
    setFormData = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isEditing = _useState4[0],
    setIsEditing = _useState4[1];
  var _useState5 = (0, _react.useState)({}),
    _useState6 = _slicedToArray(_useState5, 2),
    editableData = _useState6[0],
    setEditableData = _useState6[1];
  var _useState7 = (0, _react.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    newMessage = _useState8[0],
    setNewMessage = _useState8[1];
  var _useState9 = (0, _react.useState)(formData ? formData.status : ''),
    _useState10 = _slicedToArray(_useState9, 2),
    status = _useState10[0],
    setStatus = _useState10[1];
  var _useState11 = (0, _react.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    isDropdownOpen = _useState12[0],
    setIsDropdownOpen = _useState12[1];
  var toggleDropdown = function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  };
  var handleAddMessage = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var newNotification, updatedNotifications, docRef;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            newNotification = {
              date: new Date().toISOString(),
              message: newMessage
            };
            updatedNotifications = [].concat(_toConsumableArray(formData.notifications), [newNotification]);
            docRef = (0, _firestore.doc)(_firebase.db, 'forms', formId); // Upewnij się, że formId jest poprawnie zdefiniowane
            _context.next = 5;
            return (0, _firestore.updateDoc)(docRef, {
              notifications: updatedNotifications
            });
          case 5:
            setFormData(function (prev) {
              return _objectSpread(_objectSpread({}, prev), {}, {
                notifications: updatedNotifications
              });
            });
            setNewMessage('');
          case 7:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function handleAddMessage() {
      return _ref.apply(this, arguments);
    };
  }();
  var handleStatusChange = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e) {
      var newStatus, docRef;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            newStatus = e.target.value;
            docRef = (0, _firestore.doc)(_firebase.db, 'forms', formId);
            _context2.next = 4;
            return (0, _firestore.updateDoc)(docRef, {
              status: newStatus
            });
          case 4:
            setIsDropdownOpen(!isDropdownOpen);
            setStatus(newStatus);
          case 6:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function handleStatusChange(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  (0, _react.useEffect)(function () {
    if (formData && formData.status) {
      setStatus(formData.status);
    }
  }, [formData]);
  (0, _react.useEffect)(function () {
    var fetchFormData = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var docRef, docSnap;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (!formId) {
                _context3.next = 6;
                break;
              }
              docRef = (0, _firestore.doc)(_firebase.db, 'forms', formId);
              _context3.next = 4;
              return (0, _firestore.getDoc)(docRef);
            case 4:
              docSnap = _context3.sent;
              if (docSnap.exists()) {
                setFormData(docSnap.data());
              } else {
                console.error('No such document!');
              }
            case 6:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return function fetchFormData() {
        return _ref3.apply(this, arguments);
      };
    }();
    fetchFormData();
  }, [formId]);
  var handleEditToggle = function handleEditToggle() {
    setIsEditing(!isEditing);
  };
  var handleInputChange = function handleInputChange(e) {
    var _e$target = e.target,
      name = _e$target.name,
      value = _e$target.value;
    setEditableData(function (prevData) {
      return _objectSpread(_objectSpread({}, prevData), {}, _defineProperty({}, name, value));
    });
  };
  var handleSaveChanges = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function handleSaveChanges() {
      return _ref4.apply(this, arguments);
    };
  }();
  var formatDate = function formatDate(timestamp) {
    if (!timestamp) return '';
    var date;
    if (timestamp.seconds) {
      date = new Date(timestamp.seconds * 1000);
    } else {
      date = new Date(timestamp);
    }
    return "".concat(date.getDate().toString().padStart(2, '0'), ".").concat((date.getMonth() + 1).toString().padStart(2, '0'), ".").concat(date.getFullYear(), " ").concat(date.getHours().toString().padStart(2, '0'), ":").concat(date.getMinutes().toString().padStart(2, '0'));
  };
  if (!formData) return /*#__PURE__*/_react["default"].createElement("p", null, "\u0141adowanie...");
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "manage-form"
  }, /*#__PURE__*/_react["default"].createElement(_link["default"], {
    className: "back-link",
    href: "/funeral/orders"
  }, "Wr\xF3\u0107 do panelu"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "manage-form-status"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "status"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Status:")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "custom-select"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "selected-option",
    onClick: toggleDropdown
  }, status, " ", /*#__PURE__*/_react["default"].createElement("span", {
    className: "arrow"
  }, "\u25BC")), isDropdownOpen && /*#__PURE__*/_react["default"].createElement("div", {
    className: "options"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    onClick: function onClick() {
      return handleStatusChange({
        target: {
          value: 'Nowe'
        }
      });
    }
  }, "Nowe"), /*#__PURE__*/_react["default"].createElement("div", {
    onClick: function onClick() {
      return handleStatusChange({
        target: {
          value: 'W trakcie'
        }
      });
    }
  }, "W trakcie"), /*#__PURE__*/_react["default"].createElement("div", {
    onClick: function onClick() {
      return handleStatusChange({
        target: {
          value: 'Zakończone'
        }
      });
    }
  }, "Zako\u0144czone")))), /*#__PURE__*/_react["default"].createElement("h1", null, "Zg\u0142oszony formularz"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "message-add"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "newMessage"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Dodaj wiadomo\u015B\u0107:")), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    value: newMessage,
    onChange: function onChange(e) {
      return setNewMessage(e.target.value);
    },
    placeholder: "Wpisz wiadomo\u015B\u0107"
  }), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleAddMessage
  }, "Dodaj")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "manage-form-main"
  }, /*#__PURE__*/_react["default"].createElement("p", null, "Email Klienta: ", formData.email), /*#__PURE__*/_react["default"].createElement("p", null, "Numer telefonu: ", formData.phone)), isEditing && /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleSaveChanges
  }, "Zapisz zmiany"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-details"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "section"
  }, /*#__PURE__*/_react["default"].createElement("section", {
    className: "section-header-manage"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Szczeg\xF3\u0142y formularza"), /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "date"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Data zgloszenia:")), /*#__PURE__*/_react["default"].createElement("p", null, formatDate(formData.date)))), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleEditToggle
  }, isEditing ? 'Anuluj' : 'Edytuj'), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "name"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Imi\u0119 Osoby zmarlej:")), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "name",
    value: editableData.name,
    onChange: handleInputChange
  }) : /*#__PURE__*/_react["default"].createElement("p", null, formData.name)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "name"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Nazwisko Osoby zmarlej:")), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "name",
    value: editableData.surname,
    onChange: handleInputChange
  }) : /*#__PURE__*/_react["default"].createElement("p", null, formData.surname)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "pesel"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "PESEL:")), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "pesel",
    value: editableData.pesel,
    onChange: handleInputChange
  }) : /*#__PURE__*/_react["default"].createElement("p", null, formData.pesel)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "location"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Gdzie nastepuje zgon:")), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "location",
    value: editableData.location,
    onChange: handleInputChange
  }) : /*#__PURE__*/_react["default"].createElement("p", null, formData.location)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "city"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Miasto zgonu:")), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "city",
    value: editableData.city,
    onChange: handleInputChange
  }) : /*#__PURE__*/_react["default"].createElement("p", null, formData.city)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "street"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Ulica:")), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "street",
    value: editableData.street,
    onChange: handleInputChange
  }) : /*#__PURE__*/_react["default"].createElement("p", null, formData.street)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "code"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Kod pocztowy:")), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "code",
    value: editableData.code,
    onChange: handleInputChange
  }) : /*#__PURE__*/_react["default"].createElement("p", null, formData.code)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "documents"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Kiedy b\u0119d\u0105 za\u0142atwiane dokumenty?")), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "documents",
    value: editableData.documents,
    onChange: handleInputChange
  }) : /*#__PURE__*/_react["default"].createElement("p", null, formData.documents)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "deathDate"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Data \u015Bmierci:")), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "deathDate",
    value: editableData.deathDate,
    onChange: handleInputChange
  }) : /*#__PURE__*/_react["default"].createElement("p", null, formData.deathDate)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "birthDate"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Data urodzin:")), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "birthDate",
    value: editableData.birthDate,
    onChange: handleInputChange
  }) : /*#__PURE__*/_react["default"].createElement("p", null, formData.birthDate)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "pensionCertificate"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Za\u015Bwiadczenie, \u017Ce na dzie\u0144 zgonu podlega\u0142o si\u0119 sk\u0142adkom emerytalno-rentowym:")), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "checkbox",
    name: "pensionCertificate",
    value: editableData.pensionCertificate,
    onChange: handleInputChange
  }) : /*#__PURE__*/_react["default"].createElement("p", null, formData.pensionCertificate ? "Tak" : "Nie")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "pensionDetails"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Szczeg\xF3\u0142y za\u015Bwiadczenia:")), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "pensionDetails",
    value: editableData.pensionDetails,
    onChange: handleInputChange
  }) : /*#__PURE__*/_react["default"].createElement("p", null, formData.pensionDetails)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "worked"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Czy Osoba pracowa\u0142a?")), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "worked",
    value: editableData.worked,
    onChange: handleInputChange
  }) : /*#__PURE__*/_react["default"].createElement("p", null, formData.worked)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "insurance"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Osoba zmar\u0142a by\u0142a ubezpieczona w:")), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "insurance",
    value: editableData.insurance,
    onChange: handleInputChange
  }) : /*#__PURE__*/_react["default"].createElement("p", null, formData.insurance)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "certificateNumber"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Numer zaswiadczenia:")), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "certificateNumber",
    value: editableData.certificateNumber,
    onChange: handleInputChange
  }) : /*#__PURE__*/_react["default"].createElement("p", null, formData.certificateNumber)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "certificateNumber"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Osoba udzielaj\u0105ca pe\u0142nomocnictwa:")), /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "name"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Imi\u0119 i nazwisko:")), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "name",
    value: editableData.authorizedPerson.name,
    onChange: function onChange(e) {
      return setEditableData(_objectSpread(_objectSpread({}, editableData), {}, {
        authorizedPerson: _objectSpread(_objectSpread({}, editableData.authorizedPerson), {}, {
          name: e.target.value
        })
      }));
    }
  }) : /*#__PURE__*/_react["default"].createElement("p", null, formData.authorizedPerson.name)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "pesel"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Oraz tej Osoby PESEL:")), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "pesel",
    value: editableData.authorizedPerson.pesel,
    onChange: function onChange(e) {
      return setEditableData(_objectSpread(_objectSpread({}, editableData), {}, {
        authorizedPerson: _objectSpread(_objectSpread({}, editableData.authorizedPerson), {}, {
          pesel: e.target.value
        })
      }));
    }
  }) : /*#__PURE__*/_react["default"].createElement("p", null, formData.authorizedPerson.pesel)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "who"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Kto sporz\u0105dza akt zgonu?")), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "who",
    value: editableData.who,
    onChange: handleInputChange
  }) : /*#__PURE__*/_react["default"].createElement("p", null, formData.who === "funeral" ? "Dom pogrzebowy" : "Rodzina")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "formType"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Forma pogrzebu:")), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "formType",
    value: editableData.formType,
    onChange: handleInputChange
  }) : /*#__PURE__*/_react["default"].createElement("p", null, formData.formType)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "religiousCeremony"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Ceremonia religijna:")), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "religiousCeremony",
    value: editableData.religiousCeremony,
    onChange: handleInputChange
  }) : /*#__PURE__*/_react["default"].createElement("p", null, formData.religiousCeremony)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "burialOption"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Czy dochowujemy do grobu?")), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "burialOption",
    value: editableData.burialOption,
    onChange: handleInputChange
  }) : /*#__PURE__*/_react["default"].createElement("p", null, formData.burialOption)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "clothingOption"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Ubi\xF3r zmar\u0142ego:")), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "clothingOption",
    value: editableData.clothingOption,
    onChange: handleInputChange
  }) : /*#__PURE__*/_react["default"].createElement("p", null, formData.clothingOption)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "phone"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Telefon:")), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "phone",
    value: editableData.phone,
    onChange: handleInputChange
  }) : /*#__PURE__*/_react["default"].createElement("p", null, formData.phone))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "section"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "selectedItems"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Wybrany asortyment:")), formData.selectedItems.map(function (item, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index
    }, /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("strong", null, item.name, ":"), " ", item.price, " z\u0142"));
  }), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Suma:"), " ", formData.selectedItems.reduce(function (total, item) {
    return total + parseFloat(item.price);
  }, 0), " z\u0142")))))));
};
var _default = exports["default"] = ManageForm;