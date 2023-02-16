import { Component, Input } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  email = "";
  password = "";
  constructor(private authService: AuthService, private router: Router) {}
  login(): void {
    this.authService.login(this.email, this.password).subscribe((response) => {
      if (!this.authService.user?.isAdmin) {
        this.router.navigate(['todos'])
      }
      else {
        this.router.navigate(['admin'])
      }
    });
  }
}
