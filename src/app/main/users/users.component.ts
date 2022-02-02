import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  model: any = { user_access: 0 };

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    // Fetch all users information of the app
    this.getAllUsers();
  }

  // getting all users who are registered to the app
  getAllUsers() {
    this.auth.getUsersInfo().subscribe((users: any) => {
      this.users = JSON.parse(JSON.stringify(users));
      console.log(this.users);
    });
  }

  // toggle user access value
  changeUserAccess(userId: number) {
    this.users.find((user) => {
      if (user.id === userId) {
        this.model.user_access = user.user_access ? 1 : 0;
        console.log(this.model);
        this.auth.updateUserAccess(this.model, user.id).subscribe(() => {
          this.getAllUsers();
        });
      }
    });
  }
}
