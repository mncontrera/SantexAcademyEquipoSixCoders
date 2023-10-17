import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseWithLessonsComponent } from './course-with-lessons.component';

describe('CourseWithLessonsComponent', () => {
  let component: CourseWithLessonsComponent;
  let fixture: ComponentFixture<CourseWithLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseWithLessonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseWithLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
