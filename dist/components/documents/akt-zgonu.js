"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _renderer = require("@react-pdf/renderer");
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
  dottedLine: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderStyle: 'dotted',
    width: '100%',
    marginBottom: 4,
    marginTop: 30
  },
  label: {
    fontSize: 9,
    marginTop: 2,
    textAlign: 'center'
  },
  section: {
    marginBottom: 20
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
var ZleceniePelnomocnictwoPDF = function ZleceniePelnomocnictwoPDF(_ref) {
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
  }, formData.location), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Miejscowo\u015B\u0107")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
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
  }, "Zlecenie-Pe\u0142nomocnictwo")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.section
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.authorizedPerson), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "(nazwisko i imi\u0119 osoby udzielaj\u0105cej pe\u0142nomocnictwa oraz jej stopie\u0144 pokrewie\u0144stwa wobec osoby zmar\u0142ej)")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.section
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.representative), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "(nazwisko imi\u0119 oraz adres pe\u0142nomocnika uprawnionego do za\u0142atwienia formalno\u015Bci)")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.section
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, null, "Czas i miejsce zgonu/znalezienia zw\u0142ok:"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.deathDate), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Data zgonu"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.deathTime), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Godzina zgonu"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.deathPlace), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Miejsce zgonu"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.bodyFindDate), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Data znalezienia zw\u0142ok"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.bodyFindTime), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Godzina znalezienia zw\u0142ok"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.bodyFindPlace), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Miejsce znalezienia zw\u0142ok")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.section
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, null, "Dane osoby zmar\u0142ej:"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.firstName), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Imi\u0119 pierwsze"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.secondName), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Imi\u0119 drugie"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.lastName), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Nazwisko"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.maidenName), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Nazwisko rodowe"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.maritalStatus), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Stan cywilny"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.birthDate), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Data urodzenia"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.birthPlace), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Miejsce urodzenia"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.citizenship), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Obywatelstwo"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.pesel), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Nr PESEL"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.education), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Wykszta\u0142cenie")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.section
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, null, "Rodzice osoby zmar\u0142ej:"), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.lineGroup
  }, /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: {
      width: '48%'
    }
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.fatherFirstName), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Imi\u0119 ojca")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: {
      width: '48%'
    }
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.motherFirstName), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Imi\u0119 matki"))), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.lineGroup
  }, /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: {
      width: '48%'
    }
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.fatherLastName), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Nazwisko ojca")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: {
      width: '48%'
    }
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.motherLastName), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Nazwisko matki"))), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.lineGroup
  }, /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: {
      width: '48%'
    }
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.fatherMaidenName), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Nazwisko rodowe ojca")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: {
      width: '48%'
    }
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.motherMaidenName), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Nazwisko rodowe matki")))), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.section
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, null, "Ma\u0142\u017Conek osoby zmar\u0142ej:"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.spouseFirstName), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Imi\u0119 ma\u0142\u017Conka"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.spouseLastName), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Nazwisko ma\u0142\u017Conka"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.spouseMaidenName), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Nazwisko rodowe ma\u0142\u017Conka"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.dottedLine
  }, formData.spousePesel), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, "Numer PESEL ma\u0142\u017Conka")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.section
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, null, "Prosz\u0119 o wydanie bezp\u0142atnego odpisu skr\xF3conego aktu zgonu oraz ", formData.extraCopies, " egzemplarzy dodatkowych.")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.signature
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.signatureField
  }, "Podpis: .........................................................")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.section
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, null, "Sporz\u0105dzenie aktu i wydanie 1 odpisu zwolnione od op\u0142aty skarbowej, op\u0142ata skarbowa za skr\xF3cony odpis aktu zgonu 22 z\u0142, za pe\u0142nomocnictwo 17 z\u0142."), /*#__PURE__*/_react["default"].createElement(_renderer.Text, null, "Ustawa z dnia 16.11.2006 roku o op\u0142acie skarbowej (Dz. U. z 2019 poz. 1000)."))));
};
var ZleceniePelnomocnictwoForm = function ZleceniePelnomocnictwoForm(_ref2) {
  var isOpen = _ref2.isOpen,
    onClose = _ref2.onClose;
  var _useState = (0, _react.useState)({
      location: '',
      date: '',
      authorizedPerson: '',
      representative: '',
      deathDate: '',
      deathTime: '',
      deathPlace: '',
      bodyFindDate: '',
      bodyFindTime: '',
      bodyFindPlace: '',
      firstName: '',
      secondName: '',
      lastName: '',
      maidenName: '',
      maritalStatus: '',
      birthDate: '',
      birthPlace: '',
      citizenship: '',
      pesel: '',
      education: '',
      fatherFirstName: '',
      fatherLastName: '',
      fatherMaidenName: '',
      motherFirstName: '',
      motherLastName: '',
      motherMaidenName: '',
      spouseFirstName: '',
      spouseLastName: '',
      spouseMaidenName: '',
      spousePesel: '',
      extraCopies: ''
    }),
    _useState2 = _slicedToArray(_useState, 2),
    formData = _useState2[0],
    setFormData = _useState2[1];
  (0, _react.useEffect)(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var localFormId, formRef, formSnap, _data$authorizedPerso, data;
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
                  date: data.date || '',
                  authorizedPerson: ((_data$authorizedPerso = data.authorizedPerson) === null || _data$authorizedPerso === void 0 ? void 0 : _data$authorizedPerso.name) || '',
                  representative: data.representative || '',
                  deathDate: data.deathDate || '',
                  deathTime: data.deathTime || '',
                  deathPlace: data.city + " ul. " + data.street + ", " + data.postalCode || '',
                  bodyFindDate: data.bodyFindDate || '',
                  bodyFindTime: data.bodyFindTime || '',
                  bodyFindPlace: data.bodyFindPlace || '',
                  firstName: data.firstName || '',
                  secondName: data.secondName || '',
                  lastName: data.lastName || '',
                  maidenName: data.maidenName || '',
                  maritalStatus: data.maritalStatus || '',
                  birthDate: data.birthDate || '',
                  birthPlace: data.birthPlace || '',
                  citizenship: data.citizenship || '',
                  pesel: data.pesel || '',
                  education: data.education || '',
                  fatherFirstName: data.fatherFirstName || '',
                  fatherLastName: data.fatherLastName || '',
                  fatherMaidenName: data.fatherMaidenName || '',
                  motherFirstName: data.motherFirstName || '',
                  motherLastName: data.motherLastName || '',
                  motherMaidenName: data.motherMaidenName || '',
                  spouseFirstName: data.spouseFirstName || '',
                  spouseLastName: data.spouseLastName || '',
                  spouseMaidenName: data.spouseMaidenName || '',
                  spousePesel: data.spousePesel || '',
                  extraCopies: data.extraCopies || ''
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
            return (0, _renderer.pdf)(/*#__PURE__*/_react["default"].createElement(ZleceniePelnomocnictwoPDF, {
              formData: formData
            })).toBlob();
          case 3:
            pdfBlob = _context2.sent;
            formId = localStorage.getItem('formId');
            fileName = "akt zgonu USC_".concat(formData.authorizedPerson, "_").concat(Date.now(), ".pdf");
            filePath = "uploaded-documents/".concat(formId, "/Akt zgonu USC/").concat(fileName);
            storage = (0, _storage.getStorage)();
            fileRef = (0, _storage.ref)(storage, filePath);
            _context2.next = 11;
            return (0, _storage.uploadBytes)(fileRef, pdfBlob);
          case 11:
            formRef = (0, _firestore.doc)(_firebase.db, 'forms', formId);
            _context2.next = 14;
            return (0, _firestore.updateDoc)(formRef, {
              zleceniePelnomocnictwoDocument: filePath
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
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Wype\u0142nij Zlecenie-Pe\u0142nomocnictwo"), /*#__PURE__*/_react["default"].createElement("form", null, /*#__PURE__*/_react["default"].createElement("p", null, "Miejscowo\u015B\u0107:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "location",
    value: formData.location,
    onChange: handleChange,
    placeholder: "Miejscowo\u015B\u0107"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Dnia:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "date",
    value: formData.date,
    onChange: handleChange,
    placeholder: "Data"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Zlecenie-Pe\u0142nomocnictwo"), /*#__PURE__*/_react["default"].createElement("p", null, "Nazwisko i imi\u0119 osoby udzielaj\u0105cej pe\u0142nomocnictwa oraz jej stopie\u0144 pokrewie\u0144stwa:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "authorizedPerson",
    value: formData.authorizedPerson,
    onChange: handleChange,
    placeholder: "Nazwisko i imi\u0119"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Nazwisko, imi\u0119 oraz adres pe\u0142nomocnika uprawnionego do za\u0142atwienia formalno\u015Bci:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "representative",
    value: formData.representative,
    onChange: handleChange,
    placeholder: "Nazwisko, imi\u0119, adres"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Data zgonu:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "deathDate",
    value: formData.deathDate,
    onChange: handleChange,
    placeholder: "Data zgonu"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Godzina zgonu:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "deathTime",
    value: formData.deathTime,
    onChange: handleChange,
    placeholder: "Godzina zgonu"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Miejsce zgonu:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "deathPlace",
    value: formData.deathPlace,
    onChange: handleChange,
    placeholder: "Miejsce zgonu"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Data znalezienia zw\u0142ok:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "bodyFindDate",
    value: formData.bodyFindDate,
    onChange: handleChange,
    placeholder: "Data znalezienia zw\u0142ok"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Godzina znalezienia zw\u0142ok:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "bodyFindTime",
    value: formData.bodyFindTime,
    onChange: handleChange,
    placeholder: "Godzina znalezienia zw\u0142ok"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Miejsce znalezienia zw\u0142ok:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "bodyFindPlace",
    value: formData.bodyFindPlace,
    onChange: handleChange,
    placeholder: "Miejsce znalezienia zw\u0142ok"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Imi\u0119 pierwsze:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "firstName",
    value: formData.firstName,
    onChange: handleChange,
    placeholder: "Imi\u0119 pierwsze"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Imi\u0119 drugie:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "secondName",
    value: formData.secondName,
    onChange: handleChange,
    placeholder: "Imi\u0119 drugie"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Nazwisko:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "lastName",
    value: formData.lastName,
    onChange: handleChange,
    placeholder: "Nazwisko"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Nazwisko rodowe:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "maidenName",
    value: formData.maidenName,
    onChange: handleChange,
    placeholder: "Nazwisko rodowe"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Stan cywilny:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "maritalStatus",
    value: formData.maritalStatus,
    onChange: handleChange,
    placeholder: "Stan cywilny"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Miejsce urodzenia:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "birthPlace",
    value: formData.birthPlace,
    onChange: handleChange,
    placeholder: "Miejsce urodzenia"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Obywatelstwo:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "citizenship",
    value: formData.citizenship,
    onChange: handleChange,
    placeholder: "Obywatelstwo"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Nr PESEL:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "pesel",
    value: formData.pesel,
    onChange: handleChange,
    placeholder: "Nr PESEL"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Wykszta\u0142cenie:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "education",
    value: formData.education,
    onChange: handleChange,
    placeholder: "Wykszta\u0142cenie"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Imi\u0119 ojca:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "fatherFirstName",
    value: formData.fatherFirstName,
    onChange: handleChange,
    placeholder: "Imi\u0119 ojca"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Nazwisko ojca:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "fatherLastName",
    value: formData.fatherLastName,
    onChange: handleChange,
    placeholder: "Nazwisko ojca"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Nazwisko rodowe ojca:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "fatherMaidenName",
    value: formData.fatherMaidenName,
    onChange: handleChange,
    placeholder: "Nazwisko rodowe ojca"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Imi\u0119 matki:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "motherFirstName",
    value: formData.motherFirstName,
    onChange: handleChange,
    placeholder: "Imi\u0119 matki"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Nazwisko matki:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "motherLastName",
    value: formData.motherLastName,
    onChange: handleChange,
    placeholder: "Nazwisko matki"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Nazwisko rodowe matki:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "motherMaidenName",
    value: formData.motherMaidenName,
    onChange: handleChange,
    placeholder: "Nazwisko rodowe matki"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Imi\u0119 ma\u0142\u017Conka:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "spouseFirstName",
    value: formData.spouseFirstName,
    onChange: handleChange,
    placeholder: "Imi\u0119 ma\u0142\u017Conka"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Nazwisko ma\u0142\u017Conka:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "spouseLastName",
    value: formData.spouseLastName,
    onChange: handleChange,
    placeholder: "Nazwisko ma\u0142\u017Conka"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Nazwisko rodowe ma\u0142\u017Conka:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "spouseMaidenName",
    value: formData.spouseMaidenName,
    onChange: handleChange,
    placeholder: "Nazwisko rodowe ma\u0142\u017Conka"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Numer PESEL ma\u0142\u017Conka:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "spousePesel",
    value: formData.spousePesel,
    onChange: handleChange,
    placeholder: "Numer PESEL ma\u0142\u017Conka"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Prosz\u0119 o wydanie bezp\u0142atnego odpisu skr\xF3conego aktu zgonu oraz:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "extraCopies",
    value: formData.extraCopies,
    onChange: handleChange,
    placeholder: "Liczba dodatkowych egzemplarzy"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Sporz\u0105dzenie aktu i wydanie 1 odpisu zwolnione od op\u0142aty skarbowej, op\u0142ata skarbowa za skr\xF3cony odpis aktu zgonu 22 z\u0142, za pe\u0142nomocnictwo 17 z\u0142."), /*#__PURE__*/_react["default"].createElement("p", null, "Ustawa z dnia 16.11.2006 roku o op\u0142acie skarbowej (Dz. U. z 2019 poz. 1000)."), /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: handleGenerateAndUploadPDF
  }, "Wy\u015Blij i wygeneruj PDF"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: onClose
  }, "Zamknij"))));
};
var _default = exports["default"] = ZleceniePelnomocnictwoForm;