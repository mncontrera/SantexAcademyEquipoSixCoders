import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/http/api.service';
import { FilesService } from 'src/app/core/services/user/files.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  courseForm: UntypedFormGroup;
  currentImage:any;
  elemento:any;

  profileImg:any = "data:image/jpeg;base64,";

  teacherId:any;

  constructor(
    private uFormBuilder: UntypedFormBuilder,
    private router: Router,
    private fileService: FilesService,
    private apiService: ApiService,
  ) {
    this.teacherId = localStorage.getItem('userId');
    this.courseForm = this.uFormBuilder.group({
      title: [``,[Validators.required, Validators.maxLength(150)]],
      description: [``,[Validators.required, Validators.maxLength(300),]],
      startDate: ['',[Validators.required,]],
      endDate: ['',[]],
      price: ['',[Validators.required,]],
      userId: [`${this.teacherId}`],
    })
   }

  ngOnInit(): void {
    // this.currentImage = "../../../../../assets/pexels-alena-darmel-7750978 (1).jpg";
    if(localStorage.getItem('courseimagebase64')){
      this.currentImage = this.profileImg + localStorage.getItem('courseimagebase64');
    }else{
      this.currentImage = '../../../../../assets/defaultcourse.jpg';
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

  createCourse($event: any) {
    if(this.courseForm.valid) {
      console.log(this.courseForm.value);
      try {
        this.fileService.uploadCourse(this.elemento, this.courseForm.value).subscribe({
          next: (data) => {
            console.log("data response: \n")
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

  arrayBufferToBase64( buffer: any ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
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
