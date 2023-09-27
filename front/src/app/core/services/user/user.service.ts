import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/http/api.service';
import { catchError } from 'rxjs';
import { SignUpReq } from '../../interfaces/sign-up-request-interface';
import handleError from '../../exceptions/errors-handler';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = '/api/user/edit/';

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  data!: SignUpReq;

  createUser(dataReq: SignUpReq) {
    //this.apiService.setHeader('Access-Control-Allow-Origin','http://localhost:4001/home/create')
    return this.apiService.post<any>('/api/user/create', dataReq).pipe(
      catchError(handleError)
    );
  }

  deleteUser() {
    const userId = localStorage.getItem('userId');
    return this.apiService.delete<any>(`/api/user/deleteUser/${userId}`).pipe(
      catchError(handleError)
    );
  }

  editUserProfile(file: Blob, formData:any) {
    const dto = new FormData();
    // dto.append('file', file);
    dto.set("file", file);
    let someDto:any = dto.get("file")

    let parsedFormData = JSON.stringify(formData)
    dto.set("data", parsedFormData);

    const token = localStorage.getItem('token');
    // this.apiService.setHeader('Authorization',`Bearer ${token}`);
    let userId = localStorage.getItem('userId');
    return this.apiService.put<any>(`${this.baseUrl}${userId}`, dto);
  }

  getUserProfile(profileData: HttpParams){
    let userId = localStorage.getItem('userId');
    return this.apiService.get<any>(`/api/user/profile/${userId}`, profileData);
  }
}
