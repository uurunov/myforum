import { Component, OnInit } from '@angular/core';
import { TopicsService } from '../../services/topics/topics.service';
import { Topic } from 'src/app/models/topic';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
})
export class TopicsComponent implements OnInit {
  // An array of all topic objects of the app
  topics: Topic[] = [];

  model: any = { user: { id: this.auth.LoggedInUser.id } };

  // if true, user is author
  user_author: boolean = false;

  // if true, author PRIVILIGES: MORE OPTIONS ICON is clicked
  author_option_edit: boolean = false;

  // ID of the topic user wants to edit
  topicId_toBeEdited: number = 0;

  loginFailedMessage: string = '';

  constructor(
    private topicsService: TopicsService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // Get all topics from server
    this.getTopics();
  }

  getFocusIn(element: any, state: any): void {
    if (!(state.invalid && state.touched)) {
      element.parentElement.style.boxShadow = '0 0 10px rgb(0, 139, 182)';
    }
  }

  getFocusOut(element: any): void {
    element.parentElement.style.boxShadow = '';
  }

  // Getting topics from server, and assigning them to the array of topic objects. In case of error, sign out.
  getTopics() {
    this.topicsService.getTopics().subscribe(
      (topics: any) => {
        this.topics = JSON.parse(JSON.stringify(topics));
        this.topics.forEach((topic) => {
          topic.active = false;
        });
      },
      (error) => {
        console.log(error);
        this.auth.signout();
      }
    );
  }

  // determining if user is author or not
  isAuthor(topicId: number): boolean {
    this.topics.find((topic) => {
      if (topic.id === topicId) {
        if (topic.user.id === this.auth.LoggedInUser.id) {
          this.user_author = true;
        }
      }
    });
    return this.user_author;
  }

  // Activate 'active' property of the user-selected topic by ID
  onOptionsClicked(topicId: number) {
    this.topics.find((topic) => {
      if (topic.id === topicId) {
        topic.active = !topic.active;
      }
    });
  }

  // author PRIVILIGES: MORE OPTIONS ICON is clicked. Display the MORE OPTIONS menu to the user
  onOptionEditClicked(topicId: number) {
    this.author_option_edit = true;
    this.topicId_toBeEdited = topicId;
  }

  stopEditing(form: any) {
    this.author_option_edit = false;
    form.reset();
    form.form.markAsPristine();
    form.form.markAsUntouched();
  }

  // Delete topic from server, and reinitialize or
  // get all topics of current topic once again to update the array of user topics
  deleteTopic(topicId: number) {
    this.topicsService.deleteTopic(topicId).subscribe(() => {
      this.getTopics();
    });
    this.onOptionsClicked(topicId);
  }

  // Edit topic in the server, and reinitialize or
  // get all topics of current topic once again to update the array of user topics
  // hide the MORE OPTIONS menu from the user, and deactivate 'active' property of the user-selected topic by ID
  editTopic(data: any) {
    if (data.valid) {
      this.topicsService
        .updateTopic(this.model, this.topicId_toBeEdited)
        .subscribe(
          () => {
            this.getTopics();
          },
          (error) => {
            console.error(error);
            this.loginFailedMessage = error.error.message;
          }
        );
      this.stopEditing(data);
    } else {
      data.form.markAllAsTouched();
      this.loginFailedMessage =
        'Please enter valid information. Empty data is not allowed!';
      data.reset();
    }
  }
}
