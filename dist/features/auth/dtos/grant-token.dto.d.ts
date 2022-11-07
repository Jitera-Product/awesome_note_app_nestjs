import { OAUTH_GRANT_TYPE } from 'src/constants';
import { ScopeEnum } from './scope.dto';
export declare class GrantTokenDto {
    email?: string;
    password?: string;
    grant_type: OAUTH_GRANT_TYPE;
    client_id?: string;
    client_secret?: string;
    scope?: ScopeEnum;
    refresh_token?: string;
}
