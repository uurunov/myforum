import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { UserComment } from 'src/app/models/comment';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit, DoCheck {
  comments: UserComment[] = [];

  model: any = {};

  user_role_admin: boolean = false;
  admin_option_edit: boolean = false;
  commentId_toBeEdited: number = 0;

  httpHeaderOption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private commentService: CommentsService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  initializeComments() {
    this.route.paramMap.subscribe((params) => {
      this.commentService
        .getComments(Number(params.get('id')))
        .subscribe((comments: any) => {
          console.log(comments);
          this.comments = JSON.parse(JSON.stringify(comments));
          this.comments.forEach((elem) => {
            elem.active = false;
          });
          console.log(this.comments);
        });
    });
  }

  ngOnInit(): void {
    if (this.auth.LoggedInUser.role === 'admin') {
      this.user_role_admin = true;
    }
    this.initializeComments();
  }

  ngDoCheck(): void {}

  onOptionsClicked(commentId: number) {
    this.comments.find((elem) => {
      if (elem.id === commentId) {
        elem.active = !elem.active;
      }
    });
  }

  onOptionEditClicked(commentId: number) {
    this.admin_option_edit = true;
    this.commentId_toBeEdited = commentId;
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe();
    this.onOptionsClicked(commentId);
  }

  editComment(data: any) {
    console.log(this.model, this.commentId_toBeEdited);
    this.commentService
      .updateComment(data.value, this.commentId_toBeEdited)
      .subscribe(() => {
        this.initializeComments();
      });
    this.admin_option_edit = false;
    this.onOptionsClicked(this.commentId_toBeEdited);
    data.reset();
  }
}
