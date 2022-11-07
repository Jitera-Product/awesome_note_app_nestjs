import { applyDecorators } from '@nestjs/common';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsInt,
  IsNumber,
  Min,
  Max,
  IsPositive,
  IsEnum,
  IsBoolean,
  IsDate,
  IsUrl,
  IsEmail,
  Matches,
  Equals,
  MinDate,
  MaxDate,
} from 'class-validator';
import { ToBoolean, ToLowerCase, ToUpperCase, Trim } from './transform.decorator';
import { Type, Expose } from 'class-transformer';
import { isNumber } from 'lodash';
import { i18nValidationMessage } from 'nestjs-i18n';
import { ToArray } from './transform.decorator';
import { IsEqualTo } from 'src/shared/validators/is-equal-to.validator';
interface IStringFieldOptions {
  length?: number;
  minLength?: number;
  maxLength?: number;
  toLowerCase?: boolean;
  toUpperCase?: boolean;
  allowEmpty?: boolean;
  email?: boolean;
  url?: boolean;
  regex?: { pattern: string; message?: string };
  equalTo?: string;
}
interface INumberFieldOptions {
  each?: boolean;
  minimum?: number;
  maximum?: number;
  int?: boolean;
  isPositive?: boolean;
  equal?: boolean;
}

interface IDateFieldOptions {
  minDate?: Date;
  maxDate?: Date;
}

export function StringField(options: IStringFieldOptions = {}): PropertyDecorator {
  const decorators = [IsString({ message: i18nValidationMessage('validation.IsString') }), Trim()];

  if (!options.allowEmpty) {
    decorators.push(IsNotEmpty({ message: i18nValidationMessage('validation.IsNotEmpty') }));
  }

  if (options?.length) {
    decorators.push(
      MinLength(options.length, {
        message: i18nValidationMessage('validation.MinLength'),
      }),
    );
    decorators.push(
      MaxLength(options.length, {
        message: i18nValidationMessage('validation.MaxLength'),
      }),
    );
  }

  if (options?.minLength) {
    decorators.push(
      MinLength(options.minLength, {
        message: i18nValidationMessage('validation.MinLength'),
      }),
    );
  }

  if (options?.maxLength) {
    decorators.push(
      MaxLength(options.maxLength, {
        message: i18nValidationMessage('validation.MaxLength'),
      }),
    );
  }

  if (options.url) {
    decorators.push(IsUrl({ message: i18nValidationMessage('validation.IsUrl') }));
  }

  if (options.email) {
    decorators.push(IsEmail({ message: i18nValidationMessage('validation.IsEmail') }));
  }

  if (options?.regex) {
    decorators.push(
      Matches(new RegExp(options?.regex.pattern), {
        message: options.regex.message || i18nValidationMessage('validation.Regex'),
      }),
    );
  }

  if (options.equalTo) {
    decorators.push(IsEqualTo(options.equalTo));
  }

  if (options?.toLowerCase) {
    decorators.push(ToLowerCase());
  }

  if (options?.toUpperCase) {
    decorators.push(ToUpperCase());
  }

  return applyDecorators(...decorators);
}

export function StringFieldOptional(options: IStringFieldOptions = {}): PropertyDecorator {
  return applyDecorators(IsOptional(), StringField({ ...options }));
}

export function NumberField(options: INumberFieldOptions = {}): PropertyDecorator {
  const decorators = [Type(() => Number)];

  const { each, int, minimum, maximum, isPositive, equal } = options;

  if (int) {
    decorators.push(IsInt({ each, message: i18nValidationMessage('validation.IsInt') }));
  } else {
    decorators.push(IsNumber({}, { each, message: i18nValidationMessage('validation.IsNumber') }));
  }

  if (isNumber(minimum)) {
    decorators.push(Min(minimum, { each, message: i18nValidationMessage('validation.Min') }));
  }

  if (isNumber(maximum)) {
    decorators.push(Max(maximum, { each, message: i18nValidationMessage('validation.Max') }));
  }

  if (isPositive) {
    decorators.push(
      IsPositive({
        each,
        message: i18nValidationMessage('validation.IsPositive'),
      }),
    );
  }

  if (equal) {
    decorators.push(
      Equals(equal, {
        each,
        message: i18nValidationMessage('validation.Equals'),
      }),
    );
  }

  return applyDecorators(...decorators);
}

export function NumberFieldOptional(options: INumberFieldOptions = {}): PropertyDecorator {
  return applyDecorators(IsOptional(), NumberField({ ...options }));
}

export function EnumField<TEnum>(
  getEnum: () => TEnum,
  options: Partial<{ each: boolean }> = {},
): PropertyDecorator {
  const enumValue = getEnum() as unknown;
  const decorators = [
    IsEnum(enumValue as object, {
      each: options?.each,
      message: i18nValidationMessage('validation.IsEnum'),
    }),
  ];

  if (options.each) {
    decorators.push(ToArray());
  }

  return applyDecorators(...decorators);
}

export function EnumFieldOptional<TEnum>(
  getEnum: () => TEnum,
  options: Partial<{ each: boolean }> = {},
): PropertyDecorator {
  return applyDecorators(IsOptional(), EnumField(getEnum, { ...options }));
}

export function BooleanField(options: Partial<{}> = {}): PropertyDecorator {
  const decorators = [
    IsBoolean({ message: i18nValidationMessage('validation.IsBoolean') }),
    ToBoolean(),
  ];

  return applyDecorators(...decorators);
}

export function BooleanFieldOptional(options: Partial<{}> = {}): PropertyDecorator {
  return applyDecorators(IsOptional(), BooleanField({ ...options }));
}

export function DateField(options: IDateFieldOptions): PropertyDecorator {
  const decorators = [Type(() => Date), IsDate()];

  if (options.minDate) {
    decorators.push(
      MinDate(options.minDate, {
        message: i18nValidationMessage('validation.MinDate'),
      }),
    );
  }

  if (options.maxDate) {
    decorators.push(
      MaxDate(options.maxDate, {
        message: i18nValidationMessage('validation.MaxDate'),
      }),
    );
  }

  return applyDecorators(...decorators);
}

export function DateFieldOptional(options = {}): PropertyDecorator {
  return applyDecorators(IsOptional(), DateField({ ...options }));
}

export function ResponseField(options?: {}): PropertyDecorator {
  const decorators = [Expose()];

  return applyDecorators(...decorators);
}

export function ResponseTypeField<T extends Function>(
  getType: () => T,
  options?: {},
): PropertyDecorator {
  const decorators = [Type(getType), Expose()];
  return applyDecorators(...decorators);
}
