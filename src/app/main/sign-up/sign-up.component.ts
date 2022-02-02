import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpFailedMessage: string = '';
  model: any = { user_role: 'user', user_access: 1 };

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  getFocusIn(element: any, state: any): void {
    if (!(state.invalid && state.touched)) {
      element.parentElement.style.boxShadow = '0 0 10px rgb(0, 139, 182)';
    }
  }

  getFocusOut(element: any): void {
    element.parentElement.style.boxShadow = '';
  }

  // Sends new user's data to the server to be registered, and navigates user to sign-in
  register(formData: any) {
    if (formData.valid) {
      // if password and confirm password are same, then send data for registration
      if (this.model.cnfmpassword === this.model.pswd) {
        this.auth.signup(this.model).subscribe((response) => {
          console.log(response);
          this.router.navigate(['/sign-in']);
        });
      } else {
        // if password and confirm password are not same, don't send the data and alert the user
        alert('Passwords Not Matched! Try Again!');
      }
      formData.reset();
      formData.form.markAsPristine();
      formData.form.markAsUntouched();
    } else {
      formData.form.markAllAsTouched();
      this.signUpFailedMessage =
        'Please fill in the form completely with valid information!';
    }
  }
}
