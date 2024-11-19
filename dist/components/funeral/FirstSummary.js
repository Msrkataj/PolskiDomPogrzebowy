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
var _middleware = _interopRequireDefault(require("../../../middleware"));
var _router = require("next/router");
var _uuid = require("uuid");
var _compressorjs = _interopRequireDefault(require("compressorjs"));
var _browserImageCompression = _interopRequireDefault(require("browser-image-compression"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
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
var FuneralHomeImages = function FuneralHomeImages() {
  var _useState = (0, _react.useState)({
      main: null,
      hall: null,
      car: null
    }),
    _useState2 = _slicedToArray(_useState, 2),
    images = _useState2[0],
    setImages = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    customImages = _useState4[0],
    setCustomImages = _useState4[1];
  var roleChecked = (0, _middleware["default"])('funeralHome');
  var router = (0, _router.useRouter)();
  var handleImageChange = function handleImageChange(key, file) {
    setImages(_objectSpread(_objectSpread({}, images), {}, _defineProperty({}, key, file)));
  };
  var handleCustomImageChange = function handleCustomImageChange(id, field, value) {
    setCustomImages(customImages.map(function (image) {
      return image.id === id ? _objectSpread(_objectSpread({}, image), {}, _defineProperty({}, field, value)) : image;
    }));
  };
  var addCustomImage = function addCustomImage() {
    setCustomImages([].concat(_toConsumableArray(customImages), [{
      id: (0, _uuid.v4)(),
      title: '',
      file: null
    }]));
  };
  var removeCustomImage = function removeCustomImage(id) {
    setCustomImages(customImages.filter(function (image) {
      return image.id !== id;
    }));
  };
  var handleFileChange = function handleFileChange(id, file) {
    setCustomImages(customImages.map(function (image) {
      return image.id === id ? _objectSpread(_objectSpread({}, image), {}, {
        file: file
      }) : image;
    }));
  };
  var compressAndConvertToWebP = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(file) {
      var options, compressedFile;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            options = {
              maxSizeMB: 1,
              maxWidthOrHeight: 800,
              useWebWorker: true,
              fileType: 'image/webp'
            };
            _context.prev = 1;
            _context.next = 4;
            return (0, _browserImageCompression["default"])(file, options);
          case 4:
            compressedFile = _context.sent;
            return _context.abrupt("return", compressedFile);
          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            console.error('Error during image compression:', _context.t0);
            throw _context.t0;
          case 12:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[1, 8]]);
    }));
    return function compressAndConvertToWebP(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var handleSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(e) {
      var userId, userDocRef, userDocSnap, userData, funeralHomeName, imagePaths, uploadAndCompressImage, _i, _Object$entries, _Object$entries$_i, key, file, fileName, path, _iterator, _step, customImage, _fileName, _path, rating, reviews;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            e.preventDefault();
            userId = localStorage.getItem('userId');
            if (userId) {
              _context3.next = 5;
              break;
            }
            alert('User not logged in');
            return _context3.abrupt("return");
          case 5:
            _context3.prev = 5;
            // Pobierz dokument użytkownika
            userDocRef = (0, _firestore.doc)(_firebase.db, 'domyPogrzebowe', userId);
            _context3.next = 9;
            return (0, _firestore.getDoc)(userDocRef);
          case 9:
            userDocSnap = _context3.sent;
            if (userDocSnap.exists()) {
              _context3.next = 13;
              break;
            }
            alert('User document not found');
            return _context3.abrupt("return");
          case 13:
            userData = userDocSnap.data();
            funeralHomeName = userData.funeralHomeName;
            if (funeralHomeName) {
              _context3.next = 18;
              break;
            }
            alert('Funeral home name not found');
            return _context3.abrupt("return");
          case 18:
            imagePaths = {};
            uploadAndCompressImage = /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(file, path) {
                var compressedFile, storageRef;
                return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                  while (1) switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return compressAndConvertToWebP(file);
                    case 2:
                      compressedFile = _context2.sent;
                      storageRef = (0, _storage.ref)(_firebase.storage, path);
                      _context2.next = 6;
                      return (0, _storage.uploadBytes)(storageRef, compressedFile);
                    case 6:
                      return _context2.abrupt("return", path);
                    case 7:
                    case "end":
                      return _context2.stop();
                  }
                }, _callee2);
              }));
              return function uploadAndCompressImage(_x3, _x4) {
                return _ref3.apply(this, arguments);
              };
            }();
            _i = 0, _Object$entries = Object.entries(images);
          case 21:
            if (!(_i < _Object$entries.length)) {
              _context3.next = 32;
              break;
            }
            _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], file = _Object$entries$_i[1];
            if (!file) {
              _context3.next = 29;
              break;
            }
            fileName = "".concat(key, ".webp"); // Użyj nazwy klucza jako nazwy pliku
            path = "".concat(funeralHomeName, "/images/").concat(key, ".webp");
            _context3.next = 28;
            return uploadAndCompressImage(file, path);
          case 28:
            imagePaths[key] = _context3.sent;
          case 29:
            _i++;
            _context3.next = 21;
            break;
          case 32:
            _iterator = _createForOfIteratorHelper(customImages);
            _context3.prev = 33;
            _iterator.s();
          case 35:
            if ((_step = _iterator.n()).done) {
              _context3.next = 45;
              break;
            }
            customImage = _step.value;
            if (!customImage.file) {
              _context3.next = 43;
              break;
            }
            _fileName = "".concat(customImage.title, ".webp"); // Użyj tytułu jako nazwy pliku
            _path = "".concat(funeralHomeName, "/images/custom/").concat(_fileName);
            _context3.next = 42;
            return uploadAndCompressImage(customImage.file, _path);
          case 42:
            imagePaths[customImage.title] = _context3.sent;
          case 43:
            _context3.next = 35;
            break;
          case 45:
            _context3.next = 50;
            break;
          case 47:
            _context3.prev = 47;
            _context3.t0 = _context3["catch"](33);
            _iterator.e(_context3.t0);
          case 50:
            _context3.prev = 50;
            _iterator.f();
            return _context3.finish(50);
          case 53:
            // Dodanie ratingu i reviews do danych, jeśli nie istnieją
            rating = userData.rating || 0;
            reviews = userData.reviews || [{
              message: "Example review",
              date: new Date().toISOString().split('T')[0]
            }];
            _context3.next = 57;
            return (0, _firestore.updateDoc)(userDocRef, {
              images: imagePaths
            });
          case 57:
            alert('Zdjęcia zostały zapisane.');
            router.push('/funeral/panel');
            _context3.next = 65;
            break;
          case 61:
            _context3.prev = 61;
            _context3.t1 = _context3["catch"](5);
            console.error('Error uploading images: ', _context3.t1);
            alert('Error uploading images. Please try again.');
          case 65:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[5, 61], [33, 47, 50, 53]]);
    }));
    return function handleSubmit(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "login-container"
  }, /*#__PURE__*/_react["default"].createElement("h1", null, "Witamy w Twoim Panelu Domu Pogrzebowego"), /*#__PURE__*/_react["default"].createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "formSection"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Zdj\u0119cia"), /*#__PURE__*/_react["default"].createElement("label", null, "Zdj\u0119cie zak\u0142adu"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "file",
    onChange: function onChange(e) {
      return handleImageChange('main', e.target.files[0]);
    }
  }), /*#__PURE__*/_react["default"].createElement("label", null, "Zdj\u0119cie sali po\u017Cegna\u0144"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "file",
    onChange: function onChange(e) {
      return handleImageChange('hall', e.target.files[0]);
    }
  }), /*#__PURE__*/_react["default"].createElement("label", null, "Zdj\u0119cie karawanu"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "file",
    onChange: function onChange(e) {
      return handleImageChange('car', e.target.files[0]);
    }
  }), customImages.map(function (customImage, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: customImage.id,
      className: "customImageSection"
    }, /*#__PURE__*/_react["default"].createElement("label", null, "Tytu\u0142 zdj\u0119cia"), /*#__PURE__*/_react["default"].createElement("input", {
      type: "text",
      value: customImage.title,
      onChange: function onChange(e) {
        return handleCustomImageChange(customImage.id, 'title', e.target.value);
      }
    }), /*#__PURE__*/_react["default"].createElement("label", null, "Za\u0142aduj zdj\u0119cie"), /*#__PURE__*/_react["default"].createElement("input", {
      type: "file",
      onChange: function onChange(e) {
        return handleFileChange(customImage.id, e.target.files[0]);
      }
    }), /*#__PURE__*/_react["default"].createElement("button", {
      type: "button",
      onClick: function onClick() {
        return removeCustomImage(customImage.id);
      }
    }, "Usu\u0144 zdj\u0119cie"));
  }), /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: addCustomImage
  }, "Dodaj kolejne zdj\u0119cie +")), /*#__PURE__*/_react["default"].createElement("button", {
    type: "submit"
  }, "Zako\u0144cz")));
};
var _default = exports["default"] = FuneralHomeImages;