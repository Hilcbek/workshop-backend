"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rateLimiter = void 0;
var _rateLimiterFlexible = require("rate-limiter-flexible");
var rateLimiter = exports.rateLimiter = new _rateLimiterFlexible.RateLimiterRedis({
  keyPrefix: 'middleware',
  points: 100,
  duration: 100,
  blockDuration: 60 * 60 * 12
});