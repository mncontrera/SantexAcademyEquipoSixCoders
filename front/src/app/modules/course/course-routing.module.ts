import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { GetCoursesComponent } from './pages/get-courses/get-courses.component';
import { CourseInformationComponent } from './pages/course-information/course-information.component';

const routes: Routes = [
  {
    path: 'create-course',
    component: CreateCourseComponent,
  },
  {
    path: 'courses',
    component: GetCoursesComponent,
  },
  {
    path: 'course-information',
    component: CourseInformationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
