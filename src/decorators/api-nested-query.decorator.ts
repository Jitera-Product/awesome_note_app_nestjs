import { ApiQuery, getSchemaPath, ApiExtraModels } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function ApiNestedQuery(fieldName: string, type: Function, required?: boolean) {
  return applyDecorators(
    ApiExtraModels(type),
    ApiQuery({
      required: required || false,
      name: fieldName,
      style: 'deepObject',
      explode: true,
      type: 'object',
      schema: {
        $ref: getSchemaPath(type),
      },
    }),
  );
}
