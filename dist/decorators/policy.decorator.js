"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckPolicy = exports.UsePolicy = exports.RESOURCE_ENTITY_KEY = exports.ACTION_KEY = exports.POLICY_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.POLICY_KEY = 'POLICY_KEY';
exports.ACTION_KEY = 'ACTION_KEY';
exports.RESOURCE_ENTITY_KEY = 'RESOURCE_ENTITY_KEY';
const UsePolicy = (policy, resource) => {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)(exports.POLICY_KEY, policy), (0, common_1.SetMetadata)(exports.RESOURCE_ENTITY_KEY, resource));
};
exports.UsePolicy = UsePolicy;
const CheckPolicy = (action) => (0, common_1.SetMetadata)(exports.ACTION_KEY, action);
exports.CheckPolicy = CheckPolicy;
//# sourceMappingURL=policy.decorator.js.map