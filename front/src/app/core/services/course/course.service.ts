import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/http/api.service';
import { catchError } from 'rxjs';
import handleError from '../../exceptions/errors-handler';
import { HttpClient } from '@angular/common/http';

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
    const id = localStorage.getItem('currentCourseId');
    return this.apiService.get<any>(`${this.baseUrl}/getCourse/${id}`);
  }

  subscribeToCourse(){
    const courseId = localStorage.getItem('currentCourseId');
    const studentId = localStorage.getItem('userId');
    let reqBody = {
      userId: studentId,
      courseId: courseId,
    }
    return this.apiService.post<any>(`${this.baseUrl}/subscribe/`, reqBody);
  }

  getProfessorCourses(){
    const professorId = localStorage.getItem('userId');
    return this.apiService.get<any>(`/api/course/getTeacherCourses/${professorId}`);
  }

  getProfessorCourse(){
    const courseId = localStorage.getItem('currentProfessorCourseId');
    return this.apiService.get<any>(`${this.baseUrl}/getCourse/${courseId}`);
  }

  editCourse(file: Blob, formData:any) {
    const dto = new FormData();
    // dto.append('file', file);
    dto.set("file", file);
    let someDto:any = dto.get("file")

    let parsedFormData = JSON.stringify(formData)
    dto.set("data", parsedFormData);

    const token = localStorage.getItem('token');
    // this.apiService.setHeader('Authorization',`Bearer ${token}`);
    let courseId = localStorage.getItem('currentTeacherCourseId');
    return this.apiService.put<any>(`/api/course/editCourse/${courseId}`, dto);
  }

  deleteCourse() {
    const courseId = localStorage.getItem('currentTeacherCourseId');
    return this.apiService.delete<any>(`/api/course/deleteCourse/${courseId}`).pipe(
      catchError(handleError)
    );
  }

  getStudentCourses(){
    const professorId = localStorage.getItem('userId');
    return this.apiService.get<any>(`/api/course/getEnrolledCourses/${professorId}`);
  }

}
