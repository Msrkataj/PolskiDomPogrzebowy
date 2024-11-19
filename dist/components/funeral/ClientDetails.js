"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _router = require("next/router");
var _firestore = require("firebase/firestore");
var _storage = require("firebase/storage");
var _firebase = require("../../../firebase");
var _link = _interopRequireDefault(require("next/link"));
var _Notifications = _interopRequireDefault(require("./Notifications"));
var _FetchFuneralHomeData = _interopRequireDefault(require("@/components/funeral/FetchFuneralHomeData"));
var _AlertMessage = _interopRequireDefault(require("@/components/common/AlertMessage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// Import nowego komponentu

var ClientDetails = function ClientDetails() {
  var _clientData$createdAt, _clientData$authorize, _clientData$authorize2;
  var funeralHome = (0, _FetchFuneralHomeData["default"])();
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    clientData = _useState2[0],
    setClientData = _useState2[1];
  var _useState3 = (0, _react.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0, _react.useState)({}),
    _useState6 = _slicedToArray(_useState5, 2),
    docsMap = _useState6[0],
    setDocsMap = _useState6[1];
  var _useState7 = (0, _react.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    documents = _useState8[0],
    setDocuments = _useState8[1];
  var router = (0, _router.useRouter)();
  var clientId = router.query.clientId;
  var _useState9 = (0, _react.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    isModalOpen = _useState10[0],
    setIsModalOpen = _useState10[1];
  var _useState11 = (0, _react.useState)(""),
    _useState12 = _slicedToArray(_useState11, 2),
    message = _useState12[0],
    setMessage = _useState12[1];
  var _useState13 = (0, _react.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    alertMessage = _useState14[0],
    setAlertMessage = _useState14[1];
  var _useState15 = (0, _react.useState)('info'),
    _useState16 = _slicedToArray(_useState15, 2),
    alertType = _useState16[0],
    setAlertType = _useState16[1];
  var openModal = function openModal() {
    return setIsModalOpen(true);
  };
  var closeModal = function closeModal() {
    return setIsModalOpen(false);
  };

  // Memoize `requiredDocs` to avoid recreating it on every render
  var requiredDocs = (0, _react.useMemo)(function () {
    return {
      pelnomocnictwozp: 'Pełnomocnictwo ZP',
      wniosekkremacji: 'Wniosek do kremacji',
      zusupowaznienie: 'ZUS-UPOWAŻNIENIE',
      zaswiadczenieer: 'Zaświadczenie ER',
      aktzgonuusc: 'Akt zgonu USC',
      szpitalkoszalin: 'Szpital Koszalin odbiór ciała',
      upowaznieniekrus: 'Upoważnienie KRUS',
      odbiordokumentow: 'Upoważnienie odbiór dokumentów'
    };
  }, []);
  (0, _react.useEffect)(function () {
    var fetchClientData = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var docRef, docSnap, initialDocsMap, storage, documentsRef, fetchedDocuments;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!clientId) {
                _context.next = 15;
                break;
              }
              docRef = (0, _firestore.doc)(_firebase.db, 'forms', clientId);
              _context.next = 4;
              return (0, _firestore.getDoc)(docRef);
            case 4:
              docSnap = _context.sent;
              if (docSnap.exists()) {
                setClientData(docSnap.data());
              } else {
                console.error('Nie znaleziono danych klienta.');
              }
              initialDocsMap = Object.keys(requiredDocs).reduce(function (acc, doc) {
                acc[doc] = false;
                return acc;
              }, {});
              storage = (0, _storage.getStorage)();
              documentsRef = (0, _storage.ref)(storage, "uploaded-documents/".concat(clientId, "/"));
              fetchedDocuments = [];
              _context.next = 12;
              return _fetchDocumentsRecursive(documentsRef, initialDocsMap, fetchedDocuments);
            case 12:
              setDocsMap(initialDocsMap);
              setDocuments(fetchedDocuments);
              setLoading(false);
            case 15:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function fetchClientData() {
        return _ref.apply(this, arguments);
      };
    }();
    var _fetchDocumentsRecursive = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(folderRef, docsMap, fetchedDocuments) {
        var result, _iterator, _step, _loop;
        return _regeneratorRuntime().wrap(function _callee2$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _storage.listAll)(folderRef);
            case 2:
              result = _context3.sent;
              // Iterate through folders
              _iterator = _createForOfIteratorHelper(result.prefixes);
              _context3.prev = 4;
              _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
                var folder, folderName, matchedKey, fileResult, _iterator2, _step2, fileRef, url;
                return _regeneratorRuntime().wrap(function _loop$(_context2) {
                  while (1) switch (_context2.prev = _context2.next) {
                    case 0:
                      folder = _step.value;
                      folderName = folder.name.trim().toLowerCase(); // Normalize folder name
                      // Try to match the folder name with a key in requiredDocs
                      matchedKey = Object.keys(requiredDocs).find(function (key) {
                        return requiredDocs[key].toLowerCase() === folderName;
                      });
                      if (!matchedKey) {
                        _context2.next = 29;
                        break;
                      }
                      docsMap[matchedKey] = true;

                      // Fetch files from the matched folder
                      _context2.next = 7;
                      return (0, _storage.listAll)(folder);
                    case 7:
                      fileResult = _context2.sent;
                      _iterator2 = _createForOfIteratorHelper(fileResult.items);
                      _context2.prev = 9;
                      _iterator2.s();
                    case 11:
                      if ((_step2 = _iterator2.n()).done) {
                        _context2.next = 19;
                        break;
                      }
                      fileRef = _step2.value;
                      _context2.next = 15;
                      return (0, _storage.getDownloadURL)(fileRef);
                    case 15:
                      url = _context2.sent;
                      fetchedDocuments.push({
                        name: fileRef.name,
                        url: url,
                        folderName: folderName
                      }); // Include folderName for debugging
                    case 17:
                      _context2.next = 11;
                      break;
                    case 19:
                      _context2.next = 24;
                      break;
                    case 21:
                      _context2.prev = 21;
                      _context2.t0 = _context2["catch"](9);
                      _iterator2.e(_context2.t0);
                    case 24:
                      _context2.prev = 24;
                      _iterator2.f();
                      return _context2.finish(24);
                    case 27:
                      _context2.next = 31;
                      break;
                    case 29:
                      _context2.next = 31;
                      return _fetchDocumentsRecursive(folder, docsMap, fetchedDocuments);
                    case 31:
                    case "end":
                      return _context2.stop();
                  }
                }, _loop, null, [[9, 21, 24, 27]]);
              });
              _iterator.s();
            case 7:
              if ((_step = _iterator.n()).done) {
                _context3.next = 11;
                break;
              }
              return _context3.delegateYield(_loop(), "t0", 9);
            case 9:
              _context3.next = 7;
              break;
            case 11:
              _context3.next = 16;
              break;
            case 13:
              _context3.prev = 13;
              _context3.t1 = _context3["catch"](4);
              _iterator.e(_context3.t1);
            case 16:
              _context3.prev = 16;
              _iterator.f();
              return _context3.finish(16);
            case 19:
              // Log fetched documents for debugging
              console.log("Fetched Documents:", fetchedDocuments);
            case 20:
            case "end":
              return _context3.stop();
          }
        }, _callee2, null, [[4, 13, 16, 19]]);
      }));
      return function fetchDocumentsRecursive(_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }();
    fetchClientData();
  }, [clientId, requiredDocs]);
  var handleSendMessage = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var docRef, newNotification;
      return _regeneratorRuntime().wrap(function _callee3$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            if (!(message.trim() === "")) {
              _context4.next = 2;
              break;
            }
            return _context4.abrupt("return");
          case 2:
            _context4.prev = 2;
            docRef = (0, _firestore.doc)(_firebase.db, 'forms', clientId);
            newNotification = {
              message: funeralHome.funeralHomeName + ' przesyła wiadomość: ' + message,
              name: "client",
              timestamp: new Date()
            };
            _context4.next = 7;
            return (0, _firestore.updateDoc)(docRef, {
              notifications: (0, _firestore.arrayUnion)(newNotification)
            });
          case 7:
            setMessage("");
            closeModal();
            setAlertMessage("Wiadomość została wysłana.");
            setAlertType("success");

            // Odświeżenie strony po krótkim czasie
            setTimeout(function () {
              router.reload();
            }, 2000); // Odśwież stronę po 2 sekundach
            _context4.next = 19;
            break;
          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](2);
            console.error("Błąd podczas wysyłania wiadomości:", _context4.t0);
            setAlertMessage("Wystąpił błąd podczas wysyłania wiadomości.");
            setAlertType("error");
          case 19:
          case "end":
            return _context4.stop();
        }
      }, _callee3, null, [[2, 14]]);
    }));
    return function handleSendMessage() {
      return _ref3.apply(this, arguments);
    };
  }();
  if (loading) return /*#__PURE__*/_react["default"].createElement("div", {
    className: "loadingContainer"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "loadingSpinner"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "loadingText"
  }, "\u0141adowanie danych..."));
  var handleOrderClick = function handleOrderClick() {
    router.push("/funeral/order-details?orderId=".concat(clientId));
  };
  var displayInfo = function displayInfo(label, value) {
    return value ? /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("strong", null, label, ":"), " ", value) : /*#__PURE__*/_react["default"].createElement("p", {
      className: "missing-info"
    }, /*#__PURE__*/_react["default"].createElement("strong", null, label, ":"), " Brak danych");
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "client-details-container"
  }, /*#__PURE__*/_react["default"].createElement(_link["default"], {
    className: "back-link",
    href: "/funeral/panel"
  }, "Wr\xF3\u0107 do zlece\u0144"), /*#__PURE__*/_react["default"].createElement(_AlertMessage["default"], {
    message: alertMessage,
    type: alertType
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "header-actions"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: "order-button",
    onClick: handleOrderClick
  }, "Zobacz zam\xF3wienie klienta"), /*#__PURE__*/_react["default"].createElement("button", {
    className: "message-button",
    onClick: openModal
  }, "Wy\u015Blij wiadomo\u015B\u0107")), isModalOpen && /*#__PURE__*/_react["default"].createElement("div", {
    className: "modal-message"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Wy\u015Blij wiadomo\u015B\u0107"), /*#__PURE__*/_react["default"].createElement("textarea", {
    value: message,
    onChange: function onChange(e) {
      return setMessage(e.target.value);
    },
    placeholder: "Wpisz wiadomo\u015B\u0107"
  }), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleSendMessage
  }, "Wy\u015Blij"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: closeModal
  }, "Anuluj"))), clientData && clientData.notifications && /*#__PURE__*/_react["default"].createElement(_Notifications["default"], {
    notifications: clientData.notifications,
    formCreatedTimestamp: (_clientData$createdAt = clientData.createdAt) !== null && _clientData$createdAt !== void 0 && _clientData$createdAt.toDate ? clientData.createdAt.toDate() : clientData.createdAt
  }), /*#__PURE__*/_react["default"].createElement("h1", null, "Szczeg\xF3\u0142y klienta"), clientData ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "client-info"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Pe\u0142nomocnik"), displayInfo("Imię i nazwisko", (_clientData$authorize = clientData.authorizedPerson) === null || _clientData$authorize === void 0 ? void 0 : _clientData$authorize.name), displayInfo("PESEL", (_clientData$authorize2 = clientData.authorizedPerson) === null || _clientData$authorize2 === void 0 ? void 0 : _clientData$authorize2.pesel), displayInfo("Email", clientData.email), displayInfo("Telefon", clientData.phone), /*#__PURE__*/_react["default"].createElement("h2", null, "Pierwsze informacje"), displayInfo("Lokalizacja (PESEL)", clientData.location), displayInfo("Adres zgonu", clientData.address), displayInfo("Kiedy będą załatwiane dokumenty", clientData.documents), /*#__PURE__*/_react["default"].createElement("h2", null, "Informacje o osobie zmar\u0142ej"), displayInfo("Imię i nazwisko", "".concat(clientData.name, " ").concat(clientData.surname)), displayInfo("Data urodzenia", clientData.birthDate), displayInfo("Data śmierci", clientData.deathDate), displayInfo("Czy osoba podlegała ubezpieczeniu emerytalno-rentowemu", clientData.worked), displayInfo("Czy osoba pracowała", clientData.worked), displayInfo("PESEL", clientData.pesel), displayInfo("Czy osoba zmarła była ubezpieczona w", clientData.insurance), displayInfo("Brak świadczeń", clientData.pensionCertificate), displayInfo("Szczegóły składki", clientData.pensionDetails), displayInfo("Kto sporządza akt zgonu", clientData.who)) : /*#__PURE__*/_react["default"].createElement("p", null, "Brak danych klienta."), /*#__PURE__*/_react["default"].createElement("div", {
    className: "documents-section"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Przes\u0142ane dokumenty"), Object.keys(docsMap).map(function (key, index) {
    var documentInfo = documents.find(function (doc) {
      return doc.folderName.includes(requiredDocs[key].toLowerCase());
    });
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      className: docsMap[key] ? 'document-present' : 'document-missing'
    }, /*#__PURE__*/_react["default"].createElement("strong", null, requiredDocs[key], ":"), " ", docsMap[key] ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, "Dokument dost\u0119pny", documentInfo && /*#__PURE__*/_react["default"].createElement(_link["default"], {
      href: documentInfo.url,
      download: documentInfo.name,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "download-link"
    }, "Pobierz")) : 'Brak dokumentu');
  })));
};
var _default = exports["default"] = ClientDetails;