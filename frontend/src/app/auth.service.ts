import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user?: User;
  token: string = "";
  isAdmin = false;
  constructor(private http: HttpClient) {
    this.loadUser();
  }
  login(email: string, password: string) {
    return this.http.post<{user: User, token: string, isAdmin: boolean}>("http://localhost:8001/api/users/login", {
      email,
      password,
    }).pipe(tap((response) => {
      this.user = response.user;
      this.token = response.token;
      this.isAdmin = response.isAdmin;
      this.saveUser();
    }));
  }
  signup(name: string, email: string, password: string, isAdmin: Boolean) {
    return this.http.post<{user: User, token: string}>("http://localhost:8001/api/users/signup", {
      name,
      email,
      password,
      isAdmin
    }).pipe(tap((response) => {
      this.user = response.user;
      this.token = response.token;
      this.saveUser()
    }));
  }

  saveUser() {
    localStorage.setItem('user', JSON.stringify(this.user));
    localStorage.setItem('token', this.token);
    localStorage.setItem('isAdmin', String(this.isAdmin))
  }

  loadUser() {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.token = localStorage.getItem('token') || "";
    this.isAdmin = Boolean(localStorage.getItem('isAdmin'));
  }

  logout() {
    this.user = undefined;
    this.token = "";
    this.isAdmin = false;
    localStorage.clear();
  }
}
