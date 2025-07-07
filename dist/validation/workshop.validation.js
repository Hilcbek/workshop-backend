"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateWorkshopValidation = exports.getWorkshopValidation = exports.deleteWorkshopValidation = exports.createWorkshopValidation = void 0;
var _expressValidator = require("express-validator");
var _constant = require("../utils/constant");
var createWorkshopValidation = exports.createWorkshopValidation = function createWorkshopValidation() {
  return [(0, _expressValidator.body)('title').isString().notEmpty().withMessage(_constant.workshopMessagesValidation.titleRequired), (0, _expressValidator.body)('description').isString().notEmpty().withMessage(_constant.workshopMessagesValidation.descRequired), (0, _expressValidator.body)('date').isString().withMessage(_constant.workshopMessagesValidation.dateRequired)];
};
var updateWorkshopValidation = exports.updateWorkshopValidation = function updateWorkshopValidation() {
  return [(0, _expressValidator.param)('id').isInt({
    min: 1
  }).withMessage(_constant.workshopMessagesValidation.idRequired), (0, _expressValidator.body)('title').optional().isString().withMessage(_constant.workshopMessagesValidation.titleRequired), (0, _expressValidator.body)('description').optional().isString().withMessage(_constant.workshopMessagesValidation.descRequired), (0, _expressValidator.body)('date').optional().isISO8601().withMessage(_constant.workshopMessagesValidation.dateRequired)];
};
var getWorkshopValidation = exports.getWorkshopValidation = function getWorkshopValidation() {
  return [(0, _expressValidator.param)('id').isInt({
    min: 1
  }).withMessage(_constant.workshopMessagesValidation.idRequired)];
};
var deleteWorkshopValidation = exports.deleteWorkshopValidation = getWorkshopValidation;