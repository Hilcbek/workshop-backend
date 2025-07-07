"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transporter = void 0;
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _enviromental = require("./enviromental");
var transporter = exports.transporter = _nodemailer["default"].createTransport({
  port: 587,
  host: 'smtp.gmail.com',
  auth: {
    user: _enviromental.USER_EMAIL,
    pass: _enviromental.APP_PASSWORD
  },
  secure: false,
  tls: {
    rejectUnauthorized: false
  },
  logger: true,
  debug: true
});