"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _image = _interopRequireDefault(require("next/image"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var NaszaMisja = function NaszaMisja() {
  var missionRef = (0, _react.useRef)(null);
  var imageSectionRef = (0, _react.useRef)(null);
  var valuesRef = (0, _react.useRef)(null);
  var missionOurImageRef = (0, _react.useRef)(null);
  var valuesElementsRef = (0, _react.useRef)([]);
  (0, _react.useEffect)(function () {
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
      // Element will start disappearing 50px before it leaves the viewport
      threshold: 0.1 // Trigger when 10% of the element is visible
    });
    if (missionRef.current) observer.observe(missionRef.current);
    if (imageSectionRef.current) observer.observe(imageSectionRef.current);
    if (valuesRef.current) observer.observe(valuesRef.current);
    if (missionOurImageRef.current) observer.observe(missionOurImageRef.current);

    // Observe each value element separately
    valuesElementsRef.current.forEach(function (element) {
      if (element) observer.observe(element);
    });
    return function () {
      // Disconnect observer on component unmount
      observer.disconnect();
    };
  }, []);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    id: "o-nas",
    className: "mission"
  }, /*#__PURE__*/_react["default"].createElement("section", {
    className: "mission-section",
    ref: missionRef
  }, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "mission-section-title"
  }, "O nas"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "mission-section-description"
  }, "Polskidompogrzebowy.pl to innowacyjny pomys\u0142, kt\xF3ry ma po\u0142\u0105czy\u0107 ze sob\u0105 zak\u0142ady pogrzebowe z ca\u0142ej Polski. Ma pom\xF3c w usprawnieniu organizacji pogrzeb\xF3w i wsparciu rodzin w trudnych chwilach. Jeste\u015Bmy tu, aby za\u0142atwi\u0107 wi\u0119kszo\u015B\u0107 formalno\u015Bci za Ciebie, a nasza strona jest ca\u0142kowicie darmowa dla klient\xF3w. Jako pierwsi jeste\u015Bmy przewodnikiem w kwestii, co zrobi\u0107 po \u015Bmierci bliskiej osoby. Na pocz\u0105tkowym etapie nasza platforma ma na celu wizualizacj\u0119 i pomoc w organizacji pogrzebu oraz wsparcie rodzin.")), /*#__PURE__*/_react["default"].createElement("section", {
    className: "image-section",
    ref: imageSectionRef
  }, /*#__PURE__*/_react["default"].createElement(_image["default"], {
    src: "/assets/images/panoramiczne.webp",
    alt: "panoramiczne",
    fill: true,
    style: {
      objectFit: 'cover'
    }
  })), /*#__PURE__*/_react["default"].createElement("section", {
    id: "nasza-misja",
    className: "mission-our"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "mission-our-main",
    ref: missionOurImageRef
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Nasza misja"), /*#__PURE__*/_react["default"].createElement("p", null, "Nasz\u0105 misj\u0105 jest zapewnienie rodzinom dost\u0119pu do najwy\u017Cszej jako\u015Bci us\u0142ug pogrzebowych w ca\u0142ej Polsce. Wsp\xF3\u0142pracujemy z zaufanymi zak\u0142adami pogrzebowymi, aby zapewni\u0107 profesjonaln\u0105 i godn\u0105 organizacj\u0119 ceremonii po\u017Cegnalnych.")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mission-our-image"
  }, /*#__PURE__*/_react["default"].createElement(_image["default"], {
    src: "/assets/images/our-mission.webp",
    alt: "nasza misja",
    fill: true,
    style: {
      objectFit: 'cover'
    },
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  }))), /*#__PURE__*/_react["default"].createElement("section", {
    id: "nasze-wartosci",
    className: "mission-values",
    ref: valuesRef
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Nasze warto\u015Bci"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mission-values-main"
  }, [{
    text: 'Empatia',
    href: 'empatia',
    description: 'Rozumiemy, jak trudny jest to czas dla naszych klientów.'
  }, {
    text: 'Profesjonalizm',
    href: 'professional',
    description: 'Współpracujemy tylko z doświadczonymi i sprawdzonymi zakładami pogrzebowymi.'
  }, {
    text: 'Dostępność',
    href: 'dostepnosc',
    description: 'Nasza platforma jest dostępna 24/7, aby zawsze być wsparciem dla naszych klientów.'
  }, {
    text: 'Transparentność',
    href: 'transparent',
    description: 'Zapewniamy jasne i przejrzyste informacje na każdym etapie organizacji pogrzebu.'
  }].map(function (value, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "mission-values-main-element",
      key: index,
      ref: function ref(el) {
        return valuesElementsRef.current[index] = el;
      }
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "icon-container"
    }, /*#__PURE__*/_react["default"].createElement(_image["default"], {
      src: "/assets/icons/".concat(value.href.toLowerCase(), ".png"),
      alt: value.text,
      width: 50,
      height: 50
    })), /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("strong", null, value.text, ":", /*#__PURE__*/_react["default"].createElement("br", null)), " ", value.description));
  })))));
};
var _default = exports["default"] = NaszaMisja;