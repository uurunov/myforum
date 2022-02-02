import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  signUpFailedMessage: string = '';
  model: any = { user_access: 1 };

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

  // Adds new user into the app
  addUser(newUserData: any) {
    if (newUserData.valid) {
      // if password and confirm password are same, then send data for registration
      if (this.model.cnfmpassword === this.model.pswd) {
        // if checkbox (user_role) is checked, it's admin, else it's user
        if (this.model.user_role) {
          this.model.user_role = 'admin';
        } else {
          this.model.user_role = 'user';
        }
        this.auth.signup(this.model).subscribe((resp) => {
          console.log(resp);
          this.router.navigate(['/users']);
        });
      } else {
        // if password and confirm password are not same, don't send the data and alert the admin
        alert('Passwords entered are not exactly same!');
      }
      newUserData.reset();
      newUserData.form.markAsPristine();
      newUserData.form.markAsUntouched();
    } else {
      newUserData.form.markAllAsTouched();
      this.signUpFailedMessage =
        'Some fields are empty or filled with invalid data!';
    }
  }
}
