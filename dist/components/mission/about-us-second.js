"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _image = _interopRequireDefault(require("next/image"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var NaszaMisjaSecond = function NaszaMisjaSecond(_ref) {
  var handleOpenChat = _ref.handleOpenChat;
  var missionHistoryRef = (0, _react.useRef)(null);
  var missionTeamRef = (0, _react.useRef)(null);
  var missionContactRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var elements = [missionHistoryRef, missionTeamRef, missionContactRef];
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, {
      rootMargin: '-50px 0px -50px 0px',
      // Elementy znikają po przekroczeniu 50% ekranu od dołu
      threshold: 0.3 // Elementy pojawiają się, gdy 10% ich powierzchni jest widoczne
    });
    elements.forEach(function (ref) {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
    return function () {
      elements.forEach(function (ref) {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "mission"
  }, /*#__PURE__*/_react["default"].createElement("section", {
    id: "nasza-historia",
    className: "mission-history",
    ref: missionHistoryRef
  }, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "mission-history-title"
  }, "Nasza Historia"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "mission-history-description"
  }, "Polskidompogrzebowy.pl powsta\u0142 z potrzeby stworzenia miejsca, gdzie rodziny mog\u0105 uzyska\u0107 pe\u0142ne wsparcie w trudnych chwilach. Za\u0142o\u017Cyli\u015Bmy nasz\u0105 platform\u0119 z my\u015Bl\u0105 o ludziach, kt\xF3rzy chc\u0105 w spokoju i godno\u015Bci po\u017Cegna\u0107 swoich bliskich, korzystaj\u0105c z najlepszych dost\u0119pnych us\u0142ug.")), /*#__PURE__*/_react["default"].createElement("section", {
    className: "mission-team",
    ref: missionTeamRef
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "mission-team-main"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "mission-team-main-elemets"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Nasz Zesp\xF3\u0142"), /*#__PURE__*/_react["default"].createElement("p", null, "Jeste\u015Bmy grup\u0105 profesjonalist\xF3w z wieloletnim do\u015Bwiadczeniem w bran\u017Cy pogrzebowej. Nasz zesp\xF3\u0142 sk\u0142ada si\u0119 z doradc\xF3w, psycholog\xF3w, prawnik\xF3w oraz ekspert\xF3w od organizacji ceremonii. Wszyscy pracujemy z jednym celem \u2013 zapewni\u0107 naszym klientom jak najlepsze wsparcie.")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mission-team-main-elemets"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Wsp\xF3\u0142praca z Zak\u0142adami Pogrzebowymi"), /*#__PURE__*/_react["default"].createElement("p", null, "Polskidompogrzebowy wsp\xF3\u0142pracuje z wieloma zak\u0142adami pogrzebowymi na terenie ca\u0142ego kraju. Dzi\u0119ki temu mo\u017Cemy zaoferowa\u0107 naszym klientom szeroki wyb\xF3r us\u0142ug i asortymentu, dostosowanych do ich indywidualnych potrzeb. Naszym partnerom zapewniamy transparentno\u015B\u0107 i rzetelno\u015B\u0107 we wsp\xF3\u0142pracy.")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mission-contact",
    ref: missionContactRef
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "mission-contact-title"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Kontakt"), /*#__PURE__*/_react["default"].createElement("p", null, "Je\u015Bli masz pytania lub potrzebujesz pomocy, skontaktuj si\u0119 z nami")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mission-contact-main"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "clip-figure figure-1"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "clip-figure figure-2"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "clip-figure figure-3"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "clip-figure figure-4"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "clip-figure figure-5"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "clip-figure figure-6"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "contact-info"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    href: "tel:+48600000000",
    className: "contact-item"
  }, /*#__PURE__*/_react["default"].createElement(_image["default"], {
    src: "/assets/icons/phone.png",
    alt: "Telefon",
    width: 50,
    height: 50
  }), /*#__PURE__*/_react["default"].createElement("p", null, "+48 600 000 000")), /*#__PURE__*/_react["default"].createElement("a", {
    className: "contact-item",
    onClick: handleOpenChat
  }, /*#__PURE__*/_react["default"].createElement(_image["default"], {
    src: "/assets/icons/consultant.png",
    alt: "Czat",
    width: 50,
    height: 50
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Czat na \u017Cywo")), /*#__PURE__*/_react["default"].createElement("div", {
    href: "mailto:kontakt@pdpogrzebowy.pl",
    className: "contact-item"
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faEnvelope,
    size: "2x"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "kontakt@pdpogrzebowy.pl"))))), /*#__PURE__*/_react["default"].createElement("h2", {
    className: "thank-you"
  }, "Dzi\u0119kujemy za zaufanie. Jeste\u015Bmy tutaj, aby Ci pom\xF3c.")));
};
var _default = exports["default"] = NaszaMisjaSecond;