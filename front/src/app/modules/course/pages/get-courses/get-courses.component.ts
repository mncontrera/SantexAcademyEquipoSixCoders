import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/core/services/course/course.service';
import { FilesService } from 'src/app/core/services/user/files.service';

@Component({
  selector: 'app-get-courses',
  templateUrl: './get-courses.component.html',
  styleUrls: ['./get-courses.component.css']
})
export class GetCoursesComponent implements OnInit {

  coursesList:any;
  courseImage = "";
  courseImgBase:any = "data:image/jpeg;base64,";

  constructor(
    private router: Router,
    private courseService: CourseService,
    private fileService: FilesService,

  ) { }

  ngOnInit(): void {
    try {
      this.courseService.getAllCourses().subscribe({
        next: (res) => {
          this.coursesList = res;
          // this.coursesList = this.coursesList.map((item: any) => {
          //   // item.image = "hola!"
          //   console.log(item)
          // });
          for (let index = 0; index < this.coursesList.length; index++) {
            this.coursesList[index].image = this.courseImgBase + this.fileService.arrayBufferToBase64(this.coursesList[index].image.data);
          }

          let newStringChar;
          newStringChar = this.fileService.arrayBufferToBase64(res[0].image.data);
          this.courseImage = this.coursesList[0].image
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
