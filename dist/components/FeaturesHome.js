"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _image = _interopRequireDefault(require("next/image"));
var _house = _interopRequireDefault(require("../../public/assets/icons/house.webp"));
var _panel = _interopRequireDefault(require("../../public/assets/icons/panel.webp"));
var _support = _interopRequireDefault(require("../../public/assets/icons/support.webp"));
var _dynamic = _interopRequireDefault(require("next/dynamic"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var FeaturesSection = function FeaturesSection() {
  var features = [{
    icon: _house["default"],
    title: 'Kompleksowa organizacja pogrzebu z domu',
    description: 'Dzięki naszemu portalowi możesz zorganizować wszystko bez wychodzenia z domu. Współpracujemy z najbardziej profesjonalnymi zakładami pogrzebowymi, aby zapewnić najlepszy asortyment w specjalnej cenie.'
  }, {
    icon: _panel["default"],
    title: 'Stały Dostęp do Panelu Zarządzania',
    description: 'Stały dostęp do Twojego panelu, gdzie na bieżąco możesz monitorować proces organizacji pogrzebu. Udostępnij bliskim informacje o przebiegu ceremonii, aby wspólnie, mimo odległości, uczestniczyć w tych trudnych chwilach.'
  }, {
    icon: _support["default"],
    title: 'Profesjonalna pomoc od początku do końca',
    description: 'Nie zostawimy Cię po pogrzebie. Jesteśmy do Twojej dyspozycji, oferując pomoc psychologiczną, prawną oraz wsparcie w załatwianiu spraw urzędowych i spadkowych. Zapewniamy również opiekę nad miejscem pochówku.'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("section", {
    id: "kim-jestesmy",
    className: "features-section"
  }, /*#__PURE__*/React.createElement("h2", null, "Kim jeste\u015Bmy i co oferujemy?"), /*#__PURE__*/React.createElement("div", {
    className: "features-container flex-center"
  }, features.map(function (feature, index) {
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: "feature-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "feature-image"
    }, /*#__PURE__*/React.createElement(_image["default"], {
      src: feature.icon,
      alt: feature.title,
      fill: true,
      sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
      loading: "lazy",
      style: {
        objectFit: "contain"
      }
    })), /*#__PURE__*/React.createElement("h3", null, feature.title), /*#__PURE__*/React.createElement("p", null, feature.description));
  }))));
};
var _default = exports["default"] = (0, _dynamic["default"])(function () {
  return Promise.resolve(FeaturesSection);
}, {
  ssr: false
});