import { Component } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent {
  name = "";
  email = "";
  password = "";
  isAdmin = false;
  constructor(private authService: AuthService, private router: Router) {}
  signup(): void {
    this.authService
      .signup(this.name, this.email, this.password, this.isAdmin)
      .subscribe((response) => {
        this.router.navigate(["todos"]);
      });
  }
}
