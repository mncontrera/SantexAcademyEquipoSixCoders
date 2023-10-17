import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
myForm: FormGroup<any>;

  constructor(private httpClient: HttpClient){
  this.myForm= new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),
    asunto: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(150)])
  });
 }

 enviarConsulta() {
  const { correo, asunto, description } = this.myForm.value;

  this.httpClient.post('/api/user/sendEmail', { correo, asunto, description }).subscribe({
    next: (response) => {
      console.log('Correo electrónico enviado con éxito', response);
    },
    error: (error) => {
      console.error('Error al enviar el correo electrónico', error);
    },
    complete: () => {
      console.log('La suscripción se ha completado.');
    }
  })
   }
   }