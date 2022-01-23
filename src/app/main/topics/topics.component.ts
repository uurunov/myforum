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
  topics: Topic[] = [];
  constructor(
    private topicsService: TopicsService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getTopics();
    this.auth.getUserInfo().subscribe((info: any) => {
      this.auth.LoggedInUser = JSON.parse(JSON.stringify(info));
    });
  }

  getTopics() {
    this.topicsService.getTopics().subscribe(
      (topics: any) => {
        this.topics = topics;
      },
      (error) => {
        this.auth.signout();
      }
    );
  }
}
