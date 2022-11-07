import { NoteService } from './notes.service';
import { FilterNoteResponseDTO, FilterNoteRequestDTO, ShowNoteResponseDTO, ShowNoteParamsDTO, CreateNoteResponseDTO, CreateNoteRequestDTO, UpdateNoteResponseDTO, UpdateNoteParamsDTO, UpdateNoteRequestDTO, DeleteNoteResponseDTO, DeleteNoteParamsDTO } from './dto';
export declare class NoteController {
    private readonly noteService;
    constructor(noteService: NoteService);
    filter(queries: FilterNoteRequestDTO): Promise<FilterNoteResponseDTO>;
    show(params: ShowNoteParamsDTO): Promise<ShowNoteResponseDTO>;
    create(request: CreateNoteRequestDTO): Promise<CreateNoteResponseDTO>;
    update(params: UpdateNoteParamsDTO, request: UpdateNoteRequestDTO): Promise<UpdateNoteResponseDTO>;
    delete(params: DeleteNoteParamsDTO): Promise<DeleteNoteResponseDTO>;
}
