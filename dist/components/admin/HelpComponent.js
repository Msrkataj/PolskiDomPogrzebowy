"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _router = require("next/router");
var _link = _interopRequireDefault(require("next/link"));
var _AuthGuard = _interopRequireDefault(require("@/components/panel/AuthGuard"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var statusDescriptions = {
  'Nowe zgłoszenie': 'To jest początkowy etap zamówienia, w którym zgłoszenie zostało odebrane, ale jeszcze nie rozpoczęto jego przetwarzania. W tym momencie zamówienie oczekuje na dalsze kroki weryfikacyjne i administracyjne, zanim zostanie przekazane do kolejnych etapów realizacji.',
  'Weryfikacja danych': 'Zamówienie jest w trakcie szczegółowej weryfikacji danych dostarczonych przez klienta. Ten etap obejmuje sprawdzenie poprawności danych kontaktowych, zgodności dokumentów, oraz upewnienie się, że wszystkie wymagane informacje zostały dostarczone. Może to również obejmować kontakt z klientem w celu wyjaśnienia nieścisłości lub uzupełnienia brakujących informacji.',
  'Oczekiwanie na dokumenty': 'Ten etap następuje, gdy zamówienie wymaga dodatkowych dokumentów lub informacji od klienta. Zamówienie nie może przejść do kolejnych etapów, dopóki nie zostaną dostarczone wszystkie wymagane dokumenty, takie jak akt zgonu, zgoda na pochówek, itp. W tym czasie administracja monitoruje postęp w dostarczaniu brakujących dokumentów.',
  'Planowanie ceremonii': 'Na tym etapie ustalane są szczegóły ceremonii pogrzebowej, w tym daty, godziny, miejsca, a także specyficzne życzenia rodziny zmarłego. Obejmuje to również koordynację z duchownymi, usługodawcami i innymi zaangażowanymi stronami. Celem jest opracowanie szczegółowego planu, który spełni wszystkie wymagania i oczekiwania klienta.',
  'Potwierdzenie terminu': 'Termin ceremonii został uzgodniony z klientem oraz wszystkimi zaangażowanymi stronami. W tym momencie harmonogram jest oficjalnie zatwierdzony, a klient jest informowany o ostatecznych ustaleniach. Obejmuje to również rezerwację wszelkich zasobów, takich jak kaplica, sala pożegnań, czy transport.',
  'Przygotowanie miejsca pochówku': 'Zespół przygotowuje miejsce pochówku zgodnie z ustaleniami. Może to obejmować przygotowanie grobu, dostarczenie i ustawienie namiotu nad grobem, oraz wszelkie inne prace związane z przygotowaniem miejsca do ceremonii. Na tym etapie zapewnia się, że miejsce pochówku spełnia wszystkie wymagania estetyczne i techniczne.',
  'Oczekiwanie na odbiór trumny/urny': 'Czekamy na dostawę lub odbiór wybranego asortymentu przez klienta. Obejmuje to przygotowanie trumny lub urny oraz wszelkich innych zamówionych elementów, które muszą być gotowe na czas ceremonii. Może również obejmować personalizację lub inskrypcje na trumnie/urnie.',
  'Przygotowanie ciała': 'Ciało zmarłego jest przygotowywane do pochówku lub kremacji zgodnie z życzeniami rodziny. Ten proces może obejmować mycie, ubieranie, balsamowanie, makijaż, oraz inne zabiegi kosmetyczne. W przypadku kremacji, ciało jest przygotowywane zgodnie z wymaganiami krematorium. W tym czasie zapewnia się, że zmarły jest traktowany z należnym szacunkiem i godnością.',
  'Ceremonia pogrzebowa': 'Ceremonia pogrzebowa jest w trakcie realizacji. Na tym etapie wszystkie przygotowania zostały zakończone i odbywa się właściwy pogrzeb. Zespół koordynuje przebieg ceremonii, zapewniając, że wszystko odbywa się zgodnie z planem, w tym przemówienia, modlitwy, muzyka, i inne elementy ceremonii.',
  'Zakończone': 'Wszystkie czynności związane z zamówieniem zostały zakończone, a ceremonia pogrzebowa została pomyślnie przeprowadzona. Obejmuje to również ewentualne działania po ceremonii, takie jak przekazanie dokumentów, uregulowanie płatności, i inne formalności. Zamówienie zostaje zamknięte i archiwizowane.'
};
var Help = function Help() {
  var router = (0, _router.useRouter)();
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "help-container"
  }, /*#__PURE__*/_react["default"].createElement("h1", null, "Centrum Pomocy"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "section faq-section"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Najcz\u0119\u015Bciej Zadawane Pytania (FAQ)"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "faq-item"
  }, /*#__PURE__*/_react["default"].createElement("h3", null, "Jak doda\u0107 nowy dom pogrzebowy?"), /*#__PURE__*/_react["default"].createElement("p", null, "Aby doda\u0107 nowy dom pogrzebowy, przejd\u017A do sekcji \"Domy Pogrzebowe\" w panelu administracyjnym i kliknij przycisk \"Dodaj nowy\". Tam znajduj\u0105 si\u0119 wnioski od domow pogrzebowych. Po akceptowaniu zgloszenia, u\u017Cutkownik dostaje email i has\u0142o wraz linkiem do konfiguracji konta.")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "faq-item"
  }, /*#__PURE__*/_react["default"].createElement("h3", null, "Jak mog\u0119 edytowa\u0107 zam\xF3wienie?"), /*#__PURE__*/_react["default"].createElement("p", null, "Aby edytowa\u0107 zam\xF3wienie, przejd\u017A do sekcji \"Zam\xF3wienia\", wybierz zam\xF3wienie, kt\xF3re chcesz edytowa\u0107, a nast\u0119pnie kliknij \"Edytuj\". Po wprowadzeniu zmian, kliknij \"Zapisz\".")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "faq-item"
  }, /*#__PURE__*/_react["default"].createElement("h3", null, "Co zrobi\u0107, je\u015Bli napotkam b\u0142\u0105d?"), /*#__PURE__*/_react["default"].createElement("p", null, "W przypadku napotkania b\u0142\u0119du, prosimy o kontakt z naszym zespo\u0142em wsparcia technicznego poprzez sekcj\u0119 \"Kontakt z Pomoc\u0105 Techniczn\u0105\" poni\u017Cej."))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "section contact-section"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Kontakt z Pomoc\u0105 Techniczn\u0105"), /*#__PURE__*/_react["default"].createElement("h3", null, "Je\u015Bli potrzebujesz pomocy, skontaktuj si\u0119 z naszym zespo\u0142em wsparcia technicznego:"), /*#__PURE__*/_react["default"].createElement("ul", null, /*#__PURE__*/_react["default"].createElement("li", null, "Email: support@example.com"), /*#__PURE__*/_react["default"].createElement("li", null, "Telefon: +48 123 456 789"), /*#__PURE__*/_react["default"].createElement("li", null, "Godziny wsparcia: Poniedzia\u0142ek - Pi\u0105tek, 9:00 - 17:00"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "section shortcuts-section"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Pomoc - Opis Status\xF3w Zam\xF3wie\u0144"), Object.entries(statusDescriptions).map(function (_ref, index) {
    var _ref2 = _slicedToArray(_ref, 2),
      status = _ref2[0],
      description = _ref2[1];
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      className: "status-description-item"
    }, /*#__PURE__*/_react["default"].createElement("h2", {
      className: "status-title"
    }, status), /*#__PURE__*/_react["default"].createElement("p", {
      className: "status-description"
    }, description));
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "section documentation-section"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Dokumentacja Systemu"), /*#__PURE__*/_react["default"].createElement("p", null, "Tu b\u0119dzie dodatkowa dokumentacja")));
};
var HelpWithAuth = function HelpWithAuth() {
  return /*#__PURE__*/_react["default"].createElement(_AuthGuard["default"], null, /*#__PURE__*/_react["default"].createElement(Help, null));
};
var _default = exports["default"] = HelpWithAuth;