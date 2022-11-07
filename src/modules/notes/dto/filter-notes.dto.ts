import { Note } from 'entities/notes';
import { StringFieldOptional, NumberFieldOptional } from 'src/decorators/field.decorator';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterNoteRequest {
  @StringFieldOptional({ maxLength: 255, minLength: 0 })
  content?: string;

  @NumberFieldOptional({ int: true })
  user_id?: number;
}

export class FilterNoteRequestDTO {
  @ValidateNested()
  @Type(() => FilterNoteRequest)
  notes?: FilterNoteRequest;

  @NumberFieldOptional({ int: true })
  pagination_page?: number;

  @NumberFieldOptional({ int: true })
  pagination_limit?: number;
}

export class FilterNoteResponse {
  id: number;

  created_at: Date;

  updated_at: Date;

  content: string;

  user_id: number;
}

export class FilterNoteResponseDTO {
  notes: FilterNoteResponse[];

  total_pages: number;

  constructor(notes: Note[], total_pages: number) {
    this.notes = notes.map((note) => ({
      id: note?.id,
      created_at: note?.created_at,
      updated_at: note?.updated_at,
      content: note?.content,
      user_id: note?.user_id,
    }));
    this.total_pages = total_pages;
  }
}
