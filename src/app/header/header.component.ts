import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, DoCheck {
  loggedIn: boolean = false;
  currentUserLastname: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    if (this.auth.isSignedIn()) {
      this.loggedIn = true;
      this.currentUserLastname = this.auth.LoggedInUser.lastname;
    } else {
      this.loggedIn = false;
    }
  }

  backToLogin() {
    this.auth.signout();
  }
}
