"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _image = _interopRequireDefault(require("next/image"));
var _chessboard = _interopRequireDefault(require("../../public/assets/images/chessboard.webp"));
var _link = _interopRequireDefault(require("next/link"));
var _dynamic = _interopRequireDefault(require("next/dynamic"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Importowanie tła

var HowItWorks = function HowItWorks() {
  var steps = [{
    step: "Krok 1:",
    title: "Zgłoszenie śmierci",
    description: "Podaj podstawowe informacje oraz wybierz miejsce zgonu (dom, szpital). Wybieramy zakład pogrzebowy z naszej bazy, który znajduje się najbliżej Twojej lokalizacji.",
    icon: "/assets/imgIcon/death-notification.png"
  }, {
    step: "Krok 2:",
    title: "Wypełnienie formularza",
    description: "Uzupełnij formularz z szczegółowymi danymi zmarłego, dokumenty oraz informacje o preferowanej formie pogrzebu. Możesz również przesłać niezbędne dokumenty online.",
    icon: "/assets/imgIcon/form.png"
  }, {
    step: "Krok 3:",
    title: "Załatwianie formalności",
    description: "Nasza platforma pomoże Ci w załatwieniu wszystkich formalności, takich jak uzyskanie aktów zgonu, załatwienie ZUS/KRUS/MSWiA oraz pełnomocnictwa. Wysyłamy potrzebne druki i pomagamy w ich wypełnieniu.",
    icon: "/assets/imgIcon/formalities.png"
  }, {
    step: "Krok 4:",
    title: "Wybór asortymentu",
    description: "Przeglądaj gotowe zestawy trumien, urn i innych akcesoriów pogrzebowych. Nasz system może zaproponować asortyment na podstawie poprzednich preferencji oraz dostępnego budżetu.",
    icon: "/assets/imgIcon/assortment.png"
  }, {
    step: "Krok 5:",
    title: "Organizacja ceremonii",
    description: "Wybierz rodzaj ceremonii (świecka, religijna) oraz mistrza ceremonii. Zdecyduj o dodatkowych elementach, takich jak świece, muzyka, ubranie zmarłego oraz możliwość odczytania mowy pożegnalnej.",
    icon: "/assets/imgIcon/ceremony.png"
  }, {
    step: "Krok 6:",
    title: "Potwierdzenie i realizacja",
    description: "Po złożeniu wszystkich informacji, nasz zespół skontaktuje się z Tobą w celu potwierdzenia szczegółów. Wszystkie wybrane elementy zostaną zrealizowane zgodnie z Twoimi życzeniami.",
    icon: "/assets/imgIcon/confirmation.png"
  }];
  return /*#__PURE__*/_react["default"].createElement("div", {
    id: "how-it-works",
    className: "how-it-works-container"
  }, /*#__PURE__*/_react["default"].createElement("section", {
    className: "how-it-works-section"
  }, /*#__PURE__*/_react["default"].createElement("p", null, "Jak to dzia\u0142a?"), /*#__PURE__*/_react["default"].createElement("h2", null, "Wsparcie na ka\u017Cdym etapie organizacji pogrzebu"), /*#__PURE__*/_react["default"].createElement("p", null, "Dzi\u0119ki naszemu systemowi, dobierzemy dla Ciebie odpowiedni dom pogrzebowy w Twojej okolicy..."), /*#__PURE__*/_react["default"].createElement("div", {
    className: "steps-grid"
  }, steps.map(function (item, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      className: "step-card"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "step-header"
    }, item.step), /*#__PURE__*/_react["default"].createElement("h4", null, item.title), /*#__PURE__*/_react["default"].createElement("p", null, item.description), /*#__PURE__*/_react["default"].createElement("div", {
      className: "image-wrapper"
    }, /*#__PURE__*/_react["default"].createElement(_image["default"], {
      src: item.icon,
      alt: item.title,
      width: 150,
      height: 150,
      style: {
        objectFit: 'contain'
      },
      loading: "lazy"
    })));
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "action-button"
  }, /*#__PURE__*/_react["default"].createElement(_link["default"], {
    href: "/szukaj",
    className: "change-button"
  }, "Przekonaj si\u0119 jakie to \u0142atwe"))));
};
var _default = exports["default"] = (0, _dynamic["default"])(function () {
  return Promise.resolve(HowItWorks);
}, {
  ssr: false
});