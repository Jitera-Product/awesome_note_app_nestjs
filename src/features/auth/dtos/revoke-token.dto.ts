import { StringField } from 'decorators/field.decorator';

export class RevokeTokenDto {
  @StringField()
  refreshToken: string;
}
