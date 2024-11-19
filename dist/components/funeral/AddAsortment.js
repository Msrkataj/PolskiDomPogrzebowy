"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _uuid = require("uuid");
var _storage = require("firebase/storage");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var Assortment = function Assortment(_ref) {
  var products = _ref.products,
    setProducts = _ref.setProducts,
    productCounter = _ref.productCounter,
    setProductCounter = _ref.setProductCounter;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    expandedProductId = _useState2[0],
    setExpandedProductId = _useState2[1];
  var addProduct = function addProduct() {
    setProducts([].concat(_toConsumableArray(products), [{
      id: (0, _uuid.v4)(),
      name: '',
      category: 'coffins',
      price: '',
      availability: 'Dostępna od ręki',
      producent: '',
      text: '',
      build: '',
      type: '',
      files: [],
      imageUrls: []
    }]));
    setProductCounter(productCounter + 1);
  };
  var removeProduct = function removeProduct(id) {
    setProducts(products.filter(function (product) {
      return product.id !== id;
    }));
    setProductCounter(productCounter - 1);
  };
  var handleProductChange = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(id, field, value) {
      var productIndex, oldProduct, updatedProduct, shouldMoveFiles, updatedProducts;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            // Znajdź produkt do aktualizacji
            productIndex = products.findIndex(function (product) {
              return product.id === id;
            });
            if (!(productIndex === -1)) {
              _context.next = 3;
              break;
            }
            return _context.abrupt("return");
          case 3:
            oldProduct = _objectSpread({}, products[productIndex]); // Utwórz zaktualizowany produkt
            updatedProduct = _objectSpread(_objectSpread({}, oldProduct), {}, _defineProperty({}, field, field === 'type' ? getEnglishType(value) : value)); // Sprawdź, czy trzeba przenieść pliki
            shouldMoveFiles = (field === 'category' || field === 'type' || field === 'name') && oldProduct.files && oldProduct.files.length > 0; // Zaktualizuj produkty w stanie aplikacji
            updatedProducts = _toConsumableArray(products);
            updatedProducts[productIndex] = updatedProduct;
            setProducts(updatedProducts);

            // Jeśli trzeba przenieść pliki, zrób to
            if (!shouldMoveFiles) {
              _context.next = 12;
              break;
            }
            _context.next = 12;
            return moveProductFiles(oldProduct, updatedProduct);
          case 12:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function handleProductChange(_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleFileChange = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(id, files) {
      var storage, uploadedFiles, product, _iterator, _step, file, fileName, storagePath, fileRef, url;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            storage = (0, _storage.getStorage)();
            uploadedFiles = [];
            product = products.find(function (product) {
              return product.id === id;
            });
            _iterator = _createForOfIteratorHelper(files);
            _context2.prev = 4;
            _iterator.s();
          case 6:
            if ((_step = _iterator.n()).done) {
              _context2.next = 19;
              break;
            }
            file = _step.value;
            fileName = (0, _uuid.v4)() + "_" + file.name; // Unikalna nazwa pliku
            storagePath = product.type ? "assortment/".concat(product.category, "/").concat(product.type, "/").concat(product.name, "/").concat(fileName) : "assortment/".concat(product.category, "/").concat(product.name, "/").concat(fileName);
            fileRef = (0, _storage.ref)(storage, storagePath); // Prześlij plik do Firebase Storage
            _context2.next = 13;
            return (0, _storage.uploadBytes)(fileRef, file);
          case 13:
            _context2.next = 15;
            return (0, _storage.getDownloadURL)(fileRef);
          case 15:
            url = _context2.sent;
            // Zapisz informacje o pliku i URL
            uploadedFiles.push({
              name: fileName,
              storagePath: storagePath,
              url: url
            });
          case 17:
            _context2.next = 6;
            break;
          case 19:
            _context2.next = 24;
            break;
          case 21:
            _context2.prev = 21;
            _context2.t0 = _context2["catch"](4);
            _iterator.e(_context2.t0);
          case 24:
            _context2.prev = 24;
            _iterator.f();
            return _context2.finish(24);
          case 27:
            // Zaktualizuj pliki produktu
            setProducts(function (prevProducts) {
              return prevProducts.map(function (prod) {
                return prod.id === id ? _objectSpread(_objectSpread({}, prod), {}, {
                  files: [].concat(_toConsumableArray(prod.files || []), uploadedFiles),
                  imageUrls: [].concat(_toConsumableArray(prod.imageUrls || []), _toConsumableArray(uploadedFiles.map(function (file) {
                    return file.url;
                  })))
                }) : prod;
              });
            });
          case 28:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[4, 21, 24, 27]]);
    }));
    return function handleFileChange(_x4, _x5) {
      return _ref3.apply(this, arguments);
    };
  }();
  var moveProductFiles = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(oldProduct, newProduct) {
      var storage, updatedFiles, updatedImageUrls, _iterator2, _step2, file, fileName, oldStoragePath, newStoragePath, oldRef, newRef, url, response, blob, newUrl;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            storage = (0, _storage.getStorage)();
            updatedFiles = [];
            updatedImageUrls = [];
            _iterator2 = _createForOfIteratorHelper(oldProduct.files);
            _context3.prev = 4;
            _iterator2.s();
          case 6:
            if ((_step2 = _iterator2.n()).done) {
              _context3.next = 39;
              break;
            }
            file = _step2.value;
            fileName = file.name;
            oldStoragePath = file.storagePath;
            newStoragePath = newProduct.type ? "assortment/".concat(newProduct.category, "/").concat(newProduct.type, "/").concat(newProduct.name, "/").concat(fileName) : "assortment/".concat(newProduct.category, "/").concat(newProduct.name, "/").concat(fileName);
            oldRef = (0, _storage.ref)(storage, oldStoragePath);
            newRef = (0, _storage.ref)(storage, newStoragePath);
            _context3.prev = 13;
            _context3.next = 16;
            return (0, _storage.getDownloadURL)(oldRef);
          case 16:
            url = _context3.sent;
            _context3.next = 19;
            return fetch(url);
          case 19:
            response = _context3.sent;
            _context3.next = 22;
            return response.blob();
          case 22:
            blob = _context3.sent;
            _context3.next = 25;
            return (0, _storage.uploadBytes)(newRef, blob);
          case 25:
            _context3.next = 27;
            return (0, _storage.getDownloadURL)(newRef);
          case 27:
            newUrl = _context3.sent;
            _context3.next = 30;
            return (0, _storage.deleteObject)(oldRef);
          case 30:
            // Zaktualizuj ścieżkę pliku i URL
            updatedFiles.push(_objectSpread(_objectSpread({}, file), {}, {
              storagePath: newStoragePath,
              url: newUrl
            }));
            updatedImageUrls.push(newUrl);
            _context3.next = 37;
            break;
          case 34:
            _context3.prev = 34;
            _context3.t0 = _context3["catch"](13);
            console.error('Błąd podczas przenoszenia pliku:', _context3.t0);
          case 37:
            _context3.next = 6;
            break;
          case 39:
            _context3.next = 44;
            break;
          case 41:
            _context3.prev = 41;
            _context3.t1 = _context3["catch"](4);
            _iterator2.e(_context3.t1);
          case 44:
            _context3.prev = 44;
            _iterator2.f();
            return _context3.finish(44);
          case 47:
            // Zaktualizuj pliki produktu w stanie aplikacji
            setProducts(function (prevProducts) {
              return prevProducts.map(function (product) {
                if (product.id === newProduct.id) {
                  return _objectSpread(_objectSpread({}, product), {}, {
                    files: updatedFiles,
                    imageUrls: updatedImageUrls
                  });
                } else {
                  return product;
                }
              });
            });
          case 48:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[4, 41, 44, 47], [13, 34]]);
    }));
    return function moveProductFiles(_x6, _x7) {
      return _ref4.apply(this, arguments);
    };
  }();
  var getEnglishType = function getEnglishType(type) {
    switch (type) {
      case 'Drewniana':
        return 'wooden';
      case 'Kamienna':
        return 'stolen';
      case 'Ceramiczna':
        return 'ceramic';
      case 'Szklana':
        return 'glass';
      default:
        return type ? type.toLowerCase() : '';
    }
  };
  var toggleProduct = function toggleProduct(id) {
    setExpandedProductId(expandedProductId === id ? null : id);
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "formSection"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Asortyment"), products.map(function (product, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: product.id,
      className: "productSection"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      onClick: function onClick() {
        return toggleProduct(product.id);
      }
    }, /*#__PURE__*/_react["default"].createElement("h3", null, product.name || 'Nowy produkt', " ", expandedProductId === product.id ? '-' : '+')), expandedProductId === product.id && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("label", null, "Nazwa produktu:"), /*#__PURE__*/_react["default"].createElement("input", {
      type: "text",
      value: product.name,
      onChange: function onChange(e) {
        return handleProductChange(product.id, 'name', e.target.value);
      },
      required: true
    }), /*#__PURE__*/_react["default"].createElement("label", null, "Kategoria:"), /*#__PURE__*/_react["default"].createElement("select", {
      value: product.category,
      onChange: function onChange(e) {
        return handleProductChange(product.id, 'category', e.target.value);
      },
      required: true
    }, /*#__PURE__*/_react["default"].createElement("option", {
      value: "coffins"
    }, "Trumny"), /*#__PURE__*/_react["default"].createElement("option", {
      value: "urns"
    }, "Urny"), /*#__PURE__*/_react["default"].createElement("option", {
      value: "wreaths"
    }, "Wie\u0144ce Kwiatowe"), /*#__PURE__*/_react["default"].createElement("option", {
      value: "plaques"
    }, "Tabliczki"), /*#__PURE__*/_react["default"].createElement("option", {
      value: "crosses"
    }, "Krzy\u017Ce"), /*#__PURE__*/_react["default"].createElement("option", {
      value: "music"
    }, "Odprawa Muzyczna")), /*#__PURE__*/_react["default"].createElement("label", null, "Cena:"), /*#__PURE__*/_react["default"].createElement("input", {
      type: "number",
      value: product.price,
      onChange: function onChange(e) {
        return handleProductChange(product.id, 'price', e.target.value);
      },
      required: true
    }), /*#__PURE__*/_react["default"].createElement("label", null, "Dost\u0119pno\u015B\u0107:"), /*#__PURE__*/_react["default"].createElement("select", {
      value: product.availability,
      onChange: function onChange(e) {
        return handleProductChange(product.id, 'availability', e.target.value);
      },
      required: true
    }, /*#__PURE__*/_react["default"].createElement("option", {
      value: "Dost\u0119pna od r\u0119ki"
    }, "Dost\u0119pna od r\u0119ki"), /*#__PURE__*/_react["default"].createElement("option", {
      value: "Na zam\xF3wienie"
    }, "Na zam\xF3wienie")), product.category !== 'music' && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("label", null, "Producent:"), /*#__PURE__*/_react["default"].createElement("input", {
      type: "text",
      value: product.producent,
      onChange: function onChange(e) {
        return handleProductChange(product.id, 'producent', e.target.value);
      }
    }), /*#__PURE__*/_react["default"].createElement("label", null, "Opis:"), /*#__PURE__*/_react["default"].createElement("textarea", {
      value: product.text,
      onChange: function onChange(e) {
        return handleProductChange(product.id, 'text', e.target.value);
      }
    }), product.category === 'coffins' || product.category === 'urns' ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("label", null, "Typ:"), /*#__PURE__*/_react["default"].createElement("select", {
      value: product.type,
      onChange: function onChange(e) {
        return handleProductChange(product.id, 'type', e.target.value);
      }
    }, /*#__PURE__*/_react["default"].createElement("option", {
      value: "wooden"
    }, "Drewniana"), /*#__PURE__*/_react["default"].createElement("option", {
      value: "stolen"
    }, "Kamienna"))) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("label", null, "Z czego wykonane:"), /*#__PURE__*/_react["default"].createElement("input", {
      type: "text",
      value: product.build,
      onChange: function onChange(e) {
        return handleProductChange(product.id, 'build', e.target.value);
      }
    }))), product.category !== 'music' && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("label", null, "Za\u0142aduj zdj\u0119cia:"), /*#__PURE__*/_react["default"].createElement("input", {
      type: "file",
      multiple: true,
      onChange: function onChange(e) {
        return handleFileChange(product.id, Array.from(e.target.files));
      }
    }), product.imageUrls && product.imageUrls.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
      className: "imagePreview"
    }, product.imageUrls.map(function (url, idx) {
      return /*#__PURE__*/_react["default"].createElement("img", {
        key: idx,
        src: url,
        alt: "Zdj\u0119cie ".concat(idx + 1),
        style: {
          width: '100px',
          marginRight: '10px'
        }
      });
    }))), index > 0 && /*#__PURE__*/_react["default"].createElement("button", {
      type: "button",
      onClick: function onClick() {
        return removeProduct(product.id);
      }
    }, "Usu\u0144 produkt")));
  }), /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: addProduct
  }, "Dodaj kolejny produkt +"));
};
var _default = exports["default"] = Assortment;