import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/core/services/course/course.service';
import { FilesService } from 'src/app/core/services/user/files.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { AttendanceService } from 'src/app/core/services/attendance/attendance.service';

@Component({
  selector: 'app-course-with-lessons',
  templateUrl: './course-with-lessons.component.html',
  styleUrls: ['./course-with-lessons.component.css']
})
export class CourseWithLessonsComponent implements OnInit {

  courseData:any;

  currentImage:any;
  elemento:any;

  courseImg:any = "";
  courseImgBase:any = "data:image/jpeg;base64,";

  disabledBtn:boolean = false;

  currentCourseId:any;

  lessonsList:any;

  lessonBg:any = 0;

  dataSource:any;
  displayedColumns: string[] = ['position', 'title', 'date', 'actions'];

  constructor(
    private router: Router,
    private courseService: CourseService,
    private fileService: FilesService,
    private uFormBuilder: UntypedFormBuilder,
    private attendanceService: AttendanceService
  ) {
    this.currentCourseId = localStorage.getItem('currentProfessorCourseId');

   }

  ngOnInit(): void {
    this.currentImage = '../../../../../assets/defaultcourse.jpg';
    try {
      this.courseService.getProfessorCourse().subscribe({
        next: (res) => {
          this.courseData = res.course;
          console.log(res);

          localStorage.setItem('currentTeacherCourseId', this.courseData.id);

          let newImgStr = this.fileService.arrayBufferToBase64(this.courseData.image.data)
          if(this.courseData.image){
            this.currentImage = "data:image/jpeg;base64," + newImgStr;
          }else{
            this.currentImage = '../../../../../assets/profile-pic-placeholder.jpeg';
          }

          this.lessonsList = res.lessons;
          this.dataSource = res.lessons;
        },
        error: (errorData) => {
          console.log(errorData);
          throw "Error en la peticion";
        },
        complete: () => {
          console.log("peticion completada")
        }
      })

      // this.attendanceService.getCourseLessons().subscribe({
      //   next: (res) => {
      //     console.log(res);
      //     this.lessonsList = res;
      //   },
      //   error: (errorData) => {
      //     console.log(errorData);
      //     throw "Error en la peticion";
      //   },
      //   complete: () => {
      //     console.log("peticion completada")
      //   }
      // })
    } catch (error) {
      console.log(error);
    }
  }

  deleteCourse(){
    try {
      this.courseService.deleteCourse().subscribe({
        next: (res) => {
          console.log(res);
        }
      })
    } catch (error) {

    }
  }

  goToLesson(lessonId:any){
    console.log(lessonId);
    localStorage.setItem('currentLessonId', lessonId);
  }

}
