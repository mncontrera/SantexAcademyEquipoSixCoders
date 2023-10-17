import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/core/services/course/course.service';
import { FilesService } from 'src/app/core/services/user/files.service';

import { PageEvent} from '@angular/material/paginator';
import { first } from 'rxjs';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})

export class StartPageComponent implements OnInit {

  coursesList:any;
  courseImage = "";
  courseImgBase:any = "data:image/jpeg;base64,";
  firstSlice:any;
  secondSlice:any;
  thirdSlice:any;
  firstCourse:any = [];
  coursesTail:any;

  constructor(
    private courseService: CourseService,
    private fileService: FilesService,
  ) { }

  ngOnInit(): void {
    try {
      this.courseService.getAllCourses().subscribe({
        next: (res) => {
          this.coursesList = res;
          for (let index = 0; index < this.coursesList.length; index++) {
            if(this.coursesList[index].image){
              this.coursesList[index].image = this.courseImgBase + this.fileService.arrayBufferToBase64(this.coursesList[index].image.data);
            }
          }
          console.log(this.coursesList)
          let newStringChar;
          newStringChar = this.fileService.arrayBufferToBase64(res[0].image.data);
          this.courseImage = this.coursesList[0].image;

          this.firstSlice = this.coursesList.slice(0,3);
          console.log(this.firstSlice);
          this.secondSlice = this.coursesList.slice(3,6);
          console.log(this.secondSlice);
          this.thirdSlice = this.coursesList.slice(6,9);
          console.log(this.thirdSlice);
          this.firstCourse.push(this.coursesList[0]);
          this.coursesTail = this.coursesList.slice(1,9);
          console.log(this.firstCourse);
          console.log(this.coursesTail);

          // qwe
          // this.productsList = this.coursesList
          // this.coursesList = this.productsList.slice(0, 3);
          // this.length = this.productsList.length;

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

  showSomething() {
    console.log("holaaaaaaaa")
  }

  watchCourseById(teacherId: any){
    console.log("hola"+teacherId)
    localStorage.setItem('currentCourseId', teacherId);
    console.log("holAAAAAA")
  }

}
