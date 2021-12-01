import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicCommentsComponent } from './topic-comments.component';

describe('TopicCommentsComponent', () => {
  let component: TopicCommentsComponent;
  let fixture: ComponentFixture<TopicCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
