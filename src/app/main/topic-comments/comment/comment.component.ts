import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
export class CommentComponent implements OnInit, OnChanges {
  // Array of user comments' information
  comments: UserComment[] = [];

  model: any = {};

  @Input() timeToRecall: boolean = false;

  // if true, user is author
  user_author: boolean = false;

  // if true, author PRIVILIGES: MORE OPTIONS ICON is clicked
  author_option_edit: boolean = false;

  // ID of the comment user wants to edit
  commentId_toBeEdited: number = 0;

  httpHeaderOption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private commentService: CommentsService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.timeToRecall.currentValue) {
      this.initializeComments();
    }
    // console.log(changes.timeToRecall);
  }

  // getting all comments related to the selected topic by ID
  // adding new property 'ACTIVE' for each comment of the selected topic
  // added the new property to identify which element the user has selected to edit or delete
  // storing comments into the array of user comments
  initializeComments() {
    this.route.paramMap.subscribe((params) => {
      this.commentService
        .getComments(Number(params.get('id')))
        .subscribe((comments: any) => {
          this.comments = JSON.parse(JSON.stringify(comments));
          this.comments.forEach((elem) => {
            elem.active = false;
          });
        });
    });
  }

  ngOnInit(): void {
    // get all comments related to the selected topic
    this.initializeComments();
  }

  // determining if user is author or not
  isAuthor(commentId: number): boolean {
    this.comments.find((elem) => {
      if (elem.id === commentId) {
        if (elem.user.id === this.auth.LoggedInUser.id) {
          this.user_author = true;
        } else {
          this.user_author = false;
        }
      }
    });
    return this.user_author;
  }

  // Activate 'active' property of the user-selected comment by ID
  onOptionsClicked(commentId: number) {
    this.comments.find((elem) => {
      if (elem.id === commentId) {
        elem.active = !elem.active;
      }
    });
  }

  // author PRIVILIGES: MORE OPTIONS ICON is clicked. Display the MORE OPTIONS menu to the user
  onOptionEditClicked(commentId: number) {
    this.author_option_edit = true;
    this.commentId_toBeEdited = commentId;
  }

  // Delete comment from server, and reinitialize or
  // get all comments of current topic once again to update the array of user comments
  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe(() => {
      this.initializeComments();
    });
    this.onOptionsClicked(commentId);
  }

  // Edit comment in the server, and reinitialize or
  // get all comments of current topic once again to update the array of user comments
  // hide the MORE OPTIONS menu from the user, and deactivate 'active' property of the user-selected comment by ID
  editComment(data: any) {
    if (data.valid) {
      this.commentService
        .updateComment(data.value, this.commentId_toBeEdited)
        .subscribe(() => {
          this.initializeComments();
        });
      this.author_option_edit = false;
      this.onOptionsClicked(this.commentId_toBeEdited);
      data.reset();
    } else {
      this.author_option_edit = false;
      this.onOptionsClicked(this.commentId_toBeEdited);
      data.reset();
    }
  }
}
