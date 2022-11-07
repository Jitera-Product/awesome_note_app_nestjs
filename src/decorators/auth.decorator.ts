import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'guards/auth.guard';
import { PoliciesGuard } from 'guards/policies.guard';

export function Auth(): MethodDecorator {
  return applyDecorators(UseGuards(AuthGuard, PoliciesGuard));
}
