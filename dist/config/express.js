"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _winston = require("./winston");
var _apierror = require("../error/apierror");
var _router = require("./router");
var _cors = _interopRequireDefault(require("cors"));
var _rateLimit = require("./rateLimit");
var app = exports.app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _morgan["default"])('combined', {
  stream: {
    write: function write(message) {
      return _winston.logger.info(message);
    }
  }
}));
app.use((0, _cors["default"])({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(/*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _t;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 1;
          return _rateLimit.rateLimiter.consume(req.ip);
        case 1:
          next();
          _context.next = 3;
          break;
        case 2:
          _context.prev = 2;
          _t = _context["catch"](0);
          res.status(429).json({
            message: 'Too many requests, please try again later.'
          });
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 2]]);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
app.use('/api', _router.router);
app.use(function (err, req, res, next) {
  console.log(err);
  if (err instanceof _apierror.ApiError) {
    if (err.isPublic) {
      var message = err.message || 'Something went wrong';
      res.status(err.status).json({
        error: message
      });
    } else {
      res.status(err.status).json({
        error: 'Something went wrong'
      });
    }
  } else {
    _winston.logger.error(err);
    res.status(500).json({
      error: err.message
    });
  }
  next();
});