import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { ModalComponent } from './modal.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
    imports: [
        CommonModule, 
        NgxSpinnerModule,
        NgCircleProgressModule.forRoot({})
    ],
    declarations: [ModalComponent],
    exports: [ModalComponent]
})
export class ModalModule { }