import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { ModalComponent } from './modal.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
    imports: [
        CommonModule, 
        NgxSpinnerModule,
        NgCircleProgressModule.forRoot({
            maxPercent: 100,
            showSubtitle: false,
            radius: 16,
            titleFontSize: "13",
            titleFontWeight: "600",
            titleColor: "#3a3a3a",
            unitsFontWeight: "600",
            unitsColor: "#3a3a3a",
            outerStrokeWidth: 4,
            innerStrokeWidth: 4,
            showInnerStroke: true,
            backgroundStrokeWidth: 0,
            backgroundPadding: 0,
            animation: true,
            animationDuration: 1100,
            space: -4
        })
    ],
    declarations: [ModalComponent],
    exports: [ModalComponent]
})
export class ModalModule { }