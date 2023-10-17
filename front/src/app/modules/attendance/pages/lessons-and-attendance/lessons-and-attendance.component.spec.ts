import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsAndAttendanceComponent } from './lessons-and-attendance.component';

describe('LessonsAndAttendanceComponent', () => {
  let component: LessonsAndAttendanceComponent;
  let fixture: ComponentFixture<LessonsAndAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonsAndAttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonsAndAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
