import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ToDo } from "../models/to-do";
import { ToDoService } from "../to-do.service";

@Component({
  templateUrl: "./to-do-list.component.html",
  styleUrls: ["./to-do-list.component.css"],
})
export class ToDoListComponent implements OnInit {
  newToDo = "";
  todos?: Observable<ToDo[]>;
  todo?: ToDo;
  constructor(private toDoService: ToDoService) {}
  // Get all ToDos
  ngOnInit(): void {
    this.todos = this.toDoService.getToDos();
  }
  // Add New ToDo
  addToDo(): void {
    this.toDoService.addToDo(this.newToDo).subscribe((_) => {
      this.todos = this.toDoService.getToDos();
      this.newToDo = "";
    });
  }
}
