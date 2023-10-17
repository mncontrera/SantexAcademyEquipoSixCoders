import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/core/services/course/course.service';
import { FilesService } from 'src/app/core/services/user/files.service';
import { Observable } from 'rxjs';

import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-professor-courses',
  templateUrl: './professor-courses.component.html',
  styleUrls: ['./professor-courses.component.css']
})
export class ProfessorCoursesComponent implements OnInit {

  coursesList:any;
  courseImage = "";
  courseImgBase:any = "data:image/jpeg;base64,";

  // asd
  productsList: Card[]= [];
  // coursesList: Card[]= [];
  breakpoint: number = 3;  //to adjust to screen
  // MatPaginator Inputs
  length: number = 0;
  pageSize: number = 3;  //displaying three cards each row
  pageSizeOptions: number[] = [1, 3, 6, 9];

  constructor(
    private courseService: CourseService,
    private fileService: FilesService,
  ) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 3;
    try {
      this.courseService.getProfessorCourses().subscribe({
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
          this.courseImage = this.coursesList[0].image

          // qwe
          this.productsList = this.coursesList
          this.coursesList = this.productsList.slice(0, 3);
          this.length = this.productsList.length;
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

  watchProfessorCourseById(courseId: any){
    console.log("hola"+courseId);
    localStorage.setItem('currentProfessorCourseId', courseId);
    this.courseService.getProfessorCourse().subscribe({
      next: (res) => {
        console.log(res.course);
        localStorage.setItem('teacherCourseTitle', res.course.title);
        localStorage.setItem('teacherCourseDescription', res.course.description);
        localStorage.setItem('teacherId', res.course.userId);
        localStorage.setItem('teacherCoursePrice', res.course.price);
        localStorage.setItem('teacherCourseStartDate', res.course.startDate);
        let newStringChar;
        newStringChar = this.fileService.arrayBufferToBase64(res.course.image.data);
        localStorage.setItem('teacherCourseImage', newStringChar);
      }
    })
  }

  // asdads a
  OnPageChange(event: PageEvent){
    let startIndex = event.pageIndex * event.pageSize;
    console.log(startIndex)
    let endIndex = startIndex + event.pageSize;
    console.log(endIndex)
    if(endIndex > this.length){
      endIndex = this.length;
    }
    this.coursesList = this.productsList.slice(startIndex, endIndex);
    // this.coursesList =
  }

  onResize(event: any) { //to adjust to screen size
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 3;
  }

}

export interface Card {
  title: string;
  description: string;
  image: any;
  price: any;
}
