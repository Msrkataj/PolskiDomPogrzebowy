"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _router = require("next/router");
var _firebase = require("../../../firebase");
var _firestore = require("firebase/firestore");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _Comments = _interopRequireDefault(require("./Comments"));
var _FetchFuneralHomeData = _interopRequireDefault(require("./FetchFuneralHomeData"));
var _image = _interopRequireDefault(require("next/image"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var Dashboard = function Dashboard() {
  var funeralHome = (0, _FetchFuneralHomeData["default"])();
  var _useState = (0, _react.useState)(true),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    orders = _useState4[0],
    setOrders = _useState4[1];
  var _useState5 = (0, _react.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    selectedRows = _useState6[0],
    setSelectedRows = _useState6[1];
  var _useState7 = (0, _react.useState)(['Nowe zgłoszenie', 'Weryfikacja danych', 'Oczekiwanie na dokumenty', 'Planowanie ceremonii', 'Potwierdzenie terminu', 'Przygotowanie miejsca pochówku', 'Oczekiwanie na odbiór trumny/urny', 'Przygotowanie ciała', 'Ceremonia pogrzebowa', 'Zakończone']),
    _useState8 = _slicedToArray(_useState7, 2),
    statusOptions = _useState8[0],
    setStatusOptions = _useState8[1];
  var _useState9 = (0, _react.useState)(1),
    _useState10 = _slicedToArray(_useState9, 2),
    currentPage = _useState10[0],
    setCurrentPage = _useState10[1];
  var _useState11 = (0, _react.useState)(null),
    _useState12 = _slicedToArray(_useState11, 2),
    activeActionDropdown = _useState12[0],
    setActiveActionDropdown = _useState12[1];
  var itemsPerPage = 20;
  var router = (0, _router.useRouter)();
  var _useState13 = (0, _react.useState)(false),
    _useState14 = _slicedToArray(_useState13, 2),
    showStatusModal = _useState14[0],
    setShowStatusModal = _useState14[1];
  var _useState15 = (0, _react.useState)(''),
    _useState16 = _slicedToArray(_useState15, 2),
    newStatus = _useState16[0],
    setNewStatus = _useState16[1];
  var statusDescriptions = {
    'Nowe zgłoszenie': 'Nowe, jeszcze nieprzetworzone zamówienie.',
    'Weryfikacja danych': 'Zamówienie jest w trakcie weryfikacji danych.',
    'Oczekiwanie na dokumenty': 'Oczekiwanie na dostarczenie brakujących dokumentów.',
    'Planowanie ceremonii': 'Ustalane są szczegóły ceremonii pogrzebowej.',
    'Potwierdzenie terminu': 'Termin ceremonii został potwierdzony z klientem.',
    'Przygotowanie miejsca pochówku': 'Trwają przygotowania do ceremonii w miejscu pochówku.',
    'Oczekiwanie na odbiór trumny/urny': 'Czekamy na dostawę lub odbiór wybranego asortymentu.',
    'Przygotowanie ciała': 'Ciało zmarłego jest przygotowywane do pochówku lub kremacji.',
    'Ceremonia pogrzebowa': 'Ceremonia pogrzebowa jest w trakcie realizacji.',
    'Zakończone': 'Wszystkie czynności związane z zamówieniem zostały zakończone.'
  };
  var _useState17 = (0, _react.useState)({
      'Nowe zgłoszenie': 10,
      'Weryfikacja danych': 20,
      'Oczekiwanie na dokumenty': 30,
      'Planowanie ceremonii': 40,
      'Potwierdzenie terminu': 50,
      'Przygotowanie miejsca pochówku': 60,
      'Oczekiwanie na odbiór trumny/urny': 70,
      'Przygotowanie ciała': 80,
      'Ceremonia pogrzebowa': 90,
      'Zakończone': 100
    }),
    _useState18 = _slicedToArray(_useState17, 2),
    statusPercentages = _useState18[0],
    setStatusPercentages = _useState18[1];
  // Fetch orders function wrapped in useCallback
  var fetchOrders = (0, _react.useCallback)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var q, querySnapshot, ordersData;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (funeralHome) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return");
        case 2:
          _context.prev = 2;
          q = (0, _firestore.query)((0, _firestore.collection)(_firebase.db, 'forms'), (0, _firestore.where)('funeralHomeName', '==', funeralHome.funeralHomeName));
          _context.next = 6;
          return (0, _firestore.getDocs)(q);
        case 6:
          querySnapshot = _context.sent;
          ordersData = [];
          querySnapshot.forEach(function (doc) {
            ordersData.push(_objectSpread({
              id: doc.id
            }, doc.data()));
          });

          // Sortowanie zamówień po timestamp, od najnowszych do najstarszych
          ordersData = ordersData.sort(function (a, b) {
            return b.timestamp.toDate() - a.timestamp.toDate();
          });
          setOrders(ordersData);
          setLoading(false);
          _context.next = 18;
          break;
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](2);
          console.error("Error fetching orders:", _context.t0);
          setLoading(false);
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 14]]);
  })), [funeralHome]);

  // Sprawdzenie autoryzacji użytkownika i pobranie zamówień
  (0, _react.useEffect)(function () {
    var checkUserAuthAndFetchOrders = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var userRole;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              userRole = localStorage.getItem('userRole');
              if (!(!userRole || userRole !== 'funeralHome')) {
                _context2.next = 5;
                break;
              }
              router.push('/login');
              _context2.next = 7;
              break;
            case 5:
              _context2.next = 7;
              return fetchOrders();
            case 7:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function checkUserAuthAndFetchOrders() {
        return _ref2.apply(this, arguments);
      };
    }();
    checkUserAuthAndFetchOrders();
  }, [funeralHome, router, fetchOrders]);

  // Subskrypcja na zmiany zamówień
  (0, _react.useEffect)(function () {
    if (funeralHome) {
      var unsubscribe = (0, _firestore.onSnapshot)((0, _firestore.query)((0, _firestore.collection)(_firebase.db, 'forms'), (0, _firestore.where)('funeralHomeName', '==', funeralHome.funeralHomeName)), function (snapshot) {
        var updatedOrders = [];
        snapshot.forEach(function (doc) {
          updatedOrders.push(_objectSpread({
            id: doc.id
          }, doc.data()));
        });

        // Sortowanie zamówień po timestamp, od najnowszych do najstarszych
        updatedOrders = updatedOrders.sort(function (a, b) {
          var dateA = a.timestamp ? a.timestamp.toDate() : new Date(0);
          var dateB = b.timestamp ? b.timestamp.toDate() : new Date(0);
          return dateB - dateA;
        });
        setOrders(updatedOrders);
      });
      return function () {
        return unsubscribe();
      };
    }
  }, [funeralHome]);
  var toggleActionDropdown = function toggleActionDropdown(orderId) {
    setActiveActionDropdown(activeActionDropdown === orderId ? null : orderId);
  };
  var handleActionSelect = function handleActionSelect(orderId, action) {
    if (action === 'clientDetails') {
      router.push("/funeral/client-details?clientId=".concat(orderId));
    } else if (action === 'orderDetails') {
      router.push("/funeral/order-details?orderId=".concat(orderId));
    }
    setActiveActionDropdown(null);
  };
  var calculateProgress = function calculateProgress(status) {
    return statusPercentages[status] || 0; // Domyślnie 0% jeśli status nie został znaleziony
  };
  var ProgressIndicator = function ProgressIndicator(_ref3) {
    var progress = _ref3.progress;
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "progress-bar"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "progress",
      style: {
        width: "".concat(progress, "%")
      }
    }, progress, "%"));
  };
  var handleStatusChange = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(orderId, newStatus) {
      var orderRef;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            orderRef = (0, _firestore.doc)(_firebase.db, 'forms', orderId);
            _context3.next = 3;
            return (0, _firestore.updateDoc)(orderRef, {
              status: newStatus
            });
          case 3:
            console.log("Powiadomienie do klienta: status zmieniony na ".concat(newStatus));
          case 4:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function handleStatusChange(_x, _x2) {
      return _ref4.apply(this, arguments);
    };
  }();
  var handleRowSelect = function handleRowSelect(orderId) {
    if (selectedRows.includes(orderId)) {
      setSelectedRows(selectedRows.filter(function (id) {
        return id !== orderId;
      }));
    } else {
      setSelectedRows([].concat(_toConsumableArray(selectedRows), [orderId]));
    }
  };
  var formatDate = function formatDate(order) {
    if (order.timestamp) {
      return (0, _dayjs["default"])(order.timestamp.toDate()).format('DD.MM.YYYY HH:mm');
    }
    return 'Brak daty';
  };

  // Funkcja do zarządzania statusami
  var handleManageStatuses = function handleManageStatuses() {
    setShowStatusModal(true);
  };
  var _useState19 = (0, _react.useState)(0),
    _useState20 = _slicedToArray(_useState19, 2),
    newStatusPercentage = _useState20[0],
    setNewStatusPercentage = _useState20[1];
  var handlePercentageChange = function handlePercentageChange(status, newPercentage) {
    setStatusPercentages(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, status, newPercentage));
    });
  };
  var handleAddCustomStatus = function handleAddCustomStatus() {
    if (newStatus && !statusOptions.includes(newStatus)) {
      setStatusOptions([].concat(_toConsumableArray(statusOptions), [newStatus]));
      setStatusPercentages(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, newStatus, newStatusPercentage));
      });
      setNewStatus('');
      setNewStatusPercentage(0); // Resetuj po dodaniu
    }
  };
  var handleDeleteStatus = function handleDeleteStatus(statusToDelete) {
    // Opcjonalnie możesz dodać potwierdzenie usunięcia
    if (window.confirm("Czy na pewno chcesz usun\u0105\u0107 status \"".concat(statusToDelete, "\"?"))) {
      setStatusOptions(statusOptions.filter(function (status) {
        return status !== statusToDelete;
      }));
    }
  };

  // Paginacja
  var indexOfLastItem = currentPage * itemsPerPage;
  var indexOfFirstItem = indexOfLastItem - itemsPerPage;
  var currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
  var paginate = function paginate(pageNumber) {
    return setCurrentPage(pageNumber);
  };
  if (loading) return /*#__PURE__*/_react["default"].createElement("div", {
    className: "loadingContainer"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "loadingSpinner"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "loadingText"
  }, "\u0141adowanie danych..."));
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "dashboardContainer"
  }, /*#__PURE__*/_react["default"].createElement("h1", null, "Witamy w Twoim Panelu Domu Pogrzebowego"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "funeralHomeInfo"
  }, /*#__PURE__*/_react["default"].createElement(_image["default"], {
    src: funeralHome.logoUrl,
    alt: "Logo",
    width: 100,
    height: 100,
    className: "funeralHomeLogo"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "funeralHomeDetails"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, funeralHome.funeralHomeName))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "orderTableContainer"
  }, /*#__PURE__*/_react["default"].createElement("table", {
    className: "orderTable"
  }, /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("th", null, /*#__PURE__*/_react["default"].createElement("input", {
    type: "checkbox",
    onChange: function onChange(e) {
      return setSelectedRows(e.target.checked ? orders.map(function (order) {
        return order.id;
      }) : []);
    }
  })), /*#__PURE__*/_react["default"].createElement("th", null, "Data Z\u0142o\u017Cenia"), /*#__PURE__*/_react["default"].createElement("th", null, "Imi\u0119 i Nazwisko Zmar\u0142ego"), /*#__PURE__*/_react["default"].createElement("th", null, "Imi\u0119 i Nazwisko Zamawiaj\u0105cego"), /*#__PURE__*/_react["default"].createElement("th", null, "Numer Kontaktowy"), /*#__PURE__*/_react["default"].createElement("th", null, "Skr\xF3t Zam\xF3wienia"), /*#__PURE__*/_react["default"].createElement("th", null, "Uwagi"), /*#__PURE__*/_react["default"].createElement("th", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "status-header"
  }, /*#__PURE__*/_react["default"].createElement("label", null, "Status"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "status-help"
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faQuestionCircle,
    className: "help-icon"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "status-tooltip"
  }, Object.entries(statusDescriptions).map(function (_ref5, index) {
    var _ref6 = _slicedToArray(_ref5, 2),
      status = _ref6[0],
      description = _ref6[1];
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index
    }, /*#__PURE__*/_react["default"].createElement("strong", null, status, ":"), " ", description);
  }))))), /*#__PURE__*/_react["default"].createElement("th", null, "Progres"), /*#__PURE__*/_react["default"].createElement("th", null, "Akcje"))), /*#__PURE__*/_react["default"].createElement("tbody", null, currentItems.length > 0 ? currentItems.map(function (order) {
    var _order$authorizedPers;
    return /*#__PURE__*/_react["default"].createElement("tr", {
      key: order.id,
      className: selectedRows.includes(order.id) ? 'selected' : ''
    }, /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("input", {
      type: "checkbox",
      checked: selectedRows.includes(order.id),
      onChange: function onChange() {
        return handleRowSelect(order.id);
      }
    })), /*#__PURE__*/_react["default"].createElement("td", null, formatDate(order)), /*#__PURE__*/_react["default"].createElement("td", null, order.name, " ", order.surname), /*#__PURE__*/_react["default"].createElement("td", {
      className: "clickableName",
      onClick: function onClick() {
        return handleActionSelect(order.id, 'clientDetails');
      }
    }, ((_order$authorizedPers = order.authorizedPerson) === null || _order$authorizedPers === void 0 ? void 0 : _order$authorizedPers.name) || 'Brak danych'), /*#__PURE__*/_react["default"].createElement("td", null, order.phone), /*#__PURE__*/_react["default"].createElement("td", null, order.formType), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(_Comments["default"], {
      formId: order.id,
      formDate: order.date
    })), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("select", {
      value: order.status,
      onChange: function onChange(e) {
        return handleStatusChange(order.id, e.target.value);
      }
    }, statusOptions.map(function (status, index) {
      return /*#__PURE__*/_react["default"].createElement("option", {
        key: index,
        value: status
      }, status);
    }))), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(ProgressIndicator, {
      progress: calculateProgress(order.status)
    })), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("div", {
      className: "cogButtonWrapper"
    }, /*#__PURE__*/_react["default"].createElement("button", {
      className: "cogButton",
      onClick: function onClick() {
        return toggleActionDropdown(order.id);
      }
    }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
      icon: _freeSolidSvgIcons.faCog
    })), activeActionDropdown === order.id && /*#__PURE__*/_react["default"].createElement("div", {
      className: "actionDropdown"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "button",
      onClick: function onClick() {
        return handleActionSelect(order.id, 'clientDetails');
      }
    }, "Zobacz szczeg\xF3\u0142y klienta"), /*#__PURE__*/_react["default"].createElement("div", {
      className: "button",
      onClick: function onClick() {
        return handleActionSelect(order.id, 'orderDetails');
      }
    }, "Zobacz zam\xF3wienie klienta")))));
  }) : /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
    colSpan: "10",
    style: {
      textAlign: 'center'
    }
  }, "Brak zam\xF3wie\u0144 do wy\u015Bwietlenia.")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "pagination"
  }, _toConsumableArray(Array(Math.ceil(orders.length / itemsPerPage)).keys()).map(function (number) {
    return /*#__PURE__*/_react["default"].createElement("button", {
      key: number,
      onClick: function onClick() {
        return paginate(number + 1);
      },
      className: "paginationButton"
    }, number + 1);
  }))), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleManageStatuses,
    className: "manageStatusButton"
  }, "Zarz\u0105dzaj statusami"), showStatusModal && /*#__PURE__*/_react["default"].createElement("div", {
    className: "modal-overlay",
    onClick: function onClick() {
      return setShowStatusModal(false);
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "modal-content",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/_react["default"].createElement("h3", null, "Zarz\u0105dzaj statusami"), /*#__PURE__*/_react["default"].createElement("ul", {
    className: "status-list"
  }, statusOptions.map(function (status, index) {
    return /*#__PURE__*/_react["default"].createElement("li", {
      key: index,
      className: "status-item"
    }, /*#__PURE__*/_react["default"].createElement("span", null, status), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("input", {
      type: "number",
      value: statusPercentages[status],
      onChange: function onChange(e) {
        return handlePercentageChange(status, e.target.value);
      },
      className: "percentage-input",
      min: "0",
      max: "100"
    }), /*#__PURE__*/_react["default"].createElement("button", {
      className: "delete-status-button",
      onClick: function onClick() {
        return handleDeleteStatus(status);
      }
    }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
      icon: _freeSolidSvgIcons.faTrash
    }))));
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "add-status-form"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    value: newStatus,
    onChange: function onChange(e) {
      return setNewStatus(e.target.value);
    },
    placeholder: "Nowy status",
    className: "status-input"
  }), /*#__PURE__*/_react["default"].createElement("input", {
    type: "number",
    value: newStatusPercentage,
    onChange: function onChange(e) {
      return setNewStatusPercentage(e.target.value);
    },
    placeholder: "Procent dla nowego statusu",
    className: "percentage-input",
    min: "0",
    max: "100"
  }), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleAddCustomStatus,
    className: "add-status-button"
  }, "Dodaj status")), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setShowStatusModal(false);
    },
    className: "close-modal-button"
  }, "Zamknij"))));
};
var _default = exports["default"] = Dashboard;