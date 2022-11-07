"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponseDTO = void 0;
const openapi = require("@nestjs/swagger");
class SuccessResponseDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { success: { required: true, type: () => Boolean } };
    }
}
exports.SuccessResponseDTO = SuccessResponseDTO;
//# sourceMappingURL=success-response.dto.js.map