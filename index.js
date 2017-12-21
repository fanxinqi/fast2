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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
/**
 * Created by fanxinqi on 2017/10/16.
 */

var path = require('path');
var serve = require('koa-static');
var convert = require('koa-convert');
var view = require('./middlewares/view/index');

var app = new _koa2.default();
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

var argv = require("minimist")(process.argv.slice(2), {
    alias: {
        'port': 'p'
    },
    string: ['port', 'hostname', 'fallback'],
    boolean: ['silent', 'log'],
    'default': {
        'port': 8000,
        'dir': process.cwd()
    }
});

if (argv.help) {
    console.log("Usage:");
    console.log("fast2 --help // print help information");
    console.log("fast2 -p 8989 // 8989 as port");
    process.exit(0);
}
var port = parseInt(argv._[0] || argv.port, 10);

app.use(view(__dirname + _webConfig2.default.web.view_path, {
    extension: 'swig'
})).use((0, _page2.default)()).use(convert(serve(__dirname + '/statics')));
_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    app.listen(port, "127.0.0.1", function () {
                        console.log("fast2 server run....");
                    });

                case 1:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, undefined);
}))();