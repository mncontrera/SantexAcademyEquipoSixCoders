import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/http/api.service';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import handleError from '../../exceptions/errors-handler';
import { User } from '../../interfaces/user-interface';
import { TokenService } from './token.service';


type LoginReq = {
  email: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<any> = new BehaviorSubject<any>({user: {name: "ejemploNombre"} });

  authToken: string = "";

  constructor(
    private apiService: ApiService,
    private tokenService: TokenService
  ) { }

	login(dataReq: LoginReq):Observable<any> {
    return this.apiService.post<any>('/api/user/login', dataReq).pipe(
      tap((userLoginData) => {
        console.log(userLoginData)
        this.authToken = userLoginData.accessToken;
        this.tokenService.saveToken(userLoginData.accessToken, userLoginData.user.name);

        this.currentUserData.next(userLoginData);
        if(this.authToken) {
          this.currentUserLogin.next(true);
        }
      }),
      catchError(handleError)
    )
  }

  get userData():Observable<any>{
    return this.currentUserData.asObservable();
  }

  get userLogin():Observable<any>{
    return this.currentUserLogin.asObservable();
  }

}
