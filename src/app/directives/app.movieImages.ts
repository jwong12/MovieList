import { Component, Input } from '@angular/core';

@Component({
    selector: 'images-directive',
    template: `<img src='{{posterPath}}' alt={{altText}}/>`,
    styles: [`
        img { 
            width: 185px; height: 277px; 
            border-radius: 9px 9px 0 0;
        }
    `]
})
export class MovieImages {
    @Input()
    posterPath: string;

    @Input()
    altText: string
}
