"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Benefits = function Benefits() {
  var benefits = [{
    title: 'Trumny i Urny',
    description: 'Oferujemy bogaty wybór trumien i urn, aby każdy mógł znaleźć odpowiednią formę pożegnania. Nasze produkty charakteryzują się wysoką jakością wykonania i różnorodnością stylów, które odpowiadają indywidualnym potrzebom i oczekiwaniom.'
  }, {
    title: 'Tabliczki Metalowe i Krzyże',
    description: 'Nasze tabliczki metalowe i krzyże stanowią eleganckie i trwałe elementy upamiętnienia. Dostępne w różnych wzorach i rozmiarach, są idealnym wyborem do umieszczenia na grobach, zapewniając estetyczne i czytelne oznaczenie miejsca pochówku.'
  }, {
    title: 'Wieńce Kwiatowe',
    description: 'Nasza oferta wieńców kwiatowych obejmuje różnorodne kompozycje kwiatowe, które wyrażają szacunek i miłość. Każdy wieniec jest starannie przygotowany z myślą o godnym upamiętnieniu bliskiej osoby, oferując piękno i delikatność w trudnych chwilach.'
  }];
  return /*#__PURE__*/_react["default"].createElement("section", {
    className: "benefits-section"
  }, /*#__PURE__*/_react["default"].createElement("h2", {
    id: "asortyment"
  }, "Szeroki wyb\xF3r asortymentu pogrzebowego"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "benefits-container flex-center"
  }, benefits.map(function (benefit, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      className: "benefit-card"
    }, /*#__PURE__*/_react["default"].createElement("h3", null, benefit.title), /*#__PURE__*/_react["default"].createElement("p", null, benefit.description));
  })));
};
var _default = exports["default"] = Benefits;