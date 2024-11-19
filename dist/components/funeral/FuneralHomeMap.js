"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _api = require("@react-google-maps/api");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var mapContainerStyle = {
  height: "400px",
  width: "100%"
};
var options = {
  disableDefaultUI: true,
  zoomControl: true
};
var FuneralHomeMap = function FuneralHomeMap(_ref) {
  var latitude = _ref.latitude,
    longitude = _ref.longitude,
    name = _ref.name;
  var mapRef = (0, _react.useRef)();
  var onLoad = function onLoad(map) {
    mapRef.current = map;
  };
  var markerPosition = {
    lat: parseFloat(latitude),
    lng: parseFloat(longitude)
  };
  return /*#__PURE__*/_react["default"].createElement(_api.GoogleMap, {
    mapContainerStyle: mapContainerStyle,
    center: markerPosition,
    zoom: 15,
    onLoad: onLoad,
    options: options
  }, /*#__PURE__*/_react["default"].createElement(_api.Marker, {
    position: markerPosition,
    icon: {
      url: "/assets/icons/marker.png",
      scaledSize: new window.google.maps.Size(30, 40)
    }
  }));
};
var _default = exports["default"] = FuneralHomeMap;