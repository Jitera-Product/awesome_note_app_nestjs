"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenResponseDTO = void 0;
const openapi = require("@nestjs/swagger");
class TokenResponseDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { access_token: { required: true, type: () => String }, refresh_token: { required: true, type: () => String }, resource_owner: { required: true, type: () => String }, resource_id: { required: true, type: () => Number }, expires_in: { required: true, type: () => Number }, token_type: { required: true, type: () => String }, scope: { required: true, type: () => String, enum: require("./scope.dto").ScopeEnum }, create_at: { required: true, type: () => Date } };
    }
}
exports.TokenResponseDTO = TokenResponseDTO;
//# sourceMappingURL=token-response.dto.js.map