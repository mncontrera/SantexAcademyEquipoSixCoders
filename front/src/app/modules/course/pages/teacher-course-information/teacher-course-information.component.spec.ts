import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCourseInformationComponent } from './teacher-course-information.component';

describe('TeacherCourseInformationComponent', () => {
  let component: TeacherCourseInformationComponent;
  let fixture: ComponentFixture<TeacherCourseInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherCourseInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherCourseInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
