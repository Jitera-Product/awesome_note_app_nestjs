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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const notes_service_1 = require("./notes.service");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
const api_nested_query_decorator_1 = require("../../decorators/api-nested-query.decorator");
let NoteController = class NoteController {
    constructor(noteService) {
        this.noteService = noteService;
    }
    filter(queries) {
        return this.noteService.filter(queries);
    }
    show(params) {
        return this.noteService.show(params);
    }
    create(request) {
        return this.noteService.create(request);
    }
    update(params, request) {
        return this.noteService.update(params, request);
    }
    delete(params) {
        return this.noteService.delete(params);
    }
};
__decorate([
    (0, common_1.Get)('/api/notes'),
    (0, api_nested_query_decorator_1.ApiNestedQuery)('notes', dto_1.FilterNoteRequest),
    openapi.ApiResponse({ status: 200, type: require("./dto/filter-notes.dto").FilterNoteResponseDTO }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterNoteRequestDTO]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "filter", null);
__decorate([
    (0, common_1.Get)('/api/notes/:id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/show-notes.dto").ShowNoteResponseDTO }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ShowNoteParamsDTO]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "show", null);
__decorate([
    (0, common_1.Post)('/api/notes'),
    openapi.ApiResponse({ status: 201, type: require("./dto/create-notes.dto").CreateNoteResponseDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateNoteRequestDTO]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('/api/notes/:id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/update-notes.dto").UpdateNoteResponseDTO }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateNoteParamsDTO,
        dto_1.UpdateNoteRequestDTO]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/api/notes/:id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/delete-notes.dto").DeleteNoteResponseDTO }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.DeleteNoteParamsDTO]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "delete", null);
NoteController = __decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('Note'),
    __metadata("design:paramtypes", [notes_service_1.NoteService])
], NoteController);
exports.NoteController = NoteController;
//# sourceMappingURL=notes.controller.js.map