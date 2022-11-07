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
exports.FilterNoteResponseDTO = exports.FilterNoteResponse = exports.FilterNoteRequestDTO = exports.FilterNoteRequest = void 0;
const openapi = require("@nestjs/swagger");
const field_decorator_1 = require("../../../decorators/field.decorator");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class FilterNoteRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { content: { required: false, type: () => String }, user_id: { required: false, type: () => Number } };
    }
}
__decorate([
    (0, field_decorator_1.StringFieldOptional)({ maxLength: 255, minLength: 0 }),
    __metadata("design:type", String)
], FilterNoteRequest.prototype, "content", void 0);
__decorate([
    (0, field_decorator_1.NumberFieldOptional)({ int: true }),
    __metadata("design:type", Number)
], FilterNoteRequest.prototype, "user_id", void 0);
exports.FilterNoteRequest = FilterNoteRequest;
class FilterNoteRequestDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { notes: { required: false, type: () => require("./filter-notes.dto").FilterNoteRequest }, pagination_page: { required: false, type: () => Number }, pagination_limit: { required: false, type: () => Number } };
    }
}
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => FilterNoteRequest),
    __metadata("design:type", FilterNoteRequest)
], FilterNoteRequestDTO.prototype, "notes", void 0);
__decorate([
    (0, field_decorator_1.NumberFieldOptional)({ int: true }),
    __metadata("design:type", Number)
], FilterNoteRequestDTO.prototype, "pagination_page", void 0);
__decorate([
    (0, field_decorator_1.NumberFieldOptional)({ int: true }),
    __metadata("design:type", Number)
], FilterNoteRequestDTO.prototype, "pagination_limit", void 0);
exports.FilterNoteRequestDTO = FilterNoteRequestDTO;
class FilterNoteResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, created_at: { required: true, type: () => Date }, updated_at: { required: true, type: () => Date }, content: { required: true, type: () => String }, user_id: { required: true, type: () => Number } };
    }
}
exports.FilterNoteResponse = FilterNoteResponse;
class FilterNoteResponseDTO {
    constructor(notes, total_pages) {
        this.notes = notes.map((note) => ({
            id: note === null || note === void 0 ? void 0 : note.id,
            created_at: note === null || note === void 0 ? void 0 : note.created_at,
            updated_at: note === null || note === void 0 ? void 0 : note.updated_at,
            content: note === null || note === void 0 ? void 0 : note.content,
            user_id: note === null || note === void 0 ? void 0 : note.user_id,
        }));
        this.total_pages = total_pages;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { notes: { required: true, type: () => [require("./filter-notes.dto").FilterNoteResponse] }, total_pages: { required: true, type: () => Number } };
    }
}
exports.FilterNoteResponseDTO = FilterNoteResponseDTO;
//# sourceMappingURL=filter-notes.dto.js.map