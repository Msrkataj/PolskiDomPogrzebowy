"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _firebase = require("../../../firebase");
var _firestore = require("firebase/firestore");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
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
var AdminChats = function AdminChats() {
  var _selectedChat$formDat;
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    chats = _useState2[0],
    setChats = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedChat = _useState4[0],
    setSelectedChat = _useState4[1];
  var _useState5 = (0, _react.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    messages = _useState6[0],
    setMessages = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    loading = _useState8[0],
    setLoading = _useState8[1];
  var inactivityTimer = (0, _react.useRef)(null);
  var messagesContainerRef = (0, _react.useRef)(null);
  var previousMessagesLength = (0, _react.useRef)(0);
  var _useState9 = (0, _react.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    shouldScrollToBottom = _useState10[0],
    setShouldScrollToBottom = _useState10[1];
  (0, _react.useEffect)(function () {
    var unsubscribe = fetchChats();
    return function () {
      return unsubscribe();
    };
  }, []);
  (0, _react.useEffect)(function () {
    var unsubscribe;
    if (selectedChat && selectedChat.id) {
      var chatRef = (0, _firestore.doc)(_firebase.db, 'chat', selectedChat.id);
      unsubscribe = (0, _firestore.onSnapshot)(chatRef, function (docSnap) {
        if (docSnap.exists()) {
          var updatedChat = docSnap.data();
          var newMessages = updatedChat.messages || [];
          setMessages(newMessages);
          setSelectedChat(function (prevChat) {
            return _objectSpread(_objectSpread({}, prevChat), updatedChat);
          });

          // Sprawdź, czy pojawiła się nowa wiadomość
          if (newMessages.length > previousMessagesLength.current) {
            var latestMessage = newMessages[newMessages.length - 1];
            if (latestMessage.sender === 'client') {
              // Jeśli użytkownik jest blisko dołu, przewiń do najnowszej wiadomości
              if (isAtBottom()) {
                setShouldScrollToBottom(true);
              }
            } else if (latestMessage.sender === 'admin') {
              // Jeśli wysłaliśmy wiadomość, przewiń do dołu
              setShouldScrollToBottom(true);
            }
          }
          previousMessagesLength.current = newMessages.length;
        } else {
          // Dokument został usunięty
          setSelectedChat(null);
          setMessages([]);
          clearTimeout(inactivityTimer.current); // Wyczyść timer nieaktywności
        }
      });
    }
    return function () {
      if (unsubscribe) unsubscribe();
    };
  }, [selectedChat]);
  (0, _react.useEffect)(function () {
    if (messagesContainerRef.current && shouldScrollToBottom) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      setShouldScrollToBottom(false);
    }
  }, [messages, shouldScrollToBottom]);
  var isAtBottom = function isAtBottom() {
    if (!messagesContainerRef.current) return false;
    var _messagesContainerRef = messagesContainerRef.current,
      scrollTop = _messagesContainerRef.scrollTop,
      scrollHeight = _messagesContainerRef.scrollHeight,
      clientHeight = _messagesContainerRef.clientHeight;
    return scrollHeight - scrollTop <= clientHeight + 50; // 50px marginesu
  };
  var fetchChats = function fetchChats() {
    setLoading(true);
    var q = (0, _firestore.query)((0, _firestore.collection)(_firebase.db, 'chat'), (0, _firestore.orderBy)('timestamp', 'desc'), (0, _firestore.limit)(50));
    var unsubscribe = (0, _firestore.onSnapshot)(q, /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(snapshot) {
        var chatsData, deletePromises;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              chatsData = snapshot.docs.map(function (doc) {
                return _objectSpread({
                  id: doc.id
                }, doc.data());
              }); // Usuwanie pustych, zamkniętych czatów
              deletePromises = chatsData.map(/*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(chat) {
                  var chatRef;
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        if (!(chat.closed && (!chat.messages || chat.messages.length === 0))) {
                          _context.next = 4;
                          break;
                        }
                        chatRef = (0, _firestore.doc)(_firebase.db, 'chat', chat.id);
                        _context.next = 4;
                        return (0, _firestore.deleteDoc)(chatRef);
                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }());
              _context2.next = 4;
              return Promise.all(deletePromises);
            case 4:
              // Oznaczanie czatów z nowymi wiadomościami jako nieprzeczytane
              chatsData.forEach(function (chat) {
                if (chat.messages && chat.messages.length > 0) {
                  var latestMessage = chat.messages[chat.messages.length - 1];
                  if (latestMessage.sender === 'client' && (!chat.lastChecked || latestMessage.timestamp.toMillis() > chat.lastChecked.toMillis())) {
                    // Jeśli najnowsza wiadomość od klienta jest nowsza niż lastChecked, ustaw unread na true
                    (0, _firestore.updateDoc)((0, _firestore.doc)(_firebase.db, 'chat', chat.id), {
                      unread: true
                    });
                  }
                }
              });
              setChats(chatsData.filter(function (chat) {
                return !chat.closed || chat.messages && chat.messages.length > 0;
              }));
              setLoading(false);
            case 7:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    return unsubscribe;
  };
  var handleChatSelect = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(chat) {
      var chatRef, chatSnap, chatData, newMessage, updatedMessages;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            setSelectedChat(chat);

            // Aktualizuj unread i lastChecked
            _context3.next = 3;
            return (0, _firestore.updateDoc)((0, _firestore.doc)(_firebase.db, 'chat', chat.id), {
              unread: false,
              lastChecked: new Date()
            });
          case 3:
            if (!(!chat.active && !chat.closed)) {
              _context3.next = 16;
              break;
            }
            _context3.next = 6;
            return (0, _firestore.updateDoc)((0, _firestore.doc)(_firebase.db, 'chat', chat.id), {
              active: true
            });
          case 6:
            // Dodaj wiadomość "połączono z doradcą"
            chatRef = (0, _firestore.doc)(_firebase.db, 'chat', chat.id);
            _context3.next = 9;
            return (0, _firestore.getDoc)(chatRef);
          case 9:
            chatSnap = _context3.sent;
            if (!chatSnap.exists()) {
              _context3.next = 16;
              break;
            }
            chatData = chatSnap.data();
            newMessage = {
              text: 'połączono z doradcą',
              sender: 'admin',
              timestamp: new Date()
            };
            updatedMessages = [].concat(_toConsumableArray(chatData.messages || []), [newMessage]);
            _context3.next = 16;
            return (0, _firestore.updateDoc)(chatRef, {
              messages: updatedMessages
            });
          case 16:
            resetInactivityTimer();
          case 17:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function handleChatSelect(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();
  var handleSendMessage = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(text) {
      var adminMessage, chatRef;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            if (selectedChat) {
              _context4.next = 2;
              break;
            }
            return _context4.abrupt("return");
          case 2:
            adminMessage = {
              text: text,
              sender: 'admin',
              timestamp: new Date()
            };
            chatRef = (0, _firestore.doc)(_firebase.db, 'chat', selectedChat.id);
            _context4.next = 6;
            return (0, _firestore.updateDoc)(chatRef, {
              messages: [].concat(_toConsumableArray(messages), [adminMessage]),
              active: true,
              lastChecked: new Date()
            });
          case 6:
            setShouldScrollToBottom(true);
            resetInactivityTimer();
          case 8:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function handleSendMessage(_x4) {
      return _ref4.apply(this, arguments);
    };
  }();
  var handleCloseChat = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var chatRef, chatSnap;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            if (!(!selectedChat || !selectedChat.id)) {
              _context5.next = 2;
              break;
            }
            return _context5.abrupt("return");
          case 2:
            chatRef = (0, _firestore.doc)(_firebase.db, 'chat', selectedChat.id);
            clearTimeout(inactivityTimer.current);
            _context5.prev = 4;
            _context5.next = 7;
            return (0, _firestore.getDoc)(chatRef);
          case 7:
            chatSnap = _context5.sent;
            if (!chatSnap.exists()) {
              _context5.next = 13;
              break;
            }
            _context5.next = 11;
            return (0, _firestore.updateDoc)(chatRef, {
              active: false,
              closed: true,
              closedWho: 'Doradca'
            });
          case 11:
            _context5.next = 14;
            break;
          case 13:
            console.warn('Dokument czatu nie istnieje.');
          case 14:
            _context5.next = 19;
            break;
          case 16:
            _context5.prev = 16;
            _context5.t0 = _context5["catch"](4);
            console.error('Błąd podczas zamykania czatu:', _context5.t0);
          case 19:
            setSelectedChat(null);
            setMessages([]);
          case 21:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[4, 16]]);
    }));
    return function handleCloseChat() {
      return _ref5.apply(this, arguments);
    };
  }();
  var handleDeleteChat = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      var chatRef;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            if (selectedChat) {
              _context6.next = 2;
              break;
            }
            return _context6.abrupt("return");
          case 2:
            chatRef = (0, _firestore.doc)(_firebase.db, 'chat', selectedChat.id);
            _context6.next = 5;
            return (0, _firestore.deleteDoc)(chatRef);
          case 5:
            setSelectedChat(null);
            setMessages([]);
            setChats(function (prevChats) {
              return prevChats.filter(function (chat) {
                return chat.id !== selectedChat.id;
              });
            });
          case 8:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    return function handleDeleteChat() {
      return _ref6.apply(this, arguments);
    };
  }();
  var formatDate = function formatDate(timestamp) {
    if (timestamp && typeof timestamp.toDate === 'function') {
      return timestamp.toDate().toLocaleString();
    } else if (timestamp instanceof Date) {
      return timestamp.toLocaleString();
    }
    return 'Brak daty';
  };
  var resetInactivityTimer = function resetInactivityTimer() {
    clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(handleCloseChat, 10 * 60 * 1000);
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "admin-chats-container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "chat-list"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Aktywne czaty"), chats.map(function (chat) {
    var _chat$formData;
    return /*#__PURE__*/_react["default"].createElement("li", {
      key: chat.id,
      className: "chat-list-item ".concat((selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.id) === chat.id ? 'selected' : ''),
      onClick: function onClick() {
        return handleChatSelect(chat);
      }
    }, chat.unread && (selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.id) !== chat.id && /*#__PURE__*/_react["default"].createElement("span", {
      className: "unread-indicator"
    }, "\u2757"), /*#__PURE__*/_react["default"].createElement("span", {
      className: "chat-title"
    }, (_chat$formData = chat.formData) !== null && _chat$formData !== void 0 && _chat$formData.funeralHomeName ? "Wybrany dom: ".concat(chat.formData.funeralHomeName) : 'Czat bez tytułu'), /*#__PURE__*/_react["default"].createElement("span", {
      className: "chat-timestamp"
    }, formatDate(chat.timestamp)));
  }), chats.length === 0 && !loading && /*#__PURE__*/_react["default"].createElement("p", null, "Brak czat\xF3w do wy\u015Bwietlenia.")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "chat-details"
  }, selectedChat ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "chat-header"
  }, /*#__PURE__*/_react["default"].createElement("h3", null, "Wybrany dom: ", ((_selectedChat$formDat = selectedChat.formData) === null || _selectedChat$formDat === void 0 ? void 0 : _selectedChat$formDat.funeralHomeName) || 'Anonim'), !selectedChat.closed && /*#__PURE__*/_react["default"].createElement("button", {
    className: "close-chat-button",
    onClick: handleCloseChat
  }, "Zako\u0144cz czat"), /*#__PURE__*/_react["default"].createElement("button", {
    className: "delete-chat-button",
    onClick: handleDeleteChat
  }, "Usu\u0144 czat")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "chat-messages",
    ref: messagesContainerRef
  }, messages.map(function (msg, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      className: "message ".concat(msg.sender),
      style: {
        alignSelf: msg.sender === 'client' ? 'flex-start' : 'flex-end',
        backgroundColor: msg.sender === 'client' ? '#e1ffc7' : '#d1ecf1'
      }
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "sender-name"
    }, msg.sender === 'client' ? 'Klient' : 'Doradca'), /*#__PURE__*/_react["default"].createElement("p", null, msg.text), /*#__PURE__*/_react["default"].createElement("span", {
      className: "timestamp"
    }, formatDate(msg.timestamp)));
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "chat-input"
  }, selectedChat.closed ? /*#__PURE__*/_react["default"].createElement("p", null, "Konwersacja zako\u0144czona przez ", selectedChat.closedWho) : /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    placeholder: "Napisz wiadomo\u015B\u0107...",
    onKeyDown: (/*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(e) {
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              if (!(e.key === 'Enter' && e.target.value.trim())) {
                _context7.next = 4;
                break;
              }
              _context7.next = 3;
              return handleSendMessage(e.target.value.trim());
            case 3:
              e.target.value = '';
            case 4:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      return function (_x5) {
        return _ref7.apply(this, arguments);
      };
    }())
  }))) : /*#__PURE__*/_react["default"].createElement("p", null, "Wybierz czat, aby zobaczy\u0107 szczeg\xF3\u0142y.")));
};
var _default = exports["default"] = AdminChats;