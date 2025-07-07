"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = void 0;
var _winston = require("winston");
var colorize = _winston.format.colorize,
  combine = _winston.format.combine,
  printf = _winston.format.printf,
  timestamp = _winston.format.timestamp,
  json = _winston.format.json;
var logger = exports.logger = (0, _winston.createLogger)({
  level: 'info',
  format: combine(colorize(), timestamp(), json()),
  transports: [new _winston.transports.Console({
    format: combine(colorize(), printf(function (_ref) {
      var level = _ref.level,
        message = _ref.message;
      return "".concat(level, ": ").concat(message);
    }))
  }), new _winston.transports.File({
    filename: 'error.log',
    level: 'error'
  }), new _winston.transports.File({
    filename: 'app.log',
    level: 'info'
  })]
});