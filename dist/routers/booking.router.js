"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookingRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _catchAsync = require("../config/catchAsync");
var _bookings = require("../controllers/bookings.controller");
var _token = require("../token/token");
var _booking = require("../validation/booking.validation");
var _parseValidation = require("../config/parseValidation");
var bookingRouter = exports.bookingRouter = (0, _express["default"])();
bookingRouter.post('/', (0, _booking.createBookingValidation)(), _parseValidation.parseValidation, _token.isUser, (0, _catchAsync.catchAsync)(_bookings.createBookingsController));
bookingRouter.patch('/:id', (0, _booking.updateBookingValidation)(), _parseValidation.parseValidation, _token.authMiddleware, (0, _catchAsync.catchAsync)(_bookings.updateBookingsController));
bookingRouter["delete"]('/:id', (0, _booking.deleteBookingValidation)(), _parseValidation.parseValidation, _token.authMiddleware, (0, _catchAsync.catchAsync)(_bookings.deleteBookingsController));
bookingRouter.get('/:id', (0, _booking.getBookingValidation)(), _parseValidation.parseValidation, _token.authMiddleware, (0, _catchAsync.catchAsync)(_bookings.getSingleBookingController));
bookingRouter.get('/', _token.isAdmin, (0, _catchAsync.catchAsync)(_bookings.getAllBookingsController));
bookingRouter.get('/current-user/books', _token.authMiddleware, (0, _catchAsync.catchAsync)(_bookings.getAllLoggedUserBookingsController));
bookingRouter.get('/analytics', _token.isAdmin, (0, _catchAsync.catchAsync)(_bookings.analyticsController));