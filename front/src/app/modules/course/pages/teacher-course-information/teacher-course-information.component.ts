import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/core/services/course/course.service';
import { FilesService } from 'src/app/core/services/user/files.service';

@Component({
  selector: 'app-teacher-course-information',
  templateUrl: './teacher-course-information.component.html',
  styleUrls: ['./teacher-course-information.component.css']
})
export class TeacherCourseInformationComponent implements OnInit {

  courseData:any;
  courseImg:any = "";
  courseImgBase:any = "data:image/jpeg;base64,";

  disabledBtn:boolean = false;

  constructor(
    private router: Router,
    private courseService: CourseService,
    private fileService: FilesService,
  ) { }

  ngOnInit(): void {
    try {
      this.courseService.getProfessorCourse().subscribe({
        next: (res) => {
          this.courseData = res.course;
          this.courseImg = this.courseImgBase + this.fileService.arrayBufferToBase64(this.courseData.image.data);
          console.log(res);
        },
        error: (errorData) => {
          console.log(errorData);
          throw "Error en la peticion";
        },
        complete: () => {
          console.log("peticion completada")
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

}
