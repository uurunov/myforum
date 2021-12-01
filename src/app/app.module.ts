import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { SignInComponent } from './main/sign-in/sign-in.component';
import { SignUpComponent } from './main/sign-up/sign-up.component';
import { TopicsComponent } from './main/topics/topics.component';
import { TopicCommentsComponent } from './main/topic-comments/topic-comments.component';
import { CommentComponent } from './main/topic-comments/comment/comment.component';

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
    CommentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
