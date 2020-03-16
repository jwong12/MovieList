import { Component, Input } from '@angular/core';

@Component({
    selector: 'images-directive',
    template: `<img src='{{posterPath}}' alt={{altText}}/>`,
    styles: [`img { width: 185px; height: 277px; }`]
})
export class MovieImages {
    @Input()
    posterPath: string;

    @Input()
    altText: string
}
