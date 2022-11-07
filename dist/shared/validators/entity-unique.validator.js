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
exports.EntityUnique = exports.EntityUniqueValidator = void 0;
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let EntityUniqueValidator = class EntityUniqueValidator {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async validate(value, args) {
        const [EntityClass] = args.constraints;
        const entityRepo = await this.dataSource.getRepository(EntityClass);
        const primaryKey = await entityRepo.metadata.primaryColumns[0].propertyName;
        const query = Object.assign({ [args.property]: value }, (args.object[primaryKey] && {
            [primaryKey]: (0, typeorm_1.Not)(args.object[primaryKey]),
        }));
        const count = await entityRepo.count({ where: query });
        return count === 0;
    }
    defaultMessage(args) {
        return `A ${this.dataSource.getRepository(args.constraints[0]).metadata.tableName} with this ${args.property} already exists`;
    }
};
EntityUniqueValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isEntityUnique', async: true }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], EntityUniqueValidator);
exports.EntityUniqueValidator = EntityUniqueValidator;
function EntityUnique(entity, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [entity],
            validator: EntityUniqueValidator,
        });
    };
}
exports.EntityUnique = EntityUnique;
//# sourceMappingURL=entity-unique.validator.js.map