import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/services/user/login.service';
import { User } from 'src/app/core/interfaces/user-interface';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userLogin:boolean = false;
  userData?:User;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.currentUserLogin.subscribe({
      next: (logedIn) => {
        this.userLogin = logedIn;
      }
    })

    this.loginService.currentUserData.subscribe({
      next: (loguedUserData) => {
        this.userData = loguedUserData;
      }
    })
  }

  logOut() {
    this.userLogin = !this.userLogin;
  }

}
