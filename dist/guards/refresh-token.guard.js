"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenGuard = void 0;
const constants_1 = require("../constants");
const passport_1 = require("@nestjs/passport");
class RefreshTokenGuard extends (0, passport_1.AuthGuard)(constants_1.AUTH_STRATEGY.REFRESH_TOKEN) {
    canActivate(context) {
        var _a;
        const request = context.switchToHttp().getRequest();
        if (((_a = request === null || request === void 0 ? void 0 : request.body) === null || _a === void 0 ? void 0 : _a.grantType) === constants_1.OAUTH_GRANT_TYPE.PASSWORD) {
            return true;
        }
        return super.canActivate(context);
    }
}
exports.RefreshTokenGuard = RefreshTokenGuard;
//# sourceMappingURL=refresh-token.guard.js.map