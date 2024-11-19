"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _router = require("next/router");
var _firebase = require("../../../firebase");
var _firestore = require("firebase/firestore");
var _storage = require("firebase/storage");
var _axios = _interopRequireDefault(require("axios"));
var _middleware = _interopRequireDefault(require("../../../middleware"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
var FirstLogin = function FirstLogin() {
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    ownerName = _useState2[0],
    setOwnerName = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    funeralHomeName = _useState4[0],
    setFuneralHomeName = _useState4[1];
  var _useState5 = (0, _react.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    city = _useState6[0],
    setCity = _useState6[1];
  var _useState7 = (0, _react.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    street = _useState8[0],
    setStreet = _useState8[1];
  var _useState9 = (0, _react.useState)(''),
    _useState10 = _slicedToArray(_useState9, 2),
    postalCode = _useState10[0],
    setPostalCode = _useState10[1];
  var _useState11 = (0, _react.useState)([{
      dayFrom: '',
      dayTo: '',
      from: '',
      to: ''
    }]),
    _useState12 = _slicedToArray(_useState11, 2),
    openingHours = _useState12[0],
    setOpeningHours = _useState12[1];
  var _useState13 = (0, _react.useState)(''),
    _useState14 = _slicedToArray(_useState13, 2),
    email = _useState14[0],
    setEmail = _useState14[1];
  var _useState15 = (0, _react.useState)(''),
    _useState16 = _slicedToArray(_useState15, 2),
    phone = _useState16[0],
    setPhone = _useState16[1];
  var _useState17 = (0, _react.useState)(''),
    _useState18 = _slicedToArray(_useState17, 2),
    description = _useState18[0],
    setDescription = _useState18[1];
  var _useState19 = (0, _react.useState)(null),
    _useState20 = _slicedToArray(_useState19, 2),
    logo = _useState20[0],
    setLogo = _useState20[1];
  var router = (0, _router.useRouter)();
  var roleChecked = (0, _middleware["default"])('funeralHome');
  (0, _react.useEffect)(function () {
    if (!roleChecked) return; // Zapobiega uruchamianiu efektu, jeśli rola nie została jeszcze sprawdzona

    // Pobierz dane użytkownika, jeśli to konieczne
  }, [roleChecked]);
  var handleLogoChange = function handleLogoChange(e) {
    if (e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };
  var handleAddOpeningHour = function handleAddOpeningHour() {
    setOpeningHours([].concat(_toConsumableArray(openingHours), [{
      dayFrom: '',
      dayTo: '',
      from: '',
      to: ''
    }]));
  };
  var handleRemoveOpeningHour = function handleRemoveOpeningHour(index) {
    if (index === 0) return;
    var newOpeningHours = _toConsumableArray(openingHours);
    newOpeningHours.splice(index, 1);
    setOpeningHours(newOpeningHours);
  };
  var handleOpeningHourChange = function handleOpeningHourChange(index, field, value) {
    var newOpeningHours = _toConsumableArray(openingHours);
    newOpeningHours[index][field] = value;
    setOpeningHours(newOpeningHours);
  };
  var geocodeAddress = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(address) {
      var response, _response$data$result, lat, lng;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _axios["default"].get('https://maps.googleapis.com/maps/api/geocode/json', {
              params: {
                address: address,
                key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
              }
            });
          case 3:
            response = _context.sent;
            _response$data$result = response.data.results[0].geometry.location, lat = _response$data$result.lat, lng = _response$data$result.lng;
            return _context.abrupt("return", {
              lat: lat,
              lng: lng
            });
          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.error("Error geocoding address: ", _context.t0);
            return _context.abrupt("return", null);
          case 12:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 8]]);
    }));
    return function geocodeAddress(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var handleSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e) {
      var userId, fullAddress, coordinates, funeralHomeData, userDocRef, logoRef, logoUrl;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            e.preventDefault();
            userId = localStorage.getItem('userId');
            if (userId) {
              _context2.next = 5;
              break;
            }
            alert('User not logged in');
            return _context2.abrupt("return");
          case 5:
            fullAddress = "".concat(street, ", ").concat(city, ", ").concat(postalCode);
            _context2.next = 8;
            return geocodeAddress(fullAddress);
          case 8:
            coordinates = _context2.sent;
            if (coordinates) {
              _context2.next = 12;
              break;
            }
            alert('Error geocoding address. Please try again.');
            return _context2.abrupt("return");
          case 12:
            funeralHomeData = {
              ownerName: ownerName,
              funeralHomeName: funeralHomeName,
              city: city,
              street: street,
              postalCode: postalCode,
              openingHours: openingHours,
              email: email,
              phone: phone,
              description: description,
              latitude: coordinates.lat,
              // Używamy pełnych nazw pól
              longitude: coordinates.lng // Używamy pełnych nazw pól
            };
            _context2.prev = 13;
            userDocRef = (0, _firestore.doc)(_firebase.db, 'domyPogrzebowe', userId);
            _context2.next = 17;
            return (0, _firestore.updateDoc)(userDocRef, funeralHomeData);
          case 17:
            if (!logo) {
              _context2.next = 26;
              break;
            }
            logoRef = (0, _storage.ref)(_firebase.storage, "".concat(funeralHomeName, "/logo/logo.png"));
            _context2.next = 21;
            return (0, _storage.uploadBytes)(logoRef, logo);
          case 21:
            _context2.next = 23;
            return (0, _storage.getDownloadURL)(logoRef);
          case 23:
            logoUrl = _context2.sent;
            _context2.next = 26;
            return (0, _firestore.updateDoc)(userDocRef, {
              logoUrl: logoUrl
            });
          case 26:
            router.push('/funeral/first-form');
            _context2.next = 33;
            break;
          case 29:
            _context2.prev = 29;
            _context2.t0 = _context2["catch"](13);
            console.error('Error updating document: ', _context2.t0);
            alert('Error updating document. Please try again.');
          case 33:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[13, 29]]);
    }));
    return function handleSubmit(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "firstLoginContainer"
  }, /*#__PURE__*/_react["default"].createElement("h1", null, "Witamy w Twoim Panelu Domu Pogrzebowego"), /*#__PURE__*/_react["default"].createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "formSection"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Dane domu pogrzebowego:"), /*#__PURE__*/_react["default"].createElement("label", null, "Imi\u0119 i Nazwisko w\u0142a\u015Bciciela:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    value: ownerName,
    onChange: function onChange(e) {
      return setOwnerName(e.target.value);
    },
    required: true
  }), /*#__PURE__*/_react["default"].createElement("label", null, "Nazwa domu pogrzebowego:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    value: funeralHomeName,
    onChange: function onChange(e) {
      return setFuneralHomeName(e.target.value);
    },
    required: true
  }), /*#__PURE__*/_react["default"].createElement("label", null, "Miasto:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    value: city,
    onChange: function onChange(e) {
      return setCity(e.target.value);
    },
    required: true
  }), /*#__PURE__*/_react["default"].createElement("label", null, "Ulica:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    value: street,
    onChange: function onChange(e) {
      return setStreet(e.target.value);
    },
    required: true
  }), /*#__PURE__*/_react["default"].createElement("label", null, "Kod pocztowy:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    value: postalCode,
    onChange: function onChange(e) {
      return setPostalCode(e.target.value);
    }
  }), /*#__PURE__*/_react["default"].createElement("label", null, "Godziny otwarcia:"), openingHours.map(function (hour, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      className: "opening-hours-section"
    }, /*#__PURE__*/_react["default"].createElement("select", {
      value: hour.dayFrom,
      onChange: function onChange(e) {
        return handleOpeningHourChange(index, 'dayFrom', e.target.value);
      },
      required: true
    }, /*#__PURE__*/_react["default"].createElement("option", {
      value: ""
    }, "Od"), /*#__PURE__*/_react["default"].createElement("option", {
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
        return handleOpeningHourChange(index, 'dayTo', e.target.value);
      },
      required: true
    }, /*#__PURE__*/_react["default"].createElement("option", {
      value: ""
    }, "Do"), /*#__PURE__*/_react["default"].createElement("option", {
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
        return handleOpeningHourChange(index, 'from', e.target.value);
      },
      required: true
    }), /*#__PURE__*/_react["default"].createElement("input", {
      type: "time",
      value: hour.to,
      onChange: function onChange(e) {
        return handleOpeningHourChange(index, 'to', e.target.value);
      },
      required: true
    }), index !== 0 && /*#__PURE__*/_react["default"].createElement("button", {
      type: "button",
      onClick: function onClick() {
        return handleRemoveOpeningHour(index);
      }
    }, "Usu\u0144"));
  }), /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: handleAddOpeningHour
  }, "Dodaj godziny otwarcia"), /*#__PURE__*/_react["default"].createElement("label", null, "Logo domu pogrzebowego:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "file",
    onChange: handleLogoChange,
    required: true
  }), /*#__PURE__*/_react["default"].createElement("label", null, "Email:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "email",
    value: email,
    onChange: function onChange(e) {
      return setEmail(e.target.value);
    }
  }), /*#__PURE__*/_react["default"].createElement("label", null, "Telefon:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "tel",
    value: phone,
    onChange: function onChange(e) {
      return setPhone(e.target.value);
    }
  }), /*#__PURE__*/_react["default"].createElement("label", null, "Opis:"), /*#__PURE__*/_react["default"].createElement("textarea", {
    value: description,
    onChange: function onChange(e) {
      return setDescription(e.target.value);
    }
  }), /*#__PURE__*/_react["default"].createElement("button", {
    type: "submit"
  }, "Dalej"))));
};
var _default = exports["default"] = FirstLogin;