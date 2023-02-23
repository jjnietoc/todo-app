import { ToDo } from "./to-do";

export interface User {
  id: number;
  email: string;
  name: string;
  isAdmin: boolean;
  last_session: Date;
  update_at: Date;
  created_at: Date;
  todos: ToDo[];
}
