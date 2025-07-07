"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rateLimiter = void 0;
var _rateLimiterFlexible = require("rate-limiter-flexible");
var _ioredis = _interopRequireDefault(require("ioredis"));
var _enviromental = require("./enviromental");
var redisClient = new _ioredis["default"]({
  host: _enviromental.REDIS_HOST,
  port: Number(_enviromental.REDIS_PORT),
  username: _enviromental.REDIS_USERNAME,
  password: _enviromental.REDIS_PASSWORD
});
var rateLimiter = exports.rateLimiter = new _rateLimiterFlexible.RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'middleware',
  points: 100,
  duration: 100,
  blockDuration: 60 * 60 * 12
});