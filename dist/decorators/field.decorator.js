"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseTypeField = exports.ResponseField = exports.DateFieldOptional = exports.DateField = exports.BooleanFieldOptional = exports.BooleanField = exports.EnumFieldOptional = exports.EnumField = exports.NumberFieldOptional = exports.NumberField = exports.StringFieldOptional = exports.StringField = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const transform_decorator_1 = require("./transform.decorator");
const class_transformer_1 = require("class-transformer");
const lodash_1 = require("lodash");
const nestjs_i18n_1 = require("nestjs-i18n");
const transform_decorator_2 = require("./transform.decorator");
const is_equal_to_validator_1 = require("../shared/validators/is-equal-to.validator");
function StringField(options = {}) {
    const decorators = [(0, class_validator_1.IsString)({ message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.IsString') }), (0, transform_decorator_1.Trim)()];
    if (!options.allowEmpty) {
        decorators.push((0, class_validator_1.IsNotEmpty)({ message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.IsNotEmpty') }));
    }
    if (options === null || options === void 0 ? void 0 : options.length) {
        decorators.push((0, class_validator_1.MinLength)(options.length, {
            message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MinLength'),
        }));
        decorators.push((0, class_validator_1.MaxLength)(options.length, {
            message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MaxLength'),
        }));
    }
    if (options === null || options === void 0 ? void 0 : options.minLength) {
        decorators.push((0, class_validator_1.MinLength)(options.minLength, {
            message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MinLength'),
        }));
    }
    if (options === null || options === void 0 ? void 0 : options.maxLength) {
        decorators.push((0, class_validator_1.MaxLength)(options.maxLength, {
            message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MaxLength'),
        }));
    }
    if (options.url) {
        decorators.push((0, class_validator_1.IsUrl)({ message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.IsUrl') }));
    }
    if (options.email) {
        decorators.push((0, class_validator_1.IsEmail)({ message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.IsEmail') }));
    }
    if (options === null || options === void 0 ? void 0 : options.regex) {
        decorators.push((0, class_validator_1.Matches)(new RegExp(options === null || options === void 0 ? void 0 : options.regex.pattern), {
            message: options.regex.message || (0, nestjs_i18n_1.i18nValidationMessage)('validation.Regex'),
        }));
    }
    if (options.equalTo) {
        decorators.push((0, is_equal_to_validator_1.IsEqualTo)(options.equalTo));
    }
    if (options === null || options === void 0 ? void 0 : options.toLowerCase) {
        decorators.push((0, transform_decorator_1.ToLowerCase)());
    }
    if (options === null || options === void 0 ? void 0 : options.toUpperCase) {
        decorators.push((0, transform_decorator_1.ToUpperCase)());
    }
    return (0, common_1.applyDecorators)(...decorators);
}
exports.StringField = StringField;
function StringFieldOptional(options = {}) {
    return (0, common_1.applyDecorators)((0, class_validator_1.IsOptional)(), StringField(Object.assign({}, options)));
}
exports.StringFieldOptional = StringFieldOptional;
function NumberField(options = {}) {
    const decorators = [(0, class_transformer_1.Type)(() => Number)];
    const { each, int, minimum, maximum, isPositive, equal } = options;
    if (int) {
        decorators.push((0, class_validator_1.IsInt)({ each, message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.IsInt') }));
    }
    else {
        decorators.push((0, class_validator_1.IsNumber)({}, { each, message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.IsNumber') }));
    }
    if ((0, lodash_1.isNumber)(minimum)) {
        decorators.push((0, class_validator_1.Min)(minimum, { each, message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.Min') }));
    }
    if ((0, lodash_1.isNumber)(maximum)) {
        decorators.push((0, class_validator_1.Max)(maximum, { each, message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.Max') }));
    }
    if (isPositive) {
        decorators.push((0, class_validator_1.IsPositive)({
            each,
            message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.IsPositive'),
        }));
    }
    if (equal) {
        decorators.push((0, class_validator_1.Equals)(equal, {
            each,
            message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.Equals'),
        }));
    }
    return (0, common_1.applyDecorators)(...decorators);
}
exports.NumberField = NumberField;
function NumberFieldOptional(options = {}) {
    return (0, common_1.applyDecorators)((0, class_validator_1.IsOptional)(), NumberField(Object.assign({}, options)));
}
exports.NumberFieldOptional = NumberFieldOptional;
function EnumField(getEnum, options = {}) {
    const enumValue = getEnum();
    const decorators = [
        (0, class_validator_1.IsEnum)(enumValue, {
            each: options === null || options === void 0 ? void 0 : options.each,
            message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.IsEnum'),
        }),
    ];
    if (options.each) {
        decorators.push((0, transform_decorator_2.ToArray)());
    }
    return (0, common_1.applyDecorators)(...decorators);
}
exports.EnumField = EnumField;
function EnumFieldOptional(getEnum, options = {}) {
    return (0, common_1.applyDecorators)((0, class_validator_1.IsOptional)(), EnumField(getEnum, Object.assign({}, options)));
}
exports.EnumFieldOptional = EnumFieldOptional;
function BooleanField(options = {}) {
    const decorators = [
        (0, class_validator_1.IsBoolean)({ message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.IsBoolean') }),
        (0, transform_decorator_1.ToBoolean)(),
    ];
    return (0, common_1.applyDecorators)(...decorators);
}
exports.BooleanField = BooleanField;
function BooleanFieldOptional(options = {}) {
    return (0, common_1.applyDecorators)((0, class_validator_1.IsOptional)(), BooleanField(Object.assign({}, options)));
}
exports.BooleanFieldOptional = BooleanFieldOptional;
function DateField(options) {
    const decorators = [(0, class_transformer_1.Type)(() => Date), (0, class_validator_1.IsDate)()];
    if (options.minDate) {
        decorators.push((0, class_validator_1.MinDate)(options.minDate, {
            message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MinDate'),
        }));
    }
    if (options.maxDate) {
        decorators.push((0, class_validator_1.MaxDate)(options.maxDate, {
            message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.MaxDate'),
        }));
    }
    return (0, common_1.applyDecorators)(...decorators);
}
exports.DateField = DateField;
function DateFieldOptional(options = {}) {
    return (0, common_1.applyDecorators)((0, class_validator_1.IsOptional)(), DateField(Object.assign({}, options)));
}
exports.DateFieldOptional = DateFieldOptional;
function ResponseField(options) {
    const decorators = [(0, class_transformer_1.Expose)()];
    return (0, common_1.applyDecorators)(...decorators);
}
exports.ResponseField = ResponseField;
function ResponseTypeField(getType, options) {
    const decorators = [(0, class_transformer_1.Type)(getType), (0, class_transformer_1.Expose)()];
    return (0, common_1.applyDecorators)(...decorators);
}
exports.ResponseTypeField = ResponseTypeField;
//# sourceMappingURL=field.decorator.js.map