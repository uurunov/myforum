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
  currentTopic: Topic = { id: 0, title: '' };
  model: any = {};

  constructor(
    private route: ActivatedRoute,
    private topicsService: TopicsService,
    private commentService: CommentsService,
    private date: DatePipe,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.topicsService.getTopic(params.get('id')).subscribe((topic: any) => {
        this.currentTopic = topic;
      });
    });
  }

  sendComment(comment: any) {
    let nowDate = new Date();
    this.model.topicId = this.currentTopic.id;
    this.model.userId = this.auth.LoggedInUser.id;
    this.model.comment_date = this.date.transform(nowDate, 'MMM d y, H:mm');
    console.log(this.model);
    this.commentService
      .createComment(JSON.stringify(this.model), this.currentTopic.id)
      .subscribe((data) => {
        console.log(data);
      });
    comment.reset();
  }
}
