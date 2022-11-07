"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const constants_1 = require("../constants");
const passport_1 = require("@nestjs/passport");
class AuthGuard extends (0, passport_1.AuthGuard)(constants_1.AUTH_STRATEGY.TOKEN) {
}
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map