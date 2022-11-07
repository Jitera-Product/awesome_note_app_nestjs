import { AUTH_STRATEGY } from 'src/constants';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

export class AuthGuard extends NestAuthGuard(AUTH_STRATEGY.TOKEN) {}
