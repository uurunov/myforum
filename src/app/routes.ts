import { SignInComponent } from './main/sign-in/sign-in.component';
import { SignUpComponent } from './main/sign-up/sign-up.component';
import { AdminMenuComponent } from './main/admin-menu/admin-menu.component';
import { TopicsComponent } from './main/topics/topics.component';
import { TopicCommentsComponent } from './main/topic-comments/topic-comments.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserCheckComponent } from './user-check/user-check.component';
import { NewTopicComponent } from './main/new-topic/new-topic.component';
import { UsersComponent } from './main/users/users.component';
import { NewUserComponent } from './main/new-user/new-user.component';
import { AuthGuard } from './guards/auth.guard';

export const routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'user-check', component: UserCheckComponent },
  {
    path: 'admin-menu',
    canActivate: [AuthGuard],
    component: AdminMenuComponent,
  },
  { path: 'topics', canActivate: [AuthGuard], component: TopicsComponent },
  { path: 'add-topic', component: NewTopicComponent },
  {
    path: 'topics/:id',
    component: TopicCommentsComponent,
  },
  { path: 'users', component: UsersComponent },
  { path: 'add-user', component: NewUserComponent },
  { path: '**', component: NotFoundComponent },
];
