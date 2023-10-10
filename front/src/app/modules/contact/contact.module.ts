import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { ContactComponent } from './pages/contact/contact.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[
    ContactComponent
  ]
})
export class ContactModule { }
