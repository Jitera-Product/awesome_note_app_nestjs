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
exports.Note = void 0;
const typeorm_1 = require("typeorm");
const nestjs_i18n_1 = require("nestjs-i18n");
const class_validator_1 = require("class-validator");
const typeorm_2 = require("typeorm");
const users_1 = require("./users");
let Note = class Note {
    constructor() {
        this.user_id = 0;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, typeorm_1.Column)({ type: 'integer', primary: true }),
    __metadata("design:type", Number)
], Note.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    (0, typeorm_2.CreateDateColumn)(),
    __metadata("design:type", Date)
], Note.prototype, "created_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    (0, typeorm_2.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Note.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'varchar' }),
    (0, class_validator_1.MaxLength)(255, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MaxLength') }),
    (0, class_validator_1.MinLength)(0, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MinLength') }),
    __metadata("design:type", String)
], Note.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], Note.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_2.ManyToOne)(() => users_1.User, (user) => user.notes),
    (0, typeorm_2.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", users_1.User)
], Note.prototype, "user", void 0);
Note = __decorate([
    (0, typeorm_1.Entity)('notes')
], Note);
exports.Note = Note;
//# sourceMappingURL=notes.js.map