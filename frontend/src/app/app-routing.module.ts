import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ToDoListComponent } from "./to-do-list/to-do-list.component";
import { ToDoComponent } from "./to-do/to-do.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "todos", component: ToDoListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
