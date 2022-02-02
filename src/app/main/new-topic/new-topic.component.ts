import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TopicsService } from 'src/app/services/topics/topics.service';

@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.css'],
})
export class NewTopicComponent implements OnInit {
  loginFailedMessage: string = '';
  model: any = { user: { id: this.auth.LoggedInUser.id } };

  constructor(
    private auth: AuthService,
    private topicService: TopicsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getFocusIn(element: any, state: any): void {
    if (!(state.invalid && state.touched)) {
      element.parentElement.style.boxShadow = '0 0 10px rgb(0, 139, 182)';
    }
  }

  getFocusOut(element: any): void {
    element.parentElement.style.boxShadow = '';
  }

  // Adds new topic into the app
  addTopic(formData: any) {
    if (formData.valid) {
      console.log(this.model);
      this.topicService.addNewTopic(this.model).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/topics']);
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
