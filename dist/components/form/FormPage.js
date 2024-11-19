"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _firebase = require("../../../firebase");
var _firestore = require("firebase/firestore");
var _router = require("next/router");
var _StepNavigation = _interopRequireDefault(require("@/components/StepNavigation"));
var _storage = require("firebase/storage");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var UnifiedForm = function UnifiedForm() {
  var _formData$authorizedP, _formData$authorizedP2, _formData$authorizedP3;
  var _useState = (0, _react.useState)({
      name: '',
      surname: '',
      deathDate: '',
      birthDate: '',
      pesel: '',
      worked: null,
      pensionCertificate: false,
      pensionDetails: '',
      insurance: '',
      certificateNumber: '',
      noCertificate: false,
      authorizedPerson: {
        name: '',
        pesel: '',
        idNumber: ''
      },
      who: ''
    }),
    _useState2 = _slicedToArray(_useState, 2),
    formData = _useState2[0],
    setFormData = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showSaveForm = _useState4[0],
    setShowSaveForm = _useState4[1];
  var _useState5 = (0, _react.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    email = _useState6[0],
    setEmail = _useState6[1];
  var _useState7 = (0, _react.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    password = _useState8[0],
    setPassword = _useState8[1];
  var router = (0, _router.useRouter)();
  var _useState9 = (0, _react.useState)([]),
    _useState10 = _slicedToArray(_useState9, 2),
    errors = _useState10[0],
    setErrors = _useState10[1];
  var _useState11 = (0, _react.useState)(true),
    _useState12 = _slicedToArray(_useState11, 2),
    showInfoBubble = _useState12[0],
    setShowInfoBubble = _useState12[1];
  var _useState13 = (0, _react.useState)(true),
    _useState14 = _slicedToArray(_useState13, 2),
    showInfoLogin = _useState14[0],
    setShowInfoLogin = _useState14[1];
  var _useState15 = (0, _react.useState)('formularz-drugi'),
    _useState16 = _slicedToArray(_useState15, 2),
    currentStep = _useState16[0],
    setCurrentStep = _useState16[1];
  var _useState17 = (0, _react.useState)(null),
    _useState18 = _slicedToArray(_useState17, 2),
    selectedFile = _useState18[0],
    setSelectedFile = _useState18[1];
  var _useState19 = (0, _react.useState)(false),
    _useState20 = _slicedToArray(_useState19, 2),
    isInfoBubbleVisible = _useState20[0],
    setIsInfoBubbleVisible = _useState20[1];
  var _useState21 = (0, _react.useState)(false),
    _useState22 = _slicedToArray(_useState21, 2),
    isInfoLoginVisible = _useState22[0],
    setIsInfoLoginVisible = _useState22[1];
  var _useState23 = (0, _react.useState)(false),
    _useState24 = _slicedToArray(_useState23, 2),
    isModalOpen = _useState24[0],
    setIsModalOpen = _useState24[1];
  var errorContainerRef = (0, _react.useRef)(null);
  var openModal = function openModal() {
    return setIsModalOpen(true);
  };
  var closeModal = function closeModal() {
    return setIsModalOpen(false);
  };
  var toggleInfoBubble = function toggleInfoBubble(event) {
    event.preventDefault();
    setIsInfoBubbleVisible(!isInfoBubbleVisible);
  };
  var toggleInfoLogin = function toggleInfoLogin(event) {
    event.preventDefault();
    setIsInfoLoginVisible(!isInfoLoginVisible);
  };
  (0, _react.useEffect)(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var id, docRef, docSnap;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              id = localStorage.getItem('formId');
              if (!id) {
                _context.next = 7;
                break;
              }
              docRef = (0, _firestore.doc)(_firebase.db, 'forms', id);
              _context.next = 5;
              return (0, _firestore.getDoc)(docRef);
            case 5:
              docSnap = _context.sent;
              if (docSnap.exists()) {
                setFormData(docSnap.data());
              }
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function fetchData() {
        return _ref.apply(this, arguments);
      };
    }();
    fetchData();
  }, []);
  var handleDownloadCertificate = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var storage, fileRef, url, a;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            storage = (0, _storage.getStorage)();
            fileRef = (0, _storage.ref)(storage, 'documents/Zaświadczenie E-R.docx');
            _context2.prev = 2;
            _context2.next = 5;
            return (0, _storage.getDownloadURL)(fileRef);
          case 5:
            url = _context2.sent;
            a = document.createElement('a');
            a.href = url;
            a.download = 'Zaświadczenie E-R.docx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            _context2.next = 17;
            break;
          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](2);
            console.error("Błąd pobierania pliku:", _context2.t0);
          case 17:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[2, 14]]);
    }));
    return function handleDownloadCertificate() {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleChange = function handleChange(e) {
    var _e$target = e.target,
      name = _e$target.name,
      value = _e$target.value,
      type = _e$target.type,
      checked = _e$target.checked;
    if (name.startsWith('authorizedPerson.')) {
      var key = name.split('.')[1];
      setFormData(function (prevState) {
        return _objectSpread(_objectSpread({}, prevState), {}, {
          authorizedPerson: _objectSpread(_objectSpread({}, prevState.authorizedPerson), {}, _defineProperty({}, key, value))
        });
      });
    } else {
      setFormData(function (prevState) {
        return _objectSpread(_objectSpread({}, prevState), {}, _defineProperty({}, name, type === 'checkbox' ? checked : value));
      });
    }

    // Usuwanie błędu dla aktualizowanego pola
    setErrors(function (prevErrors) {
      var newErrors = _objectSpread({}, prevErrors);
      delete newErrors[name];
      return newErrors;
    });
  };
  var handleFileUpload = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(e) {
      var file;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            file = e.target.files[0];
            setSelectedFile(file);
          case 2:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function handleFileUpload(_x) {
      return _ref3.apply(this, arguments);
    };
  }();
  var uploadFile = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var formId, storage, filePath, fileRef, formRef;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            if (selectedFile) {
              _context4.next = 2;
              break;
            }
            return _context4.abrupt("return");
          case 2:
            formId = localStorage.getItem('formId');
            if (!formId) {
              formId = generateUniqueId();
              localStorage.setItem('formId', formId);
            }
            storage = (0, _storage.getStorage)();
            filePath = "uploaded-documents/".concat(formId, "/Za\u015Bwiadczenie ER/").concat(selectedFile.name);
            fileRef = (0, _storage.ref)(storage, filePath);
            _context4.prev = 7;
            _context4.next = 10;
            return (0, _storage.uploadBytes)(fileRef, selectedFile);
          case 10:
            console.log("Plik przesłany pomyślnie!");

            // Zapisanie ścieżki pliku w dokumencie formularza w Firestore
            formRef = (0, _firestore.doc)(_firebase.db, 'forms', formId);
            _context4.next = 14;
            return (0, _firestore.updateDoc)(formRef, {
              uploadedDocument: filePath // Zapisz ścieżkę pliku w formularzu
            });
          case 14:
            console.log("Plik przesłany pomyślnie!");
            _context4.next = 20;
            break;
          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](7);
            console.error("Błąd podczas przesyłania pliku:", _context4.t0);
          case 20:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[7, 17]]);
    }));
    return function uploadFile() {
      return _ref4.apply(this, arguments);
    };
  }();
  (0, _react.useEffect)(function () {
    if (errors.length > 0 && errorContainerRef.current) {
      errorContainerRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [errors]);
  var handleSubmit = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(e) {
      var newErrors;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            e.preventDefault();
            newErrors = []; // Przykładowa walidacja
            if (!formData.name) {
              newErrors.push('Imię jest wymagane.');
            }
            if (!formData.surname) {
              newErrors.push('Nazwisko jest wymagane.');
            }
            if (!formData.deathDate) {
              newErrors.push('Data śmierci jest wymagana.');
            }
            if (!formData.birthDate) {
              newErrors.push('Data urodzin jest wymagana.');
            }
            if (!formData.pesel) {
              newErrors.push('PESEL jest wymagany.');
            }
            if (!(Object.keys(newErrors).length > 0)) {
              _context5.next = 10;
              break;
            }
            setErrors(newErrors);
            return _context5.abrupt("return");
          case 10:
            if (!(newErrors.length > 0)) {
              _context5.next = 13;
              break;
            }
            setErrors(newErrors);
            return _context5.abrupt("return");
          case 13:
            _context5.next = 15;
            return uploadFile();
          case 15:
            _context5.next = 17;
            return saveData();
          case 17:
            router.push('/formularz-trzeci');
          case 18:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function handleSubmit(_x2) {
      return _ref5.apply(this, arguments);
    };
  }();
  var handleSaveAndNavigate = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(step) {
      var newErrors;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            if (!(step === 'formularz-pierwszy')) {
              _context6.next = 6;
              break;
            }
            _context6.next = 3;
            return saveData();
          case 3:
            setCurrentStep(step);
            router.push("/".concat(step));
            return _context6.abrupt("return");
          case 6:
            newErrors = []; // Przykładowa walidacja
            if (!formData.name) {
              newErrors.push('Imię jest wymagane.');
            }
            if (!formData.surname) {
              newErrors.push('Nazwisko jest wymagane.');
            }
            if (!formData.deathDate) {
              newErrors.push('Data śmierci jest wymagana.');
            }
            if (!formData.birthDate) {
              newErrors.push('Data urodzin jest wymagana.');
            }
            if (!formData.pesel) {
              newErrors.push('PESEL jest wymagany.');
            }
            if (!(newErrors.length > 0)) {
              _context6.next = 15;
              break;
            }
            setErrors(newErrors);
            return _context6.abrupt("return");
          case 15:
            if (!(Object.keys(newErrors).length > 0)) {
              _context6.next = 18;
              break;
            }
            setErrors(newErrors);
            return _context6.abrupt("return");
          case 18:
            _context6.next = 20;
            return saveData();
          case 20:
            setCurrentStep(step);
            router.push("/".concat(step));
          case 22:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    return function handleSaveAndNavigate(_x3) {
      return _ref6.apply(this, arguments);
    };
  }();
  var handleSaveAndBack = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(step) {
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return saveData();
          case 2:
            setCurrentStep(step);
            router.push("/".concat(step));
          case 4:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    return function handleSaveAndBack(_x4) {
      return _ref7.apply(this, arguments);
    };
  }();
  var saveData = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      var id;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            id = localStorage.getItem('formId');
            if (!id) {
              id = generateUniqueId();
              localStorage.setItem('formId', id);
            }
            _context8.prev = 2;
            _context8.next = 5;
            return (0, _firestore.setDoc)((0, _firestore.doc)(_firebase.db, 'forms', id), formData, {
              merge: true
            });
          case 5:
            console.log('Form saved successfully');
            _context8.next = 11;
            break;
          case 8:
            _context8.prev = 8;
            _context8.t0 = _context8["catch"](2);
            console.error('Błąd zapisu formularza: ', _context8.t0);
          case 11:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[2, 8]]);
    }));
    return function saveData() {
      return _ref8.apply(this, arguments);
    };
  }();
  var generateUniqueId = function generateUniqueId() {
    return 'form_' + Math.random().toString(36).substr(2, 9);
  };
  var handleSaveCredentials = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
      var id;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            id = localStorage.getItem('formId');
            if (!id) {
              _context9.next = 14;
              break;
            }
            _context9.prev = 2;
            _context9.next = 5;
            return (0, _firestore.setDoc)((0, _firestore.doc)(_firebase.db, 'forms', id), {
              email: email,
              password: password
            }, {
              merge: true
            });
          case 5:
            alert('Dane zostały zapisane.');
            setShowSaveForm(false);
            _context9.next = 12;
            break;
          case 9:
            _context9.prev = 9;
            _context9.t0 = _context9["catch"](2);
            console.error('Błąd zapisu formularza: ', _context9.t0);
          case 12:
            _context9.next = 15;
            break;
          case 14:
            console.error('Nie znaleziono formId w Local Storage');
          case 15:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[2, 9]]);
    }));
    return function handleSaveCredentials() {
      return _ref9.apply(this, arguments);
    };
  }();
  var closeSaveForm = function closeSaveForm() {
    return setShowSaveForm(false);
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "navigation-buttons"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: "nav-button",
    onClick: function onClick() {
      return handleSaveAndBack('formularz-pierwszy');
    }
  }, "\u2190 Cofnij"), /*#__PURE__*/_react["default"].createElement("button", {
    className: "nav-button",
    onClick: function onClick() {
      return handleSaveAndNavigate('formularz-trzeci');
    }
  }, "Dalej \u2192")), /*#__PURE__*/_react["default"].createElement(_StepNavigation["default"], {
    currentStep: currentStep,
    setCurrentStep: setCurrentStep,
    handleSaveAndNavigate: handleSaveAndNavigate
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-container-main"
  }, /*#__PURE__*/_react["default"].createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Informacje o Osobie zmar\u0142ej:"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group form-group-name"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "name"
  }, "Imi\u0119"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    id: "name",
    name: "name",
    value: formData.name || '',
    onChange: handleChange,
    placeholder: "Imi\u0119"
  }), /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "surname"
  }, "Nazwisko"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    id: "surname",
    name: "surname",
    value: formData.surname || '',
    onChange: handleChange,
    placeholder: "Nazwisko"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group form-group-name"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "birthDate"
  }, "Data urodzin"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "date",
    id: "birthDate",
    name: "birthDate",
    value: formData.birthDate || '',
    onChange: handleChange
  }), /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "deathDate"
  }, "Data \u015Bmierci"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "date",
    id: "deathDate",
    name: "deathDate",
    value: formData.deathDate || '',
    onChange: handleChange
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group form-group-name"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "pesel"
  }, "PESEL"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    id: "pesel",
    name: "pesel",
    value: formData.pesel || '',
    onChange: handleChange,
    placeholder: "PESEL"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group form-group-down"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Czy osoba podlega\u0142a sk\u0142adkom emerytalno-rentowym?"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "radio-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "radio-label ".concat(formData.pensionCertificate === 'Tak' ? 'selected' : '')
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "radio",
    name: "pensionCertificate",
    value: "Tak",
    checked: formData.pensionCertificate === 'Tak',
    onChange: handleChange
  }), "Tak", formData.pensionCertificate === 'Tak' && /*#__PURE__*/_react["default"].createElement("span", {
    className: "checkmark"
  }, "\u2714")), /*#__PURE__*/_react["default"].createElement("label", {
    className: "radio-label ".concat(formData.pensionCertificate === 'Nie' ? 'selected' : '')
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "radio",
    name: "pensionCertificate",
    value: "Nie",
    checked: formData.pensionCertificate === 'Nie',
    onChange: handleChange
  }), "Nie", formData.pensionCertificate === 'Nie' && /*#__PURE__*/_react["default"].createElement("span", {
    className: "checkmark"
  }, "\u2714"))), formData.pensionCertificate === 'Tak' && /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group form-group-down"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "additional-info"
  }, /*#__PURE__*/_react["default"].createElement("p", null, "Pobierz plik poni\u017Cej i go wype\u0142nij"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "additional-info-download"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: handleDownloadCertificate
  }, "Pobierz za\u015Bwiadczenie", /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faDownload,
    className: "fa-xl"
  })), /*#__PURE__*/_react["default"].createElement("p", null, "Je\u015Bli wype\u0142ni\u0142e\u015B go ju\u017C teraz, mo\u017Cesz go za\u0142adowa\u0107 poni\u017Cej"), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("input", {
    type: "file",
    onChange: handleFileUpload
  })), /*#__PURE__*/_react["default"].createElement("p", null, "... lub p\xF3\u017Aniej w swoim panelu klienta")))), showInfoBubble && /*#__PURE__*/_react["default"].createElement("div", {
    className: "info-bubble info-bubble-first ".concat(isInfoBubbleVisible ? 'visible' : 'hidden')
  }, /*#__PURE__*/_react["default"].createElement("p", null, "Twoje Dane: ", /*#__PURE__*/_react["default"].createElement("br", null), "Nasza Odpowiedzialno\u015B\u0107"), /*#__PURE__*/_react["default"].createElement("p", null, "Chronimy Twoje dane z najwy\u017Csz\u0105 staranno\u015Bci\u0105. Zapewniamy, \u017Ce wszelkie informacje s\u0105 przechowywane bezpiecznie i z zachowaniem pe\u0142nej poufno\u015Bci.")), showInfoLogin && /*#__PURE__*/_react["default"].createElement("div", {
    className: "info-bubble info-bubble-second ".concat(isInfoLoginVisible ? 'visible' : 'hidden')
  }, /*#__PURE__*/_react["default"].createElement("p", null, "Nie pami\u0119tasz czego\u015B? Potrzebujesz wi\u0119cej czasu?"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "save-link",
    onClick: function onClick() {
      return setShowSaveForm(true);
    }
  }, "Zapisz formularz tutaj i doko\u0144cz p\xF3\u017Aniej")), /*#__PURE__*/_react["default"].createElement("button", {
    className: "toggle-info-bubble",
    onClick: toggleInfoBubble
  }, isInfoBubbleVisible ? 'Schowaj informacje ↑' : 'Chronimy Twoje dane ↓'), /*#__PURE__*/_react["default"].createElement("button", {
    className: "toggle-info-bubble toggle-info-login",
    onClick: toggleInfoLogin
  }, isInfoLoginVisible ? 'Schowaj ↑' : 'Potrzebujesz czasu? ↓'), /*#__PURE__*/_react["default"].createElement("h2", null, "Czy osoba zmar\u0142a by\u0142a ubezpieczona w:"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "radio-group radio-group-insurance"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "radio-label ".concat(formData.insurance === 'ZUS' ? 'selected' : '')
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "radio",
    name: "insurance",
    value: "ZUS",
    checked: formData.insurance === 'ZUS',
    onChange: handleChange
  }), "ZUS", formData.insurance === 'ZUS' && /*#__PURE__*/_react["default"].createElement("span", {
    className: "checkmark"
  }, "\u2714")), /*#__PURE__*/_react["default"].createElement("label", {
    className: "radio-label ".concat(formData.insurance === 'KRUS' ? 'selected' : '')
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "radio",
    name: "insurance",
    value: "KRUS",
    checked: formData.insurance === 'KRUS',
    onChange: handleChange
  }), "KRUS", formData.insurance === 'KRUS' && /*#__PURE__*/_react["default"].createElement("span", {
    className: "checkmark"
  }, "\u2714")), /*#__PURE__*/_react["default"].createElement("label", {
    className: "radio-label ".concat(formData.insurance === 'MSWiA' ? 'selected' : '')
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "radio",
    name: "insurance",
    value: "MSWiA",
    checked: formData.insurance === 'MSWiA',
    onChange: handleChange
  }), "MSWiA", formData.insurance === 'MSWiA' && /*#__PURE__*/_react["default"].createElement("span", {
    className: "checkmark"
  }, "\u2714")), /*#__PURE__*/_react["default"].createElement("label", {
    className: "radio-label ".concat(formData.insurance === 'Inne' ? 'selected' : '')
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "radio",
    name: "insurance",
    value: "Inne",
    checked: formData.insurance === 'Inne',
    onChange: handleChange
  }), "Inne", formData.insurance === 'Inne' && /*#__PURE__*/_react["default"].createElement("span", {
    className: "checkmark"
  }, "\u2714"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "certificateNumber"
  }, "Numer \u015Bwiadczenia"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    id: "certificateNumber",
    name: "certificateNumber",
    value: formData.certificateNumber || '',
    onChange: handleChange,
    placeholder: "Numer \u015Bwiadczenia",
    disabled: formData.noCertificate
  }), /*#__PURE__*/_react["default"].createElement("label", null, /*#__PURE__*/_react["default"].createElement("input", {
    type: "checkbox",
    name: "noCertificate",
    checked: formData.noCertificate || '',
    onChange: handleChange
  }), "Brak \u015Bwiadcze\u0144?")), /*#__PURE__*/_react["default"].createElement("h2", null, "Osoba udzielaj\u0105ca pe\u0142nomocnictwa - Osoba do kontaktu:"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "authorizedPerson.name"
  }, "Imi\u0119 i Nazwisko"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    id: "authorizedPerson.name",
    name: "authorizedPerson.name",
    value: ((_formData$authorizedP = formData.authorizedPerson) === null || _formData$authorizedP === void 0 ? void 0 : _formData$authorizedP.name) || '',
    onChange: handleChange,
    placeholder: "Imi\u0119 i Nazwisko"
  }), /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "authorizedPerson.pesel"
  }, "PESEL"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    id: "authorizedPerson.pesel",
    name: "authorizedPerson.pesel",
    value: ((_formData$authorizedP2 = formData.authorizedPerson) === null || _formData$authorizedP2 === void 0 ? void 0 : _formData$authorizedP2.pesel) || '',
    onChange: handleChange,
    placeholder: "PESEL"
  }), /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "authorizedPerson.idNumber"
  }, "Numer dowodu"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    id: "authorizedPerson.idNumber",
    name: "authorizedPerson.idNumber",
    value: ((_formData$authorizedP3 = formData.authorizedPerson) === null || _formData$authorizedP3 === void 0 ? void 0 : _formData$authorizedP3.idNumber) || '',
    onChange: handleChange,
    placeholder: "Numer dowodu"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group form-group-down"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Kto sporz\u0105dza akt zgonu?"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "radio-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "radio-label ".concat(formData.who === 'family' ? 'selected' : '')
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "radio",
    name: "who",
    value: "family",
    checked: formData.who === 'family',
    onChange: handleChange
  }), "Rodzina", formData.who === 'family' && /*#__PURE__*/_react["default"].createElement("span", {
    className: "checkmark"
  }, "\u2714")), /*#__PURE__*/_react["default"].createElement("label", {
    className: "radio-label ".concat(formData.who === 'Funeral' ? 'selected' : '')
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "radio",
    name: "who",
    value: "funeral",
    checked: formData.who === 'Funeral',
    onChange: handleChange
  }), "Dom pogrzebowy", formData.who === 'funeral' && /*#__PURE__*/_react["default"].createElement("span", {
    className: "checkmark"
  }, "\u2714")))), errors.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
    className: "error-container",
    ref: errorContainerRef
  }, errors.map(function (error, index) {
    return /*#__PURE__*/_react["default"].createElement("p", {
      key: index,
      className: "error-message"
    }, error);
  })), /*#__PURE__*/_react["default"].createElement("button", {
    type: "submit",
    className: "submit-button"
  }, "Zapisz i przejd\u017A do etapu pogrzebu"))), showSaveForm && /*#__PURE__*/_react["default"].createElement("div", {
    className: "modal-overlay modal-save"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "modal"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Zapisz formularz"), /*#__PURE__*/_react["default"].createElement("label", null, "Email"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "email",
    value: email,
    onChange: function onChange(e) {
      return setEmail(e.target.value);
    },
    placeholder: "E-mail"
  }), /*#__PURE__*/_react["default"].createElement("label", null, "Has\u0142o"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "password",
    value: password,
    onChange: function onChange(e) {
      return setPassword(e.target.value);
    },
    placeholder: "Has\u0142o"
  }), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleSaveCredentials
  }, "Zapisz"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: closeSaveForm
  }, "Zamknij")))));
};
var _default = exports["default"] = UnifiedForm;