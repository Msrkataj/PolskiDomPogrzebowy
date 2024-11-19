"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _image = _interopRequireDefault(require("next/image"));
var _phone = _interopRequireDefault(require("../../public/assets/icons/phone.png"));
var _consultant = _interopRequireDefault(require("../../public/assets/icons/consultant.png"));
var _router = require("next/router");
var _reactAutosuggest = _interopRequireDefault(require("react-autosuggest"));
var _link = _interopRequireDefault(require("next/link"));
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
var cities = ['Warszawa', 'Kraków', 'Łódź', 'Wrocław', 'Poznań', 'Gdańsk', 'Szczecin', 'Bydgoszcz', 'Lublin', 'Białystok', 'Katowice', 'Gdynia', 'Częstochowa', 'Radom', 'Toruń', 'Sosnowiec', 'Rzeszów', 'Kielce', 'Gliwice', 'Zabrze', 'Olsztyn', 'Bielsko-Biała', 'Bytom', 'Zielona Góra', 'Rybnik', 'Ruda Śląska', 'Opole', 'Tychy', 'Gorzów Wielkopolski', 'Dąbrowa Górnicza', 'Elbląg', 'Płock', 'Wałbrzych', 'Włocławek', 'Tarnów', 'Chorzów', 'Koszalin', 'Kalisz', 'Legnica', 'Grudziądz', 'Słupsk', 'Jaworzno', 'Jastrzębie-Zdrój', 'Nowy Sącz', 'Jelenia Góra', 'Siedlce', 'Mysłowice', 'Piła', 'Ostrów Wielkopolski', 'Lubin', 'Gniezno', 'Suwałki', 'Głogów', 'Siemianowice Śląskie', 'Ostrowiec Świętokrzyski', 'Stargard', 'Pabianice', 'Leszno', 'Zamość', 'Zawiercie', 'Chełm', 'Biała Podlaska', 'Tarnowskie Góry', 'Pruszków', 'Kędzierzyn-Koźle', 'Łomża', 'Ełk', 'Piotrków Trybunalski', 'Inowrocław', 'Bełchatów', 'Lubartów', 'Ostrowiec Świętokrzyski', 'Racibórz', 'Świdnica', 'Starachowice', 'Tczew', 'Kutno', 'Przemyśl', 'Mielec', 'Bielawa', 'Tarnobrzeg', 'Ciechanów', 'Otwock', 'Mińsk Mazowiecki', 'Nowa Sól', 'Świdnik', 'Kołobrzeg', 'Wejherowo', 'Żory', 'Skarżysko-Kamienna', 'Krosno', 'Knurów', 'Bartoszyce', 'Rumia', 'Jarosław', 'Ząbki', 'Żary', 'Dębica', 'Świnoujście', 'Śrem', 'Sanok', 'Brodnica', 'Łuków', 'Lębork', 'Giżycko', 'Świecie', 'Kościerzyna', 'Ostróda', 'Sopot', 'Sochaczew', 'Zgorzelec', 'Malbork', 'Mława', 'Luboń', 'Kraśnik', 'Police', 'Iława', 'Zielonka', 'Chrzanów', 'Sandomierz', 'Trzebinia', 'Żuromin', 'Wołomin', 'Łańcut', 'Brzeg', 'Łowicz', 'Grajewo', 'Oborniki', 'Dzierżoniów', 'Świebodzin', 'Gostynin', 'Augustów', 'Wadowice', 'Radzionków', 'Szczecinek', 'Września', 'Słubice', 'Choszczno', 'Pszczyna', 'Kobyłka', 'Nowy Tomyśl', 'Koło', 'Kluczbork', 'Rawa Mazowiecka', 'Bytów', 'Łazy', 'Piekary Śląskie', 'Nowy Dwór Mazowiecki', 'Radomsko', 'Środa Wielkopolska', 'Szamotuły', 'Bochnia', 'Łask', 'Wieluń', 'Turek', 'Lubliniec', 'Bielsk Podlaski', 'Złotów', 'Namysłów', 'Opoczno', 'Nakło nad Notecią', 'Świebodzice', 'Gryfino', 'Głowno', 'Kętrzyn', 'Pabianice', 'Nowogard', 'Lubań', 'Koluszki', 'Łapy', 'Gorlice', 'Płońsk', 'Tomaszów Lubelski', 'Mogilno', 'Słomniki', 'Łosice', 'Pułtusk', 'Sieradz', 'Łęczyca', 'Włodawa', 'Pisz', 'Miechów', 'Krotoszyn', 'Gryfice', 'Nysa', 'Rogów', 'Ozorków', 'Kobyłka', 'Czarnków', 'Strzelce Opolskie', 'Łęczna', 'Biała Rawska', 'Konstantynów Łódzki', 'Ząbkowice Śląskie', 'Wronki', 'Piastów', 'Józefów', 'Jarocin', 'Wołów', 'Ślesin', 'Poddębice', 'Brzesko', 'Lubawa', 'Radzymin', 'Piaseczno', 'Węgrów', 'Kozienice', 'Milanówek', 'Jedwabne', 'Nowa Ruda', 'Międzyrzecz', 'Bojanowo', 'Działdowo', 'Łaskarzew'];
var SearchComponent = function SearchComponent(_ref) {
  var handleOpenChat = _ref.handleOpenChat;
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    location = _useState2[0],
    setLocation = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    suggestions = _useState4[0],
    setSuggestions = _useState4[1];
  var router = (0, _router.useRouter)();
  var handleSearch = function handleSearch() {
    if (location.trim()) {
      localStorage.setItem('location', location);
      router.push("/szukaj?location=".concat(location));
    }
  };
  var handleKeyDown = function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  var getSuggestions = function getSuggestions(value) {
    var inputValue = value.trim().toLowerCase();
    var inputLength = inputValue.length;
    return inputLength < 2 ? [] : cities.filter(function (city) {
      return city.toLowerCase().startsWith(inputValue);
    });
  };
  var getSuggestionValue = function getSuggestionValue(suggestion) {
    return suggestion;
  };
  var renderSuggestion = function renderSuggestion(suggestion) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "suggestion-item"
    }, suggestion);
  };
  var onChange = function onChange(event, _ref2) {
    var newValue = _ref2.newValue;
    setLocation(newValue);
  };
  var onSuggestionsFetchRequested = function onSuggestionsFetchRequested(_ref3) {
    var value = _ref3.value;
    setSuggestions(getSuggestions(value));
  };
  var onSuggestionsClearRequested = function onSuggestionsClearRequested() {
    setSuggestions([]);
  };
  var inputProps = {
    placeholder: 'Wpisz miejscowość',
    value: location,
    onChange: onChange,
    onKeyDown: handleKeyDown
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "search-component"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "video-background"
  }, /*#__PURE__*/_react["default"].createElement("video", {
    autoPlay: true,
    loop: true,
    muted: true
  }, /*#__PURE__*/_react["default"].createElement("source", {
    src: "/assets/background-movie.mp4",
    type: "video/mp4"
  }))), /*#__PURE__*/_react["default"].createElement("h1", {
    className: "intro-text"
  }, "Wiemy jak wa\u017Cne jest wsparcie w tym trudnym momencie, pomo\u017Cemy zorganizowa\u0107 wszystkie formalno\u015Bci, ca\u0142\u0105 ceremoni\u0119 bez wychodzenia z domu.."), /*#__PURE__*/_react["default"].createElement("div", {
    className: "search-box"
  }, /*#__PURE__*/_react["default"].createElement("p", null, "Wyszukaj dom pogrzebowy w Twojej miejscowo\u015Bci"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "autosuggest-container"
  }, /*#__PURE__*/_react["default"].createElement(_reactAutosuggest["default"], {
    suggestions: suggestions,
    onSuggestionsFetchRequested: onSuggestionsFetchRequested,
    onSuggestionsClearRequested: onSuggestionsClearRequested,
    getSuggestionValue: getSuggestionValue,
    renderSuggestion: renderSuggestion,
    inputProps: inputProps
  })), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleSearch
  }, "Znajd\u017A dom")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "contact-options flex-center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "option"
  }, /*#__PURE__*/_react["default"].createElement("p", null, "Zadzwo\u0144, pomo\u017Cemy w ka\u017Cdym etapie ceremonii pogrzebowej"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "option-select"
  }, /*#__PURE__*/_react["default"].createElement("a", {
    href: "tel:+48600000000"
  }, /*#__PURE__*/_react["default"].createElement(_image["default"], {
    src: _phone["default"],
    alt: "Phone",
    width: 32,
    height: 32,
    sizes: "(max-width: 768px) 100vw, 32px"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "+48 600 000 000")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "option"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "option-background"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Skontaktuj si\u0119 z Twoim doradc\u0105"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "option-select flex-mobile",
    onClick: handleOpenChat
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_image["default"], {
    src: _consultant["default"],
    alt: "Consultant",
    width: 32,
    height: 32,
    sizes: "(max-width: 768px) 100vw, 32px"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "Doradca")))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "home-title "
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Oszcz\u0119d\u017A czas i za\u0142atw wszystko z domu, w\u0142a\u015Bnie tutaj", /*#__PURE__*/_react["default"].createElement("span", {
    className: "arrow-icon arrow-icon-top"
  }))));
};
var _default = exports["default"] = (0, _dynamic["default"])(function () {
  return Promise.resolve(SearchComponent);
}, {
  ssr: false
});