import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/services/user/login.service';
import { User } from 'src/app/core/interfaces/user-interface';
import { FilesService } from 'src/app/core/services/user/files.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { ViewportScroller } from '@angular/common';
import { Router } from "@angular/router";

export interface File {
  originalname: string,
  location: string,
  filename: string
}


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})



export class NavBarComponent implements OnInit {

  userIsLogued?:boolean;
  userProfile?:User;
  userName:any;

  // imgRta = '';
  imgRta:any;
  public files: any = [];
  previsualization: string = "";
  loading?: boolean;

  teacherRole:boolean = false;
  studentRole:boolean = false;

  constructor(
    private loginService: LoginService,
    private filesService: FilesService,
    private sanitizer: DomSanitizer,
    private cookieService: CookieService,
    private viewportScroller: ViewportScroller,
    private router: Router
    ) { }

  alg2 = document.getElementsByClassName("botones") as HTMLCollectionOf<HTMLElement>;
  alg3 = document.getElementById("algo");

  elm1 = document.querySelector<HTMLElement>('botones');

  ngOnInit(): void {
    let alg = document.getElementsByClassName('botones');
    let elm2 = document.querySelector<HTMLElement>('botones')!;

    this.loginService.currentUserLogin.subscribe({
      next: (logedIn) => {
        this.userIsLogued = logedIn;
      }
    })

    if(localStorage.getItem('token')){
      console.log("hay token")
      this.userIsLogued = true;
    }else{
      console.log("no hay token")
    }

    this.loginService.currentUserData.subscribe({
      next: (loguedUserData) => {
        this.userName = loguedUserData.user.name;
        if(loguedUserData.user.userRole === 2) {
          this.teacherRole = true;
          this.studentRole = false;
        }
        if(loguedUserData.user.userRole === 1) {
          this.studentRole = true;
          this.teacherRole = false;
        }
      }
    })

    if(this.userIsLogued){
      this.userName = localStorage.getItem('userName')
    }

    let userRole = localStorage.getItem('currentUserRole');
    if( userRole === '2') {
      this.teacherRole = true;
    }
    if( userRole === '1') {
      this.studentRole = true;
    }

  }

  logOut() {
    this.userIsLogued = !this.userIsLogued;
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('imagebase64');
    localStorage.removeItem('userLastname');
    localStorage.removeItem('userId');
    localStorage.removeItem('userTelephone');
    localStorage.removeItem('userEmail');
    this.cookieService.delete('tokenDeAcceso', '/');
    localStorage.removeItem('currentUserRole');
  }

  toProfile() {
    console.log("Bienvenido a la pagina de perfil de usuario.")
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  esconderBotones(){
    console.log("botones AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa")
    // const elm = document.querySelector<HTMLElement>('botones')!;
    // elm.style.display = 'none';
    // this.elm1!.style.display = 'none'


    // const test = document.querySelector<HTMLElement>('botones');
    // test.style.display = 'none'
  }

}
