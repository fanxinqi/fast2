"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var _this = this;

    var router = new _koaRouter2.default({
        prefix: '/data.api'
    });

    router.use('/', function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return next();

                        case 2:
                            ctx.body = {
                                code: 0,
                                message: "",
                                data: ctx.state.tplData || null,
                                currentUser: ctx.state.currentUser || null,
                                error: null
                            };

                        case 3:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());
    Object.keys(_controllers2.default).forEach(function (controller) {
        var controllerAction = _controllers2.default[controller];
        Object.keys(controllerAction).forEach(function (action) {
            var _this2 = this;

            var method = controllerAction[action],
                routerUrl = "/" + controller + "/" + action,
                controllerKey = controller + "." + action;
            // console.log(routerUrl)
            if (_config2.default[controllerKey] && _config2.default[controllerKey].middleware) {
                router.all.apply(router, [routerUrl].concat(_toConsumableArray(_config2.default[controllerKey].middleware), [function () {
                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, next) {
                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                            while (1) {
                                switch (_context2.prev = _context2.next) {
                                    case 0:
                                        _context2.next = 2;
                                        return _controllers2.default[controller][action](ctx, next);

                                    case 2:
                                        next();

                                    case 3:
                                    case "end":
                                        return _context2.stop();
                                }
                            }
                        }, _callee2, _this2);
                    }));

                    return function (_x3, _x4) {
                        return _ref2.apply(this, arguments);
                    };
                }()]));
            } else {
                router.all(routerUrl, function () {
                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx, next) {
                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                            while (1) {
                                switch (_context3.prev = _context3.next) {
                                    case 0:
                                        _context3.next = 2;
                                        return _controllers2.default[controller][action](ctx, next);

                                    case 2:
                                        next();

                                    case 3:
                                    case "end":
                                        return _context3.stop();
                                }
                            }
                        }, _callee3, _this2);
                    }));

                    return function (_x5, _x6) {
                        return _ref3.apply(this, arguments);
                    };
                }());
            }
        });
    });
    return router.routes();
};

var _koaRouter = require("koa-router");

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _controllers = require("../../../controllers/");

var _controllers2 = _interopRequireDefault(_controllers);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // import jwt from 'jsonwebtoken'

// import compose from "./compose"