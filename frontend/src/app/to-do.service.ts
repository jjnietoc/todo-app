import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, pipe } from "rxjs";
import { ToDo } from "./models/to-do";

@Injectable({
  providedIn: "root",
})
export class ToDoService {
  constructor(private http: HttpClient) {}
  getToDos() {
    return this.http.get<ToDo[]>("/api/todos");
  }
  updateToDo(id: number) {
    return this.http.put<ToDo>(`/api/todos/${id}`, {
      completed: true,
    });
  }
  addToDo(todo: string) {
    return this.http.post<ToDo>("/api/todos/", {
      name: todo,
    });
  }
}
