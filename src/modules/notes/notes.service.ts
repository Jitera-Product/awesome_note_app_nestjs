import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from 'entities/notes';
import {
  BaseService,
  QueryCondition,
  QueryOperators,
  QueryWhereType,
  QueryPagination,
  QueryOrder,
  QueryOrderDir,
} from 'src/shared/base.service';
import {
  FilterNoteResponseDTO,
  FilterNoteRequestDTO,
  ShowNoteResponseDTO,
  ShowNoteParamsDTO,
  CreateNoteResponseDTO,
  CreateNoteRequestDTO,
  UpdateNoteResponseDTO,
  UpdateNoteParamsDTO,
  UpdateNoteRequestDTO,
  DeleteNoteResponseDTO,
  DeleteNoteParamsDTO,
} from './dto';

@Injectable()
export class NoteService extends BaseService<Note> {
  constructor(@InjectRepository(Note) readonly noteRepository: Repository<Note>) {
    super(noteRepository);
  }

  async filter(queries: FilterNoteRequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'content',
        value: queries?.notes?.content,
        operator: QueryOperators.START_WITH,
        whereType: QueryWhereType.WHERE,
      },
      {
        column: 'user_id',
        value: queries?.notes?.user_id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_OR,
      },
    ];

    const pagination: QueryPagination = {
      page: queries?.pagination_page,
      limit: queries?.pagination_limit,
    };

    const order: QueryOrder = { orderBy: 'notes.created_at', orderDir: QueryOrderDir.DESC };

    const [notes, totalPages] = await this.findMany({ conditions, pagination, order });

    return new FilterNoteResponseDTO(notes, totalPages);
  }

  async show(params: ShowNoteParamsDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'notes.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
    ];

    const note = await this.findOne({ conditions });

    return new ShowNoteResponseDTO(note);
  }

  async create(request: CreateNoteRequestDTO) {
    const data = {
      content: request?.notes?.content,
      user_id: request?.notes?.user_id,
    };

    const note = await this.createOne({ data });

    return new CreateNoteResponseDTO(note);
  }

  async update(params: UpdateNoteParamsDTO, request: UpdateNoteRequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'notes.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_AND,
      },
    ];

    const data = {
      content: request?.notes?.content,
      user_id: request?.notes?.user_id,
    };

    const note = await this.updateOne({ conditions, data });

    return new UpdateNoteResponseDTO(note);
  }

  async delete(params: DeleteNoteParamsDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'notes.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
    ];

    await this.removeOne({ conditions });

    return new DeleteNoteResponseDTO();
  }
}
