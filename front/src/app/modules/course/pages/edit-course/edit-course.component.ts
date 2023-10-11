import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/core/services/course/course.service';
import { FilesService } from 'src/app/core/services/user/files.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  courseData:any;

  courseForm: UntypedFormGroup;
  currentImage:any;
  elemento:any;

  teacherId:any;

  constructor(
    private router: Router,
    private courseService: CourseService,
    private fileService: FilesService,
    private uFormBuilder: UntypedFormBuilder,
  ) {
    this.teacherId = localStorage.getItem('currentProfessorCourseId');
    this.courseForm = this.uFormBuilder.group({
      title: [``,[Validators.required, Validators.maxLength(150)]],
      description: [``,[ Validators.maxLength(300),]],
      startDate: ['',[Validators.required,]],
      endDate: ['',[]],
      price: ['',[Validators.required,]],
      userId: [`${this.teacherId}`],
    })
   }

  ngOnInit(): void {
    this.currentImage = '../../../../../assets/defaultcourse.jpg';
    try {
      this.courseService.getProfessorCourse().subscribe({
        next: (res) => {
          this.courseData = res.course;
          console.log(res);
          let courseStartDate = formatDate(this.courseData.startDate, "yyyy-MM-dd", 'en_US');
          let courseEndDate = formatDate(this.courseData.endDate, "yyyy-MM-dd", 'en_US');

          this.courseForm.setValue({'title': `${this.courseData.title}`, 'description': `${this.courseData.description}`, 'startDate': `${courseStartDate}`, 'endDate': `${courseEndDate}`, 'price': `${this.courseData.price}`, 'userId': `${this.courseData.id}`});

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

  onSelectFile(event: any): void {
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e:any) => {
        this.currentImage = e.target.result;
      }
    }
  }

  onUpload2(event: Event) {
    const element = event.target as HTMLInputElement;
    this.elemento = element.files?.item(0);
  }

  editCourse($event: any) {
    if(this.courseForm.valid) {
      console.log(this.courseForm.value);
      try {
        this.courseService.editCourse(this.elemento, this.courseForm.value).subscribe({
          next: (data) => {
            console.log("edit course data response: \n")
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

  showToast() {
    // Get the snackbar DIV
  var x = document.getElementById("toast");

  // Add the "show" class to DIV
  x!.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x!.className = x!.className.replace("show", ""); }, 3000);
  }

  get titleField(){
    return this.courseForm.get('title');
  }

  get descriptionField(){
    return this.courseForm.get('description');
  }

  get startDateField(){
    return this.courseForm.get('startDate');
  }

  get endDateField(){
    return this.courseForm.get('endDate');
  }

  get priceField(){
    return this.courseForm.get('price');
  }

  get allFields() {
    return this.courseForm;
  }

}
