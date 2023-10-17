import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MaterialModule } from '../material/material.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, FloatLabelType } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AccountCreatedComponent } from './pages/account-created/account-created.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { StudentCoursesComponent } from './pages/student-courses/student-courses.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    AccountCreatedComponent,
    EditProfileComponent,
    StudentCoursesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    // FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialModule,
    //FormControl,
  ],
  exports: [
    LoginComponent
  ]
})
export class UserModule { }
