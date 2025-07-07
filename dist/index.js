"use strict";

var _enviromental = require("./config/enviromental");
var _express = require("./config/express");
var _winston = require("./config/winston");
var start = function start() {
  _express.app.listen(_enviromental.PORT, function () {
    _winston.logger.info("Server is running on port ".concat(_enviromental.PORT));
  });
};
start();