"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _image = _interopRequireDefault(require("next/image"));
var _firebase = require("../../../firebase");
var _firestore = require("firebase/firestore");
var _storage = require("firebase/storage");
var _link = _interopRequireDefault(require("next/link"));
var _router = require("next/router");
var _EditServicesModal = _interopRequireDefault(require("@/components/funeral/EditServicesModal"));
var _FuneralHomeMap = _interopRequireDefault(require("../funeral/FuneralHomeMap"));
var _StarRating = _interopRequireDefault(require("@/components/search/StarRating"));
var _AuthGuard = _interopRequireDefault(require("@/components/panel/AuthGuard"));
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
var FuneralHomeDetails = function FuneralHomeDetails() {
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    funeralHomeDetails = _useState2[0],
    setFuneralHomeDetails = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    editableDetails = _useState4[0],
    setEditableDetails = _useState4[1];
  var _useState5 = (0, _react.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    selectedImage = _useState6[0],
    setSelectedImage = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isEditing = _useState8[0],
    setIsEditing = _useState8[1];
  var _useState9 = (0, _react.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    isEditingServices = _useState10[0],
    setIsEditingServices = _useState10[1];
  var router = (0, _router.useRouter)();
  (0, _react.useEffect)(function () {
    var fetchFuneralHomeDetails = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var homeId, homeDocRef, docSnap, homeData, funeralHomeName, logoPath, mainImagePath, hallImagePath, carImagePath, logoUrl, mainImageUrl, hallImageUrl, carImageUrl;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              homeId = router.query.homeId; // Pobieranie homeId z URL
              if (homeId) {
                _context.next = 4;
                break;
              }
              console.error('No homeId in the URL');
              return _context.abrupt("return");
            case 4:
              _context.prev = 4;
              homeDocRef = (0, _firestore.doc)(_firebase.db, 'domyPogrzebowe', homeId);
              _context.next = 8;
              return (0, _firestore.getDoc)(homeDocRef);
            case 8:
              docSnap = _context.sent;
              if (!docSnap.exists()) {
                _context.next = 33;
                break;
              }
              homeData = docSnap.data();
              funeralHomeName = homeData.funeralHomeName.trim();
              logoPath = "".concat(funeralHomeName, "/logo/logo.png");
              mainImagePath = "".concat(funeralHomeName, "/images/main.webp");
              hallImagePath = "".concat(funeralHomeName, "/images/hall.webp");
              carImagePath = "".concat(funeralHomeName, "/images/car.webp");
              _context.next = 18;
              return (0, _storage.getDownloadURL)((0, _storage.ref)(_firebase.storage, logoPath));
            case 18:
              logoUrl = _context.sent;
              _context.next = 21;
              return (0, _storage.getDownloadURL)((0, _storage.ref)(_firebase.storage, mainImagePath));
            case 21:
              mainImageUrl = _context.sent;
              _context.next = 24;
              return (0, _storage.getDownloadURL)((0, _storage.ref)(_firebase.storage, hallImagePath));
            case 24:
              hallImageUrl = _context.sent;
              _context.next = 27;
              return (0, _storage.getDownloadURL)((0, _storage.ref)(_firebase.storage, carImagePath));
            case 27:
              carImageUrl = _context.sent;
              setFuneralHomeDetails(_objectSpread(_objectSpread({}, homeData), {}, {
                logoUrl: logoUrl,
                images: {
                  main: mainImageUrl,
                  hall: hallImageUrl,
                  car: carImageUrl
                }
              }));
              setEditableDetails(_objectSpread(_objectSpread({}, homeData), {}, {
                logoUrl: logoUrl,
                images: {
                  main: mainImageUrl,
                  hall: hallImageUrl,
                  car: carImageUrl
                }
              }));
              setSelectedImage(mainImageUrl);
              _context.next = 34;
              break;
            case 33:
              console.error('No such document!');
            case 34:
              _context.next = 39;
              break;
            case 36:
              _context.prev = 36;
              _context.t0 = _context["catch"](4);
              console.error('Error fetching Funeral home details:', _context.t0);
            case 39:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[4, 36]]);
      }));
      return function fetchFuneralHomeDetails() {
        return _ref.apply(this, arguments);
      };
    }();
    fetchFuneralHomeDetails();
  }, [router.query]); // Dodano `router.query` do tablicy zależności

  var handleEdit = function handleEdit() {
    setIsEditing(true);
  };
  var handleCancel = function handleCancel() {
    setIsEditing(false);
    setEditableDetails(funeralHomeDetails);
  };
  var handleSave = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var homeId, homeDocRef;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            homeId = router.query.homeId; // Pobieranie homeId z URL
            if (homeId) {
              _context2.next = 5;
              break;
            }
            router.push('/login');
            return _context2.abrupt("return");
          case 5:
            homeDocRef = (0, _firestore.doc)(_firebase.db, 'domyPogrzebowe', homeId);
            _context2.next = 8;
            return (0, _firestore.updateDoc)(homeDocRef, editableDetails);
          case 8:
            setFuneralHomeDetails(editableDetails);
            setIsEditing(false);
            _context2.next = 15;
            break;
          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            console.error('Error updating Funeral home details:', _context2.t0);
          case 15:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 12]]);
    }));
    return function handleSave() {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleChange = function handleChange(field, value) {
    setEditableDetails(_objectSpread(_objectSpread({}, editableDetails), {}, _defineProperty({}, field, value)));
  };
  var handleAddOpeningHour = function handleAddOpeningHour() {
    var newOpeningHours = [].concat(_toConsumableArray(editableDetails.openingHours), [{
      dayFrom: 'Poniedziałek',
      dayTo: 'Poniedziałek',
      from: '08:00',
      to: '16:00'
    }]);
    handleChange('openingHours', newOpeningHours);
  };
  var handleRemoveOpeningHour = function handleRemoveOpeningHour(index) {
    var newOpeningHours = editableDetails.openingHours.filter(function (_, i) {
      return i !== index;
    });
    handleChange('openingHours', newOpeningHours);
  };
  var handleSaveServices = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(updatedServices) {
      var homeId, homeDocRef;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            homeId = router.query.homeId; // Pobieranie homeId z URL
            if (homeId) {
              _context3.next = 5;
              break;
            }
            router.push('/login');
            return _context3.abrupt("return");
          case 5:
            homeDocRef = (0, _firestore.doc)(_firebase.db, 'domyPogrzebowe', homeId);
            _context3.next = 8;
            return (0, _firestore.updateDoc)(homeDocRef, {
              services: updatedServices
            });
          case 8:
            setEditableDetails(_objectSpread(_objectSpread({}, editableDetails), {}, {
              services: updatedServices
            }));
            setIsEditingServices(false);
            _context3.next = 15;
            break;
          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](0);
            console.error('Error updating services:', _context3.t0);
          case 15:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 12]]);
    }));
    return function handleSaveServices(_x) {
      return _ref3.apply(this, arguments);
    };
  }();
  if (!funeralHomeDetails) {
    return /*#__PURE__*/_react["default"].createElement("div", null, "Loading...");
  }
  var handleImageSelection = function handleImageSelection(imageUrl) {
    setSelectedImage(imageUrl);
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "funeral-home-details"
  }, /*#__PURE__*/_react["default"].createElement(_link["default"], {
    className: "back-link back-button",
    href: "/admin/funerals"
  }, "Wr\xF3\u0107 do dom\xF3w pogrzebowych"), /*#__PURE__*/_react["default"].createElement("h1", null, "Szczeg\xF3\u0142y domu pogrzebowego"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "home-details"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "home-details-name home-details-name-panel"
  }, funeralHomeDetails.logoUrl && /*#__PURE__*/_react["default"].createElement(_image["default"], {
    src: funeralHomeDetails.logoUrl,
    alt: "".concat(funeralHomeDetails.name, " logo"),
    width: 50,
    height: 50,
    sizes: "(max-width: 768px) 50px, (max-width: 1200px) 50px, 50px"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "home-details-name-title"
  }, /*#__PURE__*/_react["default"].createElement("h3", null, funeralHomeDetails.funeralHomeName), /*#__PURE__*/_react["default"].createElement(_StarRating["default"], {
    rating: funeralHomeDetails.rating
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "home-details-contact"
  }, /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Adres:")), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", null, "Miasto:"), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    value: editableDetails.city,
    onChange: function onChange(e) {
      return handleChange('city', e.target.value);
    }
  }) : /*#__PURE__*/_react["default"].createElement("span", null, funeralHomeDetails.city)), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", null, "Ulica:"), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    value: editableDetails.street,
    onChange: function onChange(e) {
      return handleChange('street', e.target.value);
    }
  }) : /*#__PURE__*/_react["default"].createElement("span", null, funeralHomeDetails.street)), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", null, "Kod pocztowy:"), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    value: editableDetails.postalCode,
    onChange: function onChange(e) {
      return handleChange('postalCode', e.target.value);
    }
  }) : /*#__PURE__*/_react["default"].createElement("span", null, funeralHomeDetails.postalCode)), /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Godziny otwarcia:")), isEditing ? editableDetails.openingHours && editableDetails.openingHours.length > 0 ? editableDetails.openingHours.map(function (hour, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index
    }, /*#__PURE__*/_react["default"].createElement("select", {
      value: hour.dayFrom,
      onChange: function onChange(e) {
        var newOpeningHours = _toConsumableArray(editableDetails.openingHours);
        newOpeningHours[index].dayFrom = e.target.value;
        handleChange('openingHours', newOpeningHours);
      }
    }, /*#__PURE__*/_react["default"].createElement("option", {
      value: "Poniedzia\u0142ek"
    }, "Poniedzia\u0142ek"), /*#__PURE__*/_react["default"].createElement("option", {
      value: "Wtorek"
    }, "Wtorek"), /*#__PURE__*/_react["default"].createElement("option", {
      value: "\u015Aroda"
    }, "\u015Aroda"), /*#__PURE__*/_react["default"].createElement("option", {
      value: "Czwartek"
    }, "Czwartek"), /*#__PURE__*/_react["default"].createElement("option", {
      value: "Pi\u0105tek"
    }, "Pi\u0105tek"), /*#__PURE__*/_react["default"].createElement("option", {
      value: "Sobota"
    }, "Sobota"), /*#__PURE__*/_react["default"].createElement("option", {
      value: "Niedziela"
    }, "Niedziela")), /*#__PURE__*/_react["default"].createElement("select", {
      value: hour.dayTo,
      onChange: function onChange(e) {
        var newOpeningHours = _toConsumableArray(editableDetails.openingHours);
        newOpeningHours[index].dayTo = e.target.value;
        handleChange('openingHours', newOpeningHours);
      }
    }, /*#__PURE__*/_react["default"].createElement("option", {
      value: "Poniedzia\u0142ek"
    }, "Poniedzia\u0142ek"), /*#__PURE__*/_react["default"].createElement("option", {
      value: "Wtorek"
    }, "Wtorek"), /*#__PURE__*/_react["default"].createElement("option", {
      value: "\u015Aroda"
    }, "\u015Aroda"), /*#__PURE__*/_react["default"].createElement("option", {
      value: "Czwartek"
    }, "Czwartek"), /*#__PURE__*/_react["default"].createElement("option", {
      value: "Pi\u0105tek"
    }, "Pi\u0105tek"), /*#__PURE__*/_react["default"].createElement("option", {
      value: "Sobota"
    }, "Sobota"), /*#__PURE__*/_react["default"].createElement("option", {
      value: "Niedziela"
    }, "Niedziela")), /*#__PURE__*/_react["default"].createElement("input", {
      type: "time",
      value: hour.from,
      onChange: function onChange(e) {
        var newOpeningHours = _toConsumableArray(editableDetails.openingHours);
        newOpeningHours[index].from = e.target.value;
        handleChange('openingHours', newOpeningHours);
      }
    }), /*#__PURE__*/_react["default"].createElement("input", {
      type: "time",
      value: hour.to,
      onChange: function onChange(e) {
        var newOpeningHours = _toConsumableArray(editableDetails.openingHours);
        newOpeningHours[index].to = e.target.value;
        handleChange('openingHours', newOpeningHours);
      }
    }), /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        return handleRemoveOpeningHour(index);
      }
    }, "Usu\u0144"));
  }) : /*#__PURE__*/_react["default"].createElement("p", null, "Brak dost\u0119pnych godzin otwarcia") : funeralHomeDetails.openingHours && funeralHomeDetails.openingHours.length > 0 ? funeralHomeDetails.openingHours.map(function (hour, index) {
    return /*#__PURE__*/_react["default"].createElement("span", {
      key: index
    }, "".concat(hour.dayFrom, " - ").concat(hour.dayTo, " od ").concat(hour.from, " do ").concat(hour.to));
  }) : /*#__PURE__*/_react["default"].createElement("p", null, "Brak dost\u0119pnych godzin otwarcia"), isEditing && /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleAddOpeningHour
  }, "Dodaj kolejne godzinny otwarcia"), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Email:"), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "email",
    value: editableDetails.email,
    onChange: function onChange(e) {
      return handleChange('email', e.target.value);
    }
  }) : funeralHomeDetails.email), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Telefon:"), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
    type: "tel",
    value: editableDetails.phone,
    onChange: function onChange(e) {
      return handleChange('phone', e.target.value);
    }
  }) : funeralHomeDetails.phone), isEditing ? /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleSave
  }, "Zapisz"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleCancel
  }, "Anuluj")) : /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleEdit
  }, "Edytuj")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "services services-details"
  }, /*#__PURE__*/_react["default"].createElement("h4", null, "Us\u0142ugi:"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "home-details-item"
  }, funeralHomeDetails.services.map(function (service, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      className: "service-item"
    }, /*#__PURE__*/_react["default"].createElement("p", null, service));
  })), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setIsEditingServices(true);
    }
  }, "Edytuj us\u0142ugi")), isEditingServices && /*#__PURE__*/_react["default"].createElement(_EditServicesModal["default"], {
    services: funeralHomeDetails.services,
    onSave: handleSaveServices,
    onCancel: function onCancel() {
      return setIsEditingServices(false);
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "funeral-home-text services-details"
  }, /*#__PURE__*/_react["default"].createElement("h4", null, "Opis:"), /*#__PURE__*/_react["default"].createElement("div", null, isEditing ? /*#__PURE__*/_react["default"].createElement("textarea", {
    value: editableDetails.description,
    onChange: function onChange(e) {
      return handleChange('description', e.target.value);
    }
  }) : /*#__PURE__*/_react["default"].createElement("p", {
    className: "description"
  }, funeralHomeDetails.description))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "reviews services-details"
  }, /*#__PURE__*/_react["default"].createElement("h4", null, "Opinie:"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "reviews-main"
  }, funeralHomeDetails.reviews && funeralHomeDetails.reviews.length > 0 ? funeralHomeDetails.reviews.map(function (review, i) {
    return /*#__PURE__*/_react["default"].createElement("blockquote", {
      key: i,
      className: "funeral-home-text reviews-main-text"
    }, /*#__PURE__*/_react["default"].createElement("p", null, review.date), " \"", review.text, "\" - ", /*#__PURE__*/_react["default"].createElement("cite", null, review.author));
  }) : /*#__PURE__*/_react["default"].createElement("p", null, "Brak opinii.")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "home-images home-images-client"
  }, /*#__PURE__*/_react["default"].createElement("h2", {
    className: "home-img-title"
  }, "Galeria"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "selected-image selected-image-client"
  }, /*#__PURE__*/_react["default"].createElement(_image["default"], {
    src: selectedImage,
    alt: "Selected",
    fill: true,
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    style: {
      objectFit: 'contain'
    }
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "image-selector image-selector-client"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleImageSelection(funeralHomeDetails.images.main);
    }
  }, "Zdj\u0119cie zak\u0142adu"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleImageSelection(funeralHomeDetails.images.hall);
    }
  }, "Zdj\u0119cie sali po\u017Cegna\u0144"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleImageSelection(funeralHomeDetails.images.car);
    }
  }, "Zdj\u0119cie karawanu")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "map map-client"
  }, /*#__PURE__*/_react["default"].createElement(_FuneralHomeMap["default"], {
    latitude: funeralHomeDetails.latitude,
    longitude: funeralHomeDetails.longitude,
    name: funeralHomeDetails.funeralHomeName
  }))));
};
var FuneralHomeDetailsWithAuth = function FuneralHomeDetailsWithAuth() {
  return /*#__PURE__*/_react["default"].createElement(_AuthGuard["default"], null, /*#__PURE__*/_react["default"].createElement(FuneralHomeDetails, null));
};
var _default = exports["default"] = FuneralHomeDetailsWithAuth;