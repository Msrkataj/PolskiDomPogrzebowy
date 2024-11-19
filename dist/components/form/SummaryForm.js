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
var _link = _interopRequireDefault(require("next/link"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _router = require("next/router");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _image = _interopRequireDefault(require("next/image"));
require("jspdf-autotable");
var _pdfLib = require("pdf-lib");
var _fontkit = _interopRequireDefault(require("@pdf-lib/fontkit"));
var _fileSaver = require("file-saver");
var _pelnomocnictwo = _interopRequireDefault(require("@/components/documents/pelnomocnictwo"));
var _wniosekKremacja = _interopRequireDefault(require("@/components/documents/wniosek-kremacja"));
var _zusUpowaznienie = _interopRequireDefault(require("@/components/documents/zus-upowaznienie"));
var _zaswiadczenieEr = _interopRequireDefault(require("@/components/documents/zaswiadczenie-er"));
var _aktZgonu = _interopRequireDefault(require("@/components/documents/akt-zgonu"));
var _szpitalOdbiorCiala = _interopRequireDefault(require("@/components/documents/szpital-odbior-ciala"));
var _upowaznienieKrus = _interopRequireDefault(require("@/components/documents/upowaznienie-krus"));
var _upowaznienieOdbiorDokumentow = _interopRequireDefault(require("@/components/documents/upowaznienie-odbior-dokumentow"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
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
var Summary = function Summary() {
  var _formData$authorizedP, _formData$authorizedP2, _formData$authorizedP3, _formData$selectedIte, _formData$selectedIte2;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    formData = _useState2[0],
    setFormData = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    email = _useState4[0],
    setEmail = _useState4[1];
  var _useState5 = (0, _react.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    phone = _useState6[0],
    setPhone = _useState6[1];
  var _useState7 = (0, _react.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    password = _useState8[0],
    setPassword = _useState8[1];
  var _useState9 = (0, _react.useState)(''),
    _useState10 = _slicedToArray(_useState9, 2),
    confirmPassword = _useState10[0],
    setConfirmPassword = _useState10[1];
  var _useState11 = (0, _react.useState)(''),
    _useState12 = _slicedToArray(_useState11, 2),
    error = _useState12[0],
    setError = _useState12[1];
  var _useState13 = (0, _react.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    selectedFile = _useState14[0],
    setSelectedFile = _useState14[1];
  var _useState15 = (0, _react.useState)(''),
    _useState16 = _slicedToArray(_useState15, 2),
    uploadCategory = _useState16[0],
    setUploadCategory = _useState16[1];
  var router = (0, _router.useRouter)();
  var storage = (0, _storage.getStorage)();
  var _useState17 = (0, _react.useState)(false),
    _useState18 = _slicedToArray(_useState17, 2),
    isModalOpen = _useState18[0],
    setIsModalOpen = _useState18[1];
  var _useState19 = (0, _react.useState)(null),
    _useState20 = _slicedToArray(_useState19, 2),
    selectedDocument = _useState20[0],
    setSelectedDocument = _useState20[1];
  (0, _react.useEffect)(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var localFormId, formRef, formSnap;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(typeof window !== 'undefined')) {
                _context.next = 18;
                break;
              }
              localFormId = localStorage.getItem('formId');
              console.log("Pobrane formId:", localFormId);
              if (!localFormId) {
                _context.next = 17;
                break;
              }
              _context.prev = 4;
              formRef = (0, _firestore.doc)(_firebase.db, 'forms', localFormId);
              _context.next = 8;
              return (0, _firestore.getDoc)(formRef);
            case 8:
              formSnap = _context.sent;
              if (formSnap.exists()) {
                setFormData(formSnap.data());
                console.log('Dane formularza:', formSnap.data());
              } else {
                console.error('Dokument forms nie istnieje w Firestore');
              }
              _context.next = 15;
              break;
            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](4);
              console.error('Błąd pobierania danych formularza:', _context.t0);
            case 15:
              _context.next = 18;
              break;
            case 17:
              console.error('Nie znaleziono ID formularza w localStorage.');
            case 18:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[4, 12]]);
      }));
      return function fetchData() {
        return _ref.apply(this, arguments);
      };
    }();
    fetchData();
  }, []);
  var handleOpenModal = function handleOpenModal(documentName) {
    setSelectedDocument(documentName);
    setIsModalOpen(true);
  };
  var handleCloseModal = function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedDocument('');
  };
  var handleRemoveItem = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(index) {
      var updatedItems, localFormId, formRef;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (!(!formData || !formData.selectedItems)) {
              _context2.next = 2;
              break;
            }
            return _context2.abrupt("return");
          case 2:
            updatedItems = formData.selectedItems.filter(function (_, i) {
              return i !== index;
            });
            _context2.prev = 3;
            localFormId = localStorage.getItem('formId');
            if (localFormId) {
              _context2.next = 8;
              break;
            }
            console.error('Nie znaleziono ID formularza w localStorage.');
            return _context2.abrupt("return");
          case 8:
            formRef = (0, _firestore.doc)(_firebase.db, 'forms', localFormId);
            _context2.next = 11;
            return (0, _firestore.updateDoc)(formRef, {
              selectedItems: updatedItems
            });
          case 11:
            setFormData(function (prevData) {
              return _objectSpread(_objectSpread({}, prevData), {}, {
                selectedItems: updatedItems
              });
            });
            _context2.next = 17;
            break;
          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](3);
            console.error('Błąd przy aktualizacji formularza:', _context2.t0);
          case 17:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[3, 14]]);
    }));
    return function handleRemoveItem(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  var handlePasswordMatch = function handlePasswordMatch() {
    if (password !== confirmPassword) {
      setError('Hasła nie są zgodne.');
      return false;
    }
    setError('');
    return true;
  };
  var handleSubmit = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(e) {
      var hashedPassword, id, timestamp;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            e.preventDefault();
            if (handlePasswordMatch()) {
              _context3.next = 3;
              break;
            }
            return _context3.abrupt("return");
          case 3:
            if (validateEmail(email)) {
              _context3.next = 6;
              break;
            }
            alert('Podano nieprawidłowy adres e-mail.');
            return _context3.abrupt("return");
          case 6:
            if (validatePassword(password)) {
              _context3.next = 9;
              break;
            }
            alert('Hasło musi zawierać co najmniej 8 znaków, w tym dużą literę, małą literę, cyfrę i znak specjalny.');
            return _context3.abrupt("return");
          case 9:
            _context3.prev = 9;
            hashedPassword = _bcryptjs["default"].hashSync(password, 10);
            id = localStorage.getItem('formId');
            timestamp = new Date();
            _context3.next = 15;
            return (0, _firestore.setDoc)((0, _firestore.doc)(_firebase.db, 'forms', id), {
              email: email,
              phone: phone,
              password: hashedPassword,
              status: "Zgłoszono - oczekujące na potwierdzenie",
              notifications: [{
                message: "Utworzono zgłoszenie",
                timestamp: timestamp,
                name: "client"
              }]
            }, {
              merge: true
            });
          case 15:
            alert('Dane zostały zapisane.');
            _context3.next = 18;
            return router.push("/success");
          case 18:
            _context3.next = 24;
            break;
          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3["catch"](9);
            console.error('Błąd zapisu formularza: ', _context3.t0);
            alert('Wystąpił błąd podczas zapisu danych.');
          case 24:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[9, 20]]);
    }));
    return function handleSubmit(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();
  var validateEmail = function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  var validatePassword = function validatePassword(password) {
    return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password);
  };
  var handleDownload = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(fileName) {
      var fileRef, url, a;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            fileRef = (0, _storage.ref)(storage, "documents/".concat(fileName));
            _context4.prev = 1;
            _context4.next = 4;
            return (0, _storage.getDownloadURL)(fileRef);
          case 4:
            url = _context4.sent;
            a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            _context4.next = 16;
            break;
          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](1);
            console.error("Error downloading file:", _context4.t0);
          case 16:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[1, 13]]);
    }));
    return function handleDownload(_x3) {
      return _ref4.apply(this, arguments);
    };
  }();
  var handleFileUpload = function handleFileUpload(e) {
    var file = e.target.files[0];
    setSelectedFile(file);
    var category = e.target.name;
    setUploadCategory(category);
  };
  var generatePDF = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(items) {
      var pdfDoc, fontBytes, customFont, page, _page$getSize, width, height, fontSize, yPosition, _iterator, _step, item, wrappedText, pdfBytes, blob;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            if (Array.isArray(items)) {
              _context5.next = 3;
              break;
            }
            console.error("Items is not an array:", items);
            return _context5.abrupt("return");
          case 3:
            _context5.next = 5;
            return _pdfLib.PDFDocument.create();
          case 5:
            pdfDoc = _context5.sent;
            pdfDoc.registerFontkit(_fontkit["default"]);
            _context5.next = 9;
            return fetch('/fonts/NotoSans-Regular.ttf').then(function (res) {
              return res.arrayBuffer();
            });
          case 9:
            fontBytes = _context5.sent;
            _context5.next = 12;
            return pdfDoc.embedFont(fontBytes);
          case 12:
            customFont = _context5.sent;
            page = pdfDoc.addPage();
            _page$getSize = page.getSize(), width = _page$getSize.width, height = _page$getSize.height;
            fontSize = 12; // Tytuł
            page.drawText('Podsumowanie Wybranego Zestawu', {
              x: 50,
              y: height - 50,
              size: 20,
              font: customFont,
              color: (0, _pdfLib.rgb)(0, 0, 0)
            });

            // Nagłówki tabeli
            page.drawText('Nazwa', {
              x: 50,
              y: height - 80,
              size: fontSize,
              font: customFont,
              color: (0, _pdfLib.rgb)(0, 0, 0)
            });
            page.drawText('Cena', {
              x: 400,
              y: height - 80,
              size: fontSize,
              font: customFont,
              color: (0, _pdfLib.rgb)(0, 0, 0)
            });

            // Generowanie tabeli z produktami
            yPosition = height - 100;
            _iterator = _createForOfIteratorHelper(items);
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                item = _step.value;
                wrappedText = wrapText(item.name, 350, fontSize, customFont); // Zawijanie tekstu do szerokości 350px
                wrappedText.forEach(function (line, lineIndex) {
                  page.drawText(line, {
                    x: 50,
                    y: yPosition - lineIndex * fontSize,
                    size: fontSize,
                    font: customFont,
                    color: (0, _pdfLib.rgb)(0, 0, 0)
                  });
                });

                // Rysowanie ceny obok nazwy produktu
                page.drawText("".concat(item.price, " PLN"), {
                  x: 400,
                  y: yPosition,
                  size: fontSize,
                  font: customFont,
                  color: (0, _pdfLib.rgb)(0, 0, 0)
                });
                yPosition -= wrappedText.length * fontSize + 10; // Przesuwanie w dół, w zależności od liczby linii
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            _context5.next = 24;
            return pdfDoc.save();
          case 24:
            pdfBytes = _context5.sent;
            blob = new Blob([pdfBytes], {
              type: 'application/pdf'
            });
            (0, _fileSaver.saveAs)(blob, 'Podsumowanie_Zestawu.pdf');
          case 27:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function generatePDF(_x4) {
      return _ref5.apply(this, arguments);
    };
  }();
  var wrapText = function wrapText(text, maxWidth, fontSize, font) {
    var words = text.split(' ');
    var line = '';
    var lines = [];
    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var testWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (testWidth > maxWidth && n > 0) {
        lines.push(line.trim());
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());
    return lines;
  };
  var uploadFile = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      var formId, filePath, fileRef, formRef;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            if (selectedFile) {
              _context6.next = 2;
              break;
            }
            return _context6.abrupt("return");
          case 2:
            formId = localStorage.getItem('formId');
            filePath = "uploaded-documents/".concat(formId, "/").concat(uploadCategory, "/").concat(selectedFile.name);
            fileRef = (0, _storage.ref)(storage, filePath);
            _context6.prev = 5;
            _context6.next = 8;
            return (0, _storage.uploadBytes)(fileRef, selectedFile);
          case 8:
            formRef = (0, _firestore.doc)(_firebase.db, 'forms', formId);
            _context6.next = 11;
            return (0, _firestore.updateDoc)(formRef, _defineProperty({}, "".concat(uploadCategory, "Document"), filePath));
          case 11:
            alert("Plik przesłany pomyślnie!");
            _context6.next = 17;
            break;
          case 14:
            _context6.prev = 14;
            _context6.t0 = _context6["catch"](5);
            console.error("Błąd podczas przesyłania pliku:", _context6.t0);
          case 17:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[5, 14]]);
    }));
    return function uploadFile() {
      return _ref6.apply(this, arguments);
    };
  }();
  if (!formData) {
    return /*#__PURE__*/_react["default"].createElement("p", null, "\u0141adowanie danych...");
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "summary-container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "summary-container-header"
  }, /*#__PURE__*/_react["default"].createElement("h1", null, "Podsumowanie"), /*#__PURE__*/_react["default"].createElement("p", null, "Prosz\u0119 sprawdzi\u0107, czy dane si\u0119 zgadzaj\u0105")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "summary-container-text"
  }, [{
    title: "Informacje o Osobie zmarłej",
    data: [{
      label: "Imię",
      value: formData.name
    }, {
      label: "Nazwisko",
      value: formData.surname
    }, {
      label: "PESEL",
      value: formData.pesel
    }, {
      label: "Data urodzin",
      value: formData.birthDate
    }, {
      label: "Data śmierci",
      value: formData.deathDate
    }, {
      label: "Kiedy będą załatwiane dokumenty?",
      value: formData.documents
    }, {
      label: "Czy Osoba pracowała?",
      value: formData.worked
    }, {
      label: "Zmarła Osoba była ubezpieczona w",
      value: formData.insurance
    }, {
      label: "Numer świadczenia",
      value: formData.certificateNumber
    }]
  }, {
    title: "Informacje o pełnomocniku",
    data: [{
      label: "Imię i Nazwisko",
      value: (_formData$authorizedP = formData.authorizedPerson) === null || _formData$authorizedP === void 0 ? void 0 : _formData$authorizedP.name
    }, {
      label: "PESEL",
      value: (_formData$authorizedP2 = formData.authorizedPerson) === null || _formData$authorizedP2 === void 0 ? void 0 : _formData$authorizedP2.pesel
    }, {
      label: "Numer dowodu",
      value: (_formData$authorizedP3 = formData.authorizedPerson) === null || _formData$authorizedP3 === void 0 ? void 0 : _formData$authorizedP3.idNumber
    }, {
      label: "Kto sporządza akt zgonu?",
      value: formData.who
    }]
  }, {
    title: "Informacje o pogrzebie",
    data: [{
      label: "Forma pogrzebu",
      value: formData.formType
    }, {
      label: "Forma",
      value: formData.religiousCeremony
    }, {
      label: "Czy dochowujemy do grobu?",
      value: formData.burialOption
    }, {
      label: "Ubiór zmarłego",
      value: formData.clothingOption
    }]
  }].map(function (section, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index
    }, /*#__PURE__*/_react["default"].createElement("h2", null, section.title), section.data.map(function (item, idx) {
      return /*#__PURE__*/_react["default"].createElement("p", {
        key: idx
      }, /*#__PURE__*/_react["default"].createElement("strong", null, item.label, ":"), " ", item.value);
    }));
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "summary-edit"
  }, /*#__PURE__*/_react["default"].createElement(_link["default"], {
    href: "/assortyment",
    className: "change-button"
  }, "Wr\xF3\u0107 i edytuj")), /*#__PURE__*/_react["default"].createElement("h2", null, "Wybrany zestaw:"), /*#__PURE__*/_react["default"].createElement("table", {
    className: "selected-items-table"
  }, /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("th", null, "Tw\xF3j wyb\xF3r"), /*#__PURE__*/_react["default"].createElement("th", null, "Miniaturka"), /*#__PURE__*/_react["default"].createElement("th", null, "Cena"), /*#__PURE__*/_react["default"].createElement("th", null, "Usu\u0144"))), /*#__PURE__*/_react["default"].createElement("tbody", null, (_formData$selectedIte = formData.selectedItems) === null || _formData$selectedIte === void 0 ? void 0 : _formData$selectedIte.map(function (item, index) {
    return /*#__PURE__*/_react["default"].createElement("tr", {
      key: index
    }, /*#__PURE__*/_react["default"].createElement("td", null, item.name), /*#__PURE__*/_react["default"].createElement("td", null, item.category !== 'music' && item.name && (Array.isArray(item.imageUrls) && item.imageUrls.length > 0 ? /*#__PURE__*/_react["default"].createElement(_image["default"], {
      src: item.imageUrls[0] // Użyj pierwszego elementu z tablicy imageUrls
      ,
      alt: item.name,
      className: "thumbnail-image",
      width: 100 // Ustawienia szerokości obrazu
      ,
      height: 100 // Ustawienia wysokości obrazu
      ,
      style: {
        objectFit: 'cover'
      } // Styl dopasowania obrazu
    }) : /*#__PURE__*/_react["default"].createElement(_image["default"], {
      src: item.imageUrls // Użyj pojedynczego URL, jeśli nie jest tablicą
      ,
      alt: item.name,
      className: "thumbnail-image",
      width: 100 // Ustawienia szerokości obrazu
      ,
      height: 100 // Ustawienia wysokości obrazu
      ,
      style: {
        objectFit: 'cover'
      } // Styl dopasowania obrazu
    }))), /*#__PURE__*/_react["default"].createElement("td", null, item.price, " PLN"), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        return handleRemoveItem(index);
      }
    }, "X")));
  }))), /*#__PURE__*/_react["default"].createElement("p", {
    className: "total-price"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Suma:"), " ", (_formData$selectedIte2 = formData.selectedItems) === null || _formData$selectedIte2 === void 0 ? void 0 : _formData$selectedIte2.reduce(function (sum, item) {
    return sum + parseFloat(item.price);
  }, 0), " PLN"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return generatePDF(formData.selectedItems);
    },
    className: "download-pdf-button"
  }, "Pobierz PDF z podsumowaniem"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "documents-section"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Druki do wype\u0142nienia"), /*#__PURE__*/_react["default"].createElement("p", null, "Wype\u0142nij teraz online lub p\xF3\u017Aniej w panelu klienta, albo pobierz plik PDF, wype\u0142nij r\u0119cznie i za\u0142aduj tutaj lub p\xF3\u017Aniej w swoim panelu klienta."), /*#__PURE__*/_react["default"].createElement("div", {
    className: "document-actions"
  }, [{
    name: 'Pelnomocnictwo ZP.doc',
    info: 'Pełnomocnictwo umożliwia prawne działanie w imieniu zmarłej osoby.'
  }, {
    name: 'Wniosek do kremacji.doc',
    info: 'Wniosek potrzebny do uzyskania zgody na kremację.'
  }, {
    name: 'ZUS-UPOWAŻNIENIE.doc',
    info: 'Dokument upoważniający do uzyskania informacji od ZUS.'
  }, {
    name: 'Zaświadczenie E-R.docx',
    info: 'Zaświadczenie dotyczące składek emerytalno-rentowych.'
  }, {
    name: 'akt zgonu USC.doc',
    info: 'Dokument rejestrujący zgon w Urzędzie Stanu Cywilnego.'
  }, {
    name: 'szpital Koszalin odbiór ciała.doc',
    info: 'Dokument pozwalający na odbiór ciała ze szpitala.'
  }, {
    name: 'upowaźnienie KRUS.doc',
    info: 'Dokument dotyczący uprawnień do świadczeń KRUS.'
  }, {
    name: 'upowaźnienie odbiór dokumentów.doc',
    info: 'Upoważnienie do odbioru dokumentów w imieniu zmarłego.'
  }].map(function (file, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      className: "form-item"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "form-item__title"
    }, file.name, /*#__PURE__*/_react["default"].createElement("span", {
      className: "tooltip",
      "data-tooltip": file.info
    }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
      icon: _freeSolidSvgIcons.faQuestionCircle,
      className: "fa-xl"
    }))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "form-item__description"
    }, "Mo\u017Cesz wype\u0142ni\u0107 ten dokument teraz online lub pobra\u0107 i wype\u0142ni\u0107 go r\u0119cznie."), /*#__PURE__*/_react["default"].createElement("div", {
      className: "form-item__buttons"
    }, /*#__PURE__*/_react["default"].createElement("button", {
      className: "fill-online",
      onClick: function onClick() {
        return handleOpenModal(file.name);
      }
    }, "Wype\u0142nij online"), /*#__PURE__*/_react["default"].createElement("span", null, "ALBO"), /*#__PURE__*/_react["default"].createElement("button", {
      className: "download-pdf",
      onClick: function onClick() {
        return handleDownload(file.name);
      }
    }, "Pobierz PDF"), /*#__PURE__*/_react["default"].createElement("div", {
      className: "form-item__upload"
    }, /*#__PURE__*/_react["default"].createElement("label", {
      htmlFor: "upload-".concat(index)
    }, "Prze\u015Blij plik:"), /*#__PURE__*/_react["default"].createElement("input", {
      type: "file",
      id: "upload-".concat(index),
      name: file.name,
      onChange: handleFileUpload
    }))));
  })), selectedDocument === 'Pelnomocnictwo ZP.doc' && /*#__PURE__*/_react["default"].createElement(_pelnomocnictwo["default"], {
    isOpen: isModalOpen,
    onClose: handleCloseModal
  }), selectedDocument === 'Wniosek do kremacji.doc' && /*#__PURE__*/_react["default"].createElement(_wniosekKremacja["default"], {
    isOpen: isModalOpen,
    onClose: handleCloseModal
  }), selectedDocument === 'ZUS-UPOWAŻNIENIE.doc' && /*#__PURE__*/_react["default"].createElement(_zusUpowaznienie["default"], {
    isOpen: isModalOpen,
    onClose: handleCloseModal
  }), selectedDocument === 'Zaświadczenie E-R.docx' && /*#__PURE__*/_react["default"].createElement(_zaswiadczenieEr["default"], {
    isOpen: isModalOpen,
    onClose: handleCloseModal
  }), selectedDocument === 'akt zgonu USC.doc' && /*#__PURE__*/_react["default"].createElement(_aktZgonu["default"], {
    isOpen: isModalOpen,
    onClose: handleCloseModal
  }), selectedDocument === 'szpital Koszalin odbiór ciała.doc' && /*#__PURE__*/_react["default"].createElement(_szpitalOdbiorCiala["default"], {
    isOpen: isModalOpen,
    onClose: handleCloseModal
  }), selectedDocument === 'upowaźnienie KRUS.doc' && /*#__PURE__*/_react["default"].createElement(_upowaznienieKrus["default"], {
    isOpen: isModalOpen,
    onClose: handleCloseModal
  }), selectedDocument === 'upowaźnienie odbiór dokumentów.doc' && /*#__PURE__*/_react["default"].createElement(_upowaznienieOdbiorDokumentow["default"], {
    isOpen: isModalOpen,
    onClose: handleCloseModal
  })), /*#__PURE__*/_react["default"].createElement("form", {
    onSubmit: handleSubmit,
    className: "contact-form"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Podaj swoje dane:"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "email"
  }, "Tw\xF3j e-mail:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "email",
    id: "email",
    name: "email",
    value: email,
    onChange: function onChange(e) {
      return setEmail(e.target.value);
    },
    placeholder: "E-mail",
    required: true
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "phone"
  }, "Telefon kontaktowy:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "tel",
    id: "phone",
    name: "phone",
    value: phone,
    onChange: function onChange(e) {
      return setPhone(e.target.value);
    },
    placeholder: "Telefon",
    required: true
  })), /*#__PURE__*/_react["default"].createElement("h3", null, "Za\u0142\xF3\u017C konto, aby zapisa\u0107 swoje dane i u\u0142atwi\u0107 dalsz\u0105 organizacj\u0119 pogrzebu."), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "password"
  }, "Has\u0142o:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "password",
    id: "password",
    name: "password",
    value: password,
    onChange: function onChange(e) {
      return setPassword(e.target.value);
    },
    placeholder: "Has\u0142o",
    required: true
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "confirmPassword"
  }, "Powt\xF3rz has\u0142o:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "password",
    id: "confirmPassword",
    name: "confirmPassword",
    value: confirmPassword,
    onChange: function onChange(e) {
      return setConfirmPassword(e.target.value);
    },
    placeholder: "Powt\xF3rz has\u0142o",
    required: true
  })), error && /*#__PURE__*/_react["default"].createElement("p", {
    className: "error-message"
  }, error), /*#__PURE__*/_react["default"].createElement("button", {
    type: "submit",
    className: "submit-button"
  }, "Wy\u015Blij")));
};
var _default = exports["default"] = Summary;