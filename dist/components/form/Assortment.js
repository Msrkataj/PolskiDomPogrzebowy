"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _firebase = require("../../../firebase");
var _firestore = require("firebase/firestore");
var _storage = require("firebase/storage");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _router = require("next/router");
var _image = _interopRequireDefault(require("next/image"));
var _StepNavigation = _interopRequireDefault(require("@/components/StepNavigation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var formatPrice = function formatPrice(price) {
  var numericPrice = parseFloat(price);
  if (isNaN(numericPrice)) {
    return "0.00";
  }
  return numericPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace('.00', '');
};
var Assortment = function Assortment() {
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    budget = _useState2[0],
    setBudget = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    assortyment = _useState4[0],
    setAssortyment = _useState4[1];
  var _useState5 = (0, _react.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    filteredAssortyment = _useState6[0],
    setFilteredAssortyment = _useState6[1];
  var _useState7 = (0, _react.useState)({}),
    _useState8 = _slicedToArray(_useState7, 2),
    images = _useState8[0],
    setImages = _useState8[1];
  var _useState9 = (0, _react.useState)(''),
    _useState10 = _slicedToArray(_useState9, 2),
    formType = _useState10[0],
    setFormType = _useState10[1];
  var _useState11 = (0, _react.useState)('coffins'),
    _useState12 = _slicedToArray(_useState11, 2),
    selectedCategory = _useState12[0],
    setSelectedCategory = _useState12[1];
  var _useState13 = (0, _react.useState)('stolen'),
    _useState14 = _slicedToArray(_useState13, 2),
    selectedType = _useState14[0],
    setSelectedType = _useState14[1];
  var _useState15 = (0, _react.useState)(null),
    _useState16 = _slicedToArray(_useState15, 2),
    currentIndex = _useState16[0],
    setCurrentIndex = _useState16[1];
  var _useState17 = (0, _react.useState)(0),
    _useState18 = _slicedToArray(_useState17, 2),
    currentImageIndex = _useState18[0],
    setCurrentImageIndex = _useState18[1];
  var _useState19 = (0, _react.useState)([]),
    _useState20 = _slicedToArray(_useState19, 2),
    cart = _useState20[0],
    setCart = _useState20[1];
  var _useState21 = (0, _react.useState)(false),
    _useState22 = _slicedToArray(_useState21, 2),
    showCart = _useState22[0],
    setShowCart = _useState22[1];
  var cartModalRef = (0, _react.useRef)(null);
  var _useState23 = (0, _react.useState)(false),
    _useState24 = _slicedToArray(_useState23, 2),
    showNotification = _useState24[0],
    setShowNotification = _useState24[1];
  var _useState25 = (0, _react.useState)({}),
    _useState26 = _slicedToArray(_useState25, 2),
    countByCategory = _useState26[0],
    setCountByCategory = _useState26[1];
  var _useState27 = (0, _react.useState)(false),
    _useState28 = _slicedToArray(_useState27, 2),
    showValidationMessage = _useState28[0],
    setShowValidationMessage = _useState28[1];
  var _useState29 = (0, _react.useState)(''),
    _useState30 = _slicedToArray(_useState29, 2),
    validationMessage = _useState30[0],
    setValidationMessage = _useState30[1];
  var _useState31 = (0, _react.useState)('assortyment'),
    _useState32 = _slicedToArray(_useState31, 2),
    currentStep = _useState32[0],
    setCurrentStep = _useState32[1];
  var router = (0, _router.useRouter)();
  (0, _react.useEffect)(function () {
    var fetchFormData = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var formId, formRef, formSnap, formData;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              formId = localStorage.getItem('formId');
              if (!formId) {
                _context.next = 15;
                break;
              }
              _context.prev = 2;
              formRef = (0, _firestore.doc)(_firebase.db, 'forms', formId);
              _context.next = 6;
              return (0, _firestore.getDoc)(formRef);
            case 6:
              formSnap = _context.sent;
              if (formSnap.exists()) {
                formData = formSnap.data();
                setFormType(formData.formType);
                fetchFuneralHomeAssortment(formData.funeralHomeName);
              } else {
                console.error('Dokument forms nie istnieje w Firestore');
              }
              _context.next = 13;
              break;
            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](2);
              console.error('Błąd pobierania danych formularza:', _context.t0);
            case 13:
              _context.next = 16;
              break;
            case 15:
              console.error('Nie znaleziono ID formularza w localStorage.');
            case 16:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[2, 10]]);
      }));
      return function fetchFormData() {
        return _ref.apply(this, arguments);
      };
    }();
    fetchFormData();
  }, [selectedCategory]);
  (0, _react.useEffect)(function () {
    filterAssortment();
  }, [assortyment, selectedCategory, selectedType, budget]);
  var handleSaveAndNavigate = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(step) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return proceedToSummary();
          case 2:
            setCurrentStep(step);
            _context2.next = 5;
            return router.push("/".concat(step));
          case 5:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function handleSaveAndNavigate(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  var fetchFuneralHomeAssortment = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(funeralHomeName) {
      var q, querySnapshot, funeralHomeDoc, musicData, assortymentData;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            q = (0, _firestore.query)((0, _firestore.collection)(_firebase.db, 'domyPogrzebowe'), (0, _firestore.where)('funeralHomeName', '==', funeralHomeName));
            _context3.next = 4;
            return (0, _firestore.getDocs)(q);
          case 4:
            querySnapshot = _context3.sent;
            if (!querySnapshot.empty) {
              funeralHomeDoc = querySnapshot.docs[0];
              if (selectedCategory === 'music') {
                musicData = funeralHomeDoc.data().music || [];
                setAssortyment(musicData);
              } else {
                assortymentData = funeralHomeDoc.data().assortyment || [];
                setAssortyment(assortymentData);
              }
            } else {
              console.error('Dokument domyPogrzebowe nie istnieje w Firestore');
            }
            _context3.next = 11;
            break;
          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            console.error('Błąd pobierania asortymentu:', _context3.t0);
          case 11:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 8]]);
    }));
    return function fetchFuneralHomeAssortment(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();
  var filterAssortment = (0, _react.useCallback)(function () {
    var filtered = assortyment.filter(function (item) {
      if (selectedCategory === 'coffins' || selectedCategory === 'urns') {
        var _item$type;
        return item.category === selectedCategory && ((_item$type = item.type) === null || _item$type === void 0 ? void 0 : _item$type.toLowerCase()) === selectedType && (budget === '' || item.price <= parseFloat(budget));
      } else if (selectedCategory === 'music') {
        return true;
      } else {
        return item.category === selectedCategory && (budget === '' || item.price <= parseFloat(budget));
      }
    });
    setFilteredAssortyment(filtered);
    var newImages = _objectSpread({}, images); // Kopia obecnych obrazów
    var imagePromises = filtered.map(/*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(item) {
        var urls;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (!(item.category !== 'music')) {
                _context4.next = 5;
                break;
              }
              _context4.next = 3;
              return fetchImages(item);
            case 3:
              urls = _context4.sent;
              // Używamy fetchImages z useCallback
              newImages[item.name] = urls;
            case 5:
              return _context4.abrupt("return", null);
            case 6:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      return function (_x3) {
        return _ref4.apply(this, arguments);
      };
    }());
    Promise.all(imagePromises).then(function () {
      setImages(newImages); // Aktualizacja stanu obrazów po załadowaniu wszystkich
    });
    setCurrentIndex(null);
  }, [assortyment, selectedCategory, selectedType, budget, images]);
  var fetchImages = (0, _react.useCallback)(/*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(assortmentItem) {
      var category, type, name, sanitizedCategory, sanitizedName, storagePath, sanitizedType, listRef, listResult, urls;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            category = assortmentItem.category, type = assortmentItem.type, name = assortmentItem.name;
            sanitizedCategory = category;
            sanitizedName = name;
            storagePath = "assortment/".concat(sanitizedCategory);
            if (type) {
              sanitizedType = type.toLowerCase();
              storagePath += "/".concat(sanitizedType);
            }
            storagePath += "/".concat(sanitizedName);
            _context5.prev = 6;
            listRef = (0, _storage.ref)(_firebase.storage, storagePath);
            _context5.next = 10;
            return (0, _storage.listAll)(listRef);
          case 10:
            listResult = _context5.sent;
            _context5.next = 13;
            return Promise.all(listResult.items.map(function (item) {
              return (0, _storage.getDownloadURL)(item);
            }));
          case 13:
            urls = _context5.sent;
            return _context5.abrupt("return", urls);
          case 17:
            _context5.prev = 17;
            _context5.t0 = _context5["catch"](6);
            console.error('Błąd pobierania URL do zdjęcia:', _context5.t0);
            return _context5.abrupt("return", []);
          case 21:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[6, 17]]);
    }));
    return function (_x4) {
      return _ref5.apply(this, arguments);
    };
  }(), []);
  var handleItemClick = function handleItemClick(index) {
    if (selectedCategory !== 'music') {
      setCurrentIndex(currentIndex === index ? null : index);
      setCurrentImageIndex(0); // Resetowanie indeksu obrazu
      setShowValidationMessage(false); // Zamknięcie okna walidacji po otwarciu produktu
    }
  };
  var handlePreviousImage = function handlePreviousImage(e) {
    e.stopPropagation();
    setCurrentImageIndex(function (prevIndex) {
      return (prevIndex - 1 + images[filteredAssortyment[currentIndex].name].length) % images[filteredAssortyment[currentIndex].name].length;
    });
  };
  var handleNextImage = function handleNextImage(e) {
    e.stopPropagation();
    setCurrentImageIndex(function (prevIndex) {
      return (prevIndex + 1) % images[filteredAssortyment[currentIndex].name].length;
    });
  };
  var handleAddToCart = function handleAddToCart(item) {
    var newItem = _objectSpread(_objectSpread({}, item), {}, {
      category: selectedCategory
    }); // Dodanie kategorii do nowego elementu
    setCart([].concat(_toConsumableArray(cart), [newItem]));
    localStorage.setItem('cart', JSON.stringify([].concat(_toConsumableArray(cart), [newItem])));
    setShowNotification(true);
    setTimeout(function () {
      return setShowNotification(false);
    }, 2000); // Ukrycie powiadomienia po 2 sekundach
  };
  var handleRemoveFromCart = function handleRemoveFromCart(index) {
    var newCart = cart.filter(function (_, i) {
      return i !== index;
    });
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };
  var handleShowCart = function handleShowCart() {
    var newCountByCategory = cart.reduce(function (acc, item) {
      if (!acc[item.category]) {
        acc[item.category] = 0;
      }
      acc[item.category]++;
      return acc;
    }, {});
    setCountByCategory(newCountByCategory);
    setShowCart(true);
    document.body.classList.add('no-scroll');
  };
  var handleHideCart = function handleHideCart() {
    setShowCart(false);
    document.body.classList.remove('no-scroll');
  };
  var handleHideCart2 = function handleHideCart2() {
    document.body.classList.remove('no-scroll');
  };
  var handleSummary = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      var newCountByCategory, validationMessages, categoryNames, _i, _Object$entries, _Object$entries$_i, category, count;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            newCountByCategory = cart.reduce(function (acc, item) {
              if (!acc[item.category]) {
                acc[item.category] = 0;
              }
              acc[item.category]++;
              return acc;
            }, {});
            setCountByCategory(newCountByCategory);
            validationMessages = [];
            categoryNames = {
              coffins: 'trumny',
              urns: 'urny',
              wreaths: 'wieńce kwiatowe',
              crosses: 'krzyże',
              plaques: 'tabliczki',
              music: 'odprawy muzyczne'
            };
            for (_i = 0, _Object$entries = Object.entries(newCountByCategory); _i < _Object$entries.length; _i++) {
              _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), category = _Object$entries$_i[0], count = _Object$entries$_i[1];
              if (count > 1 && category !== 'wreaths') {
                // Pomijanie wieńców kwiatowych
                validationMessages.push("Czy na pewno chcesz doda\u0107 ".concat(count, " sztuki kategorii ").concat(categoryNames[category], "?"));
              }
            }
            if (validationMessages.length > 0) {
              setValidationMessage(validationMessages);
              setShowValidationMessage(true);
            } else {
              proceedToSummary();
            }
          case 6:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    return function handleSummary() {
      return _ref6.apply(this, arguments);
    };
  }();
  var proceedToSummary = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
      var formId, cartWithImages, formRef;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            formId = localStorage.getItem('formId');
            if (formId) {
              _context7.next = 4;
              break;
            }
            alert('Nie znaleziono ID formularza. Upewnij się, że jest zapisane w local storage.');
            return _context7.abrupt("return");
          case 4:
            _context7.prev = 4;
            cartWithImages = cart.map(function (item) {
              return _objectSpread(_objectSpread({}, item), {}, {
                imageUrls: images[item.name] || [] // Dodanie linków do obrazów asortymentu
              });
            });
            formRef = (0, _firestore.doc)(_firebase.db, 'forms', formId);
            _context7.next = 9;
            return (0, _firestore.updateDoc)(formRef, {
              selectedItems: cartWithImages,
              // Zaktualizowany koszyk z linkami do obrazów
              timestamp: new Date()
            });
          case 9:
            console.log("Dane zapisane w formularzu z ID: ", formId);
            setCart([]);
            _context7.next = 13;
            return router.push("/summary");
          case 13:
            handleHideCart();
            localStorage.removeItem('cart');
            _context7.next = 21;
            break;
          case 17:
            _context7.prev = 17;
            _context7.t0 = _context7["catch"](4);
            console.error("Błąd przy zapisie danych: ", _context7.t0);
            alert("Nie udało się zapisać danych. Spróbuj ponownie.");
          case 21:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[4, 17]]);
    }));
    return function proceedToSummary() {
      return _ref7.apply(this, arguments);
    };
  }();
  var handleConfirm = function handleConfirm() {
    setShowValidationMessage(false);
    proceedToSummary();
  };
  var categoryNames = {
    coffins: 'Trumny',
    urns: 'Urny',
    wreaths: 'Wieńce Kwiatowe',
    crosses: 'Krzyże',
    plaques: 'Tabliczki',
    music: 'Odprawy Muzyczne'
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "navigation-buttons"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: "nav-button",
    onClick: function onClick() {
      return handleSaveAndNavigate('formularz-trzeci');
    }
  }, "\u2190 Cofnij"), /*#__PURE__*/_react["default"].createElement("button", {
    className: "nav-button",
    onClick: function onClick() {
      return handleSaveAndNavigate('summary');
    }
  }, "Dalej \u2192")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "steps-assortment"
  }, /*#__PURE__*/_react["default"].createElement(_StepNavigation["default"], {
    currentStep: currentStep,
    setCurrentStep: setCurrentStep,
    handleSaveAndNavigate: handleSaveAndNavigate
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "assortment-container"
  }, /*#__PURE__*/_react["default"].createElement("h1", null, "Wybierz asortyment"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "budget-input"
  }, /*#__PURE__*/_react["default"].createElement("label", null, "Podaj sw\xF3j bud\u017Cet, zaproponujemy Ci najlepszy zestaw do Twoich mo\u017Cliwo\u015Bci:"), /*#__PURE__*/_react["default"].createElement("select", {
    value: budget,
    onChange: function onChange(e) {
      return setBudget(e.target.value);
    }
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: ""
  }, "Wybierz bud\u017Cet"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "4000"
  }, "do 4000z\u0142"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "6000"
  }, "do 6000z\u0142"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "8000"
  }, "do 8000z\u0142"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "8000+"
  }, "powy\u017Cej 8000z\u0142"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "category-buttons"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setSelectedCategory('coffins');
    },
    className: selectedCategory === 'coffins' ? 'selected' : ''
  }, "Trumny"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setSelectedCategory('urns');
    },
    className: selectedCategory === 'urns' ? 'selected' : ''
  }, "Urny"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setSelectedCategory('wreaths');
    },
    className: selectedCategory === 'wreaths' ? 'selected' : ''
  }, "Wie\u0144ce Kwiatowe"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setSelectedCategory('crosses');
    },
    className: selectedCategory === 'crosses' ? 'selected' : ''
  }, "Krzy\u017Ce"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setSelectedCategory('plaques');
    },
    className: selectedCategory === 'plaques' ? 'selected' : ''
  }, "Tabliczki"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setSelectedCategory('music');
    },
    className: selectedCategory === 'music' ? 'selected' : ''
  }, "Odprawy Muzyczne")), (selectedCategory === 'coffins' || selectedCategory === 'urns') && /*#__PURE__*/_react["default"].createElement("div", {
    className: "type-buttons"
  }, /*#__PURE__*/_react["default"].createElement("h3", null, "Wybierz typ:"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setSelectedType('stolen');
    },
    className: selectedType === 'stolen' ? 'selected' : ''
  }, "Kamienna"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setSelectedType('wooden');
    },
    className: selectedType === 'wooden' ? 'selected' : ''
  }, "Drewniana")), /*#__PURE__*/_react["default"].createElement("h2", null, "Lista produkt\xF3w:"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "assortment-list"
  }, filteredAssortyment.length > 0 ? filteredAssortyment.map(function (item, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      className: "assortment-item ".concat(currentIndex === index ? 'expanded' : ''),
      onClick: function onClick() {
        return selectedCategory !== 'music' && handleItemClick(index);
      }
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "assortment-summary"
    }, /*#__PURE__*/_react["default"].createElement("h3", null, item.name), currentIndex !== index && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("p", null, "Cena: ", formatPrice(item.price), " PLN"), selectedCategory !== 'music' && images[item.name] && /*#__PURE__*/_react["default"].createElement("div", {
      className: "image-container"
    }, /*#__PURE__*/_react["default"].createElement(_image["default"], {
      src: images[item.name][0],
      alt: item.name,
      fill: true,
      style: {
        objectFit: 'contain'
      },
      sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    }))), selectedCategory === 'music' && /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick(e) {
        e.stopPropagation();
        handleAddToCart(item);
      }
    }, "Dodaj +")), currentIndex === index && selectedCategory !== 'music' && /*#__PURE__*/_react["default"].createElement("div", {
      className: "assortment-details"
    }, /*#__PURE__*/_react["default"].createElement("p", null, "Cena: ", formatPrice(item.price), " PLN"), /*#__PURE__*/_react["default"].createElement("p", null, "Producent: ", item.producent), /*#__PURE__*/_react["default"].createElement("p", null, "Dost\u0119pno\u015B\u0107: ", item.availability), /*#__PURE__*/_react["default"].createElement("p", null, "Opis: ", item.text), item.build && /*#__PURE__*/_react["default"].createElement("p", null, "Materia\u0142: ", item.build), /*#__PURE__*/_react["default"].createElement("div", {
      className: "expanded-image-container"
    }, images[item.name] && /*#__PURE__*/_react["default"].createElement(_image["default"], {
      src: images[item.name][currentImageIndex],
      alt: item.name,
      fill: true,
      sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
      style: {
        objectFit: 'contain'
      }
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: "image-navigation",
      onClick: function onClick(e) {
        return e.stopPropagation();
      }
    }, /*#__PURE__*/_react["default"].createElement("button", {
      onClick: handlePreviousImage
    }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
      icon: _freeSolidSvgIcons.faArrowLeft
    })), /*#__PURE__*/_react["default"].createElement("button", {
      onClick: handleNextImage
    }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
      icon: _freeSolidSvgIcons.faArrowRight
    }))), /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        return handleAddToCart(item);
      }
    }, "Dodaj +")));
  }) : /*#__PURE__*/_react["default"].createElement("p", null, "Brak asortymentu w wybranej kategorii.")), showNotification && /*#__PURE__*/_react["default"].createElement("div", {
    className: "notification"
  }, "Produkt zosta\u0142 dodany do koszyka!"), showCart && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "cart-overlay",
    onClick: handleHideCart
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "cart-modal",
    ref: cartModalRef
  }, /*#__PURE__*/_react["default"].createElement("h4", null, "Tw\xF3j zestaw:"), Object.keys(countByCategory).map(function (category) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: category,
      className: "cart-category"
    }, /*#__PURE__*/_react["default"].createElement("h5", null, categoryNames[category]), /*#__PURE__*/_react["default"].createElement("ul", null, cart.filter(function (item) {
      return item.category === category;
    }).map(function (item, index) {
      return /*#__PURE__*/_react["default"].createElement("li", {
        key: index
      }, /*#__PURE__*/_react["default"].createElement("span", null, index + 1), item.category !== 'music' ? images[item.name] ? /*#__PURE__*/_react["default"].createElement(_image["default"], {
        src: images[item.name][0],
        alt: item.name,
        width: 100 // Ustaw szerokość obrazu
        ,
        height: 100 // Ustaw wysokość obrazu
        ,
        style: {
          objectFit: 'cover'
        } // Opcjonalnie dodaj styl dopasowania obrazu
      }) : /*#__PURE__*/_react["default"].createElement("span", null, "Brak zdj\u0119cia") : null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "item-details"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "item-name"
      }, item.name), /*#__PURE__*/_react["default"].createElement("span", {
        className: "item-price"
      }, formatPrice(item.price), " PLN")), /*#__PURE__*/_react["default"].createElement("button", {
        className: "remove-button",
        onClick: function onClick() {
          return handleRemoveFromCart(index);
        }
      }, "Usu\u0144"));
    })));
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "cart-total"
  }, /*#__PURE__*/_react["default"].createElement("h5", null, "Suma koszyka:"), /*#__PURE__*/_react["default"].createElement("p", null, formatPrice(cart.reduce(function (total, item) {
    return total + item.price;
  }, 0)), " PLN")), /*#__PURE__*/_react["default"].createElement("button", {
    className: "close-button",
    onClick: handleHideCart
  }, "Zamknij"), /*#__PURE__*/_react["default"].createElement("button", {
    className: "summary-button",
    onClick: handleSummary
  }, "Podsumowanie"))), showValidationMessage && /*#__PURE__*/_react["default"].createElement("div", {
    className: "validation-message"
  }, validationMessage.map(function (message, index) {
    return /*#__PURE__*/_react["default"].createElement("p", {
      key: index
    }, message);
  }), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleConfirm
  }, "Potwierd\u017A i przejd\u017A do podsumowania"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setShowValidationMessage(false);
    }
  }, "Wr\xF3\u0107")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "assortment-buttons"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleShowCart
  }, "Poka\u017C wybrany zestaw (", cart.length, ")"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "summary-button"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleSummary
  }, "Podsumowanie")))));
};
var _default = exports["default"] = Assortment;