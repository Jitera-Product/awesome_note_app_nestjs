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
exports.VerifyResetPasswordDTO = void 0;
const openapi = require("@nestjs/swagger");
const field_decorator_1 = require("../../../decorators/field.decorator");
class VerifyResetPasswordDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { reset_token: { required: true, type: () => String }, password: { required: true, type: () => String }, password_confirmation: { required: true, type: () => String } };
    }
}
__decorate([
    (0, field_decorator_1.StringField)(),
    __metadata("design:type", String)
], VerifyResetPasswordDTO.prototype, "reset_token", void 0);
__decorate([
    (0, field_decorator_1.StringField)(),
    __metadata("design:type", String)
], VerifyResetPasswordDTO.prototype, "password", void 0);
__decorate([
    (0, field_decorator_1.StringField)({ equalTo: 'password' }),
    __metadata("design:type", String)
], VerifyResetPasswordDTO.prototype, "password_confirmation", void 0);
exports.VerifyResetPasswordDTO = VerifyResetPasswordDTO;
//# sourceMappingURL=verify-reset-password.dto.js.map