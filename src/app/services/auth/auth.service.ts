import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // url for authentication and registration
  apiAuthURL: string = 'http://localhost:8080/api/auth/';

  // url for application feature requests
  apiUserURL: string = 'http://localhost:8080/api/user/';

  httpHeaderOption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // A place where information of the user, who is signed in, is stored
  LoggedInUser: User = {
    id: 0,
    fname: '',
    mname: '',
    lname: '',
    email: '',
    login: '',
    user_role: '',
    user_access: 1,
  };

  constructor(private http: HttpClient, private router: Router) {}

  // Register user by sending user's data to the server
  signup(data: any) {
    return this.http.post(
      this.apiAuthURL + 'register',
      data,
      this.httpHeaderOption
    );
  }

  // Authenticate user by sending user's login data to the server
  signin(data: any) {
    return this.http.post(
      this.apiAuthURL + 'login',
      data,
      this.httpHeaderOption
    );
  }

  // Saves the token into local storage, and navigates user for user-check if it's admin or not
  saveToken(response: any) {
    localStorage.setItem('jwt_token', response.jwtToken);
    this.router.navigate(['/user-check']);
  }

  // If admin, navigate to admin-menu. Otherwise, to topics page
  navigateTo() {
    if (this.LoggedInUser.user_role === 'admin') {
      this.router.navigate(['/admin-menu']);
    } else {
      this.router.navigate(['/topics']);
    }
  }

  // Check if user is authenticated successfully
  isSignedIn() {
    return localStorage.getItem('jwt_token') != null;
  }

  // Sign out by clearing the storage where token is located, and navigate to sign-in
  signout() {
    localStorage.clear();
    this.router.navigate(['/sign-in']);
  }

  // Get user information who is signed in
  getUserInfo() {
    return this.http.get(this.apiUserURL + 'info', this.httpHeaderOption);
  }

  // Get list of all users in the app
  getUsersInfo() {
    return this.http.get(this.apiUserURL + 'users', this.httpHeaderOption);
  }

  // Modify user access
  updateUserAccess(data: any, id: number) {
    return this.http.put(
      this.apiUserURL + 'users/' + id,
      data,
      this.httpHeaderOption
    );
  }
}
