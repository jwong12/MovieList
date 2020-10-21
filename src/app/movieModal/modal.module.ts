import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './modal.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
    imports: [CommonModule, NgxSpinnerModule],
    declarations: [ModalComponent],
    exports: [ModalComponent]
})
export class ModalModule { }