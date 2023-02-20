import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./models/user";
import { tap } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class AuthService {
  user?: User;
  token: string = "";
  constructor(private http: HttpClient) {
    this.loadUser();
  }
  login(email: string, password: string) {
    return this.http
      .post<{ user: User; token: string }>(
        "http://localhost:8001/api/users/login",
        {
          email,
          password,
        }
      )
      .pipe(
        tap((response) => {
          this.user = response.user;
          this.token = response.token;
          this.saveUser();
        })
      );
  }
  signup(name: string, email: string, password: string, isAdmin: boolean) {
    return this.http
      .post<{ user: User; token: string }>(
        "http://localhost:8001/api/users/signup",
        {
          name,
          email,
          password,
          isAdmin,
        }
      )
      .pipe(
        tap((response) => {
          this.user = response.user;
          this.token = response.token;
          this.saveUser();
        })
      );
  }

  saveUser() {
    localStorage.setItem("user", JSON.stringify(this.user));
    localStorage.setItem("token", this.token);
  }

  loadUser() {
    this.user = JSON.parse(localStorage.getItem("user")!);
    this.token = localStorage.getItem("token") || "";
  }

  logout() {
    this.user = undefined;
    this.token = "";
    localStorage.clear();
  }
}
