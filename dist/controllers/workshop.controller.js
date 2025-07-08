"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateWorkShopController = exports.getWorkShopController = exports.getAllWorkShopsController = exports.deleteWorkShopController = exports.createWorkShopController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _prismaConfig = _interopRequireDefault(require("../prismaConfig"));
var _httpStatus = _interopRequireDefault(require("http-status"));
var _constant = require("../utils/constant");
var _apierror = require("../error/apierror");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/**
 * 
 * @param {object} req 
 * @param {object} res 
 * 
 * @returns {object}
 */
var createWorkShopController = exports.createWorkShopController = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var doesWorkShopExist, newWorkShop;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 1;
          return _prismaConfig["default"].workshop.findFirst({
            where: {
              title: req.body.title
            }
          });
        case 1:
          doesWorkShopExist = _context.sent;
          if (!doesWorkShopExist) {
            _context.next = 2;
            break;
          }
          throw new _apierror.ApiError(_constant.workShopMessages.workShopAlreadyExist, _httpStatus["default"].BAD_REQUEST);
        case 2:
          _context.next = 3;
          return _prismaConfig["default"].workshop.create({
            data: _objectSpread(_objectSpread({}, req.body), {}, {
              date: new Date(req.body.date)
            })
          });
        case 3:
          newWorkShop = _context.sent;
          res.json({
            data: [newWorkShop],
            status: _httpStatus["default"].CREATED,
            message: _constant.workShopMessages.workShopCreated
          });
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function createWorkShopController(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * 
 * @param {object} req 
 * @param {object} res 
 * 
 * @returns {object}
 */
var updateWorkShopController = exports.updateWorkShopController = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, doesWorkShopExist, updatedWorkShop;
    return _regenerator["default"].wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.next = 1;
          return _prismaConfig["default"].workshop.findFirst({
            where: {
              id: parseInt(id)
            },
            include: {
              bookings: true
            }
          });
        case 1:
          doesWorkShopExist = _context2.sent;
          if (doesWorkShopExist) {
            _context2.next = 2;
            break;
          }
          throw new _apierror.ApiError(_constant.workShopMessages.workShopDoesnotExist, _httpStatus["default"].NOT_FOUND);
        case 2:
          _context2.next = 3;
          return _prismaConfig["default"].workshop.update({
            where: {
              id: parseInt(id)
            },
            data: _objectSpread(_objectSpread({}, req.body), {}, {
              date: new Date(req.body.date)
            }),
            include: {
              bookings: true
            }
          });
        case 3:
          updatedWorkShop = _context2.sent;
          res.json({
            data: [updatedWorkShop],
            status: _httpStatus["default"].OK,
            message: _constant.workShopMessages.workShopUpdated
          });
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function updateWorkShopController(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * 
 * @param {object} req 
 * @param {object} res 
 * 
 * @returns {object}
 */
var getWorkShopController = exports.getWorkShopController = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, doesWorkShopExist;
    return _regenerator["default"].wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id = Number(req.params.id);
          _context3.next = 1;
          return _prismaConfig["default"].workshop.findFirst({
            where: {
              id: parseInt(id)
            },
            include: {
              bookings: true
            }
          });
        case 1:
          doesWorkShopExist = _context3.sent;
          if (doesWorkShopExist) {
            _context3.next = 2;
            break;
          }
          throw new _apierror.ApiError(_constant.workShopMessages.workShopDoesnotExist, _httpStatus["default"].NOT_FOUND);
        case 2:
          res.json({
            data: [doesWorkShopExist],
            status: _httpStatus["default"].OK,
            message: _constant.workShopMessages.workShopFetched
          });
        case 3:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getWorkShopController(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * 
 * @param {object} req 
 * @param {object} res 
 * 
 * @returns {object}
 */
var getAllWorkShopsController = exports.getAllWorkShopsController = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var allWorkshops;
    return _regenerator["default"].wrap(function (_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 1;
          return _prismaConfig["default"].workshop.findMany({
            include: {
              timeSlots: true,
              bookings: true
            }
          });
        case 1:
          allWorkshops = _context4.sent;
          res.json({
            data: allWorkshops,
            status: _httpStatus["default"].OK,
            message: _constant.workShopMessages.allWorkShopFetched
          });
        case 2:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function getAllWorkShopsController(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * 
 * @param {object} req 
 * @param {object} res 
 * 
 * @returns {object}
 */
var deleteWorkShopController = exports.deleteWorkShopController = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, doesWorkShopExist;
    return _regenerator["default"].wrap(function (_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          console.log('deleteWorkShopController ', (0, _typeof2["default"])(req.params.id));
          id = Number(req.params.id);
          _context5.next = 1;
          return _prismaConfig["default"].workshop.findFirst({
            where: {
              id: id
            }
          });
        case 1:
          doesWorkShopExist = _context5.sent;
          if (doesWorkShopExist) {
            _context5.next = 2;
            break;
          }
          throw new _apierror.ApiError(_constant.workShopMessages.workShopDoesnotExist, _httpStatus["default"].NOT_FOUND);
        case 2:
          _context5.next = 3;
          return _prismaConfig["default"].workshop["delete"]({
            where: {
              id: id
            }
          });
        case 3:
          res.json({
            data: [doesWorkShopExist],
            status: _httpStatus["default"].OK,
            message: _constant.workShopMessages.workShopDeleted
          });
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function deleteWorkShopController(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();