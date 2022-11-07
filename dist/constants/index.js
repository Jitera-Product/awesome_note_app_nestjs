"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_ACTIONS = exports.DEFAULT_PAGE_SIZE = exports.DEFAULT_PAGE_NUMBER = exports.AUTH_STRATEGY = exports.OAUTH_GRANT_TYPE = exports.NODE_ENV = void 0;
var NODE_ENV;
(function (NODE_ENV) {
    NODE_ENV["DEVELOPMENT"] = "development";
    NODE_ENV["TEST"] = "test";
    NODE_ENV["PRODUCTION"] = "production";
})(NODE_ENV = exports.NODE_ENV || (exports.NODE_ENV = {}));
var OAUTH_GRANT_TYPE;
(function (OAUTH_GRANT_TYPE) {
    OAUTH_GRANT_TYPE["PASSWORD"] = "password";
    OAUTH_GRANT_TYPE["REFRESH_TOKEN"] = "refresh_token";
})(OAUTH_GRANT_TYPE = exports.OAUTH_GRANT_TYPE || (exports.OAUTH_GRANT_TYPE = {}));
var AUTH_STRATEGY;
(function (AUTH_STRATEGY) {
    AUTH_STRATEGY["TOKEN"] = "token";
    AUTH_STRATEGY["REFRESH_TOKEN"] = "refresh_token";
})(AUTH_STRATEGY = exports.AUTH_STRATEGY || (exports.AUTH_STRATEGY = {}));
exports.DEFAULT_PAGE_NUMBER = 1;
exports.DEFAULT_PAGE_SIZE = 20;
var DEFAULT_ACTIONS;
(function (DEFAULT_ACTIONS) {
    DEFAULT_ACTIONS["FILTER"] = "filter";
    DEFAULT_ACTIONS["SHOW"] = "show";
    DEFAULT_ACTIONS["CREATE"] = "create";
    DEFAULT_ACTIONS["UPDATE"] = "update";
    DEFAULT_ACTIONS["DELETE"] = "delete";
})(DEFAULT_ACTIONS = exports.DEFAULT_ACTIONS || (exports.DEFAULT_ACTIONS = {}));
//# sourceMappingURL=index.js.map