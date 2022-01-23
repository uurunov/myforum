import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  model: any = {};

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    localStorage.clear();
  }

  getFocusIn(element: any): void {
    element.parentElement.style.boxShadow = '0 0 10px rgb(0, 139, 182)';
  }

  getFocusOut(element: any): void {
    element.parentElement.style.boxShadow = '';
  }

  login(formData: any, inputPass: any) {
    inputPass.parentElement.style.boxShadow = '';
    this.auth.signin(formData.value).subscribe((response) => {
      this.auth.saveToken(response);
    });
    formData.reset();
  }
}
