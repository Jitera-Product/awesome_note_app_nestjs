import { AUTH_STRATEGY, OAUTH_GRANT_TYPE } from 'src/constants';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class RefreshTokenGuard extends AuthGuard(AUTH_STRATEGY.REFRESH_TOKEN) {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (request?.body?.grantType === OAUTH_GRANT_TYPE.PASSWORD) {
      return true;
    }

    return super.canActivate(context);
  }
}
