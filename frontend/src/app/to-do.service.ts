import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ToDo } from "./models/to-do";

@Injectable({
  providedIn: "root",
})

export class ToDoService {
  constructor(private http: HttpClient) {}

  // Get all ToDos
  getToDos() {
    return this.http.get<ToDo[]>("/api/todos");
  }

  // Update ToDo by Id
  updateToDo(id: number) {
    return this.http.put<ToDo>(`/api/todos/${id}`, {
      completed: true,
    });
  }

  // Add new ToDo
  addToDo(todo: string) {
    return this.http.post<ToDo>("/api/todos/", {
      name: todo,
    });
  }

  // Translate ToDo
  translateToDo(id: number) {
    return this.http.get<ToDo>(`/api/todos/translate/${id}`);
  }
}
