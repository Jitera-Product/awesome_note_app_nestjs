import { ScopeEnum } from './scope.dto';
export interface JwtDto {
    userId: number;
    scope: ScopeEnum;
    resourceOwner: string;
    iat: number;
    exp: number;
}
