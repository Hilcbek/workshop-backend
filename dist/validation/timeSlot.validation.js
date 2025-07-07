"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTimeSlotValidation = exports.getTimeSlotValidation = exports.deleteTimeSlotValidation = exports.createTimeSlotValidation = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _expressValidator = require("express-validator");
var _apierror = require("../error/apierror");
var _httpStatus = _interopRequireDefault(require("http-status"));
var _constant = require("../utils/constant");
var startTimeValidator = function startTimeValidator() {
  return (0, _expressValidator.body)('startTime').matches(/^((0?[1-9])|(1[0-2])):[0-5][0-9]\s?(AM|PM)$/i).withMessage(_constant.validationMessages.startTimeFormat).custom(function (value) {
    var _value$toUpperCase$sp = value.toUpperCase().split(' '),
      _value$toUpperCase$sp2 = (0, _slicedToArray2["default"])(_value$toUpperCase$sp, 2),
      time = _value$toUpperCase$sp2[0],
      modifier = _value$toUpperCase$sp2[1];
    var _time$split = time.split(':'),
      _time$split2 = (0, _slicedToArray2["default"])(_time$split, 2),
      hourStr = _time$split2[0],
      minuteStr = _time$split2[1];
    var hour = parseInt(hourStr, 10);
    var minute = parseInt(minuteStr, 10);
    if (modifier !== 'AM' && modifier !== 'PM') {
      throw new _apierror.ApiError('Time must specify AM or PM', _httpStatus["default"].BAD_REQUEST);
    }
    var timeInMinutes = (hour % 12 + (modifier === 'PM' ? 12 : 0)) * 60 + minute;
    var min = 10 * 60;
    var max = 12 * 60;
    if (timeInMinutes < min || timeInMinutes > max) {
      throw new _apierror.ApiError(_constant.validationMessages.startTimeRange, _httpStatus["default"].BAD_REQUEST);
    }
    return true;
  });
};
var endTimeValidator = function endTimeValidator() {
  return (0, _expressValidator.body)('endTime').matches(/^((0?[1-9])|(1[0-2])):[0-5][0-9]\s?(AM|PM)$/i).withMessage(_constant.validationMessages.endTimeFormat);
};
var validateEndTimeAfterStartTime = function validateEndTimeAfterStartTime() {
  return (0, _expressValidator.body)('endTime').custom(function (endTime, _ref) {
    var req = _ref.req;
    var startTime = req.body.startTime;
    if (!startTime || !endTime) return true;
    var parseTime = function parseTime(timeStr) {
      var _timeStr$toUpperCase$ = timeStr.toUpperCase().split(' '),
        _timeStr$toUpperCase$2 = (0, _slicedToArray2["default"])(_timeStr$toUpperCase$, 2),
        time = _timeStr$toUpperCase$2[0],
        modifier = _timeStr$toUpperCase$2[1];
      var _time$split3 = time.split(':'),
        _time$split4 = (0, _slicedToArray2["default"])(_time$split3, 2),
        hourStr = _time$split4[0],
        minuteStr = _time$split4[1];
      var hour = parseInt(hourStr, 10);
      var minute = parseInt(minuteStr, 10);
      return (hour % 12 + (modifier === 'PM' ? 12 : 0)) * 60 + minute;
    };
    if (parseTime(endTime) <= parseTime(startTime)) {
      throw new _apierror.ApiError(_constant.validationMessages.endTimeAfterStartTime, _httpStatus["default"].BAD_REQUEST);
    }
    return true;
  });
};
var createTimeSlotValidation = exports.createTimeSlotValidation = function createTimeSlotValidation() {
  return [startTimeValidator(), endTimeValidator(), validateEndTimeAfterStartTime(), (0, _expressValidator.body)('maxCapacity').isInt({
    min: 1
  }).withMessage(_constant.validationMessages.maxCapacityInt), (0, _expressValidator.body)('workshopId').isInt({
    min: 1
  }).withMessage(_constant.validationMessages.workshopIdInt)];
};
var updateTimeSlotValidation = exports.updateTimeSlotValidation = function updateTimeSlotValidation() {
  return [(0, _expressValidator.param)('id').isInt({
    min: 1
  }).withMessage(_constant.validationMessages.idInt), startTimeValidator().optional(), endTimeValidator().optional(), validateEndTimeAfterStartTime().optional(), (0, _expressValidator.body)('maxCapacity').optional().isInt({
    min: 1
  }).withMessage(_constant.validationMessages.maxCapacityInt), (0, _expressValidator.body)('workshopId').optional().isInt({
    min: 1
  }).withMessage(_constant.validationMessages.workshopIdInt)];
};
var getTimeSlotValidation = exports.getTimeSlotValidation = function getTimeSlotValidation() {
  return [(0, _expressValidator.param)('id').isInt({
    min: 1
  }).withMessage(_constant.validationMessages.idInt)];
};
var deleteTimeSlotValidation = exports.deleteTimeSlotValidation = function deleteTimeSlotValidation() {
  return [(0, _expressValidator.param)('id').isInt({
    min: 1
  }).withMessage(_constant.validationMessages.idInt)];
};