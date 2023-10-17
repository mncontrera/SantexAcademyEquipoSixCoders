import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../http/api.service';
import handleError from '../../exceptions/errors-handler';
import { EditProfileReq } from '../../interfaces/edit-user-interface';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private baseUrl = '/api/user/edit/';

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  // uploadFile2(file: Blob, formData:any) {
  //   const dto = new FormData();
  //   // dto.append('file', file);
  //   dto.set("file", file);
  //   let someDto:any = dto.get("file")

  //   let parsedFormData = JSON.stringify(formData)
  //   dto.set("data", parsedFormData);

  //   const token = localStorage.getItem('token');
  //   // this.apiService.setHeader('Authorization',`Bearer ${token}`);
  //   let userId = localStorage.getItem('userId');
  //   return this.apiService.put<any>(`${this.baseUrl}${userId}`, dto);
  // }

  // getUserProfile(profileData: HttpParams){
  //   let userId = localStorage.getItem('userId');
  //   return this.apiService.get<any>(`/api/user/profile/${userId}`, profileData);
  // }

  uploadCourse(file: Blob, formData:any) {
    const dto = new FormData();
    // dto.append('file', file);
    dto.set("file", file);
    let someDto:any = dto.get("file")

    let parsedFormData = JSON.stringify(formData)
    dto.set("data", parsedFormData);

    const token = localStorage.getItem('token');
    // this.apiService.setHeader('Authorization',`Bearer ${token}`);
    return this.apiService.post<any>(`/api/course/create`, dto);
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

}
