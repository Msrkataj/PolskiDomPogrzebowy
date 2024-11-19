"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var StarRating = function StarRating(_ref) {
  var rating = _ref.rating;
  var totalStars = 5;
  if (rating === undefined) {
    return /*#__PURE__*/_react["default"].createElement("p", null, "Brak oceny");
  }
  var filledStars = Math.round(rating);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "star-rating"
  }, /*#__PURE__*/_react["default"].createElement("p", null, "Ocena: "), Array.from({
    length: totalStars
  }, function (_, index) {
    return /*#__PURE__*/_react["default"].createElement("span", {
      key: index,
      className: index < filledStars ? 'filled' : ''
    }, "\u2605");
  }));
};
var _default = exports["default"] = StarRating;