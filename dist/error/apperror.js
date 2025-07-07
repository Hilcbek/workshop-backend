"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppError = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var AppError = exports.AppError = /*#__PURE__*/function (_Error) {
  function AppError(message, status, isPublic) {
    var _this;
    (0, _classCallCheck2["default"])(this, AppError);
    _this = _callSuper(this, AppError, [message]);
    _this.status = status;
    _this.isPublic = isPublic;
    _this.message = message;
    _this.name = _this.constructor.name;
    Error.captureStackTrace(_this, _this.constructor);
    return _this;
  }
  (0, _inherits2["default"])(AppError, _Error);
  return (0, _createClass2["default"])(AppError);
}(/*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));