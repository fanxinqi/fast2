"use strict";

var cwd = process.cwd();
var getMorkJson = function getMorkJson() {};
var getNameSpace = function getNameSpace(ctx) {
    return ctx.state.namespace;
};

var setNameSpace = function setNameSpace(ctx, namspace) {
    return ctx.state.namespace = namspace;
};
var getJsonUri = function getJsonUri() {
    var cwd = process.cwd(),
        reqUri = ctx.request.url,
        uriMatch = reqUri.match(reg);
    var mockJsonName = uriMatch[uriMatch.length - 1] + ".json";
};
var readJson = function readJson() {
    getJsonUri(cwd + "/test" + reqUri + jsonfile.readFileSync(mockUri));
};
var initProject = function initProject() {
    setNameSpace;
};
module.exports = {
    setNameSpace: setNameSpace,
    extend: extend
};