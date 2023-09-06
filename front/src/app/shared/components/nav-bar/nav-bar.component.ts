import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/services/user/login.service';
import { User } from 'src/app/core/interfaces/user-interface';
import { FilesService } from 'src/app/core/services/user/files.service';
import { DomSanitizer } from '@angular/platform-browser';

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

  constructor(
    private loginService: LoginService,
    private filesService: FilesService,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {

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
      }
    })

    if(this.userIsLogued){
      this.userName = localStorage.getItem('userName')
    }

  }

  logOut() {
    this.userIsLogued = !this.userIsLogued;
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('imagebase64');
    localStorage.removeItem('userLastname');
    localStorage.removeItem('userId');
  }

  toProfile() {
    console.log("Bienvenido a la pagina de perfil de usuario.")
  }

}
