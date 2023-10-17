import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/core/services/course/course.service';
import { FilesService } from 'src/app/core/services/user/files.service';

@Component({
  selector: 'app-course-information',
  templateUrl: './course-information.component.html',
  styleUrls: ['./course-information.component.css']
})
export class CourseInformationComponent implements OnInit {

  courseData:any;
  courseImg:any = "";
  courseImgBase:any = "data:image/jpeg;base64,";

  disabledBtn:boolean = false;

  userRoleId:any = localStorage.getItem('currentUserRole');
  isTeacher:boolean = false;

  constructor(
    private router: Router,
    private courseService: CourseService,
    private fileService: FilesService,
  ) { }

  ngOnInit(): void {
    if(this.userRoleId === "2") {
      this.isTeacher = true;
    }
    console.log(this.isTeacher)
    try {
      this.courseService.getSingleCourse().subscribe({
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

  subscribeToCourse(){
    this.courseService.subscribeToCourse().subscribe({
      next: (res) => {
        console.log(res);
      }
    })
  }

  disableButton(){
    this.disabledBtn = true;
    console.log("boton de inscripcion desactivado")
  }

}
