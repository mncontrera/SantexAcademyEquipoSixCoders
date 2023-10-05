import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/http/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: UntypedFormGroup;
  elemento:any;

  constructor(
    private uFormBuilder: UntypedFormBuilder,
    private router: Router,
    private apiService: ApiService,
    private httpClient: HttpClient
  ) {
    this.contactForm = this.uFormBuilder.group({
      correo: [``,[Validators.required, Validators.maxLength(150)]],
      asunto: [``,[Validators.required, Validators.maxLength(150)]],
      description: [``,[Validators.required, Validators.maxLength(300),]]
    })
   }

  ngOnInit(): void {
   
  }

  sendConsult($event: any) {
    if(this.contactForm.valid) {
      console.log(this.contactForm.value);
    }else{
      this.contactForm.markAllAsTouched();
    }
  }

  get titleField(){
    return this.contactForm.get('correo');
  }

  get descriptionField(){
    return this.contactForm.get('description');
  }

}
