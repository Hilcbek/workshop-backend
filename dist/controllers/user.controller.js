"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginUserController = exports.getLoggedInUser = exports.createUserController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _prismaConfig = _interopRequireDefault(require("../prismaConfig"));
var _httpStatus = _interopRequireDefault(require("http-status"));
var _helper = require("../utils/helper");
var _apierror = require("../error/apierror");
var _constant = require("../utils/constant");
var _worker = require("../config/worker");
var _enviromental = require("../config/enviromental");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var createUserController = exports.createUserController = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var doesUserExist, newUser, mailOptions, _t, _t2, _t3, _t4, _t5, _t6, _t7, _t8;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 1;
          return _prismaConfig["default"].user.findFirst({
            where: {
              OR: [{
                username: req.body.username
              }, {
                email: req.body.email
              }]
            }
          });
        case 1:
          doesUserExist = _context.sent;
          if (!doesUserExist) {
            _context.next = 2;
            break;
          }
          throw new _apierror.ApiError(_constant.userErrorMessages.userExist, _httpStatus["default"].BAD_REQUEST);
        case 2:
          _t = _prismaConfig["default"].user;
          _t2 = _objectSpread;
          _t3 = _objectSpread({}, req.body);
          _t4 = {};
          _context.next = 3;
          return (0, _helper.encryptPassword)(req.body.password);
        case 3:
          _t5 = _context.sent;
          _t6 = {
            password: _t5
          };
          _t7 = _t2(_t3, _t4, _t6);
          _t8 = {
            data: _t7
          };
          _context.next = 4;
          return _t.create.call(_t, _t8);
        case 4:
          newUser = _context.sent;
          mailOptions = {
            from: _enviromental.USER_EMAIL,
            to: newUser.email,
            subject: 'Workshop - Account created successfully!',
            html: 'AccountCreated',
            componentProps: {
              username: newUser.username
            }
          };
          _context.next = 5;
          return _worker.workshopQueue.add('email', {
            data: mailOptions,
            type: 'email'
          }, {
            backoff: {
              type: 'exponential',
              delay: 1000,
              maxDelay: 10000
            },
            attempts: 3,
            removeOnComplete: true,
            removeOnFail: true
          });
        case 5:
          res.json({
            data: [_objectSpread({}, (0, _helper.deletePropertuFromObject)(newUser, {
              password: req.body.password
            }))],
            status: _httpStatus["default"].CREATED,
            message: _constant.userMessages.userCreated
          });
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function createUserController(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var loginUserController = exports.loginUserController = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var doesUserExist, isPasswordCorrect, token;
    return _regenerator["default"].wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 1;
          return _prismaConfig["default"].user.findFirst({
            where: {
              OR: [{
                username: req.body.username
              }, {
                email: String(req.body.username).toLowerCase()
              }]
            }
          });
        case 1:
          doesUserExist = _context2.sent;
          console.log('doesUserExist ', doesUserExist, req.body);
          if (doesUserExist) {
            _context2.next = 2;
            break;
          }
          throw new _apierror.ApiError(_constant.userErrorMessages.userNotFound, _httpStatus["default"].NOT_FOUND);
        case 2:
          _context2.next = 3;
          return (0, _helper.decryptPassword)(doesUserExist.password, req.body.password);
        case 3:
          isPasswordCorrect = _context2.sent;
          if (isPasswordCorrect) {
            _context2.next = 4;
            break;
          }
          throw new _apierror.ApiError(_constant.userErrorMessages.wrongCredentials, _httpStatus["default"].UNAUTHORIZED);
        case 4:
          token = (0, _helper.generateJWT)({
            id: doesUserExist.id,
            role: doesUserExist.role,
            email: doesUserExist.email
          });
          res.json({
            data: [_objectSpread(_objectSpread({}, (0, _helper.deletePropertuFromObject)(doesUserExist, {
              password: req.body.password
            })), {}, {
              token: token
            })],
            status: _httpStatus["default"].OK,
            message: _constant.userMessages.loggedInSuccessful
          });
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function loginUserController(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getLoggedInUser = exports.getLoggedInUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var userId, loggedInUser;
    return _regenerator["default"].wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          userId = req.user.id;
          _context3.next = 1;
          return _prismaConfig["default"].user.findFirst({
            where: {
              id: userId
            }
          });
        case 1:
          loggedInUser = _context3.sent;
          res.json({
            data: [_objectSpread({}, (0, _helper.deletePropertuFromObject)(loggedInUser, {
              password: loggedInUser.password
            }))],
            status: _httpStatus["default"].OK,
            message: _constant.userMessages.loggedInUserFetched
          });
        case 2:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getLoggedInUser(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();