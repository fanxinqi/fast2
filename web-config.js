"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * app config
 */
var web = {
    view_path: "/views/xiyibang-fe/view/page/", //模版前置路径（经自动化工具处理后的模版文件）
    ip: "127.0.0.1",
    port: "3012"

    //错误字典
};var errorMsgMap = {
    301: "用户名或密码错误",
    302: "没有管理权限",
    303: "登陆过期了额",
    404: "没有找到额...^_^",
    500: "服务器开小差了...^_^"
};

exports.default = {
    web: web,
    errorMsgMap: errorMsgMap
};