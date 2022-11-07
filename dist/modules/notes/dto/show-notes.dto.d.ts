import { Note } from 'entities/notes';
export declare class ShowNoteParamsDTO {
    id: number;
}
export declare class ShowNoteResponse {
    id: number;
    created_at: Date;
    updated_at: Date;
    content: string;
    user_id: number;
}
export declare class ShowNoteResponseDTO {
    note: ShowNoteResponse;
    constructor(note: Note);
}
