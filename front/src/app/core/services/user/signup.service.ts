import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/http/api.service';
import { catchError } from 'rxjs';
import { SignUpReq } from '../../interfaces/sign-up-request-interface';
import handleError from '../../exceptions/errors-handler';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private apiService: ApiService
  ) { }

  data!: SignUpReq;

  signUp(dataReq: SignUpReq) {
    //this.apiService.setHeader('Access-Control-Allow-Origin','http://localhost:4001/home/create')
    return this.apiService.post<any>('/api/user/create', dataReq).pipe(
      catchError(handleError)
    );
  }

}
