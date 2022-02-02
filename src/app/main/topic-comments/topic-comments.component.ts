import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopicsService } from '../../services/topics/topics.service';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { Topic } from 'src/app/models/topic';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-topic-comments',
  templateUrl: './topic-comments.component.html',
  styleUrls: ['./topic-comments.component.css'],
})
export class TopicCommentsComponent implements OnInit {
  // Information about the selected topic
  currentTopic: Topic = { id: 0, title: '', user: { id: 0 }, active: false };

  model: any = {};

  timeToRecallComments: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private topicsService: TopicsService,
    private commentService: CommentsService,
    private date: DatePipe,
    private auth: AuthService
  ) {}

  // Get selected topic information by getting topic by id from server, and store the info into currentTopic object
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.topicsService.getTopic(params.get('id')).subscribe((topic: any) => {
        this.currentTopic = JSON.parse(JSON.stringify(topic));
      });
    });
  }

  // Register new comment into the server
  sendComment(comment: any) {
    if (comment.valid) {
      let nowDate = new Date();
      this.model.topicId = this.currentTopic.id;
      this.model.userId = this.auth.LoggedInUser.id;
      this.model.comment_date = this.date.transform(nowDate, 'MMM d y, H:mm');

      // sending new comment to the server
      this.commentService
        .createComment(JSON.stringify(this.model), this.currentTopic.id)
        .subscribe((data) => {
          console.log(data);
          this.timeToRecallComments = true;
        });
    }
    comment.reset();
  }
}
