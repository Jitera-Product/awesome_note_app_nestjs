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
exports.GrantTokenDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const field_decorator_1 = require("../../../decorators/field.decorator");
const constants_1 = require("../../../constants");
const scope_dto_1 = require("./scope.dto");
class GrantTokenDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: false, type: () => String }, password: { required: false, type: () => String }, grant_type: { required: true, enum: require("../../../constants/index").OAUTH_GRANT_TYPE }, client_id: { required: false, type: () => String }, client_secret: { required: false, type: () => String }, scope: { required: false, type: () => String, enum: require("./scope.dto").ScopeEnum }, refresh_token: { required: false, type: () => String } };
    }
}
__decorate([
    (0, field_decorator_1.StringField)({ email: true }),
    (0, class_validator_1.ValidateIf)((o) => o.grant_type === constants_1.OAUTH_GRANT_TYPE.PASSWORD),
    __metadata("design:type", String)
], GrantTokenDto.prototype, "email", void 0);
__decorate([
    (0, field_decorator_1.StringField)(),
    (0, class_validator_1.ValidateIf)((o) => o.grant_type === constants_1.OAUTH_GRANT_TYPE.PASSWORD),
    __metadata("design:type", String)
], GrantTokenDto.prototype, "password", void 0);
__decorate([
    (0, field_decorator_1.EnumField)(() => constants_1.OAUTH_GRANT_TYPE),
    __metadata("design:type", String)
], GrantTokenDto.prototype, "grant_type", void 0);
__decorate([
    (0, field_decorator_1.StringFieldOptional)({ allowEmpty: true }),
    __metadata("design:type", String)
], GrantTokenDto.prototype, "client_id", void 0);
__decorate([
    (0, field_decorator_1.StringFieldOptional)({ allowEmpty: true }),
    __metadata("design:type", String)
], GrantTokenDto.prototype, "client_secret", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.grant_type === constants_1.OAUTH_GRANT_TYPE.PASSWORD),
    (0, field_decorator_1.EnumField)(() => scope_dto_1.ScopeEnum),
    __metadata("design:type", String)
], GrantTokenDto.prototype, "scope", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.grant_type === constants_1.OAUTH_GRANT_TYPE.REFRESH_TOKEN),
    (0, field_decorator_1.StringFieldOptional)(),
    __metadata("design:type", String)
], GrantTokenDto.prototype, "refresh_token", void 0);
exports.GrantTokenDto = GrantTokenDto;
//# sourceMappingURL=grant-token.dto.js.map