import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/core/services/course/course.service';
import { FilesService } from 'src/app/core/services/user/files.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { AttendanceService } from 'src/app/core/services/attendance/attendance.service';

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css']
})
export class CreateLessonComponent implements OnInit {

  courseData:any;

  courseForm: UntypedFormGroup;
  currentImage:any;
  elemento:any;

  courseImg:any = "";
  courseImgBase:any = "data:image/jpeg;base64,";

  disabledBtn:boolean = false;

  currentCourseId:any;

  constructor(
    private router: Router,
    private courseService: CourseService,
    private fileService: FilesService,
    private uFormBuilder: UntypedFormBuilder,
    private attendanceService: AttendanceService
  ) {
    this.currentCourseId = localStorage.getItem('currentProfessorCourseId');
    this.courseForm = this.uFormBuilder.group({
      lessonTitle: [``,[Validators.required, Validators.maxLength(150)]],
      description: [``,[ Validators.maxLength(300),]],
      lessonDateTime: ['',[Validators.required,]],
      courseId: [`${this.currentCourseId}`],
    })
   }

  ngOnInit(): void {
    this.currentImage = '../../../../../assets/defaultcourse.jpg';
    try {
      this.courseService.getProfessorCourse().subscribe({
        next: (res) => {
          this.courseData = res.course;
          console.log(res);

          let courselessonDateTime = formatDate(this.courseData.startDate, "yyyy-MM-dd", 'en_US');
          // let courseEndDate = formatDate(this.courseData.endDate, "yyyy-MM-dd", 'en_US');

          // this.courseForm.setValue({'lessonTitle': `${this.courseData.lessonTitle}`, 'description': `${this.courseData.description}`, 'lessonDateTime': `${courselessonDateTime}`, 'courseId': `${this.courseData.id}`});

          localStorage.setItem('currentTeacherCourseId', this.courseData.id);

          let newImgStr = this.fileService.arrayBufferToBase64(this.courseData.image.data)
          if(this.courseData.image){
            this.currentImage = "data:image/jpeg;base64," + newImgStr;
          }else{
            this.currentImage = '../../../../../assets/profile-pic-placeholder.jpeg';
          }
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

  addLesson($event: any) {
    if(this.courseForm.valid) {
      console.log(this.courseForm.value);
      try {
        this.attendanceService.createLesson(this.courseForm.value).subscribe({
          next: (data) => {
            console.log("create lesson data response: \n")
            console.log(data);
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

      }
    }else{
      this.courseForm.markAllAsTouched();
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

  get lessonTitleField(){
    return this.courseForm.get('lessonTitle');
  }

  get descriptionField(){
    return this.courseForm.get('description');
  }

  get lessonDateTimeField(){
    return this.courseForm.get('lessonDateTime');
  }

  get allFields() {
    return this.courseForm;
  }

}
