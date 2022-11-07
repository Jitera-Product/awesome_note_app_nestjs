import { StringField } from 'decorators/field.decorator';

export class VerifyResetPasswordDTO {
  @StringField()
  reset_token: string;

  @StringField()
  password: string;

  @StringField({ equalTo: 'password' })
  password_confirmation: string;
}
