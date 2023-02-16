import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ToDoListComponent } from "./to-do-list/to-do-list.component";
import { ToDoComponent } from "./to-do/to-do.component";
import { SignupComponent } from "./signup/signup.component";
import { AdminViewComponent } from "./admin-view/admin-view.component";
import { RoleGuardService } from "./role-guard.service";

const routes: Routes = [
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "todos", component: ToDoListComponent },
  { path: "admin", component: AdminViewComponent, canActivate: [RoleGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
