import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  loginFailedMessage: string = '';
  model: any = {};

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    localStorage.clear();
  }

  getFocusIn(element: any, state: any): void {
    if (!(state.invalid && state.touched)) {
      element.parentElement.style.boxShadow = '0 0 10px rgb(0, 139, 182)';
    }
  }

  getFocusOut(element: any): void {
    element.parentElement.style.boxShadow = '';
  }

  // Sends user's login data to the server to be authenticated, and saves the token sent by server
  login(formData: any) {
    if (formData.valid) {
      this.auth.signin(formData.value).subscribe(
        (response) => {
          // saves the token
          this.auth.saveToken(response);
        },
        (error) => {
          console.error(error);
          this.loginFailedMessage = error.error.message;
        }
      );
      formData.reset();
      formData.form.markAsPristine();
      formData.form.markAsUntouched();
    } else {
      formData.form.markAllAsTouched();
      this.loginFailedMessage =
        'Please enter valid information. Empty data is not allowed!';
    }
  }
}
