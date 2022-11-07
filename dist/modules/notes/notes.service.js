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
exports.NoteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const notes_1 = require("../../database/entities/notes");
const base_service_1 = require("../../shared/base.service");
const dto_1 = require("./dto");
let NoteService = class NoteService extends base_service_1.BaseService {
    constructor(noteRepository) {
        super(noteRepository);
        this.noteRepository = noteRepository;
    }
    async filter(queries) {
        var _a, _b;
        const conditions = [
            {
                column: 'content',
                value: (_a = queries === null || queries === void 0 ? void 0 : queries.notes) === null || _a === void 0 ? void 0 : _a.content,
                operator: base_service_1.QueryOperators.START_WITH,
                whereType: base_service_1.QueryWhereType.WHERE,
            },
            {
                column: 'user_id',
                value: (_b = queries === null || queries === void 0 ? void 0 : queries.notes) === null || _b === void 0 ? void 0 : _b.user_id,
                operator: base_service_1.QueryOperators.EQUAL,
                whereType: base_service_1.QueryWhereType.WHERE_OR,
            },
        ];
        const pagination = {
            page: queries === null || queries === void 0 ? void 0 : queries.pagination_page,
            limit: queries === null || queries === void 0 ? void 0 : queries.pagination_limit,
        };
        const order = { orderBy: 'notes.created_at', orderDir: base_service_1.QueryOrderDir.DESC };
        const [notes, totalPages] = await this.findMany({ conditions, pagination, order });
        return new dto_1.FilterNoteResponseDTO(notes, totalPages);
    }
    async show(params) {
        const conditions = [
            {
                column: 'notes.id',
                value: params.id,
                operator: base_service_1.QueryOperators.EQUAL,
                whereType: base_service_1.QueryWhereType.WHERE,
            },
        ];
        const note = await this.findOne({ conditions });
        return new dto_1.ShowNoteResponseDTO(note);
    }
    async create(request) {
        var _a, _b;
        const data = {
            content: (_a = request === null || request === void 0 ? void 0 : request.notes) === null || _a === void 0 ? void 0 : _a.content,
            user_id: (_b = request === null || request === void 0 ? void 0 : request.notes) === null || _b === void 0 ? void 0 : _b.user_id,
        };
        const note = await this.createOne({ data });
        return new dto_1.CreateNoteResponseDTO(note);
    }
    async update(params, request) {
        var _a, _b;
        const conditions = [
            {
                column: 'notes.id',
                value: params.id,
                operator: base_service_1.QueryOperators.EQUAL,
                whereType: base_service_1.QueryWhereType.WHERE_AND,
            },
        ];
        const data = {
            content: (_a = request === null || request === void 0 ? void 0 : request.notes) === null || _a === void 0 ? void 0 : _a.content,
            user_id: (_b = request === null || request === void 0 ? void 0 : request.notes) === null || _b === void 0 ? void 0 : _b.user_id,
        };
        const note = await this.updateOne({ conditions, data });
        return new dto_1.UpdateNoteResponseDTO(note);
    }
    async delete(params) {
        const conditions = [
            {
                column: 'notes.id',
                value: params.id,
                operator: base_service_1.QueryOperators.EQUAL,
                whereType: base_service_1.QueryWhereType.WHERE,
            },
        ];
        await this.removeOne({ conditions });
        return new dto_1.DeleteNoteResponseDTO();
    }
};
NoteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(notes_1.Note)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], NoteService);
exports.NoteService = NoteService;
//# sourceMappingURL=notes.service.js.map