import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-user-check',
  templateUrl: './user-check.component.html',
  styleUrls: ['./user-check.component.css'],
})
export class UserCheckComponent implements OnInit {
  isLoading: boolean = true;

  constructor(private auth: AuthService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();

    this.auth.getUserInfo().subscribe((info: any) => {
      this.auth.LoggedInUser = JSON.parse(JSON.stringify(info));
    });

    setTimeout(() => {
      this.spinner.hide();
      this.auth.navigateTo();
    }, 2000);
  }
}
