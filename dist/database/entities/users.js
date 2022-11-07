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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const nestjs_i18n_1 = require("nestjs-i18n");
const class_validator_1 = require("class-validator");
const typeorm_2 = require("typeorm");
const notes_1 = require("./notes");
let User = class User {
    constructor() {
        this.sign_in_count = 0;
        this.failed_attempts = 0;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, typeorm_1.Column)({ type: 'integer', primary: true }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    (0, typeorm_2.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    (0, typeorm_2.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updated_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    (0, class_validator_1.MaxLength)(255, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MaxLength') }),
    (0, class_validator_1.MinLength)(0, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MinLength') }),
    __metadata("design:type", String)
], User.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'varchar' }),
    (0, class_validator_1.MaxLength)(255, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MaxLength') }),
    (0, class_validator_1.MinLength)(0, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MinLength') }),
    __metadata("design:type", String)
], User.prototype, "encrypted_password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'varchar', unique: true }),
    (0, class_validator_1.IsEmail)({ message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.IsEmail') }),
    (0, class_validator_1.MaxLength)(255, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MaxLength') }),
    (0, class_validator_1.MinLength)(0, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MinLength') }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar', unique: true }),
    (0, class_validator_1.MaxLength)(23, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MaxLength') }),
    __metadata("design:type", String)
], User.prototype, "reset_password_token", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    (0, class_validator_1.IsDate)({ message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.IsDate') }),
    __metadata("design:type", Date)
], User.prototype, "reset_password_sent_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    (0, class_validator_1.IsDate)({ message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.IsDate') }),
    __metadata("design:type", Date)
], User.prototype, "remember_created_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    (0, class_validator_1.IsDate)({ message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.IsDate') }),
    __metadata("design:type", Date)
], User.prototype, "current_sign_in_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    (0, class_validator_1.IsDate)({ message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.IsDate') }),
    __metadata("design:type", Date)
], User.prototype, "last_sign_in_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    (0, class_validator_1.MaxLength)(255, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MaxLength') }),
    (0, class_validator_1.MinLength)(0, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MinLength') }),
    __metadata("design:type", String)
], User.prototype, "current_sign_in_ip", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    (0, class_validator_1.MaxLength)(255, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MaxLength') }),
    (0, class_validator_1.MinLength)(0, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MinLength') }),
    __metadata("design:type", String)
], User.prototype, "last_sign_in_ip", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'integer', default: 0 }),
    (0, class_validator_1.Min)(-2147483647, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.Min') }),
    (0, class_validator_1.Max)(2147483646, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.Max') }),
    __metadata("design:type", Number)
], User.prototype, "sign_in_count", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    (0, class_validator_1.MaxLength)(255, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MaxLength') }),
    (0, class_validator_1.MinLength)(0, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MinLength') }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    (0, class_validator_1.MaxLength)(255, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MaxLength') }),
    (0, class_validator_1.MinLength)(0, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MinLength') }),
    __metadata("design:type", String)
], User.prototype, "password_confirmation", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    (0, class_validator_1.IsDate)({ message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.IsDate') }),
    __metadata("design:type", Date)
], User.prototype, "locked_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'integer', default: 0 }),
    (0, class_validator_1.Min)(-2147483647, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.Min') }),
    (0, class_validator_1.Max)(2147483646, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.Max') }),
    __metadata("design:type", Number)
], User.prototype, "failed_attempts", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar', unique: true }),
    (0, class_validator_1.MaxLength)(255, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MaxLength') }),
    (0, class_validator_1.MinLength)(0, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MinLength') }),
    __metadata("design:type", String)
], User.prototype, "unlock_token", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar', unique: true }),
    (0, class_validator_1.MaxLength)(255, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MaxLength') }),
    (0, class_validator_1.MinLength)(0, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MinLength') }),
    __metadata("design:type", String)
], User.prototype, "confirmation_token", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar', unique: true }),
    (0, class_validator_1.MaxLength)(255, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MaxLength') }),
    (0, class_validator_1.MinLength)(0, { message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MinLength') }),
    __metadata("design:type", String)
], User.prototype, "unconfirmed_email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    (0, class_validator_1.IsDate)({ message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.IsDate') }),
    __metadata("design:type", Date)
], User.prototype, "confirmed_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    (0, class_validator_1.IsDate)({ message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.IsDate') }),
    __metadata("design:type", Date)
], User.prototype, "confirmation_sent_at", void 0);
__decorate([
    (0, typeorm_2.OneToMany)(() => notes_1.Note, (note) => note.user),
    (0, typeorm_2.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Array)
], User.prototype, "notes", void 0);
User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
exports.User = User;
//# sourceMappingURL=users.js.map