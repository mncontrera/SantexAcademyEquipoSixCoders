import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateLessonComponent } from './pages/create-lesson/create-lesson.component';
import { LessonsAndAttendanceComponent } from './pages/lessons-and-attendance/lessons-and-attendance.component';
import { CourseWithLessonsComponent } from './pages/course-with-lessons/course-with-lessons.component';

const routes: Routes = [
  {
    path: 'create-lesson',
    component: CreateLessonComponent,
  },
  {
    path: 'course-with-lessons',
    component: CourseWithLessonsComponent,
  },
  {
    path: 'lessons-and-attendance',
    component: LessonsAndAttendanceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
