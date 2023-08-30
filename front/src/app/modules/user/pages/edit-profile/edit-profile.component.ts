import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/http/api.service';
import { EditProfileReq } from 'src/app/core/interfaces/edit-user-interface';
import { FilesService } from 'src/app/core/services/user/files.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  standalone: false,
})
export class EditProfileComponent implements OnInit {

  campoValido:any = true;

  editProfileEndpoint = "/api/user/edit/:id";

  profileForm: UntypedFormGroup;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;

  currentImage:any;

  elemento:any;
  imgRta = "";

  profileImg:any = "data:image/jpeg;base64,";

  userName: any = localStorage.getItem('userName');
  userLastname: any = localStorage.getItem('userLastname');

  constructor(
    private uFormBuilder: UntypedFormBuilder,
    private router: Router,
    private fileService: FilesService,
    private apiService: ApiService,
  ) {
      this.profileForm = this.uFormBuilder.group({
        name: [`${this.userName}`,[Validators.required, ]],
        lastname: [`${this.userLastname}`,[Validators.required, Validators.maxLength(40),]],
        phone: ['',[Validators.required,]],
        image: ['',[]],
      })
   }

  ngOnInit(): void {
    this.currentImage = "../../../../../assets/pexels-alena-darmel-7750978 (1).jpg";
    if(localStorage.getItem('imagebase64')){
      this.currentImage = this.profileImg + localStorage.getItem('imagebase64');
    }else{
      this.currentImage = '../../../../../assets/profile-pic-placeholder.jpeg';
    }
  }

  // lee el archivo que se cargo en input, y con filereader devuelve el archivo seleccionado para usarlo como src de etiqueta img
  onSelectFile(event: any): void {
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e:any) => {
        this.currentImage = e.target.result;
      }
    }
  }


  profileData!: EditProfileReq;

  editProfile2($event: any) {
    if(this.profileForm.valid) {
      console.log(this.profileForm.value);

      this.profileData = this.profileForm.value;

      try {
        this.fileService.uploadFile2(this.elemento, this.profileData).subscribe({
          next: (editProfileData) => {
            console.log("data response: \n")
            console.log(editProfileData);
          },
          error: (errorData) => {
            console.log(errorData);
            throw "Error en la peticion editar perfil";
          },
          complete: () => {
            console.log("peticion editar perfil completada")
          }
        })
      } catch (error) {

      }
    }else{
      this.profileForm.markAllAsTouched();
    }

  }

  // guarda en la variable de clase elemento el archivo para que luego otro metodo pueda obtener el archivo y enviarlo
  onUpload2(event: Event) {
    const element = event.target as HTMLInputElement;
    this.elemento = element.files?.item(0);
  }

  get nameField(){
    return this.profileForm.get('name');
  }

  get lastnameField(){
    return this.profileForm.get('lastname');
  }

  get phoneField(){
    return this.profileForm.get('phone');
  }

  get allFields() {
    return this.profileForm;
  }
}
