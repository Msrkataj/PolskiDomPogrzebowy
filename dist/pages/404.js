"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _link = _interopRequireDefault(require("next/link"));
var _Header = _interopRequireDefault(require("@/components/Header"));
var _Footer = _interopRequireDefault(require("@/components/Footer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Custom404 = function Custom404() {
  var styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '70vh',
      background: 'linear-gradient(to right, #ff5f6d, #ffc371)',
      color: '#ffffff',
      textAlign: 'center',
      padding: '20px'
    },
    content: {
      maxWidth: '600px'
    },
    title: {
      fontSize: '10rem',
      fontWeight: '900',
      margin: '0',
      color: '#fff'
    },
    subtitle: {
      fontSize: '2rem',
      margin: '10px 0'
    },
    description: {
      fontSize: '1.2rem',
      marginBottom: '30px',
      color: '#f7f7f7'
    },
    button: {
      padding: '15px 30px',
      fontSize: '1.1rem',
      backgroundColor: '#ffffff',
      color: '#ff5f6d',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      transition: 'background-color 0.3s, color 0.3s'
    },
    buttonHover: {
      backgroundColor: '#ff5f6d',
      color: '#ffffff'
    },
    animation: {
      marginTop: '30px',
      animation: 'float 4s ease-in-out infinite'
    },
    image: {
      width: '300px',
      maxWidth: '100%'
    },
    '@keyframes float': {
      '0%': {
        transform: 'translatey(0px)'
      },
      '50%': {
        transform: 'translatey(-20px)'
      },
      '100%': {
        transform: 'translatey(0px)'
      }
    }
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("header", null, /*#__PURE__*/_react["default"].createElement(_Header["default"], null)), /*#__PURE__*/_react["default"].createElement("main", {
    style: styles.container
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: styles.content
  }, /*#__PURE__*/_react["default"].createElement("h1", {
    style: styles.title
  }, "404"), /*#__PURE__*/_react["default"].createElement("p", {
    style: styles.subtitle
  }, "Ups! Nie znale\u017Ali\u015Bmy tej strony."), /*#__PURE__*/_react["default"].createElement("p", {
    style: styles.description
  }, "Strona, kt\xF3rej szukasz, mog\u0142a zosta\u0107 usuni\u0119ta, zmieniono jej nazw\u0119 lub jest tymczasowo niedost\u0119pna."), /*#__PURE__*/_react["default"].createElement(_link["default"], {
    href: "/"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    style: styles.button,
    onMouseEnter: function onMouseEnter(e) {
      return e.target.style.backgroundColor = '#ff5f6d';
    },
    onMouseLeave: function onMouseLeave(e) {
      return e.target.style.backgroundColor = '#ffffff';
    }
  }, "Wr\xF3\u0107 do strony g\u0142\xF3wnej"))), /*#__PURE__*/_react["default"].createElement("div", {
    style: styles.animation
  })), /*#__PURE__*/_react["default"].createElement("footer", null, /*#__PURE__*/_react["default"].createElement(_Footer["default"], null)));
};
var _default = exports["default"] = Custom404;