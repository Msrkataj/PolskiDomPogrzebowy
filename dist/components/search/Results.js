"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _image = _interopRequireDefault(require("next/image"));
var _script = _interopRequireDefault(require("next/script"));
var _StarRating = _interopRequireDefault(require("./StarRating"));
var _firebase = require("../../../firebase");
var _firestore = require("firebase/firestore");
var _storage = require("firebase/storage");
var _api = require("@react-google-maps/api");
var _TransportModal = _interopRequireDefault(require("@/components/TransportModal"));
var _dynamic = _interopRequireDefault(require("next/dynamic"));
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
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } // Import Script component from Next.js
var mapContainerStyle = {
  height: "400px",
  width: "100%"
};
var options = {
  disableDefaultUI: true,
  zoomControl: true
};
var FuneralHomeResults = function FuneralHomeResults() {
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    funeralHomes = _useState2[0],
    setFuneralHomes = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedImage = _useState4[0],
    setSelectedImage = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    selectedCoordinates = _useState6[0],
    setSelectedCoordinates = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    selectedFuneralHome = _useState8[0],
    setSelectedFuneralHome = _useState8[1];
  var _useState9 = (0, _react.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    isModalOpen = _useState10[0],
    setIsModalOpen = _useState10[1];
  var _useState11 = (0, _react.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    isEditing = _useState12[0],
    setIsEditing = _useState12[1];
  var _useState13 = (0, _react.useState)(false),
    _useState14 = _slicedToArray(_useState13, 2),
    isEditingServices = _useState14[0],
    setIsEditingServices = _useState14[1];
  var mapRef = (0, _react.useRef)();
  var handleSelectFuneralHome = function handleSelectFuneralHome(home) {
    setSelectedFuneralHome(home);
    setIsModalOpen(true);
  };
  var fetchCoordinates = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(location) {
      var response, data;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch("https://nominatim.openstreetmap.org/search?format=json&q=".concat(location));
          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.json();
          case 5:
            data = _context.sent;
            if (!(data.length > 0)) {
              _context.next = 8;
              break;
            }
            return _context.abrupt("return", {
              lat: parseFloat(data[0].lat),
              lng: parseFloat(data[0].lon)
            });
          case 8:
            return _context.abrupt("return", {
              lat: 0,
              lng: 0
            });
          case 9:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function fetchCoordinates(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var calculateDistance = function calculateDistance(coord1, coord2) {
    var R = 6371; // Promień Ziemi w kilometrach
    var dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
    var dLng = (coord2.lng - coord1.lng) * Math.PI / 180;
    var a = 0.5 - Math.cos(dLat) / 2 + Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) * (1 - Math.cos(dLng)) / 2;
    return R * 2 * Math.asin(Math.sqrt(a));
  };
  (0, _react.useEffect)(function () {
    var getFileUrl = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(basePath, fileName, extensions) {
        var _iterator, _step, ext, filePath, fileUrl;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _iterator = _createForOfIteratorHelper(extensions);
              _context2.prev = 1;
              _iterator.s();
            case 3:
              if ((_step = _iterator.n()).done) {
                _context2.next = 18;
                break;
              }
              ext = _step.value;
              _context2.prev = 5;
              filePath = "".concat(basePath, "/").concat(fileName, ".").concat(ext);
              _context2.next = 9;
              return (0, _storage.getDownloadURL)((0, _storage.ref)(_firebase.storage, filePath));
            case 9:
              fileUrl = _context2.sent;
              return _context2.abrupt("return", fileUrl);
            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](5);
              if (_context2.t0.code !== 'storage/object-not-found') {
                console.error("Error fetching file with extension .".concat(ext, ":"), _context2.t0);
              }
            case 16:
              _context2.next = 3;
              break;
            case 18:
              _context2.next = 23;
              break;
            case 20:
              _context2.prev = 20;
              _context2.t1 = _context2["catch"](1);
              _iterator.e(_context2.t1);
            case 23:
              _context2.prev = 23;
              _iterator.f();
              return _context2.finish(23);
            case 26:
              return _context2.abrupt("return", null);
            case 27:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[1, 20, 23, 26], [5, 13]]);
      }));
      return function getFileUrl(_x2, _x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }();
    var fetchData = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var querySnapshot, homesData, validHomesData, dataWithUrls, userLocation, userCoordinates, sortedHomes, closestHomes, minDistance, i, distance;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return (0, _firestore.getDocs)((0, _firestore.collection)(_firebase.db, 'domyPogrzebowe'));
            case 3:
              querySnapshot = _context4.sent;
              homesData = querySnapshot.docs.map(function (doc) {
                return doc.data();
              }); // Filtracja domów pogrzebowych, które mają zarówno funeralHomeName, jak i city
              validHomesData = homesData.filter(function (home) {
                return home.funeralHomeName && home.city;
              });
              _context4.next = 8;
              return Promise.all(validHomesData.map(/*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(home) {
                  var logoUrl, mainImageUrl, hallImageUrl, carImageUrl;
                  return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                    while (1) switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return (0, _storage.getDownloadURL)((0, _storage.ref)(_firebase.storage, "".concat(home.funeralHomeName, "/logo/logo.png")));
                      case 3:
                        logoUrl = _context3.sent;
                        _context3.next = 6;
                        return (0, _storage.getDownloadURL)((0, _storage.ref)(_firebase.storage, "".concat(home.funeralHomeName, "/images/main.webp")));
                      case 6:
                        mainImageUrl = _context3.sent;
                        _context3.next = 9;
                        return (0, _storage.getDownloadURL)((0, _storage.ref)(_firebase.storage, "".concat(home.funeralHomeName, "/images/hall.webp")));
                      case 9:
                        hallImageUrl = _context3.sent;
                        _context3.next = 12;
                        return (0, _storage.getDownloadURL)((0, _storage.ref)(_firebase.storage, "".concat(home.funeralHomeName, "/images/car.webp")));
                      case 12:
                        carImageUrl = _context3.sent;
                        return _context3.abrupt("return", _objectSpread(_objectSpread({}, home), {}, {
                          logoUrl: logoUrl,
                          images: {
                            main: mainImageUrl,
                            hall: hallImageUrl,
                            car: carImageUrl
                          },
                          reviews: home.reviews || []
                        }));
                      case 16:
                        _context3.prev = 16;
                        _context3.t0 = _context3["catch"](0);
                        console.error("Error fetching images for ".concat(home.funeralHomeName, ": "), _context3.t0);
                        return _context3.abrupt("return", _objectSpread(_objectSpread({}, home), {}, {
                          reviews: home.reviews || []
                        }));
                      case 20:
                      case "end":
                        return _context3.stop();
                    }
                  }, _callee3, null, [[0, 16]]);
                }));
                return function (_x5) {
                  return _ref4.apply(this, arguments);
                };
              }()));
            case 8:
              dataWithUrls = _context4.sent;
              userLocation = localStorage.getItem('location') || 'Warszawa';
              _context4.next = 12;
              return fetchCoordinates(userLocation);
            case 12:
              userCoordinates = _context4.sent;
              sortedHomes = dataWithUrls.sort(function (a, b) {
                var distanceA = calculateDistance(userCoordinates, {
                  lat: a.latitude,
                  lng: a.longitude
                });
                var distanceB = calculateDistance(userCoordinates, {
                  lat: b.latitude,
                  lng: b.longitude
                });
                return distanceA - distanceB;
              });
              closestHomes = sortedHomes.slice(0, 3);
              minDistance = calculateDistance(userCoordinates, {
                lat: sortedHomes[0].latitude,
                lng: sortedHomes[0].longitude
              });
              if (!(minDistance < 30 && sortedHomes.length > 3)) {
                _context4.next = 28;
                break;
              }
              i = 3;
            case 18:
              if (!(i < sortedHomes.length)) {
                _context4.next = 28;
                break;
              }
              distance = calculateDistance(userCoordinates, {
                lat: sortedHomes[i].latitude,
                lng: sortedHomes[i].longitude
              });
              if (!(distance < 30)) {
                _context4.next = 24;
                break;
              }
              closestHomes.push(sortedHomes[i]);
              _context4.next = 25;
              break;
            case 24:
              return _context4.abrupt("break", 28);
            case 25:
              i++;
              _context4.next = 18;
              break;
            case 28:
              setFuneralHomes(closestHomes);
              if (closestHomes.length > 0) {
                setSelectedCoordinates({
                  lat: closestHomes[0].latitude,
                  lng: closestHomes[0].longitude
                });
              }
              _context4.next = 35;
              break;
            case 32:
              _context4.prev = 32;
              _context4.t0 = _context4["catch"](0);
              console.error("Error fetching data: ", _context4.t0);
            case 35:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 32]]);
      }));
      return function fetchData() {
        return _ref3.apply(this, arguments);
      };
    }();
    fetchData();
  }, []);
  var handleImageSelection = function handleImageSelection(image) {
    var imageUrl = image.startsWith('http') ? image : "https://".concat(image);
    setSelectedImage(imageUrl);
  };
  var renderServices = function renderServices() {
    var services = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return services.map(function (service, index) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: index,
        className: "service-item"
      }, /*#__PURE__*/_react["default"].createElement("span", null, service));
    });
  };
  var onLoad = function onLoad(map) {
    mapRef.current = map;
  };
  var markerPosition = function markerPosition(latitude, longitude) {
    return {
      lat: parseFloat(latitude),
      lng: parseFloat(longitude)
    };
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_script["default"], {
    async: true,
    src: "https://maps.googleapis.com/maps/api/js?key=".concat(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, "&loading=async&libraries=places&callback=initMap"),
    strategy: "afterInteractive" // Zmień strategię na "afterInteractive" lub "lazyOnload"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "funeral-home-results"
  }, funeralHomes.map(function (home, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      className: "funeral-home ".concat(index % 2 === 0 ? 'funeral-home-reverse' : '')
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "home-details"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "home-details-name"
    }, /*#__PURE__*/_react["default"].createElement(_image["default"], {
      src: home.logoUrl,
      alt: "".concat(home.funeralHomeName, " logo"),
      width: 50,
      height: 50,
      style: {
        objectFit: 'contain'
      },
      sizes: "200px",
      loading: "lazy"
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "home-details-name-title"
    }, /*#__PURE__*/_react["default"].createElement("h3", null, home.funeralHomeName), /*#__PURE__*/_react["default"].createElement(_StarRating["default"], {
      rating: home.rating
    }))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "home-details-contact"
    }, /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Adres:")), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", null, "Miasto:"), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
      type: "text",
      value: editableDetails.city,
      onChange: function onChange(e) {
        return handleChange('city', e.target.value);
      }
    }) : /*#__PURE__*/_react["default"].createElement("span", null, home.city)), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", null, "Ulica:"), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
      type: "text",
      value: editableDetails.street,
      onChange: function onChange(e) {
        return handleChange('street', e.target.value);
      }
    }) : /*#__PURE__*/_react["default"].createElement("span", null, home.street)), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", null, "Kod pocztowy:"), isEditing ? /*#__PURE__*/_react["default"].createElement("input", {
      type: "text",
      value: editableDetails.postalCode,
      onChange: function onChange(e) {
        return handleChange('postalCode', e.target.value);
      }
    }) : /*#__PURE__*/_react["default"].createElement("span", null, home.postalCode)), /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Godziny otwarcia:")), isEditing ? editableDetails.openingHours && editableDetails.openingHours.length > 0 ? editableDetails.openingHours.map(function (hour, index) {
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
    }) : /*#__PURE__*/_react["default"].createElement("p", null, "Brak dost\u0119pnych godzin otwarcia") : home.openingHours && home.openingHours.length > 0 ? home.openingHours.map(function (hour, index) {
      return /*#__PURE__*/_react["default"].createElement("span", {
        key: index
      }, "".concat(hour.dayFrom, " - ").concat(hour.dayTo, " od ").concat(hour.from, " do ").concat(hour.to));
    }) : /*#__PURE__*/_react["default"].createElement("p", null, "Brak dost\u0119pnych godzin otwarcia"), isEditing && /*#__PURE__*/_react["default"].createElement("button", {
      onClick: handleAddOpeningHour
    }, "Dodaj kolejne godzinny otwarcia"), /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Email:"), " ", home.email), /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Telefon:"), " ", home.phone)), /*#__PURE__*/_react["default"].createElement("div", {
      className: "services"
    }, /*#__PURE__*/_react["default"].createElement("h4", null, "Us\u0142ugi:"), /*#__PURE__*/_react["default"].createElement("div", {
      className: "home-details-item"
    }, renderServices(home.services))), /*#__PURE__*/_react["default"].createElement("h4", null, "Opis:"), /*#__PURE__*/_react["default"].createElement("div", {
      className: "funeral-home-text"
    }, /*#__PURE__*/_react["default"].createElement("p", {
      className: "description"
    }, home.description)), /*#__PURE__*/_react["default"].createElement("div", {
      className: "reviews"
    }, /*#__PURE__*/_react["default"].createElement("h4", null, "Opinie:"), /*#__PURE__*/_react["default"].createElement("div", {
      className: "reviews-main"
    }, home.reviews && home.reviews.length > 0 ? home.reviews.map(function (review, i) {
      return /*#__PURE__*/_react["default"].createElement("blockquote", {
        key: i,
        className: "funeral-home-text reviews-main-text"
      }, /*#__PURE__*/_react["default"].createElement("p", null, review.date), "\"", review.text, "\" - ", /*#__PURE__*/_react["default"].createElement("cite", null, review.author));
    }) : /*#__PURE__*/_react["default"].createElement("p", null, "Brak opinii."))), selectedFuneralHome && /*#__PURE__*/_react["default"].createElement(_TransportModal["default"], {
      isOpen: isModalOpen,
      onClose: function onClose() {
        return setIsModalOpen(false);
      },
      funeralHome: selectedFuneralHome
    }), /*#__PURE__*/_react["default"].createElement("button", {
      className: "select-button",
      onClick: function onClick() {
        return handleSelectFuneralHome(home);
      }
    }, "Wybierz ten zak\u0142ad")), /*#__PURE__*/_react["default"].createElement("div", {
      className: "home-images"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "selected-image"
    }, /*#__PURE__*/_react["default"].createElement(_image["default"], {
      src: selectedImage || (home.images && home.images.main ? home.images.main : '/default-image.webp'),
      alt: "Selected",
      fill: true,
      style: {
        objectFit: 'cover'
      },
      sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
      loading: "lazy"
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: "image-selector"
    }, /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        var _home$images;
        return handleImageSelection(((_home$images = home.images) === null || _home$images === void 0 ? void 0 : _home$images.main) || '/default-image.webp');
      }
    }, "Zdj\u0119cie zak\u0142adu"), /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        var _home$images2;
        return handleImageSelection(((_home$images2 = home.images) === null || _home$images2 === void 0 ? void 0 : _home$images2.hall) || '/default-image.webp');
      }
    }, "Zdj\u0119cie sali po\u017Cegna\u0144"), /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        var _home$images3;
        return handleImageSelection(((_home$images3 = home.images) === null || _home$images3 === void 0 ? void 0 : _home$images3.car) || '/default-image.webp');
      }
    }, "Zdj\u0119cie karawanu")), /*#__PURE__*/_react["default"].createElement("div", {
      className: "map"
    }, selectedCoordinates && /*#__PURE__*/_react["default"].createElement(_api.GoogleMap, {
      mapContainerStyle: mapContainerStyle,
      center: markerPosition(home.latitude, home.longitude),
      zoom: 15,
      onLoad: onLoad,
      options: options
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "map-marker"
    }, /*#__PURE__*/_react["default"].createElement("p", {
      className: "marker-label"
    }, home.funeralHomeName), /*#__PURE__*/_react["default"].createElement(_api.Marker, {
      position: markerPosition(home.latitude, home.longitude),
      icon: {
        url: "/assets/icons/marker.png",
        scaledSize: new window.google.maps.Size(30, 40)
      }
    }))))));
  })));
};
var _default = exports["default"] = (0, _dynamic["default"])(function () {
  return Promise.resolve(FuneralHomeResults);
}, {
  ssr: false
});