import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { GetCoursesComponent } from './pages/get-courses/get-courses.component';
import { CourseInformationComponent } from './pages/course-information/course-information.component';
import { EditCourseComponent } from './pages/edit-course/edit-course.component';
import { ProfessorCoursesComponent } from './pages/professor-courses/professor-courses.component';
import { TeacherCourseInformationComponent } from './pages/teacher-course-information/teacher-course-information.component';
import { CourseAndPaymentsComponent } from './pages/course-and-payments/course-and-payments.component';
import { VigilantGuard } from 'src/app/core/guards/vigilant.guard';
import { TeacherGuardGuard } from 'src/app/core/guards/teacher-guard.guard';

const routes: Routes = [
  {
    path: 'create-course',
    component: CreateCourseComponent,
    canActivate: [TeacherGuardGuard],
  },
  {
    path: 'courses',
    component: GetCoursesComponent,
  },
  {
    path: 'course-information',
    component: CourseInformationComponent,
  },
  {
    path: 'edit-course',
    component: EditCourseComponent,
    canActivate: [TeacherGuardGuard],
  },
  {
    path: 'professor-courses',
    component: ProfessorCoursesComponent,
  },
  {
    path: 'get-courses',
    component: GetCoursesComponent,
  },
  {
    path: 'teacher-course',
    component: TeacherCourseInformationComponent,
  },
  {
    path: 'course-and-payments',
    component: CourseAndPaymentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
