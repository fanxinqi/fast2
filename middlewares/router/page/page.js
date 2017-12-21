'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {

    return registerRouter.call(this);
};

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var pathToRegexp = require('path-to-regexp');

var jsonfile = require('jsonfile');

var fs = require('fs');

var reg = /\/([a-z]+)/ig;

var load = require('../../../lib/utils/load');

var registerRouter = function registerRouter() {
    var _this = this;

    var router = new _koaRouter2.default();

    var sourceMapNameAarray = load.getSourceMapNames();

    for (var i = 0, len = sourceMapNameAarray.length; i < len; i++) {

        var routerUri = sourceMapNameAarray[i].split("-map.json")[0];

        router.get("/" + routerUri + "/(.*)", function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return next();

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            }));

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        }());

        router.use("/" + routerUri, function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, next) {
                var cwd, reqUri, uriMatch, namespace, isPage, tplData, mockJsonName, mockUri, data;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return next();

                            case 2:
                                cwd = process.cwd();
                                reqUri = ctx.request.url;
                                uriMatch = reqUri.match(reg);
                                namespace = uriMatch[0].split("/")[1];
                                isPage = uriMatch[1].split("/")[1] === "page";
                                tplData = "";

                                //如果是同步数据
                                // if (isPage) {

                                mockJsonName = uriMatch[uriMatch.length - 1] + ".json";
                                mockUri = cwd + "/test" + reqUri.split("?")[0] + mockJsonName;


                                tplData = jsonfile.readFileSync(mockUri);

                                if (!(ctx.request.header['action-type'] === 'json' || ctx.query['format'] == "json")) {
                                    _context2.next = 16;
                                    break;
                                }

                                ctx.body = tplData.tplData || {};

                                ctx.state.isPage = false;

                                _context2.next = 21;
                                break;

                            case 16:
                                data = ctx.state.tplData;


                                ctx.state.isPage = true;

                                ctx.state.tplData = tplData || {};

                                _context2.next = 21;
                                return ctx.render('main');

                            case 21:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this);
            }));

            return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
            };
        }()
        // }
        );
    }

    return router.routes();
};