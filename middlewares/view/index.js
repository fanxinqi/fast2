'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('path'),
    resolve = _require.resolve;

var pathOther = require('path');
var getPaths = require('get-paths');

var requireTag = require('./tags/require');
var scriptTag = require('./tags/script');
var cheerio = require('cheerio');
var fs = require('fs');
var swig = require('swig');
var reg = /\/([a-z\-]+)/ig;
var cwd = process.cwd();
swig.setTag("require", requireTag.parse, requireTag.compile, requireTag.ends, requireTag.blockLevel || false);
swig.setTag("script", scriptTag.parse, scriptTag.compile, scriptTag.ends, scriptTag.blockLevel || false);

var render = function render(path, state, resourceMap) {

    var output = swig.compileFile(path)(state);
    var $ = cheerio.load(output, { decodeEntities: false });
    if (resourceMap) {
        var template = loadMap(resourceMap);
        var links = "";
        var scripts = "";
        requireTag.modules.forEach(function (moduleId) {
            var uri = resourceMap.res[moduleId.replace(/\"|\'/g, "")].uri,
                script = '<script type="text/javascript" src="' + uri + '"></script>';
            scripts += script;
        });
        template.links.forEach(function (link) {
            links += link;
        });

        template.scripts.forEach(function (script) {
            scripts += script;
        });
        console.log(links);
        if (links) {
            $("head").append(links);
        }

        if (scripts) {
            $("body script").before(scripts);
        }
    }

    return $.html();
};

var getRequireSourceMapByNS = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(namespace) {
        var pageResourceUri;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        pageResourceUri = "../../config/sourcemap/" + namespace + "-map";
                        return _context.abrupt('return', pageResourceUri);

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function getRequireSourceMapByNS(_x) {
        return _ref.apply(this, arguments);
    };
}();

var getNamespace = function getNamespace(ctx) {
    var reqUri = ctx.request.url;
    var uriMatch = reqUri.match(reg);
    return uriMatch[0].split("/")[1];
};

var getRequireSourceMap = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        if (!ctx.state.isPage) {
                            _context2.next = 6;
                            break;
                        }

                        _context2.next = 3;
                        return getRequireSourceMapByNS(getNamespace(ctx));

                    case 3:
                        return _context2.abrupt('return', _context2.sent);

                    case 6:
                        return _context2.abrupt('return', false);

                    case 7:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function getRequireSourceMap(_x2) {
        return _ref2.apply(this, arguments);
    };
}();

var loadMap = function loadMap(map) {
    var pkg = map.hasOwnProperty("pkg") ? map["pkg"] : false,
        template = {
        scripts: [],
        links: []
    };
    if (pkg) {
        Object.keys(pkg).forEach(function (key) {
            var pkgResource = pkg[key],
                type = pkgResource.type,
                uri = pkgResource.uri;
            if (type === "js") {
                var script = '<script type="text/javascript" src="' + uri + '"></script>';
                if (template.scripts.indexOf(script) < 0) template.scripts.push(script);
            } else if (type === "css") {
                var _script = '<link rel="stylesheet" type="text/css" href="' + uri + '">';
                if (template.links.indexOf(_script) < 0) template.links.push(_script);
            }
        });
    }
    return template;
};

function viewMiddleware(path) {
    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref3$extension = _ref3.extension,
        extension = _ref3$extension === undefined ? 'swig' : _ref3$extension,
        _ref3$options = _ref3.options,
        options = _ref3$options === undefined ? {} : _ref3$options;

    return function views(ctx, next) {
        if (ctx.render) return next();
        ctx.render = function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(relPath) {
                var locals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                var resourceMap;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.t0 = require;
                                _context3.next = 3;
                                return getRequireSourceMap(ctx);

                            case 3:
                                _context3.t1 = _context3.sent;
                                resourceMap = (0, _context3.t0)(_context3.t1);
                                return _context3.abrupt('return', getPaths(path, relPath, extension).then(function (paths) {
                                    var suffix = paths.ext;
                                    var state = Object.assign(locals, options, ctx.state || {});
                                    // deep copy partials
                                    state.partials = Object.assign({}, options.partials || {});
                                    //debug('render `%s` with %j', paths.rel, state)
                                    ctx.type = 'text/html';
                                    return ctx.body = render(resolve(path, paths.rel), state, resourceMap);
                                }));

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            return function (_x4) {
                return _ref4.apply(this, arguments);
            };
        }();

        return next();
    };
}

module.exports = viewMiddleware;