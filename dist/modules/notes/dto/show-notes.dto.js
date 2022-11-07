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
exports.ShowNoteResponseDTO = exports.ShowNoteResponse = exports.ShowNoteParamsDTO = void 0;
const openapi = require("@nestjs/swagger");
const field_decorator_1 = require("../../../decorators/field.decorator");
class ShowNoteParamsDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, field_decorator_1.NumberField)({ int: true }),
    __metadata("design:type", Number)
], ShowNoteParamsDTO.prototype, "id", void 0);
exports.ShowNoteParamsDTO = ShowNoteParamsDTO;
class ShowNoteResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, created_at: { required: true, type: () => Date }, updated_at: { required: true, type: () => Date }, content: { required: true, type: () => String }, user_id: { required: true, type: () => Number } };
    }
}
exports.ShowNoteResponse = ShowNoteResponse;
class ShowNoteResponseDTO {
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
        return { note: { required: true, type: () => require("./show-notes.dto").ShowNoteResponse } };
    }
}
exports.ShowNoteResponseDTO = ShowNoteResponseDTO;
//# sourceMappingURL=show-notes.dto.js.map