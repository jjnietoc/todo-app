import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { ToDo } from "../models/to-do";
import { ToDoService } from "../to-do.service";

@Component({
  selector: "app-to-do",
  templateUrl: "./to-do.component.html",
  styleUrls: ["./to-do.component.css"],
})
export class ToDoComponent implements OnInit {
  @Input() todo?: ToDo;
  constructor(private toDoService: ToDoService) {}
  ngOnInit(): void {}
  markAsDone(): void {
    if (this.todo) {
      this.toDoService.updateToDo(this.todo.id)
      .subscribe(todo => this.todo = todo);
    }
  }
  translate(): void {
    if (this.todo) {
      this.toDoService.translateToDo(this.todo.id)
      .subscribe(todo => this.todo = todo);
    }
  }
}
