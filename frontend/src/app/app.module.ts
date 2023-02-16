import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { ToDoComponent } from "./to-do/to-do.component";
import { ToDoListComponent } from "./to-do-list/to-do-list.component";
import { AuthInterceptor } from "./auth.interceptor";
import { SignupComponent } from './signup/signup.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { RoleGuardService } from "./role-guard.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToDoComponent,
    ToDoListComponent,
    SignupComponent,
    AdminViewComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  bootstrap: [AppComponent],
  providers: [
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
    },
    RoleGuardService
  ],
})
export class AppModule {}
