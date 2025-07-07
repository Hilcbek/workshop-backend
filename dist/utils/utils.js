"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmail = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _apierror = require("../error/apierror");
var _components = require("@react-email/components");
var _react = _interopRequireDefault(require("react"));
var _constant = require("./constant");
var _email = require("../config/email");
var _httpStatus = _interopRequireDefault(require("http-status"));
var sendEmail = exports.sendEmail = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var from, to, subject, text, html, componentProps, Component, Template, options, response, _t;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          from = _ref.from, to = _ref.to, subject = _ref.subject, text = _ref.text, html = _ref.html, componentProps = _ref.componentProps;
          _context.prev = 1;
          Component = _constant.emailTemplate[html];
          if (Component) {
            _context.next = 2;
            break;
          }
          throw new _apierror.ApiError('Template not found', _httpStatus["default"].NOT_FOUND, false);
        case 2:
          _context.next = 3;
          return (0, _components.render)(/*#__PURE__*/_react["default"].createElement(Component, componentProps));
        case 3:
          Template = _context.sent;
          options = {
            from: from,
            to: to,
            subject: subject,
            text: text,
            html: Template
          };
          _context.next = 4;
          return _email.transporter.sendMail(options);
        case 4:
          response = _context.sent;
          return _context.abrupt("return", response);
        case 5:
          _context.prev = 5;
          _t = _context["catch"](1);
          throw new _apierror.ApiError(_t.message, _httpStatus["default"].INTERNAL_SERVER_ERROR);
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 5]]);
  }));
  return function sendEmail(_x) {
    return _ref2.apply(this, arguments);
  };
}();