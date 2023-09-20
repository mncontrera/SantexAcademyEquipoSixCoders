import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/http/api.service';
import { catchError } from 'rxjs';
import handleError from '../../exceptions/errors-handler';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = '/api/course/';

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {

  }

  getAllCourses(){
    return this.apiService.get<any>(`/api/course/getAllCourses/`);
  }

  getSingleCourse(){
    return this.apiService.get<any>(`${this.baseUrl}/getCourse/2`);
  }

}
