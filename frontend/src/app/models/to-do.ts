export interface ToDo {
    id: number;
    user_id: number;
    name: string;
    completed: boolean;
    created_at: Date;
    completed_at: Date;
}