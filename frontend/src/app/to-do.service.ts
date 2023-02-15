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
    return this.http.get<ToDo[]>("http://localhost:8001/api/todos");
  }
  updateToDo(id: number) {
    return this.http.put<ToDo>(`http://localhost:8001/api/todos/${id}`, {
      completed: true,
    });
  }
  addToDo(todo: string) {
    return this.http.post<ToDo>("http://localhost:8001/api/todos/", {
      name: todo,
    });
  }
}
