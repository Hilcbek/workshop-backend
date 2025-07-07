"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUser = exports.isAdmin = exports.authMiddleware = void 0;
var _enviromental = require("../config/enviromental");
var _apierror = require("../error/apierror");
var _constant = require("../utils/constant");
var _httpStatus = _interopRequireDefault(require("http-status"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var authMiddleware = exports.authMiddleware = function authMiddleware(req, res, next) {
  try {
    var _req$headers;
    var token = (_req$headers = req.headers) === null || _req$headers === void 0 || (_req$headers = _req$headers.authorization) === null || _req$headers === void 0 ? void 0 : _req$headers.split(" ")[1];
    if (!token) throw new _apierror.ApiError(_constant.logMessages.unAuthorized, _httpStatus["default"].UNAUTHORIZED);
    _jsonwebtoken["default"].verify(token, _enviromental.JWT_SECRET, function (err, data) {
      if (err) throw new _apierror.ApiError(_constant.logMessages.sessionExpired, _httpStatus["default"].UNAUTHORIZED);
      req.user = data;
      next();
    });
  } catch (error) {
    next(error);
  }
};
var isUser = exports.isUser = function isUser(req, res, next) {
  try {
    authMiddleware(req, res, function () {
      var _req$user;
      if (((_req$user = req.user) === null || _req$user === void 0 ? void 0 : _req$user.role) !== 'user') throw new _apierror.ApiError(_constant.logMessages.mustBeUser, _httpStatus["default"].UNAUTHORIZED);
      next();
    });
  } catch (error) {}
};
var isAdmin = exports.isAdmin = function isAdmin(req, res, next) {
  try {
    authMiddleware(req, res, function () {
      var _req$user2, _req$user3;
      console.log((_req$user2 = req.user) === null || _req$user2 === void 0 ? void 0 : _req$user2.role);
      if (((_req$user3 = req.user) === null || _req$user3 === void 0 ? void 0 : _req$user3.role) !== 'admin') throw new _apierror.ApiError(_constant.logMessages.unAuthorized, _httpStatus["default"].UNAUTHORIZED);
      next();
    });
  } catch (error) {
    next(error);
  }
};