import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpReq } from 'src/app/core/interfaces/sign-up-request-interface';
import { UserService } from 'src/app/core/services/user/user.service';


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
    private userService: UserService
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
    this.formSignUp.get('rolId')?.setValue("1");

    const passwordInput = document.querySelector("#passwordInput");
    const passwordInput2 = document.querySelector("#passwordInput2");
    const eye = document.querySelector("#eye");
    const eye2 = document.querySelector("#eye2");
    eye?.addEventListener("click", function(){
      let isPass = passwordInput?.getAttribute("type");
      let type;
      if(isPass === "password") {
        type = "text";
        eye.classList.remove('fa-eye-slash');
        eye.classList.add('fa-eye');
      }else{
        type = "password";
        eye.classList.remove('fa-eye');
        eye.classList.add('fa-eye-slash');
      }
      passwordInput?.setAttribute("type", type);
    });
    eye2?.addEventListener("click", function(){
      let isPass = passwordInput2?.getAttribute("type");
      let type;
      if(isPass === "password") {
        type = "text";
        eye2.classList.remove('fa-eye-slash');
        eye2.classList.add('fa-eye');
      }else{
        type = "password";
        eye2.classList.remove('fa-eye');
        eye2.classList.add('fa-eye-slash');
      }
      passwordInput2?.setAttribute("type", type);
    })
  }

  data!: SignUpReq;

  sendForm(event: any) {
    if(this.formSignUp.valid){
      console.log(this.formSignUp.value)

      this.data = this.formSignUp.value as SignUpReq;

      try {
        this.userService.createUser(this.data).subscribe({
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
            this.router.navigateByUrl('/user/account-created');
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
