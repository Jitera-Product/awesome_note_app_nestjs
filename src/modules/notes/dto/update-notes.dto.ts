import { Note } from 'entities/notes';
import {
  NumberField,
  StringFieldOptional,
  NumberFieldOptional,
} from 'src/decorators/field.decorator';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateNoteParamsDTO {
  @NumberField({ int: true })
  id: number;
}

export class UpdateNoteRequest {
  @StringFieldOptional({ maxLength: 255, minLength: 0 })
  content?: string;

  @NumberFieldOptional({ int: true })
  user_id?: number;
}

export class UpdateNoteRequestDTO {
  @ValidateNested()
  @Type(() => UpdateNoteRequest)
  notes?: UpdateNoteRequest;
}

export class UpdateNoteResponse {
  id: number;

  created_at: Date;

  updated_at: Date;

  content: string;

  user_id: number;
}

export class UpdateNoteResponseDTO {
  note: UpdateNoteResponse;

  constructor(note: Note) {
    this.note = {
      id: note?.id,
      created_at: note?.created_at,
      updated_at: note?.updated_at,
      content: note?.content,
      user_id: note?.user_id,
    };
  }
}
