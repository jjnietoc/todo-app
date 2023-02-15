import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user?: User ;
  token: string = "";
  constructor(private http: HttpClient) {}
  login(email: string, password: string) {
    return this.http.post<{user: User, token: string}>("http://localhost:8001/api/users/login", {
      email,
      password
    }).pipe(tap((response) => {
      this.user = response.user;
      this.token = response.token;
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
    }));
  }
}
