"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _firebase = require("../../../firebase");
var _firestore = require("firebase/firestore");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _freeBrandsSvgIcons = require("@fortawesome/free-brands-svg-icons");
var _image = _interopRequireDefault(require("next/image"));
var _consultant = _interopRequireDefault(require("../../../public/assets/icons/consultant.png"));
var _link = _interopRequireDefault(require("next/link"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var Contact = function Contact(_ref) {
  var handleOpenChat = _ref.handleOpenChat;
  var _useState = (0, _react.useState)({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }),
    _useState2 = _slicedToArray(_useState, 2),
    formData = _useState2[0],
    setFormData = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isSubmitted = _useState4[0],
    setIsSubmitted = _useState4[1];
  var handleInputChange = function handleInputChange(e) {
    var _e$target = e.target,
      name = _e$target.name,
      value = _e$target.value;
    setFormData(_objectSpread(_objectSpread({}, formData), {}, _defineProperty({}, name, value)));
  };
  var handleSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
      var response;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();
            _context.prev = 1;
            _context.next = 4;
            return (0, _firestore.addDoc)((0, _firestore.collection)(_firebase.db, 'contactMessages'), _objectSpread(_objectSpread({}, formData), {}, {
              timestamp: _firestore.Timestamp.now()
            }));
          case 4:
            _context.next = 6;
            return fetch('/api/contact-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
            });
          case 6:
            response = _context.sent;
            if (response.ok) {
              setIsSubmitted(true);
              setFormData({
                fullName: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
              });
            } else {
              console.error('Błąd podczas wysyłania wiadomości e-mail');
            }
            _context.next = 13;
            break;
          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            console.error('Błąd podczas dodawania dokumentu: ', _context.t0);
          case 13:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[1, 10]]);
    }));
    return function handleSubmit(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/_react["default"].createElement("div", {
    id: "",
    className: "contact"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "contact__wrapper"
  }, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "contact__title"
  }, "Kontakt"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "contact__subtitle"
  }, "Jeste\u015Bmy tutaj, aby pom\xF3c Ci w ka\u017Cdej chwili. Je\u015Bli masz pytania, potrzebujesz wsparcia lub chcesz dowiedzie\u0107 si\u0119 wi\u0119cej o naszych us\u0142ugach, skontaktuj si\u0119 z nami za pomoc\u0105 poni\u017Cszych informacji."), /*#__PURE__*/_react["default"].createElement("div", {
    className: "contact__card"
  }, /*#__PURE__*/_react["default"].createElement("h2", {
    className: "contact__section-title"
  }, "Dane kontaktowe"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "contact__details"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "contact__item"
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faMapMarkerAlt,
    className: "contact__icon"
  }), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "contact__item-title"
  }, "Adres g\u0142\xF3wny biura:"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "contact__item-content"
  }, "Polskidompogrzebowy24.pl", /*#__PURE__*/_react["default"].createElement("br", null), "ul. Przyk\u0142adowa 123", /*#__PURE__*/_react["default"].createElement("br", null), "00-001 Warszawa"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "contact__item"
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faClock,
    className: "contact__icon"
  }), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "contact__item-title"
  }, "Godziny otwarcia:"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "contact__item-content"
  }, "Poniedzia\u0142ek - Pi\u0105tek: 8:00 - 18:00", /*#__PURE__*/_react["default"].createElement("br", null), "Sobota: 9:00 - 14:00", /*#__PURE__*/_react["default"].createElement("br", null), "Niedziela: Zamkni\u0119te"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "contact__item"
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faEnvelope,
    className: "contact__icon"
  }), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "contact__item-title"
  }, "E-mail:"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "contact__item-content"
  }, "kontakt@Polskidompogrzebowy24.pl"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "contact__item"
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faPhoneAlt,
    className: "contact__icon"
  }), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "contact__item-title"
  }, "Telefon kontaktowy:"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "contact__item-content"
  }, "+48 123 456 789"))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "contact__social"
  }, /*#__PURE__*/_react["default"].createElement("h2", {
    className: "contact__section-title"
  }, "\u015Aled\u017A nas w mediach spo\u0142eczno\u015Bciowych"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "contact__social-subtitle"
  }, "Aby by\u0107 na bie\u017C\u0105co"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "contact__social-links"
  }, /*#__PURE__*/_react["default"].createElement(_link["default"], {
    href: "#",
    className: "contact__social-link"
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeBrandsSvgIcons.faFacebookF,
    className: "fa-2xl"
  }), " Polskidompogrzebowy"), /*#__PURE__*/_react["default"].createElement(_link["default"], {
    href: "#",
    className: "contact__social-link"
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeBrandsSvgIcons.faInstagram,
    className: "fa-2xl"
  }), " Polskidompogrzebowy"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "contact__form"
  }, /*#__PURE__*/_react["default"].createElement("h2", {
    className: "contact__section-title"
  }, "Formularz kontaktowy"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "contact__form-main"
  }, isSubmitted && /*#__PURE__*/_react["default"].createElement("p", {
    className: "contact__success-message"
  }, "Wiadomo\u015B\u0107 zosta\u0142a wys\u0142ana pomy\u015Blnie!"), /*#__PURE__*/_react["default"].createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "contact__form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "fullName"
  }, "Imi\u0119 i Nazwisko"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    id: "fullName",
    name: "fullName",
    value: formData.fullName,
    onChange: handleInputChange,
    required: true
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "contact__form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "email"
  }, "E-mail"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "email",
    id: "email",
    name: "email",
    value: formData.email,
    onChange: handleInputChange,
    required: true
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "contact__form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "phone"
  }, "Numer Telefonu"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "tel",
    id: "phone",
    name: "phone",
    value: formData.phone,
    onChange: handleInputChange,
    required: true
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "contact__form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "subject"
  }, "Temat"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    id: "subject",
    name: "subject",
    value: formData.subject,
    onChange: handleInputChange,
    required: true
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "contact__form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "message"
  }, "Tre\u015B\u0107 wiadomo\u015Bci"), /*#__PURE__*/_react["default"].createElement("textarea", {
    id: "message",
    name: "message",
    value: formData.message,
    onChange: handleInputChange,
    required: true
  })), /*#__PURE__*/_react["default"].createElement("button", {
    type: "submit",
    className: "contact__form-submit"
  }, "Wy\u015Blij")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "contact-chat contact__social"
  }, /*#__PURE__*/_react["default"].createElement("h2", {
    className: "contact__section-title"
  }, "Czat na \u017Cywo"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "contact-chatsubtitle"
  }, "Je\u015Bli masz pilne pytanie, skorzystaj z czatu na \u017Cywo i porozmawiaj z naszym konsultantem w czasie rzeczywistym."), /*#__PURE__*/_react["default"].createElement("div", {
    className: "contact-chat-main"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "option-select"
  }, /*#__PURE__*/_react["default"].createElement("a", {
    onClick: handleOpenChat
  }, /*#__PURE__*/_react["default"].createElement(_image["default"], {
    src: _consultant["default"],
    alt: "Consultant",
    width: 32,
    height: 32
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Rozpocznij czat")))))));
};
var _default = exports["default"] = Contact;