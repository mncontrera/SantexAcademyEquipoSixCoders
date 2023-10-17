import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartRoutingModule } from './start-routing.module';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { SharedModule } from "../../shared/shared.module";
import { CarrouselModule } from "../carrousel/carrousel.module";
import { ContactModule } from '../contact/contact.module';


@NgModule({
    declarations: [
        StartPageComponent
    ],
    exports: [StartPageComponent],
    providers: [],
    imports: [
        CommonModule,
        StartRoutingModule,
        CarrouselModule,
        ContactModule

    ]
})
export class StartModule { }
