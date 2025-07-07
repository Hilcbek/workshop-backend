"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;
var _express = _interopRequireDefault(require("express"));
var _user = require("../routers/user.router");
var _workshopRouter = require("../routers/workshopRouter");
var _timeSlot = require("../routers/timeSlot.router");
var _booking = require("../routers/booking.router");
var router = exports.router = (0, _express["default"])();
router.use('/user', _user.userRouter);
router.use('/workshops', _workshopRouter.workShopRouter);
router.use('/time-slot', _timeSlot.timeSlotRouter);
router.use('/bookings', _booking.bookingRouter);