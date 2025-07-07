"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.workshopQueue = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _constant = require("../utils/constant");
var _queue = require("./queue");
var _bullmq = require("bullmq");
var _winston = require("./winston");
var _utils = require("../utils/utils");
var workshopQueue = exports.workshopQueue = new _bullmq.Queue(_constant.queueName, {
  connection: _queue.redisClient,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  lazyConnect: true,
  retryStrategy: function retryStrategy(times) {
    return Math.min(times * 50, 2000);
  }
});
_queue.redisClient.on('error', function (err) {
  return _winston.logger.info('Redis Client Error', err);
});
var worker = new _bullmq.Worker(_constant.queueName, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(job) {
    var _t;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log('job.data ', job.data);
          _t = job.data.type;
          _context.next = _t === 'email' ? 1 : 2;
          break;
        case 1:
          return _context.abrupt("return", (0, _utils.sendEmail)(job.data.data));
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}(), {
  connection: _queue.redisClient
});
worker.on('completed', function (job) {
  _winston.logger.info("Job ".concat(job, " completed"));
});
worker.on('failed', function (job, err) {
  _winston.logger.error("Job ".concat(job === null || job === void 0 ? void 0 : job.id, " failed"), err);
});