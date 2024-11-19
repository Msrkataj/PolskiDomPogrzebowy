"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _renderer = require("@react-pdf/renderer");
var _react = _interopRequireWildcard(require("react"));
var _storage = require("firebase/storage");
var _firestore = require("firebase/firestore");
var _firebase = require("../../../firebase");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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
// Rejestracja czcionki
_renderer.Font.register({
  family: 'Noto Sans',
  src: '/fonts/NotoSans-Regular.ttf'
});
var styles = _renderer.StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Noto Sans',
    fontSize: 10,
    lineHeight: 1.3
  },
  title: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 2
  },
  lineGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '100%',
    marginBottom: 4,
    marginTop: 4
  },
  label: {
    fontSize: 9,
    marginTop: 2,
    textAlign: 'center'
  },
  section: {
    marginBottom: 20
  },
  dottedLine: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderStyle: 'dotted',
    width: '100%',
    marginBottom: 4,
    marginTop: 4
  },
  textLine: {
    marginBottom: 15
  },
  signature: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30
  },
  signatureField: {
    width: '45%',
    textAlign: 'center',
    borderBottomColor: 'black',
    paddingBottom: 2
  }
});
var ZaswiadczenieERPDF = function ZaswiadczenieERPDF(_ref) {
  var formData = _ref.formData;
  return /*#__PURE__*/_react["default"].createElement(_renderer.Document, null, /*#__PURE__*/_react["default"].createElement(_renderer.Page, {
    size: "A4",
    style: styles.page
  }, /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.lineGroup
  }, /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: {
      width: '60%'
    }
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.companyDetails), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "(dane Firmy)")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: {
      width: '40%'
    }
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.date), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "dnia"))), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.section
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.title
  }, "ZA\u015AWIADCZENIE")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.section
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.textLine
  }, "Niniejszym potwierdzam, \u017Ce Pan/Pani:"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.personName), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "(imi\u0119 i nazwisko)")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.section
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.textLine
  }, "ur."), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.birthDate), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "(data urodzenia)")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.section
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.textLine
  }, "PESEL:"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.pesel)), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.section
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.textLine
  }, "w okresie od:"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.startDate), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "(pocz\u0105tek okresu zatrudnienia)"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.textLine
  }, "do:"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.endDate), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "(koniec okresu zatrudnienia)")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.section
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.textLine
  }, "by\u0142a zatrudniona na umow\u0119 o prac\u0119 w:"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.companyName), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "(nazwa firmy)")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.section
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.textLine
  }, "Na dzie\u0144 \u015Bmierci tj.:"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.deathDate), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "(data zgonu)"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.textLine
  }, "podlega\u0142(a) ubezpieczeniu emerytalnemu i rentowym.")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.section
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.textLine
  }, "Za\u015Bwiadczenie wydano w celu nabycia prawa do zasi\u0142ku pogrzebowego.")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.signature
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.signatureField
  }, "Podpis: ........................................................."), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.signatureField
  }, "Piecz\u0105tka: ........................................................."))));
};
var ZaswiadczenieERForm = function ZaswiadczenieERForm(_ref2) {
  var isOpen = _ref2.isOpen,
    onClose = _ref2.onClose;
  var _useState = (0, _react.useState)({
      companyDetails: '',
      date: '',
      personName: '',
      birthDate: '',
      pesel: '',
      startDate: '',
      endDate: '',
      companyName: '',
      deathDate: ''
    }),
    _useState2 = _slicedToArray(_useState, 2),
    formData = _useState2[0],
    setFormData = _useState2[1];
  (0, _react.useEffect)(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var localFormId, formRef, formSnap, data;
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
                data = formSnap.data();
                setFormData({
                  companyDetails: data.companyDetails || '',
                  personName: "".concat(data.name || '', " ").concat(data.surname || ''),
                  birthDate: data.birthDate || '',
                  pesel: data.pesel || '',
                  startDate: data.startDate || '',
                  endDate: data.endDate || '',
                  companyName: data.companyName || '',
                  deathDate: data.deathDate || ''
                });
                console.log('Dane formularza:', data);
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
        return _ref3.apply(this, arguments);
      };
    }();
    fetchData();
  }, []);
  var handleChange = function handleChange(e) {
    setFormData(_objectSpread(_objectSpread({}, formData), {}, _defineProperty({}, e.target.name, e.target.value)));
  };
  var handleGenerateAndUploadPDF = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var pdfBlob, formId, fileName, filePath, storage, fileRef, formRef;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _renderer.pdf)(/*#__PURE__*/_react["default"].createElement(ZaswiadczenieERPDF, {
              formData: formData
            })).toBlob();
          case 3:
            pdfBlob = _context2.sent;
            formId = localStorage.getItem('formId');
            fileName = "ZASWIADCZENIE_ER_".concat(formData.personName, "_").concat(Date.now(), ".pdf");
            filePath = "uploaded-documents/".concat(formId, "/Za\u015Bwiadczenie E-R/").concat(fileName);
            storage = (0, _storage.getStorage)();
            fileRef = (0, _storage.ref)(storage, filePath);
            _context2.next = 11;
            return (0, _storage.uploadBytes)(fileRef, pdfBlob);
          case 11:
            formRef = (0, _firestore.doc)(_firebase.db, 'forms', formId);
            _context2.next = 14;
            return (0, _firestore.updateDoc)(formRef, {
              zaswiadczenieERDocument: filePath
            });
          case 14:
            alert("PDF został wygenerowany i zapisany pomyślnie!");
            onClose();
            _context2.next = 21;
            break;
          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](0);
            console.error("Błąd podczas przesyłania pliku:", _context2.t0);
          case 21:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 18]]);
    }));
    return function handleGenerateAndUploadPDF() {
      return _ref4.apply(this, arguments);
    };
  }();
  if (!isOpen) return null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "modal-document"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Wype\u0142nij ZA\u015AWIADCZENIE E-R"), /*#__PURE__*/_react["default"].createElement("form", null, /*#__PURE__*/_react["default"].createElement("p", null, "Dane Firmy:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "companyDetails",
    value: formData.companyDetails,
    onChange: handleChange,
    placeholder: "(dane Firmy)"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Dnia:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "date",
    value: formData.date,
    onChange: handleChange,
    placeholder: "(data)"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "ZA\u015AWIADCZENIE"), /*#__PURE__*/_react["default"].createElement("p", null, "Niniejszym potwierdzam, \u017Ce Pan/Pani:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "personName",
    value: formData.personName,
    onChange: handleChange,
    placeholder: "(imi\u0119 i nazwisko)"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "ur."), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "birthDate",
    value: formData.birthDate,
    onChange: handleChange,
    placeholder: "(data urodzenia)"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "PESEL:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "pesel",
    value: formData.pesel,
    onChange: handleChange,
    placeholder: "(PESEL)"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "w okresie od:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "startDate",
    value: formData.startDate,
    onChange: handleChange,
    placeholder: "(pocz\u0105tek okresu zatrudnienia)"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "do:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "endDate",
    value: formData.endDate,
    onChange: handleChange,
    placeholder: "(koniec okresu zatrudnienia)"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "by\u0142a zatrudniona na umow\u0119 o prac\u0119 w:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "companyName",
    value: formData.companyName,
    onChange: handleChange,
    placeholder: "(nazwa firmy)"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Na dzie\u0144 \u015Bmierci tj.:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "deathDate",
    value: formData.deathDate,
    onChange: handleChange,
    placeholder: "(data zgonu)"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "podlega\u0142(a) ubezpieczeniu emerytalnemu i rentowym."), /*#__PURE__*/_react["default"].createElement("p", null, "Za\u015Bwiadczenie wydano w celu nabycia prawa do zasi\u0142ku pogrzebowego."), /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: handleGenerateAndUploadPDF
  }, "Wy\u015Blij i wygeneruj PDF"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: onClose
  }, "Zamknij"))));
};
var _default = exports["default"] = ZaswiadczenieERForm;