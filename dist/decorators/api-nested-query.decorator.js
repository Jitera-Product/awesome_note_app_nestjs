"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiNestedQuery = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
function ApiNestedQuery(fieldName, type, required) {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(type), (0, swagger_1.ApiQuery)({
        required: required || false,
        name: fieldName,
        style: 'deepObject',
        explode: true,
        type: 'object',
        schema: {
            $ref: (0, swagger_1.getSchemaPath)(type),
        },
    }));
}
exports.ApiNestedQuery = ApiNestedQuery;
//# sourceMappingURL=api-nested-query.decorator.js.map