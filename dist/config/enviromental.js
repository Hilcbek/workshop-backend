"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.USER_EMAIL = exports.REDIS_USERNAME = exports.REDIS_PORT = exports.REDIS_PASSWORD = exports.REDIS_HOST = exports.PORT = exports.JWT_SECRET = exports.DATABASE_URL = exports.APP_PASSWORD = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _apierror = require("../error/apierror");
var _httpStatus = _interopRequireDefault(require("http-status"));
var _winston = require("./winston");
var _path = _interopRequireDefault(require("path"));
var envPath = ".env".concat(process.env.NODE_ENV === 'production' ? '.production' : '');
_dotenv["default"].config({
  path: _path["default"].resolve(process.cwd(), envPath)
});
var envSchema = _joi["default"].object({
  PORT: _joi["default"].number()["default"](3000),
  DATABASE_URL: _joi["default"].string().required(),
  NODE_ENV: _joi["default"].string().valid('development', 'production', 'test').required(),
  JWT_SECRET: _joi["default"].string().required(),
  REDIS_HOST: _joi["default"].string().required(),
  REDIS_PASSWORD: _joi["default"].string().required(),
  REDIS_USERNAME: _joi["default"].string().required(),
  REDIS_PORT: _joi["default"].number().required(),
  APP_PASSWORD: _joi["default"].string().required(),
  USER_EMAIL: _joi["default"].string().required()
}).unknown();
var _envSchema$validate = envSchema.validate(process.env),
  error = _envSchema$validate.error,
  value = _envSchema$validate.value,
  warning = _envSchema$validate.warning;
if (error) {
  throw new _apierror.ApiError("Config validation error: ".concat(error.message), _httpStatus["default"].BAD_REQUEST, true);
}
if (warning) {
  _winston.logger.warn("Config validation warning: ".concat(warning.message));
}
var PORT = exports.PORT = value.PORT || 5000;
var DATABASE_URL = exports.DATABASE_URL = value.DATABASE_URL;
var JWT_SECRET = exports.JWT_SECRET = value.JWT_SECRET;
var REDIS_HOST = exports.REDIS_HOST = value.REDIS_HOST;
var REDIS_PASSWORD = exports.REDIS_PASSWORD = value.REDIS_PASSWORD;
var REDIS_USERNAME = exports.REDIS_USERNAME = value.REDIS_USERNAME;
var REDIS_PORT = exports.REDIS_PORT = value.REDIS_PORT;
var APP_PASSWORD = exports.APP_PASSWORD = value.APP_PASSWORD;
var USER_EMAIL = exports.USER_EMAIL = value.USER_EMAIL;