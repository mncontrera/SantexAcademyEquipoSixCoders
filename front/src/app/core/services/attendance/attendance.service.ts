import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/http/api.service';
import { catchError } from 'rxjs';
import handleError from '../../exceptions/errors-handler';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private baseUrl = '/api/lesson/';

  constructor
  (
    private http: HttpClient,
    private apiService: ApiService
  ) {
   }

  createLesson(dataReq: any) {
    //this.apiService.setHeader('Access-Control-Allow-Origin','http://localhost:4001/home/create')
    return this.apiService.post<any>(`${this.baseUrl}/create`, dataReq).pipe(
      catchError(handleError)
    );
  }

  getCourseLessons() {
    //this.apiService.setHeader('Access-Control-Allow-Origin','http://localhost:4001/home/create')
    return this.apiService.get<any>(`${this.baseUrl}/getAllLessons`).pipe(
      catchError(handleError)
    );
  }

  getLessonAttendants(lessonId:any) {
    return this.apiService.get<any>(`${this.baseUrl}/getLesson/${lessonId}`).pipe(
      catchError(handleError)
    );
  }

  markAttendance(dataReq: any) {
    // console.log("dataReq:");
    // console.log(dataReq);
    return this.apiService.put<any>(`${this.baseUrl}/attendant`, dataReq).pipe(
      catchError(handleError)
    );
  }
}
