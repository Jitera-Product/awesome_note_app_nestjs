import { StringField } from 'decorators/field.decorator';

export class ResetPasswordDTO {
  @StringField({ email: true })
  email: string;
}
