import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  saludo = "todo-app";
  constructor(private authService: AuthService, private router: Router) {
    if (this.isLogedIn()) {
      if (this.authService.user?.isAdmin) {
        this.router.navigate(["admin"]);
      } else {
        this.router.navigate(["todos"]);
      }
    } else {
      this.router.navigate(["login"]);
    }
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(["login"]);
  }
  isLogedIn() {
    return this.authService.user;
  }
}
