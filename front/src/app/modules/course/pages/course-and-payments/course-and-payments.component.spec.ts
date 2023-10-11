import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAndPaymentsComponent } from './course-and-payments.component';

describe('CourseAndPaymentsComponent', () => {
  let component: CourseAndPaymentsComponent;
  let fixture: ComponentFixture<CourseAndPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseAndPaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseAndPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
