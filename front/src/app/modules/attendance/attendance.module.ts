import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { CreateLessonComponent } from './pages/create-lesson/create-lesson.component';

import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LessonsAndAttendanceComponent } from './pages/lessons-and-attendance/lessons-and-attendance.component';
import { CourseWithLessonsComponent } from './pages/course-with-lessons/course-with-lessons.component';


@NgModule({
  declarations: [
    CreateLessonComponent,
    LessonsAndAttendanceComponent,
    CourseWithLessonsComponent
  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialModule,
  ]
})
export class AttendanceModule { }
