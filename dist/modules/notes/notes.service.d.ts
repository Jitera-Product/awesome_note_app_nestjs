import { Repository } from 'typeorm';
import { Note } from 'entities/notes';
import { BaseService } from 'src/shared/base.service';
import { FilterNoteResponseDTO, FilterNoteRequestDTO, ShowNoteResponseDTO, ShowNoteParamsDTO, CreateNoteResponseDTO, CreateNoteRequestDTO, UpdateNoteResponseDTO, UpdateNoteParamsDTO, UpdateNoteRequestDTO, DeleteNoteResponseDTO, DeleteNoteParamsDTO } from './dto';
export declare class NoteService extends BaseService<Note> {
    readonly noteRepository: Repository<Note>;
    constructor(noteRepository: Repository<Note>);
    filter(queries: FilterNoteRequestDTO): Promise<FilterNoteResponseDTO>;
    show(params: ShowNoteParamsDTO): Promise<ShowNoteResponseDTO>;
    create(request: CreateNoteRequestDTO): Promise<CreateNoteResponseDTO>;
    update(params: UpdateNoteParamsDTO, request: UpdateNoteRequestDTO): Promise<UpdateNoteResponseDTO>;
    delete(params: DeleteNoteParamsDTO): Promise<DeleteNoteResponseDTO>;
}
