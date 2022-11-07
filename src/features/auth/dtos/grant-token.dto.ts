import { ValidateIf } from 'class-validator';
import { EnumField, StringField, StringFieldOptional } from 'decorators/field.decorator';
import { OAUTH_GRANT_TYPE } from 'src/constants';
import { ScopeEnum } from './scope.dto';

export class GrantTokenDto {
  @StringField({ email: true })
  @ValidateIf((o: GrantTokenDto) => o.grant_type === OAUTH_GRANT_TYPE.PASSWORD)
  email?: string;

  @StringField()
  @ValidateIf((o: GrantTokenDto) => o.grant_type === OAUTH_GRANT_TYPE.PASSWORD)
  password?: string;

  @EnumField(() => OAUTH_GRANT_TYPE)
  grant_type: OAUTH_GRANT_TYPE;

  @StringFieldOptional({ allowEmpty: true })
  client_id?: string;

  @StringFieldOptional({ allowEmpty: true })
  client_secret?: string;

  @ValidateIf((o: GrantTokenDto) => o.grant_type === OAUTH_GRANT_TYPE.PASSWORD)
  @EnumField(() => ScopeEnum)
  scope?: ScopeEnum;

  @ValidateIf((o: GrantTokenDto) => o.grant_type === OAUTH_GRANT_TYPE.REFRESH_TOKEN)
  @StringFieldOptional()
  refresh_token?: string;
}
