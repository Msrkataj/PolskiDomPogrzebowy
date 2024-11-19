"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("react");
var _router = require("next/router");
var _auth = require("firebase/auth");
var _firebase = require("../../../firebase");
var useAuthProtection = function useAuthProtection() {
  var router = (0, _router.useRouter)();
  (0, _react.useEffect)(function () {
    var unsubscribe = (0, _auth.onAuthStateChanged)(_firebase.auth, function (user) {
      if (!user) {
        router.push('/login');
      }
    });
    return function () {
      return unsubscribe();
    };
  }, [router]);
};
var _default = exports["default"] = useAuthProtection;