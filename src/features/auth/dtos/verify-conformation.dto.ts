import { StringField } from 'decorators/field.decorator';

export class VerifyConfirmationDTO {
  @StringField()
  confirmation_token: string;
}
