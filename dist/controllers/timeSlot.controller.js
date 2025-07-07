"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTimeSlotController = exports.getTimeSlotRelatedhWorkShopId = exports.getSingleTimeSlotController = exports.getAllTimeSlotsController = exports.deleteTimeSlotController = exports.createTimeSlotController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _prismaConfig = _interopRequireDefault(require("../prismaConfig"));
var _httpStatus = _interopRequireDefault(require("http-status"));
var _constant = require("../utils/constant");
var _apierror = require("../error/apierror");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var createTimeSlotController = exports.createTimeSlotController = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, startTime, endTime, maxCapacity, workshopId, existingSlot, newTimeSlot;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, startTime = _req$body.startTime, endTime = _req$body.endTime, maxCapacity = _req$body.maxCapacity, workshopId = _req$body.workshopId;
          _context.next = 1;
          return _prismaConfig["default"].timeSlot.findFirst({
            where: {
              startTime: startTime,
              endTime: endTime,
              workshopId: Number(workshopId),
              isDeleted: false // optional: exclude deleted slots
            }
          });
        case 1:
          existingSlot = _context.sent;
          if (!existingSlot) {
            _context.next = 2;
            break;
          }
          throw new _apierror.ApiError('Time slot already exists for this workshop', _httpStatus["default"].CONFLICT);
        case 2:
          _context.next = 3;
          return _prismaConfig["default"].timeSlot.create({
            data: {
              startTime: startTime,
              endTime: endTime,
              maxCapacity: maxCapacity,
              workshop: {
                connect: {
                  id: Number(workshopId)
                }
              }
            }
          });
        case 3:
          newTimeSlot = _context.sent;
          return _context.abrupt("return", res.status(_httpStatus["default"].CREATED).json({
            data: newTimeSlot,
            status: _httpStatus["default"].CREATED,
            message: _constant.timeSlotMessages.timeSlotCreated
          }));
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function createTimeSlotController(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var updateTimeSlotController = exports.updateTimeSlotController = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, doesTimeSlotExist, updatedTimeSlot;
    return _regenerator["default"].wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.next = 1;
          return _prismaConfig["default"].timeSlot.findFirst({
            where: {
              id: Number(id)
            }
          });
        case 1:
          doesTimeSlotExist = _context2.sent;
          if (doesTimeSlotExist) {
            _context2.next = 2;
            break;
          }
          throw new _apierror.ApiError(_constant.timeSlotMessages.timeSlotDoesnotExist, _httpStatus["default"].NOT_FOUND);
        case 2:
          _context2.next = 3;
          return _prismaConfig["default"].timeSlot.update({
            where: {
              id: Number(id)
            },
            data: _objectSpread({}, req.body),
            include: {
              bookings: true,
              workshop: true
            }
          });
        case 3:
          updatedTimeSlot = _context2.sent;
          res.json({
            data: updatedTimeSlot,
            status: _httpStatus["default"].OK,
            message: _constant.timeSlotMessages.timeSlotUpdated
          });
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function updateTimeSlotController(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var deleteTimeSlotController = exports.deleteTimeSlotController = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, doesTimeSlotExist;
    return _regenerator["default"].wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id = Number(req.params.id);
          _context3.next = 1;
          return _prismaConfig["default"].timeSlot.findFirst({
            where: {
              id: id
            }
          });
        case 1:
          doesTimeSlotExist = _context3.sent;
          if (doesTimeSlotExist) {
            _context3.next = 2;
            break;
          }
          throw new _apierror.ApiError(_constant.timeSlotMessages.timeSlotDoesnotExist, _httpStatus["default"].NOT_FOUND);
        case 2:
          _context3.next = 3;
          return _prismaConfig["default"].timeSlot["delete"]({
            where: {
              id: id
            }
          });
        case 3:
          res.json({
            data: doesTimeSlotExist,
            status: _httpStatus["default"].OK,
            message: _constant.timeSlotMessages.timeSlotDeleted
          });
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function deleteTimeSlotController(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getAllTimeSlotsController = exports.getAllTimeSlotsController = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var allTimeSlots;
    return _regenerator["default"].wrap(function (_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 1;
          return _prismaConfig["default"].timeSlot.findMany({
            include: {
              bookings: true,
              workshop: true
            }
          });
        case 1:
          allTimeSlots = _context4.sent;
          res.json({
            data: allTimeSlots,
            status: _httpStatus["default"].OK,
            message: _constant.timeSlotMessages.timeSlotsFetched
          });
        case 2:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function getAllTimeSlotsController(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getSingleTimeSlotController = exports.getSingleTimeSlotController = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, doesTimeSlotExist;
    return _regenerator["default"].wrap(function (_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          console.log('id ', id);
          _context5.next = 1;
          return _prismaConfig["default"].timeSlot.findFirst({
            where: {
              id: Number(id)
            },
            include: {
              bookings: true,
              workshop: true
            }
          });
        case 1:
          doesTimeSlotExist = _context5.sent;
          if (doesTimeSlotExist) {
            _context5.next = 2;
            break;
          }
          throw new _apierror.ApiError(_constant.timeSlotMessages.timeSlotDoesnotExist, _httpStatus["default"].NOT_FOUND);
        case 2:
          res.json({
            data: [doesTimeSlotExist],
            status: _httpStatus["default"].OK,
            message: _constant.timeSlotMessages.timeSlotFetched
          });
        case 3:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function getSingleTimeSlotController(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();
var getTimeSlotRelatedhWorkShopId = exports.getTimeSlotRelatedhWorkShopId = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var workshopId, timeSlots;
    return _regenerator["default"].wrap(function (_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          workshopId = req.params.workshopId;
          _context6.next = 1;
          return _prismaConfig["default"].timeSlot.findMany({
            where: {
              workshopId: parseInt(workshopId)
            },
            include: {
              bookings: true,
              workshop: true
            }
          });
        case 1:
          timeSlots = _context6.sent;
          res.json({
            data: timeSlots,
            status: _httpStatus["default"].OK,
            message: _constant.timeSlotMessages.allTimeSlotsFetched
          });
        case 2:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function getTimeSlotRelatedhWorkShopId(_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}();