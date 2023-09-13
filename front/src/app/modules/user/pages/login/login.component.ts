import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginService } from 'src/app/core/services/user/login.service';
import { LoginReq } from 'src/app/core/interfaces/login-request-interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent implements OnInit{

  currentUserLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<any> = new BehaviorSubject<any>({token:"", status:"", message:""});

  formLogin: UntypedFormGroup;

  constructor(
    private uFormBuilder: UntypedFormBuilder,
    private router: Router,
    private loginService: LoginService
    ) {
    this.formLogin = this.uFormBuilder.group({
      email: ['',[Validators.required, Validators.email,]],
      password: ['',[Validators.required, Validators.minLength(8),]],
    })
  }

  ngOnInit(): void {
    this.formLogin.get('password')?.valueChanges.subscribe(value =>{
      console.log(value)
    })
  }

  data!: LoginReq;

  saveForm(event: any) {
    if(this.formLogin.valid){
      console.log(this.formLogin.value)
      console.log("a continuacion sigue la peticion post");

      this.data = this.formLogin.value as LoginReq;

      this.loginService.login(this.data).subscribe({
        next: (userLoginData) => {
          console.log("user login data response status: " + userLoginData.status)
          console.log(userLoginData);
        },
        error: (errorData) => {
          console.log("Error en la peticion")
          console.log(errorData);
        },
        complete: () => {
          console.log("peticion completada")
        }
      })

      //this.formLogin.reset();
      this.router.navigateByUrl('/home');
    }else{
      this.formLogin.markAllAsTouched();
    }
  }

  get userData():Observable<any>{
    return this.currentUserData.asObservable();
  }

  get userLogin():Observable<any>{
    return this.currentUserLogin.asObservable();
  }

  get emailField(){
    return this.formLogin.get('email');
  }

  get passwordField(){
    return this.formLogin.get('password');
  }

}
