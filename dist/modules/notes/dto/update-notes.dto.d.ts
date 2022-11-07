import { Note } from 'entities/notes';
export declare class UpdateNoteParamsDTO {
    id: number;
}
export declare class UpdateNoteRequest {
    content?: string;
    user_id?: number;
}
export declare class UpdateNoteRequestDTO {
    notes?: UpdateNoteRequest;
}
export declare class UpdateNoteResponse {
    id: number;
    created_at: Date;
    updated_at: Date;
    content: string;
    user_id: number;
}
export declare class UpdateNoteResponseDTO {
    note: UpdateNoteResponse;
    constructor(note: Note);
}
