"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateJWT = exports.encryptPassword = exports.deletePropertuFromObject = exports.decryptPassword = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _enviromental = require("../config/enviromental");
/**
 * 
 * @param {string} password 
 * @returns {string} 
 */
var encryptPassword = exports.encryptPassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(password) {
    var genSalt;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 1;
          return _bcryptjs["default"].genSalt(10);
        case 1:
          genSalt = _context.sent;
          return _context.abrupt("return", _bcryptjs["default"].hash(password, genSalt));
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function encryptPassword(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * 
 * @param {string} hashedPassword 
 * @param {string} password 
 * @returns {string}
 */
var decryptPassword = exports.decryptPassword = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(hashedPassword, password) {
    return _regenerator["default"].wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", _bcryptjs["default"].compare(password, hashedPassword));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function decryptPassword(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * 
 * @param {object} obj 
 * @param {object} prop 
 * @returns {object}
 */
var deletePropertuFromObject = exports.deletePropertuFromObject = function deletePropertuFromObject(obj, prop) {
  for (var key in prop) {
    if (obj.hasOwnProperty(key)) {
      delete obj[key];
    }
  }
  return obj;
};
/**
 * 
 * @param {object} user 
 * @param {string} expireData 
 * @returns 
 */
var generateJWT = exports.generateJWT = function generateJWT(user) {
  var expireData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '1d';
  return _jsonwebtoken["default"].sign(user, _enviromental.JWT_SECRET, {
    expiresIn: expireData
  });
};