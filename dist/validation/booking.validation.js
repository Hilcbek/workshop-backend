"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBookingValidation = exports.getBookingValidation = exports.deleteBookingValidation = exports.createBookingValidation = void 0;
var _expressValidator = require("express-validator");
var _constant = require("../utils/constant");
var createBookingValidation = exports.createBookingValidation = function createBookingValidation() {
  return [(0, _expressValidator.body)('workshopId').isInt({
    min: 1
  }).withMessage(_constant.bookingValidationMessages.workshopIdInt), (0, _expressValidator.body)('timeSlotId').isInt({
    min: 1
  }).withMessage(_constant.bookingValidationMessages.timeSlotIdInt)];
};
var updateBookingValidation = exports.updateBookingValidation = function updateBookingValidation() {
  return [(0, _expressValidator.param)('id').isInt({
    min: 1
  }).withMessage(_constant.bookingValidationMessages.idInt), (0, _expressValidator.body)('timeSlotId').isNumeric().withMessage(_constant.bookingValidationMessages.timeSlotIdInt)];
};
var getBookingValidation = exports.getBookingValidation = function getBookingValidation() {
  return [(0, _expressValidator.param)('id').isInt({
    min: 1
  }).withMessage(_constant.bookingValidationMessages.idInt)];
};
var deleteBookingValidation = exports.deleteBookingValidation = getBookingValidation;