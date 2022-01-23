import { SignInComponent } from './main/sign-in/sign-in.component';
import { SignUpComponent } from './main/sign-up/sign-up.component';
import { TopicsComponent } from './main/topics/topics.component';
import { TopicCommentsComponent } from './main/topic-comments/topic-comments.component';
import { CommentComponent } from './main/topic-comments/comment/comment.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';

export const routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'topics', canActivate: [AuthGuard], component: TopicsComponent },
  {
    path: 'topics/:id',
    component: TopicCommentsComponent,
  },
  { path: '**', component: NotFoundComponent },
];
