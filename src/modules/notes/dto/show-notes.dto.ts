import { Note } from 'entities/notes';
import { NumberField } from 'src/decorators/field.decorator';

export class ShowNoteParamsDTO {
  @NumberField({ int: true })
  id: number;
}

export class ShowNoteResponse {
  id: number;

  created_at: Date;

  updated_at: Date;

  content: string;

  user_id: number;
}

export class ShowNoteResponseDTO {
  note: ShowNoteResponse;

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
