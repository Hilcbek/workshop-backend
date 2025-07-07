"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeSlotRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _catchAsync = require("../config/catchAsync");
var _timeSlot = require("../controllers/timeSlot.controller");
var _token = require("../token/token");
var _timeSlot2 = require("../validation/timeSlot.validation");
var _parseValidation = require("../config/parseValidation");
var timeSlotRouter = exports.timeSlotRouter = (0, _express["default"])();
timeSlotRouter.post('/', (0, _timeSlot2.createTimeSlotValidation)(), _parseValidation.parseValidation, _token.isAdmin, (0, _catchAsync.catchAsync)(_timeSlot.createTimeSlotController));
timeSlotRouter.patch('/:id', (0, _timeSlot2.updateTimeSlotValidation)(), _parseValidation.parseValidation, _token.isAdmin, (0, _catchAsync.catchAsync)(_timeSlot.updateTimeSlotController));
timeSlotRouter["delete"]('/:id', (0, _timeSlot2.deleteTimeSlotValidation)(), _parseValidation.parseValidation, _token.isAdmin, (0, _catchAsync.catchAsync)(_timeSlot.deleteTimeSlotController));
timeSlotRouter.get('/:id', _token.authMiddleware, (0, _catchAsync.catchAsync)(_timeSlot.getSingleTimeSlotController));
timeSlotRouter.get('/', _token.authMiddleware, (0, _catchAsync.catchAsync)(_timeSlot.getAllTimeSlotsController));
timeSlotRouter.get('/time-slot-workshop/:workshopId', _token.authMiddleware, (0, _catchAsync.catchAsync)(_timeSlot.getTimeSlotRelatedhWorkShopId));