import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/http/api.service';
import { EditProfileReq } from 'src/app/core/interfaces/edit-user-interface';
import { FilesService } from 'src/app/core/services/user/files.service';
import { UserService } from 'src/app/core/services/user/user.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  standalone: false,
})
export class EditProfileComponent implements OnInit {

  profileForm: UntypedFormGroup;

  currentImage:any;

  elemento:any;

  profileImg:any = "data:image/jpeg;base64,";

  userName: any = localStorage.getItem('userName');
  userLastname: any = localStorage.getItem('userLastname');
  userTelephone: any = localStorage.getItem('userTelephone');

  constructor(
    private uFormBuilder: UntypedFormBuilder,
    private router: Router,
    private fileService: FilesService,
    private apiService: ApiService,
    private userService: UserService
  ) {
      this.profileForm = this.uFormBuilder.group({
        name: [`${this.userName}`,[Validators.required, Validators.maxLength(40)]],
        lastname: [`${this.userLastname}`,[Validators.required, Validators.maxLength(40),]],
        telephone: [`${this.userTelephone}`,[]],
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

    const deleteButton = document.getElementById('deleteButton');
    const deleteModal = document.getElementById('deleteModal');
    const confirmDelete = document.getElementById('confirmDelete');
    const cancelDelete = document.getElementById('cancelDelete');

    // Function to open the modal
    deleteButton?.addEventListener('click', function () {
      deleteModal!.style.display = 'block';
    });

    // Function to close the modal when the cancel button is clicked
    cancelDelete?.addEventListener('click', function () {
      deleteModal!.style.display = 'none';
    });

    // Function to perform the delete action when the confirm button is clicked
    confirmDelete?.addEventListener('click', function () {
      // Perform the delete action here
      // You can replace this with your actual delete code
      // alert('Item deleted successfully');
      deleteModal!.style.display = 'none';
    });
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
        this.userService.editUserProfile(this.elemento, this.profileData).subscribe({
          next: (editProfileData) => {
            console.log("data response: \n")
            console.log(editProfileData);


            this.userService.getUserProfile(this.profileForm.value).subscribe({
              next: (userProfile) => {
                console.log('user profile data!', userProfile);
                localStorage.setItem('userName', userProfile.user.name);
                localStorage.setItem('userLastname', userProfile.user.lastname);
                localStorage.setItem('userTelephone', userProfile.user.telephone);

                let newStringChar;
                if(userProfile.user.image){
                  newStringChar = this.fileService.arrayBufferToBase64(userProfile.user.image.data);
                  localStorage.setItem('imagebase64', newStringChar);
                }
              }
            })
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

  deleteAccount() {
    try {
      this.userService.deleteUser().subscribe({
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

  get nameField(){
    return this.profileForm.get('name');
  }

  get lastnameField(){
    return this.profileForm.get('lastname');
  }

  get telephoneField(){
    return this.profileForm.get('telephone');
  }

  get allFields() {
    return this.profileForm;
  }
}
