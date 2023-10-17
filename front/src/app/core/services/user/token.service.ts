import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string, profileName: string){
    localStorage.setItem('token', token);
    // localStorage.setItem('user', JSON.stringify(profileName));
    localStorage.setItem('userName', profileName);
  }

  getToken() {
    const accessToken = localStorage.getItem('token');
    return accessToken;
  }

}
