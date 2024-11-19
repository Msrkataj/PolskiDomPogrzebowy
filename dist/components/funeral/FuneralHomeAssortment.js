"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _firebase = require("../../../firebase");
var _firestore = require("firebase/firestore");
var _AddAsortment = _interopRequireDefault(require("./AddAsortment"));
var _uuid = require("uuid");
var _link = _interopRequireDefault(require("next/link"));
var _image = _interopRequireDefault(require("next/image"));
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
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var FuneralHomeAssortment = function FuneralHomeAssortment() {
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    assortment = _useState2[0],
    setAssortment = _useState2[1];
  var _useState3 = (0, _react.useState)(1),
    _useState4 = _slicedToArray(_useState3, 2),
    currentPage = _useState4[0],
    setCurrentPage = _useState4[1];
  var _useState5 = (0, _react.useState)(20),
    _useState6 = _slicedToArray(_useState5, 1),
    itemsPerPage = _useState6[0];
  var _useState7 = (0, _react.useState)({
      key: null,
      direction: null
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    sortConfig = _useState8[0],
    setSortConfig = _useState8[1];
  var _useState9 = (0, _react.useState)(true),
    _useState10 = _slicedToArray(_useState9, 2),
    loading = _useState10[0],
    setLoading = _useState10[1];
  var _useState11 = (0, _react.useState)(null),
    _useState12 = _slicedToArray(_useState11, 2),
    editIndex = _useState12[0],
    setEditIndex = _useState12[1];
  var _useState13 = (0, _react.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    editItem = _useState14[0],
    setEditItem = _useState14[1];
  var _useState15 = (0, _react.useState)(null),
    _useState16 = _slicedToArray(_useState15, 2),
    originalEditItem = _useState16[0],
    setOriginalEditItem = _useState16[1];
  var _useState17 = (0, _react.useState)({}),
    _useState18 = _slicedToArray(_useState17, 2),
    currentImageIndexes = _useState18[0],
    setCurrentImageIndexes = _useState18[1];
  var _useState19 = (0, _react.useState)(false),
    _useState20 = _slicedToArray(_useState19, 2),
    isModalOpen = _useState20[0],
    setIsModalOpen = _useState20[1];
  var _useState21 = (0, _react.useState)(false),
    _useState22 = _slicedToArray(_useState21, 2),
    isAddModalOpen = _useState22[0],
    setIsAddModalOpen = _useState22[1];
  var _useState23 = (0, _react.useState)('all'),
    _useState24 = _slicedToArray(_useState23, 2),
    filterCategory = _useState24[0],
    setFilterCategory = _useState24[1];
  var _useState25 = (0, _react.useState)('all'),
    _useState26 = _slicedToArray(_useState25, 2),
    filterType = _useState26[0],
    setFilterType = _useState26[1];
  var _useState27 = (0, _react.useState)([{
      id: (0, _uuid.v4)(),
      name: '',
      category: 'coffins',
      price: '',
      availability: 'Dostępna od ręki',
      producent: '',
      text: '',
      build: '',
      type: '',
      imageUrls: []
    }]),
    _useState28 = _slicedToArray(_useState27, 2),
    newProducts = _useState28[0],
    setNewProducts = _useState28[1];
  var _useState29 = (0, _react.useState)(1),
    _useState30 = _slicedToArray(_useState29, 2),
    newProductCounter = _useState30[0],
    setNewProductCounter = _useState30[1];
  (0, _react.useEffect)(function () {
    var fetchAssortment = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var userId, docRef, docSnap, data, fetchedAssortment, fetchedMusic, combinedAssortment;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              userId = localStorage.getItem('userId');
              if (userId) {
                _context.next = 4;
                break;
              }
              console.error('Brak identyfikatora użytkownika.');
              return _context.abrupt("return");
            case 4:
              docRef = (0, _firestore.doc)(_firebase.db, 'domyPogrzebowe', userId);
              _context.next = 7;
              return (0, _firestore.getDoc)(docRef);
            case 7:
              docSnap = _context.sent;
              if (docSnap.exists()) {
                data = docSnap.data();
                fetchedAssortment = data.assortment || [];
                fetchedMusic = data.music || []; // Jeśli 'music' nie jest tablicą, ale obiektem, zamień go na tablicę
                if (!Array.isArray(fetchedMusic)) {
                  fetchedMusic = [fetchedMusic];
                }

                // Połącz tablice assortment i music
                combinedAssortment = [].concat(_toConsumableArray(fetchedAssortment), _toConsumableArray(fetchedMusic));
                setAssortment(combinedAssortment);
              } else {
                console.error('Nie znaleziono dokumentu.');
              }
              setLoading(false);
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function fetchAssortment() {
        return _ref.apply(this, arguments);
      };
    }();
    fetchAssortment();
  }, []);
  var handleDeleteClick = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(index) {
      var itemToDelete, updatedAssortment, userId, docRef, newMusicArray;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            itemToDelete = assortment[index];
            updatedAssortment = _toConsumableArray(assortment);
            updatedAssortment.splice(index, 1);
            setAssortment(updatedAssortment);
            userId = localStorage.getItem('userId');
            docRef = (0, _firestore.doc)(_firebase.db, 'domyPogrzebowe', userId);
            _context2.prev = 6;
            if (!(itemToDelete.category === 'music')) {
              _context2.next = 13;
              break;
            }
            // Usuń z 'music'
            newMusicArray = updatedAssortment.filter(function (item) {
              return item.category === 'music';
            });
            _context2.next = 11;
            return (0, _firestore.setDoc)(docRef, {
              music: newMusicArray.length === 1 ? newMusicArray[0] : newMusicArray
            }, {
              merge: true
            });
          case 11:
            _context2.next = 15;
            break;
          case 13:
            _context2.next = 15;
            return (0, _firestore.setDoc)(docRef, {
              assortment: updatedAssortment.filter(function (item) {
                return item.category !== 'music';
              })
            }, {
              merge: true
            });
          case 15:
            console.log('Produkt został usunięty.');
            _context2.next = 21;
            break;
          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](6);
            console.error('Błąd podczas usuwania produktu:', _context2.t0);
          case 21:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[6, 18]]);
    }));
    return function handleDeleteClick(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleSort = function handleSort(key) {
    var direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({
      key: key,
      direction: direction
    });
  };
  var handleFilterChange = function handleFilterChange(e) {
    setFilterCategory(e.target.value);
  };
  var handleTypeFilterChange = function handleTypeFilterChange(e) {
    setFilterType(e.target.value);
  };
  var filteredAssortment = assortment.filter(function (item) {
    return (filterCategory === 'all' || item.category === filterCategory) && (filterType === 'all' || item.type === filterType);
  });
  var sortedProducts = _react["default"].useMemo(function () {
    var sortableProducts = _toConsumableArray(filteredAssortment);
    if (sortConfig.key !== null) {
      sortableProducts.sort(function (a, b) {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [filteredAssortment, sortConfig]);
  var indexOfLastItem = currentPage * itemsPerPage;
  var indexOfFirstItem = indexOfLastItem - itemsPerPage;
  var currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  var paginate = function paginate(pageNumber) {
    return setCurrentPage(pageNumber);
  };
  var handleEditClick = function handleEditClick(index) {
    setEditIndex(index);
    setEditItem(_objectSpread({}, assortment[index]));
    setOriginalEditItem(_objectSpread({}, assortment[index]));
    setIsModalOpen(true);
  };
  var handleSaveClick = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(index) {
      var updatedAssortment, userId, docRef;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            updatedAssortment = _toConsumableArray(assortment);
            updatedAssortment[index] = editItem; // Zaktualizuj produkt w lokalnym stanie

            setAssortment(updatedAssortment);
            setEditIndex(null);
            setEditItem(null);
            setOriginalEditItem(null);
            setIsModalOpen(false);
            userId = localStorage.getItem('userId');
            docRef = (0, _firestore.doc)(_firebase.db, 'domyPogrzebowe', userId);
            _context3.prev = 9;
            if (!(editItem.category === 'music')) {
              _context3.next = 15;
              break;
            }
            _context3.next = 13;
            return (0, _firestore.setDoc)(docRef, {
              music: updatedAssortment.filter(function (item) {
                return item.category === 'music';
              })
            }, {
              merge: true
            });
          case 13:
            _context3.next = 17;
            break;
          case 15:
            _context3.next = 17;
            return (0, _firestore.setDoc)(docRef, {
              assortment: updatedAssortment.filter(function (item) {
                return item.category !== 'music';
              })
            }, {
              merge: true
            });
          case 17:
            console.log('Zaktualizowano asortyment.');
            _context3.next = 23;
            break;
          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3["catch"](9);
            console.error('Błąd podczas zapisywania asortymentu:', _context3.t0);
          case 23:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[9, 20]]);
    }));
    return function handleSaveClick(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();
  var handleCancelClick = function handleCancelClick() {
    setEditIndex(null);
    setEditItem(null);
    setOriginalEditItem(null);
    setIsModalOpen(false);
  };
  var handleImageRemove = function handleImageRemove(index) {
    var updatedImages = editItem.imageUrls.filter(function (_, i) {
      return i !== index;
    });
    setEditItem(_objectSpread(_objectSpread({}, editItem), {}, {
      imageUrls: updatedImages
    }));
  };
  var handleImageAdd = function handleImageAdd(e) {
    var files = e.target.files;
    var newImageUrls = _toConsumableArray(editItem.imageUrls || []);
    var _iterator = _createForOfIteratorHelper(files),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var file = _step.value;
        var reader = new FileReader();
        reader.onload = function (event) {
          newImageUrls.push(event.target.result);
          setEditItem(_objectSpread(_objectSpread({}, editItem), {}, {
            imageUrls: newImageUrls
          }));
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };
  var handleInputChange = function handleInputChange(e, field) {
    var value = e.target.value;
    setEditItem(_objectSpread(_objectSpread({}, editItem), {}, _defineProperty({}, field, value)));
  };
  var handleAddClick = function handleAddClick() {
    setIsAddModalOpen(true);
  };
  var handleAddSaveClick = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var updatedAssortment, userId, docRef;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            updatedAssortment = [].concat(_toConsumableArray(assortment), _toConsumableArray(newProducts));
            setAssortment(updatedAssortment);
            setNewProducts([{
              id: (0, _uuid.v4)(),
              name: '',
              category: 'coffins',
              price: '',
              availability: 'Dostępna od ręki',
              producent: '',
              text: '',
              build: '',
              type: '',
              imageUrls: []
            }]);
            setIsAddModalOpen(false);
            userId = localStorage.getItem('userId');
            docRef = (0, _firestore.doc)(_firebase.db, 'domyPogrzebowe', userId);
            _context4.prev = 6;
            _context4.next = 9;
            return (0, _firestore.setDoc)(docRef, {
              assortment: updatedAssortment.filter(function (item) {
                return item.category !== 'music';
              }),
              music: updatedAssortment.filter(function (item) {
                return item.category === 'music';
              })
            }, {
              merge: true
            });
          case 9:
            console.log('Dodano nowy produkt.');
            _context4.next = 15;
            break;
          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](6);
            console.error('Błąd podczas zapisywania asortymentu:', _context4.t0);
          case 15:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[6, 12]]);
    }));
    return function handleAddSaveClick() {
      return _ref4.apply(this, arguments);
    };
  }();
  var handleAddCancelClick = function handleAddCancelClick() {
    setIsAddModalOpen(false);
  };
  var handlePrevImage = function handlePrevImage(index) {
    setCurrentImageIndexes(function (prevIndexes) {
      return _objectSpread(_objectSpread({}, prevIndexes), {}, _defineProperty({}, index, prevIndexes[index] > 0 ? prevIndexes[index] - 1 : assortment[index].imageUrls.length - 1));
    });
  };
  var handleNextImage = function handleNextImage(index) {
    setCurrentImageIndexes(function (prevIndexes) {
      return _objectSpread(_objectSpread({}, prevIndexes), {}, _defineProperty({}, index, prevIndexes[index] < assortment[index].imageUrls.length - 1 ? prevIndexes[index] + 1 : 0));
    });
  };
  var translateCategory = function translateCategory(category) {
    var translations = {
      'urns': 'Urny',
      'coffins': 'Trumny',
      'wreaths': 'Wieńce',
      'plaques': 'Tabliczki',
      'crosses': 'Krzyże',
      'music': 'Odprawy muzyczne'
    };
    return translations[category] || category;
  };
  var translateType = function translateType(type) {
    var translations = {
      'wooden': 'Drewniana',
      'stolen': 'Kamienna',
      'ceramic': 'Ceramiczna',
      'glass': 'Szklana'
    };
    return translations[type] || type;
  };
  if (loading) return /*#__PURE__*/_react["default"].createElement("div", {
    className: "loadingContainer"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "loadingSpinner"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "loadingText"
  }, "\u0141adowanie danych..."));
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: isModalOpen ? "container assortment-none" : "container"
  }, /*#__PURE__*/_react["default"].createElement(_link["default"], {
    className: "back-link",
    href: "/funeral/panel"
  }, "Wr\xF3\u0107 do panelu"), /*#__PURE__*/_react["default"].createElement("h1", null, "Tw\xF3j asortyment"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "filter-bar"
  }, /*#__PURE__*/_react["default"].createElement("select", {
    onChange: handleFilterChange
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: "all"
  }, "Wszystkie kategorie"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "urns"
  }, "Urny"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "coffins"
  }, "Trumny"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "wreaths"
  }, "Wie\u0144ce"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "plaques"
  }, "Tabliczki"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "crosses"
  }, "Krzy\u017Ce"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "music"
  }, "Odprawy muzyczne")), filterCategory !== 'music' && /*#__PURE__*/_react["default"].createElement("select", {
    onChange: handleTypeFilterChange
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: "all"
  }, "Wszystkie typy"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "wooden"
  }, "Drewniana"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "stone"
  }, "Kamienna"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "ceramic"
  }, "Ceramiczna"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "glass"
  }, "Szklana"))), /*#__PURE__*/_react["default"].createElement("table", {
    className: "assortment-table"
  }, /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("th", null, "Miniaturka"), /*#__PURE__*/_react["default"].createElement("th", null, "Nazwa"), /*#__PURE__*/_react["default"].createElement("th", null, "Kategoria"), /*#__PURE__*/_react["default"].createElement("th", null, "Typ"), /*#__PURE__*/_react["default"].createElement("th", null, "Dost\u0119pno\u015B\u0107"), /*#__PURE__*/_react["default"].createElement("th", null, "Cena"), /*#__PURE__*/_react["default"].createElement("th", null, "Producent"), /*#__PURE__*/_react["default"].createElement("th", null, "Akcje"))), /*#__PURE__*/_react["default"].createElement("tbody", null, currentItems.map(function (product, index) {
    return /*#__PURE__*/_react["default"].createElement("tr", {
      key: index
    }, /*#__PURE__*/_react["default"].createElement("td", null, product.imageUrls && product.imageUrls.length > 0 ? /*#__PURE__*/_react["default"].createElement(_image["default"], {
      src: product.imageUrls[currentImageIndexes[index] || 0],
      alt: product.name,
      className: "product-thumbnail",
      width: 100,
      height: 100,
      style: {
        objectFit: 'cover'
      }
    }) : /*#__PURE__*/_react["default"].createElement("span", null, "Brak zdj\u0119\u0107")), /*#__PURE__*/_react["default"].createElement("td", null, product.name), /*#__PURE__*/_react["default"].createElement("td", null, translateCategory(product.category)), /*#__PURE__*/_react["default"].createElement("td", null, translateType(product.type)), /*#__PURE__*/_react["default"].createElement("td", null, product.availability), /*#__PURE__*/_react["default"].createElement("td", null, product.price, " PLN"), /*#__PURE__*/_react["default"].createElement("td", null, product.producent), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        return handleEditClick(index);
      }
    }, "Edytuj"), /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        return handleDeleteClick(index);
      }
    }, "Usu\u0144")));
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "pagination"
  }, _toConsumableArray(Array(Math.ceil(assortment.length / itemsPerPage)).keys()).map(function (number) {
    return /*#__PURE__*/_react["default"].createElement("button", {
      key: number + 1,
      onClick: function onClick() {
        return paginate(number + 1);
      }
    }, number + 1);
  })), /*#__PURE__*/_react["default"].createElement("button", {
    className: "add-button",
    onClick: handleAddClick
  }, "Dodaj nowy produkt"), isModalOpen && editItem && /*#__PURE__*/_react["default"].createElement("div", {
    className: "modal-edit"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "modal-content-funeral"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Edytuj produkt"), /*#__PURE__*/_react["default"].createElement("p", null, "Nazwa:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    value: editItem.name,
    onChange: function onChange(e) {
      return handleInputChange(e, 'name');
    }
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Kategoria:"), /*#__PURE__*/_react["default"].createElement("select", {
    value: editItem.category,
    onChange: function onChange(e) {
      return handleInputChange(e, 'category');
    }
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: "urns"
  }, "Urny"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "coffins"
  }, "Trumny"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "wreaths"
  }, "Wie\u0144ce"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "plaques"
  }, "Tabliczki"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "crosses"
  }, "Krzy\u017Ce"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "music"
  }, "Odprawy muzyczne")), ['urns', 'coffins'].includes(editItem.category) ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("p", null, "Typ:"), /*#__PURE__*/_react["default"].createElement("select", {
    value: editItem.type,
    onChange: function onChange(e) {
      return handleInputChange(e, 'type');
    }
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: "wooden"
  }, "Drewniana"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "stolen"
  }, "Kamienna"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "ceramic"
  }, "Ceramiczna"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "glass"
  }, "Szklana"))) : editItem.category !== 'music' ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("p", null, "Z czego wykonane:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    value: editItem.build,
    onChange: function onChange(e) {
      return handleInputChange(e, 'build');
    }
  })) : null, /*#__PURE__*/_react["default"].createElement("p", null, "Dost\u0119pno\u015B\u0107:"), /*#__PURE__*/_react["default"].createElement("select", {
    value: editItem.availability,
    onChange: function onChange(e) {
      return handleInputChange(e, 'availability');
    }
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: "Dost\u0119pna od r\u0119ki"
  }, "Dost\u0119pna od r\u0119ki"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "Na zam\xF3wienie"
  }, "Na zam\xF3wienie")), /*#__PURE__*/_react["default"].createElement("p", null, "Opis:"), /*#__PURE__*/_react["default"].createElement("textarea", {
    className: "modal-content-funeral-text",
    value: editItem.text,
    onChange: function onChange(e) {
      return handleInputChange(e, 'text');
    }
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Cena:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "number",
    value: editItem.price,
    onChange: function onChange(e) {
      return handleInputChange(e, 'price');
    }
  }), editItem.category !== 'music' && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("h3", null, "Zdj\u0119cia"), /*#__PURE__*/_react["default"].createElement("ul", null, editItem.imageUrls && editItem.imageUrls.map(function (url, index) {
    return /*#__PURE__*/_react["default"].createElement("li", {
      key: index,
      style: {
        listStyleType: 'none',
        marginBottom: '10px'
      }
    }, /*#__PURE__*/_react["default"].createElement(_image["default"], {
      src: url,
      alt: "Zdj\u0119cie ".concat(index + 1),
      width: 80,
      height: 80,
      style: {
        marginRight: '10px',
        objectFit: 'cover'
      }
    }), /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        return handleImageRemove(index);
      },
      style: {
        marginLeft: '10px'
      }
    }, "Usu\u0144"));
  })), /*#__PURE__*/_react["default"].createElement("input", {
    type: "file",
    multiple: true,
    onChange: handleImageAdd
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "modal-actions"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleSaveClick(editIndex);
    }
  }, "Zapisz"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleCancelClick
  }, "Anuluj")))), isAddModalOpen && /*#__PURE__*/_react["default"].createElement("div", {
    className: "modal-add"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "modal-content-add"
  }, /*#__PURE__*/_react["default"].createElement(_AddAsortment["default"], {
    products: newProducts,
    setProducts: setNewProducts,
    productCounter: newProductCounter,
    setProductCounter: setNewProductCounter
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "modal-actions"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleAddSaveClick
  }, "Zapisz"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleAddCancelClick
  }, "Anuluj")))));
};
var _default = exports["default"] = FuneralHomeAssortment;