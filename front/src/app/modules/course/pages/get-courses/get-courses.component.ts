import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CourseService } from 'src/app/core/services/course/course.service';
import { FilesService } from 'src/app/core/services/user/files.service';
import { Observable } from 'rxjs';

import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';

@Component({
  selector: 'app-get-courses',
  templateUrl: './get-courses.component.html',
  styleUrls: ['./get-courses.component.css']
})
export class GetCoursesComponent implements OnInit {

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
    //asd
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 3;
    // this.coursesList = this.productsList.slice(0, 3);
    // this.length = this.productsList.length;
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

  watchCourseById(teacherId: any){
    console.log("hola"+teacherId)
    localStorage.setItem('currentCourseId', teacherId);
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

const someData: Card[] = [
  {
    title: "curso de js",
    description: "descripcion del curso",
    image: "any",
    price: 1111,
  },
  {
    title: "curso de js",
    description: "descripcion del curso",
    image: "any",
    price: 1111,
  }
]
