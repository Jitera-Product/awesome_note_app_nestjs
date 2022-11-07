import { Note } from 'entities/notes';
export declare class FilterNoteRequest {
    content?: string;
    user_id?: number;
}
export declare class FilterNoteRequestDTO {
    notes?: FilterNoteRequest;
    pagination_page?: number;
    pagination_limit?: number;
}
export declare class FilterNoteResponse {
    id: number;
    created_at: Date;
    updated_at: Date;
    content: string;
    user_id: number;
}
export declare class FilterNoteResponseDTO {
    notes: FilterNoteResponse[];
    total_pages: number;
    constructor(notes: Note[], total_pages: number);
}
