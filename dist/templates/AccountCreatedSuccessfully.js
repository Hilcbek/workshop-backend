"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccountCreated = AccountCreated;
var _react = _interopRequireDefault(require("react"));
var _components = require("@react-email/components");
function AccountCreated(_ref) {
  var username = _ref.username,
    loginURL = _ref.loginURL;
  return /*#__PURE__*/_react["default"].createElement(_components.Html, null, /*#__PURE__*/_react["default"].createElement(_components.Head, null, /*#__PURE__*/_react["default"].createElement("link", {
    href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;600&display=swap",
    rel: "stylesheet"
  })), /*#__PURE__*/_react["default"].createElement(_components.Preview, null, "Your account has been created successfully!"), /*#__PURE__*/_react["default"].createElement(_components.Body, {
    style: {
      backgroundColor: '#f4f6f8',
      fontFamily: "'Manrope', sans-serif",
      padding: '40px 0'
    }
  }, /*#__PURE__*/_react["default"].createElement(_components.Container, {
    style: {
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
    }
  }, /*#__PURE__*/_react["default"].createElement(_components.Section, {
    style: {
      textAlign: 'center',
      padding: '32px 0 20px'
    }
  }, /*#__PURE__*/_react["default"].createElement(_components.Img, {
    src: "https://i.imgur.com/oYiTqum.png",
    width: "60",
    height: "60",
    alt: "Workshop Logo",
    style: {
      objectFit: 'contain',
      margin: '0 auto'
    }
  })), /*#__PURE__*/_react["default"].createElement(_components.Section, {
    style: {
      padding: '0 40px'
    }
  }, /*#__PURE__*/_react["default"].createElement(_components.Heading, {
    style: {
      fontSize: '22px',
      fontWeight: 600,
      color: '#202124',
      marginBottom: '16px'
    }
  }, "Hello ", username, ","), /*#__PURE__*/_react["default"].createElement(_components.Text, {
    style: {
      fontSize: '15px',
      lineHeight: '1.6',
      color: '#4a4a4a',
      marginBottom: '24px'
    }
  }, "Your account has been successfully created on the Workshop Booking platform. You can now explore and register for available workshops based on your interests."), /*#__PURE__*/_react["default"].createElement(_components.Section, {
    style: {
      textAlign: 'center',
      marginBottom: '24px'
    }
  }, /*#__PURE__*/_react["default"].createElement(_components.Button, {
    href: loginURL // ✅ Replace with your actual login URL
    ,
    style: {
      backgroundColor: '#0070f3',
      color: '#fff',
      padding: '12px 20px',
      borderRadius: '6px',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: 600
    }
  }, "Log In to Your Account")), /*#__PURE__*/_react["default"].createElement(_components.Text, {
    style: {
      fontSize: '14px',
      color: '#777',
      lineHeight: '1.6'
    }
  }, "If you didn\u2019t create this account, please ignore this message or contact our support team.")), /*#__PURE__*/_react["default"].createElement(_components.Hr, {
    style: {
      borderColor: '#ececec',
      margin: '40px 0'
    }
  }), /*#__PURE__*/_react["default"].createElement(_components.Section, {
    style: {
      padding: '0 40px 32px',
      fontSize: '13px',
      color: '#777',
      lineHeight: '1.6',
      textAlign: 'center'
    }
  }, /*#__PURE__*/_react["default"].createElement(_components.Text, null, "Need help? Email us at", ' ', /*#__PURE__*/_react["default"].createElement("a", {
    href: "mailto:support@workshop-booking.com",
    style: {
      color: '#0070f3',
      textDecoration: 'underline'
    }
  }, "support@workshop-booking.com"), "."), /*#__PURE__*/_react["default"].createElement(_components.Text, {
    style: {
      marginTop: '24px',
      fontSize: '12px',
      color: '#aaa'
    }
  }, "\xA9 ", new Date().getFullYear(), " Workshop Booking. All rights reserved.", /*#__PURE__*/_react["default"].createElement("br", null), "Addis Ababa, Ethiopia")))));
}