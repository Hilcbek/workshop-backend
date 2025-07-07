"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.workShopRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _catchAsync = require("../config/catchAsync");
var _workshop = require("../controllers/workshop.controller");
var _token = require("../token/token");
var _workshop2 = require("../validation/workshop.validation");
var _parseValidation = require("../config/parseValidation");
var workShopRouter = exports.workShopRouter = (0, _express["default"])();
workShopRouter.post('/', (0, _workshop2.createWorkshopValidation)(), _parseValidation.parseValidation, _token.isAdmin, (0, _catchAsync.catchAsync)(_workshop.createWorkShopController));
workShopRouter.patch('/:id', (0, _workshop2.updateWorkshopValidation)(), _parseValidation.parseValidation, _token.isAdmin, (0, _catchAsync.catchAsync)(_workshop.updateWorkShopController));
workShopRouter["delete"]('/:id', (0, _workshop2.deleteWorkshopValidation)(), _parseValidation.parseValidation, _token.isAdmin, (0, _catchAsync.catchAsync)(_workshop.deleteWorkShopController));
workShopRouter.get('/:id', (0, _workshop2.getWorkshopValidation)(), _parseValidation.parseValidation, (0, _catchAsync.catchAsync)(_workshop.getWorkShopController));
workShopRouter.get('/', _token.authMiddleware, (0, _catchAsync.catchAsync)(_workshop.getAllWorkShopsController));