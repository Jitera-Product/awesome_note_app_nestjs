import { StringField } from 'decorators/field.decorator';

export class SignUpDto {
  @StringField({ email: true })
  email: string;

  @StringField({ minLength: 8 })
  password: string;
}
