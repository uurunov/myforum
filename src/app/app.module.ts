import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { SignInComponent } from './main/sign-in/sign-in.component';
import { SignUpComponent } from './main/sign-up/sign-up.component';
import { TopicsComponent } from './main/topics/topics.component';
import { TopicCommentsComponent } from './main/topic-comments/topic-comments.component';
import { CommentComponent } from './main/topic-comments/comment/comment.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { routes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    SignInComponent,
    SignUpComponent,
    TopicsComponent,
    TopicCommentsComponent,
    CommentComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('jwt_token');
        },
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: [],
      },
    }),
    RouterModule.forRoot(routes),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
