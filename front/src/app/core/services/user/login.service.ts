import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/http/api.service';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import handleError from '../../exceptions/errors-handler';


type LoginReq = {
  email: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(
    private apiService: ApiService
  ) { }

	login(dataReq: LoginReq):Observable<any> {
    return this.apiService.post<any>('/api/user/login', dataReq).pipe(
      tap((userLoginData) => {
        console.log("tap pipe:");
        console.log(userLoginData)
        this.currentUserData.next(userLoginData);
        this.currentUserLogin.next(true);
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
