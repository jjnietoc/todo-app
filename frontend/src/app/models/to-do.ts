export interface ToDo {
    id: number;
    user_id: number;
    name: string;
    translated_text: string;
    clicked: boolean;
    completed: boolean;
    created_at: Date;
    completed_at: Date;
}