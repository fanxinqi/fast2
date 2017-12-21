'use strict';

/**
 * Created by fanxinqi on 2017/10/26.
 */
var _exports = module.exports;
var modules = [];

/**
 * trigger the load of FIS, it means add a js/css file to the page.
 *
 * @alias require
 *
 * @example
 * // if `namespace` = `user`
 * // load mod.js
 * {%require "user:statics/mod.js"%}
 *
 * @param {string|var} id  the resource `id` of the FIS system.
 */
_exports.compile = function (compiler, args, content, parents, options, blockName) {
    console.log(args);
    args.forEach(function (moduleId) {
        console.log(eval(moduleId));
    });
    // console.log(compiler(content, parents, options, blockName))
    return '(function () {\n' + ' var __o = _output; console.log(_output)\n' + '  _output = "";\n' + compiler(content, parents, options, blockName) + ';\n' + '  __o;\n' + '  _output = __o;\n' + '})();\n';
};

_exports.parse = function (str, line, parser, types) {
    parser.on(types.STRING, function (token) {
        console.log(token);
        var self = this;
        self.out.push(token.match);
    });
    return true;
};
_exports.modules = modules;

_exports.ends = true;