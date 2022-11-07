import { User } from 'entities/users';
export declare class Note {
    id: number;
    created_at: Date;
    updated_at: Date;
    content: string;
    user_id: number;
    user: User;
}
