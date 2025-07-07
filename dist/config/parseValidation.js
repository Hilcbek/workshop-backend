"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseValidation = void 0;
var _expressValidator = require("express-validator");
var _httpStatus = _interopRequireDefault(require("http-status"));
var _apierror = require("../error/apierror");
var parseValidation = exports.parseValidation = function parseValidation(req, res, next) {
  try {
    var errors = (0, _expressValidator.validationResult)(req);
    if (!errors.isEmpty()) {
      var errorsMessage = errors.array().map(function (err) {
        return ' ' + err.msg;
      });
      throw new _apierror.ApiError(errorsMessage, _httpStatus["default"].BAD_REQUEST);
    }
    next();
  } catch (error) {
    next(error);
  }
};