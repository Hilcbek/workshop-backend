"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redisClient = void 0;
var _ioredis = _interopRequireDefault(require("ioredis"));
var _enviromental = require("./enviromental");
var _winston = require("./winston");
var redisClient = exports.redisClient = new _ioredis["default"]({
  host: _enviromental.REDIS_HOST,
  port: _enviromental.REDIS_PORT,
  username: _enviromental.REDIS_USERNAME,
  password: _enviromental.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  lazyConnect: true
});
redisClient.on('connect', function () {
  _winston.logger.info('[Redis] Connecting to server...');
});
redisClient.on('ready', function () {
  _winston.logger.info('[Redis] Connection is ready.');
});
redisClient.on('reconnecting', function (time) {
  _winston.logger.info("[Redis] Reconnecting... delay: ".concat(time, "ms"));
});
redisClient.on('error', function (err) {
  _winston.logger.error('[Redis] Error:', err);
});
redisClient.on('close', function () {
  _winston.logger.warn('[Redis] Connection closed.');
});
redisClient.on('end', function () {
  console.warn('[Redis] Connection ended.');
});
redisClient.on('select', function (db) {
  console.log("[Redis] Selected database ".concat(db));
});