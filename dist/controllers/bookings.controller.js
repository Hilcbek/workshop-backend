"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBookingsController = exports.getSingleBookingController = exports.getAllLoggedUserBookingsController = exports.getAllBookingsController = exports.deleteBookingsController = exports.createBookingsController = exports.analyticsController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _apierror = require("../error/apierror");
var _prismaConfig = _interopRequireDefault(require("../prismaConfig"));
var _constant = require("../utils/constant");
var _httpStatus = _interopRequireDefault(require("http-status"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var createBookingsController = exports.createBookingsController = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var doesBookingExistWitSameTimeSlot, timeSlot, newBooking;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 1;
          return _prismaConfig["default"].booking.findFirst({
            where: {
              timeSlotId: req.body.timeSlotId,
              userId: req.user.id,
              workshopId: req.body.workshopId
            }
          });
        case 1:
          doesBookingExistWitSameTimeSlot = _context.sent;
          if (!doesBookingExistWitSameTimeSlot) {
            _context.next = 2;
            break;
          }
          throw new _apierror.ApiError(_constant.bookingMessages.bookingAlreadyExist, _httpStatus["default"].BAD_REQUEST);
        case 2:
          _context.next = 3;
          return _prismaConfig["default"].timeSlot.findFirst({
            where: {
              id: req.body.timeSlotId
            },
            include: {
              bookings: true
            }
          });
        case 3:
          timeSlot = _context.sent;
          if (!(timeSlot.maxCapacity <= timeSlot.bookings.length)) {
            _context.next = 4;
            break;
          }
          throw new _apierror.ApiError(_constant.timeSlotMessages.timeSlotIsFull, _httpStatus["default"].BAD_REQUEST);
        case 4:
          _context.next = 5;
          return _prismaConfig["default"].booking.create({
            data: _objectSpread(_objectSpread({}, req.body), {}, {
              userId: req.user.id
            }),
            include: {
              timeSlot: true,
              user: {
                select: {
                  id: true,
                  username: true
                }
              },
              workshop: true
            }
          });
        case 5:
          newBooking = _context.sent;
          _context.next = 6;
          return _prismaConfig["default"].timeSlot.update({
            where: {
              id: req.body.timeSlotId
            },
            data: {
              maxCapacity: {
                decrement: 1
              }
            }
          });
        case 6:
          res.json({
            data: [newBooking],
            status: _httpStatus["default"].CREATED,
            message: _constant.bookingMessages.bookingCreated
          });
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function createBookingsController(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var updateBookingsController = exports.updateBookingsController = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$user;
    var id, doesBookingExist, updatedBooking;
    return _regenerator["default"].wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = Number(req.params.id);
          _context2.next = 1;
          return _prismaConfig["default"].booking.findFirst({
            where: {
              OR: [{
                id: id
              }, {
                userId: req === null || req === void 0 ? void 0 : req.user.id
              }]
            },
            include: {
              user: true,
              timeSlot: true,
              workshop: true
            }
          });
        case 1:
          doesBookingExist = _context2.sent;
          if (!(((_req$user = req.user) === null || _req$user === void 0 ? void 0 : _req$user.id) !== (doesBookingExist === null || doesBookingExist === void 0 ? void 0 : doesBookingExist.user.id) && (req === null || req === void 0 ? void 0 : req.user.role) !== _constant.ROLE_CONSTANT.ADMIN)) {
            _context2.next = 2;
            break;
          }
          throw new _apierror.ApiError(_constant.bookingMessages.noRighttoDoThisAction, _httpStatus["default"].NOT_FOUND);
        case 2:
          if (doesBookingExist) {
            _context2.next = 3;
            break;
          }
          throw new _apierror.ApiError(_constant.bookingMessages.bookingNotFound, _httpStatus["default"].NOT_FOUND);
        case 3:
          _context2.next = 4;
          return _prismaConfig["default"].booking.update({
            where: {
              id: id
            },
            include: {
              timeSlot: true,
              user: {
                select: {
                  id: true
                }
              },
              workshop: true
            },
            data: _objectSpread({}, req.body)
          });
        case 4:
          updatedBooking = _context2.sent;
          res.json({
            data: [updatedBooking],
            status: _httpStatus["default"].OK,
            message: _constant.bookingMessages.bookingUpdated
          });
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function updateBookingsController(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var deleteBookingsController = exports.deleteBookingsController = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, booking;
    return _regenerator["default"].wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id = Number(req.params.id);
          if (!isNaN(id)) {
            _context3.next = 1;
            break;
          }
          throw new _apierror.ApiError('Invalid booking ID.', _httpStatus["default"].BAD_REQUEST);
        case 1:
          _context3.next = 2;
          return _prismaConfig["default"].booking.findUnique({
            where: {
              id: id
            },
            include: {
              user: true
            }
          });
        case 2:
          booking = _context3.sent;
          if (booking) {
            _context3.next = 3;
            break;
          }
          throw new _apierror.ApiError(_constant.bookingMessages.bookingNotFound, _httpStatus["default"].NOT_FOUND);
        case 3:
          if (!(booking.userId !== req.user.id && req.user.role !== _constant.ROLE_CONSTANT.ADMIN)) {
            _context3.next = 4;
            break;
          }
          throw new _apierror.ApiError(_constant.bookingMessages.noRighttoDoThisAction, _httpStatus["default"].FORBIDDEN);
        case 4:
          _context3.next = 5;
          return _prismaConfig["default"].timeSlot.update({
            where: {
              id: booking.timeSlotId
            },
            data: {
              maxCapacity: {
                increment: 1
              }
            }
          });
        case 5:
          _context3.next = 6;
          return _prismaConfig["default"].booking["delete"]({
            where: {
              id: id
            }
          });
        case 6:
          res.status(_httpStatus["default"].OK).json({
            data: [booking],
            status: _httpStatus["default"].OK,
            message: _constant.bookingMessages.bookingDeleted
          });
        case 7:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function deleteBookingsController(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getSingleBookingController = exports.getSingleBookingController = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var bookingId, booking;
    return _regenerator["default"].wrap(function (_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          bookingId = parseInt(req.params.id);
          _context4.next = 1;
          return _prismaConfig["default"].booking.findFirst({
            where: {
              id: bookingId
            },
            include: {
              timeSlot: true,
              user: {
                select: {
                  id: true,
                  username: true
                }
              },
              workshop: {
                include: {
                  timeSlots: true
                }
              }
            }
          });
        case 1:
          booking = _context4.sent;
          res.json({
            data: [booking],
            status: _httpStatus["default"].OK,
            message: _constant.bookingMessages.bookingFetched
          });
        case 2:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function getSingleBookingController(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getAllBookingsController = exports.getAllBookingsController = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var page, limit, skip, _yield$Promise$all, _yield$Promise$all2, bookings, total, totalPages;
    return _regenerator["default"].wrap(function (_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          page = parseInt(req.query.page) || 1;
          limit = parseInt(req.query.limit) || 10;
          skip = (page - 1) * limit;
          _context5.next = 1;
          return Promise.all([_prismaConfig["default"].booking.findMany({
            skip: skip,
            take: limit,
            orderBy: {
              createdAt: 'desc'
            },
            include: {
              timeSlot: true,
              user: {
                select: {
                  id: true,
                  username: true
                }
              },
              workshop: true
            }
          }), _prismaConfig["default"].booking.count()]);
        case 1:
          _yield$Promise$all = _context5.sent;
          _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 2);
          bookings = _yield$Promise$all2[0];
          total = _yield$Promise$all2[1];
          totalPages = Math.ceil(total / limit);
          res.json({
            data: bookings,
            meta: {
              total: total,
              page: page,
              limit: limit,
              totalPages: totalPages
            },
            status: _httpStatus["default"].OK,
            message: _constant.bookingMessages.allBookingsFetched
          });
        case 2:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function getAllBookingsController(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();
var analyticsController = exports.analyticsController = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var totalBookings, slotsFilled, mostBooked, popularWorkshop, _workshop$title, workshop;
    return _regenerator["default"].wrap(function (_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 1;
          return _prismaConfig["default"].booking.count({
            where: {
              isDeleted: false
            }
          });
        case 1:
          totalBookings = _context6.sent;
          _context6.next = 2;
          return _prismaConfig["default"].booking.groupBy({
            by: ['timeSlotId'],
            _count: {
              id: true
            }
          });
        case 2:
          slotsFilled = _context6.sent;
          _context6.next = 3;
          return _prismaConfig["default"].booking.groupBy({
            by: ['workshopId'],
            _count: {
              id: true
            },
            orderBy: {
              _count: {
                id: 'desc'
              }
            },
            take: 1
          });
        case 3:
          mostBooked = _context6.sent;
          popularWorkshop = null;
          if (!(mostBooked.length > 0)) {
            _context6.next = 5;
            break;
          }
          _context6.next = 4;
          return _prismaConfig["default"].workshop.findUnique({
            where: {
              id: mostBooked[0].workshopId
            },
            select: {
              title: true
            }
          });
        case 4:
          workshop = _context6.sent;
          popularWorkshop = (_workshop$title = workshop === null || workshop === void 0 ? void 0 : workshop.title) !== null && _workshop$title !== void 0 ? _workshop$title : null;
        case 5:
          res.status(200).json({
            totalBookings: totalBookings,
            totalTimeSlotsFilled: slotsFilled.length,
            popularWorkshop: popularWorkshop
          });
        case 6:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function analyticsController(_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}();
var getAllLoggedUserBookingsController = exports.getAllLoggedUserBookingsController = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var userId, bookings;
    return _regenerator["default"].wrap(function (_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          userId = req.user.id;
          _context7.next = 1;
          return _prismaConfig["default"].booking.findMany({
            where: {
              userId: userId,
              isDeleted: false
            },
            include: {
              timeSlot: true,
              user: {
                select: {
                  id: true,
                  username: true
                }
              },
              workshop: true
            }
          });
        case 1:
          bookings = _context7.sent;
          res.json({
            data: bookings,
            status: _httpStatus["default"].OK,
            message: _constant.bookingMessages.allBookingsFetched
          });
        case 2:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function getAllLoggedUserBookingsController(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();