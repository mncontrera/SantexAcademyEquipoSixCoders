import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AccountCreatedComponent } from './pages/account-created/account-created.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { VigilantGuard } from 'src/app/core/guards/vigilant.guard';
import { StudentCoursesComponent } from './pages/student-courses/student-courses.component';
import { LoginGuardGuard } from 'src/app/core/guards/login-guard.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
    // canActivate: [VigilantGuard]
  },
  {
    path: 'account-created',
    component: AccountCreatedComponent,
    // canActivate: [LoginGuardGuard]
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    // canActivate: [LoginGuardGuard]
  },
  {
    path: 'student-courses',
    component: StudentCoursesComponent,
    // canActivate: [VigilantGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
