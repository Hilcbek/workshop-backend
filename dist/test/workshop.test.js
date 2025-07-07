"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _workshop = require("../controllers/workshop.controller");
var _prismaConfig = _interopRequireDefault(require("../prismaConfig"));
var _httpStatus = _interopRequireDefault(require("http-status"));
var _apierror = require("../error/apierror");
var _constant = require("../utils/constant");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
jest.mock("../prismaConfig", function () {
  return {
    workshop: {
      findFirst: jest.fn(),
      create: jest.fn()
    }
  };
});
describe('createWorkShopController', function () {
  it('should create a new workshop and return 201', /*#__PURE__*/(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var mockReq, newWorkshop, mockRes;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          mockReq = {
            body: {
              title: 'Yoga Basics',
              description: 'Learn yoga',
              date: '2025-07-10'
            }
          };
          newWorkshop = {
            id: 1,
            title: mockReq.body.title,
            description: mockReq.body.description,
            date: new Date(mockReq.body.date)
          };
          _prismaConfig["default"].workshop.findFirst.mockResolvedValue(null);
          _prismaConfig["default"].workshop.create.mockResolvedValue(newWorkshop);
          mockRes = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
          };
          _context.next = 1;
          return (0, _workshop.createWorkShopController)(mockReq, mockRes);
        case 1:
          expect(_prismaConfig["default"].workshop.findFirst).toHaveBeenCalledWith({
            where: {
              title: mockReq.body.title
            }
          });
          expect(_prismaConfig["default"].workshop.create).toHaveBeenCalledWith({
            data: _objectSpread(_objectSpread({}, mockReq.body), {}, {
              date: new Date(mockReq.body.date)
            })
          });
          expect(mockRes.json).toHaveBeenCalledWith({
            data: newWorkshop,
            status: _httpStatus["default"].CREATED,
            message: _constant.workShopMessages.workShopCreated
          });
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  it('should throw error if workshop already exists', /*#__PURE__*/(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var mockReq, mockRes, mockNext;
    return _regenerator["default"].wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          mockReq = {
            body: {
              title: 'Yoga Basics',
              description: 'Learn yoga',
              date: '2025-07-10'
            }
          };
          _prismaConfig["default"].workshop.findFirst.mockResolvedValue({
            id: 1,
            title: mockReq.body.title
          });
          mockRes = {};
          mockNext = jest.fn();
          _context2.next = 1;
          return expect((0, _workshop.createWorkShopController)(mockReq, mockRes, mockNext)).rejects.toThrow(_apierror.ApiError);
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
});