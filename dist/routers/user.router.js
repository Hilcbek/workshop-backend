"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _catchAsync = require("../config/catchAsync");
var _user = require("../controllers/user.controller");
var _token = require("../token/token");
var _user2 = require("../validation/user.validation");
var _parseValidation = require("../config/parseValidation");
var userRouter = exports.userRouter = (0, _express["default"])();
userRouter.post('/', (0, _user2.createUserValidation)(), _parseValidation.parseValidation, (0, _catchAsync.catchAsync)(_user.createUserController));
userRouter.post('/login', (0, _user2.loginUserValidation)(), _parseValidation.parseValidation, (0, _catchAsync.catchAsync)(_user.loginUserController));
userRouter.get('/', _token.authMiddleware, (0, _catchAsync.catchAsync)(_user.getLoggedInUser));