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

  token:string = "";

  constructor(
    private uFormBuilder: UntypedFormBuilder,
    private router: Router,
    private loginService: LoginService,
    ) {
    this.formLogin = this.uFormBuilder.group({
      email: ['nico@gmail.com',[Validators.required, Validators.email,]],
      password: ['asd123123',[Validators.required, Validators.minLength(8),]],
    })
  }

  ngOnInit(): void {
    this.formLogin.get('password')?.valueChanges.subscribe(value =>{
      console.log(value)
    })
  }

  data!: LoginReq;
  imgPropia: any;

  sendLoginForm(event: any) {
    if(this.formLogin.valid){
      console.log("formlogin value: \n")
      console.log(this.formLogin.value)

      this.data = this.formLogin.value as LoginReq;
      this.loginService.login(this.data).subscribe({
        next: (userLoginData) => {
          // console.log("user login data response status: " + userLoginData.status)
          this.token = userLoginData.accessToken;

          let newStringChar;
          if(userLoginData.user.image){
            newStringChar = this.arrayBufferToBase64(userLoginData.user.image.data);
            localStorage.setItem('imagebase64', newStringChar);
          }

          localStorage.setItem('userId', userLoginData.user.id);
          localStorage.setItem('userLastname', userLoginData.user.lastname);
          localStorage.setItem('userEmail', userLoginData.user.email);
          localStorage.setItem('userTelephone', userLoginData.user.telephone);
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

  arrayBufferToBase64( buffer: any ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
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
