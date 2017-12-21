"use strict";

var fs = require("fs");
//
function findPath(dir) {
    var children = [];
    fs.readdirSync(dir).forEach(function (filename) {
        // console.log(filename)
        var path = dir + "/" + filename;
        var stat = fs.statSync(path);
        if (stat && stat.isDirectory()) {
            children = children.concat(walk(path));
        } else {
            children.push(path);
        }
    });

    return children;
}
//
function findFileName(dir) {
    var children = [];
    var childrenName = [];
    fs.readdirSync(dir).forEach(function (filename) {
        // console.log(filename)
        var path = dir + "/" + filename;
        var stat = fs.statSync(path);
        if (stat && stat.isDirectory()) {
            children = children.concat(walk(path));
        } else {
            children.push(path);
            childrenName.push(filename);
        }
    });

    return childrenName;
}
module.exports = {
    findPath: findPath,
    findFileName: findFileName
};