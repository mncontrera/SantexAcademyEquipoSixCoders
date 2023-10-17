import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarrouselRoutingModule } from './carrousel-routing.module';
import { CarrouselComponent } from './pages/carrousel/carrousel.component';


@NgModule({
  declarations: [
    CarrouselComponent
  ],
  imports: [
    CommonModule,
    CarrouselRoutingModule
  ],
  exports: [
    CarrouselComponent
  ]
})
export class CarrouselModule { }
