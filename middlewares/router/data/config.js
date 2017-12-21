"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _checktoken = require("../../checktoken/checktoken");

var _checktoken2 = _interopRequireDefault(_checktoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  "project.newOrSave": {
    middleware: [_checktoken2.default]
  }
};
exports.default = config;