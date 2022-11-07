import { Note } from 'entities/notes';
import { StringField, NumberField } from 'src/decorators/field.decorator';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateNoteRequest {
  @StringField({ maxLength: 255, minLength: 0 })
  content: string;

  @NumberField({ int: true })
  user_id: number;
}

export class CreateNoteRequestDTO {
  @ValidateNested()
  @Type(() => CreateNoteRequest)
  notes: CreateNoteRequest;
}

export class CreateNoteResponse {
  id: number;

  created_at: Date;

  updated_at: Date;

  content: string;

  user_id: number;
}

export class CreateNoteResponseDTO {
  note: CreateNoteResponse;

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
