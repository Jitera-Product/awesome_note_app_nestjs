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
exports.UpdateNoteResponseDTO = exports.UpdateNoteResponse = exports.UpdateNoteRequestDTO = exports.UpdateNoteRequest = exports.UpdateNoteParamsDTO = void 0;
const openapi = require("@nestjs/swagger");
const field_decorator_1 = require("../../../decorators/field.decorator");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class UpdateNoteParamsDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, field_decorator_1.NumberField)({ int: true }),
    __metadata("design:type", Number)
], UpdateNoteParamsDTO.prototype, "id", void 0);
exports.UpdateNoteParamsDTO = UpdateNoteParamsDTO;
class UpdateNoteRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { content: { required: false, type: () => String }, user_id: { required: false, type: () => Number } };
    }
}
__decorate([
    (0, field_decorator_1.StringFieldOptional)({ maxLength: 255, minLength: 0 }),
    __metadata("design:type", String)
], UpdateNoteRequest.prototype, "content", void 0);
__decorate([
    (0, field_decorator_1.NumberFieldOptional)({ int: true }),
    __metadata("design:type", Number)
], UpdateNoteRequest.prototype, "user_id", void 0);
exports.UpdateNoteRequest = UpdateNoteRequest;
class UpdateNoteRequestDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { notes: { required: false, type: () => require("./update-notes.dto").UpdateNoteRequest } };
    }
}
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UpdateNoteRequest),
    __metadata("design:type", UpdateNoteRequest)
], UpdateNoteRequestDTO.prototype, "notes", void 0);
exports.UpdateNoteRequestDTO = UpdateNoteRequestDTO;
class UpdateNoteResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, created_at: { required: true, type: () => Date }, updated_at: { required: true, type: () => Date }, content: { required: true, type: () => String }, user_id: { required: true, type: () => Number } };
    }
}
exports.UpdateNoteResponse = UpdateNoteResponse;
class UpdateNoteResponseDTO {
    constructor(note) {
        this.note = {
            id: note === null || note === void 0 ? void 0 : note.id,
            created_at: note === null || note === void 0 ? void 0 : note.created_at,
            updated_at: note === null || note === void 0 ? void 0 : note.updated_at,
            content: note === null || note === void 0 ? void 0 : note.content,
            user_id: note === null || note === void 0 ? void 0 : note.user_id,
        };
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { note: { required: true, type: () => require("./update-notes.dto").UpdateNoteResponse } };
    }
}
exports.UpdateNoteResponseDTO = UpdateNoteResponseDTO;
//# sourceMappingURL=update-notes.dto.js.map