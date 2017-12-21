#!/usr/bin/env node
'use strict';

require('babel-polyfill');

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _webConfig = require('./web-config');

var _webConfig2 = _interopRequireDefault(_webConfig);

var _page = require('./middlewares/router/page/page');

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by fanxinqi on 2017/10/16.
 */
var serve = require('koa-static');
var convert = require('koa-convert');
var view = require('./middlewares/view/index');

var app = new _koa2.default();
app.use(view(__dirname + _webConfig2.default.web.view_path, {
    extension: 'swig'
})).use((0, _page2.default)()).use(convert(serve(__dirname + '/statics')));

var App = function App(port) {
    app.listen(port, "127.0.0.1", function () {
        console.log("fast2 server run....at port [" + port + "]");
    });
};
module.exports = App;