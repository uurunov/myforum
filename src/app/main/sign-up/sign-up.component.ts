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
  model: any = {};

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  getFocusIn(element: any): void {
    element.parentElement.style.boxShadow = '0 0 10px rgb(0, 139, 182)';
  }

  getFocusOut(element: any): void {
    element.parentElement.style.boxShadow = '';
  }

  register(formData: any) {
    console.log('form', formData.value);
    if (this.model.cnfmpassword === this.model.password) {
      if (this.model.status === true) {
        formData.value.role = 'admin';
      } else {
        formData.value.role = 'user';
      }
      console.log(formData.value);
      this.auth.signup(formData.value).subscribe((response) => {
        console.log(response);
        this.router.navigate(['/sign-in']);
      });
    } else {
      alert('Passwords Not Matched! Try Again!');
    }
  }
}
