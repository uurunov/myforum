import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiAuthURL: string = 'http://localhost:8080/api/auth/';
  apiUserURL: string = 'http://localhost:8080/api/user/';

  httpHeaderOption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  LoggedInUser: User = {
    id: 0,
    lastname: 'lastname',
    login: 'login',
    role: 'role',
  };

  constructor(private http: HttpClient, private router: Router) {}

  signup(data: any) {
    return this.http.post(
      this.apiAuthURL + 'register',
      data,
      this.httpHeaderOption
    );
  }

  signin(data: any) {
    return this.http.post(
      this.apiAuthURL + 'login',
      data,
      this.httpHeaderOption
    );
  }

  saveToken(response: any) {
    localStorage.setItem('jwt_token', response.jwtToken);
    this.router.navigate(['/topics']);
  }

  isSignedIn() {
    return localStorage.getItem('jwt_token') != null;
  }

  signout() {
    localStorage.clear();
    this.router.navigate(['/sign-in']);
  }

  getUserInfo() {
    return this.http.get(this.apiUserURL + 'info', this.httpHeaderOption);
  }
}
