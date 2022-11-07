"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoliciesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const policy_decorator_1 = require("../decorators/policy.decorator");
const typeorm_1 = require("typeorm");
const index_1 = require("../constants/index");
let PoliciesGuard = class PoliciesGuard {
    constructor(dataSource, reflector) {
        this.dataSource = dataSource;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const PolicyClass = this.reflector.getAllAndOverride(policy_decorator_1.POLICY_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const action = this.reflector.getAllAndOverride(policy_decorator_1.ACTION_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const resourceClass = this.reflector.getAllAndOverride(policy_decorator_1.RESOURCE_ENTITY_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!PolicyClass || !action || !resourceClass)
            return true;
        const policy = new PolicyClass();
        const { user, params } = context.switchToHttp().getRequest();
        policy.setUser(user);
        if (action === index_1.DEFAULT_ACTIONS.FILTER)
            return policy.authorize(action);
        const resource = await this.dataSource
            .getRepository(resourceClass)
            .findOneBy({ id: params === null || params === void 0 ? void 0 : params.id });
        if (!resource)
            return true;
        return policy.authorize(action, resource);
    }
};
PoliciesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource, core_1.Reflector])
], PoliciesGuard);
exports.PoliciesGuard = PoliciesGuard;
//# sourceMappingURL=policies.guard.js.map