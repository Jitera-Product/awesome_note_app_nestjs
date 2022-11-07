import { Note } from 'entities/notes';
export declare class CreateNoteRequest {
    content: string;
    user_id: number;
}
export declare class CreateNoteRequestDTO {
    notes: CreateNoteRequest;
}
export declare class CreateNoteResponse {
    id: number;
    created_at: Date;
    updated_at: Date;
    content: string;
    user_id: number;
}
export declare class CreateNoteResponseDTO {
    note: CreateNoteResponse;
    constructor(note: Note);
}
