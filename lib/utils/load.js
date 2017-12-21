'use strict';

var fs = require('fs');
var file = require('./file');
var path = require('path');
var getSourceMapNames = function getSourceMapNames() {
    return file.findFileName(path.join(__dirname, "../../config/sourcemap"));
};

module.exports = {
    getSourceMapNames: getSourceMapNames
};