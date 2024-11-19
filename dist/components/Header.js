"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _link = _interopRequireDefault(require("next/link"));
var _data = _interopRequireDefault(require("../data/data.json"));
var _image = _interopRequireDefault(require("next/image"));
var _router = require("next/router");
var _firestore = require("firebase/firestore");
var _firebase = require("../../firebase");
var _dynamic = _interopRequireDefault(require("next/dynamic"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var HeaderMenu = function HeaderMenu() {
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    active = _useState2[0],
    setActive = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    loggedInUser = _useState4[0],
    setLoggedInUser = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    userRole = _useState6[0],
    setUserRole = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    hasNewChatMessage = _useState8[0],
    setHasNewChatMessage = _useState8[1];
  var router = (0, _router.useRouter)();
  (0, _react.useEffect)(function () {
    if (typeof window !== 'undefined') {
      var role = localStorage.getItem('userRole');
      var email = localStorage.getItem('userEmail');
      if (role && email) {
        setUserRole(role);
        setLoggedInUser(email);
      }
      var unsubscribe;
      if (role === 'admin' || role === 'funeralHome') {
        var chatQuery = (0, _firestore.query)((0, _firestore.collection)(_firebase.db, 'chat'), (0, _firestore.where)('unread', '==', true));
        unsubscribe = (0, _firestore.onSnapshot)(chatQuery, function (snapshot) {
          setHasNewChatMessage(!snapshot.empty);
        });
      }
      return function () {
        if (unsubscribe) unsubscribe();
      };
    }
  }, []);
  var toggleMenu = function toggleMenu() {
    setActive(!active);
    if (!active) {
      document.body.classList.add('no-scroll');
    } else {
      setTimeout(function () {
        document.body.classList.remove('no-scroll');
      }, 500);
    }
  };
  var handleLogout = function handleLogout() {
    if (typeof window !== 'undefined') {
      localStorage.clear();
      setLoggedInUser(null);
      setUserRole(null);
      router.push('/');
    }
  };
  var getPanelLink = function getPanelLink() {
    switch (userRole) {
      case 'client':
        return '/client/panel';
      case 'funeralHome':
        return '/funeral/panel';
      case 'admin':
        return '/admin/panel';
      default:
        return '/login';
    }
  };
  var getMenuData = function getMenuData() {
    if (userRole === 'funeralHome') {
      return {
        items: _data["default"].FuneralmenuItems,
        mobileItems: _data["default"].FuneralmenuMobileItems
      };
    } else if (userRole === 'admin') {
      return {
        items: _data["default"].AdminmenuItems,
        mobileItems: _data["default"].AdminmenuMobileItems
      };
    } else {
      return {
        items: _data["default"].menuItems,
        mobileItems: _data["default"].menuMobileItems
      };
    }
  };
  var _getMenuData = getMenuData(),
    menuItems = _getMenuData.items,
    menuMobileItems = _getMenuData.mobileItems;
  return /*#__PURE__*/_react["default"].createElement("header", {
    className: "header"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "header-top"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "logo-container"
  }, /*#__PURE__*/_react["default"].createElement(_link["default"], {
    href: "/",
    className: "logo-container-img"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "logo-image"
  }, /*#__PURE__*/_react["default"].createElement(_image["default"], {
    src: "/assets/logo.webp",
    alt: "Polskidompogrzebowy.pl",
    fill: true,
    sizes: "(max-width: 768px) 205vw, 300px",
    priority: true,
    style: {
      objectFit: "contain"
    }
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "login-panel login-panel-desktop"
  }, loggedInUser ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "login-panel-logout"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "login-text"
  }, "Witaj, ", loggedInUser), userRole !== 'funeralHome' && userRole !== 'admin' && /*#__PURE__*/_react["default"].createElement(_link["default"], {
    href: getPanelLink()
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "login-text"
  }, "Tw\xF3j panel")), /*#__PURE__*/_react["default"].createElement("button", {
    className: "logout-button",
    onClick: handleLogout
  }, "Wyloguj")) : /*#__PURE__*/_react["default"].createElement(_link["default"], {
    href: "/login"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: "button-login"
  }, "Zaloguj si\u0119")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "nav-container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "hamburger-menu",
    onClick: toggleMenu
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: active ? "activeHamburger" : "hamburger"
  })), /*#__PURE__*/_react["default"].createElement("nav", {
    className: "nav"
  }, /*#__PURE__*/_react["default"].createElement("ul", null, menuItems && menuItems.map(function (item, index) {
    return /*#__PURE__*/_react["default"].createElement("li", {
      key: index
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "nav-image"
    }, /*#__PURE__*/_react["default"].createElement(_image["default"], {
      src: item.img,
      alt: item.name,
      width: 32,
      height: 32,
      style: {
        objectFit: 'contain'
      },
      loading: "lazy"
    })), /*#__PURE__*/_react["default"].createElement(_link["default"], {
      href: item.href
    }, item.name, item.name === 'Czat' && hasNewChatMessage && /*#__PURE__*/_react["default"].createElement("span", {
      className: "unread-indicator"
    }, "\u2757")));
  }))), /*#__PURE__*/_react["default"].createElement("aside", {
    className: "sidenav ".concat(active ? "active" : "")
  }, /*#__PURE__*/_react["default"].createElement("ul", null, menuMobileItems && menuMobileItems.map(function (item, index) {
    return /*#__PURE__*/_react["default"].createElement("li", {
      key: index,
      onClick: toggleMenu
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "nav-image"
    }, /*#__PURE__*/_react["default"].createElement(_image["default"], {
      src: item.img,
      alt: item.name,
      width: 32,
      height: 32,
      style: {
        objectFit: 'contain'
      },
      loading: "lazy"
    })), /*#__PURE__*/_react["default"].createElement(_link["default"], {
      href: item.href
    }, item.name, item.name === 'Czat' && hasNewChatMessage && /*#__PURE__*/_react["default"].createElement("span", {
      className: "unread-indicator"
    }, "\u2757")));
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "login-panel login-panel-mobile"
  }, loggedInUser ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "login-panel-logout "
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "login-text"
  }, "Witaj, ", loggedInUser), userRole !== 'funeralHome' && userRole !== 'admin' && /*#__PURE__*/_react["default"].createElement(_link["default"], {
    href: getPanelLink()
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "login-text"
  }, "Tw\xF3j panel")), /*#__PURE__*/_react["default"].createElement("button", {
    className: "logout-button",
    onClick: handleLogout
  }, "Wyloguj")) : /*#__PURE__*/_react["default"].createElement(_link["default"], {
    href: "/login"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: "login-text"
  }, "Zaloguj si\u0119"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "login-panel-mobile-info"
  }, /*#__PURE__*/_react["default"].createElement("p", null, "Telefon kontaktowy"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "phone-number"
  }, "600 000 000")))));
};
var _default = exports["default"] = (0, _dynamic["default"])(function () {
  return Promise.resolve(HeaderMenu);
}, {
  ssr: false
});