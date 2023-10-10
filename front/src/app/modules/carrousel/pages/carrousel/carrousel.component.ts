import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/core/services/course/course.service';
import { FilesService } from 'src/app/core/services/user/files.service';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {
  coursesList:any;
  courseImage = "";
  courseImgBase:any = "data:image/jpeg;base64,";

  constructor(private courseService: CourseService,
    private fileService: FilesService,) { }

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
