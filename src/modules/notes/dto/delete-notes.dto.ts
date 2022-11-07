import { NumberField } from 'src/decorators/field.decorator';

export class DeleteNoteParamsDTO {
  @NumberField({ int: true })
  id: number;
}

export class DeleteNoteResponseDTO {}
