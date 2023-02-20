import { Component, Input } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

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
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
}
