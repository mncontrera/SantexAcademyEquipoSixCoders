import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpReq } from 'src/app/core/interfaces/sign-up-request-interface';
import { SignupService } from 'src/app/core/services/user/signup.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  formSignUp: UntypedFormGroup;

  constructor(
    private uFormBuilder: UntypedFormBuilder,
    private router: Router,
    private signUpService: SignupService
  ) {
    this.formSignUp = this.uFormBuilder.group({
      name: ['name',[Validators.required, Validators.maxLength(40),]],
      lastname: ['lastname',[Validators.required, Validators.maxLength(40),]],
      email: ['a@a',[Validators.required, Validators.email,]],
      password: ['123123123',[Validators.required, Validators.minLength(8),]],
      repeatPassword: ['123123123',[Validators.required, Validators.minLength(8),]],
      rolId: ['1',[Validators.required,]],
    })
   }

  ngOnInit(): void {
    this.formSignUp?.valueChanges.subscribe(value =>{
      console.log(value)
    });
    this.formSignUp.reset();
    this.formSignUp.get('rolId')?.setValue("1")
  }

  data!: SignUpReq;

  sendForm(event: any) {
    if(this.formSignUp.valid){
      console.log(this.formSignUp.value)
      console.log("acontinuacion debe estar la peticion post");

      this.data = this.formSignUp.value as SignUpReq;

      try {
        this.signUpService.signUp(this.data).subscribe({
          next: (userSignUpData) => {
            console.log("user sign up data response: \n")
            console.log(userSignUpData);
          },
          error: (errorData) => {
            console.log(errorData);
            throw "Error en la peticion";
          },
          complete: () => {
            console.log("peticion completada")
            this.formSignUp.reset();
            this.router.navigateByUrl('/user/accountCreated');
          }
        })
      } catch (error) {
        console.log(error);
      }
    }else{
      this.formSignUp.markAllAsTouched();
    }
  }

  get nameField(){
    return this.formSignUp.get('name');
  }

  get lastnameField(){
    return this.formSignUp.get('lastname');
  }

  get emailField(){
    return this.formSignUp.get('email');
  }

  get repeatPasswordField(){
    return this.formSignUp.get('repeatPassword');
  }

  get passwordField(){
    return this.formSignUp.get('password');
  }

  get rolIdField(){
    return this.formSignUp.get('rolId');
  }

}
