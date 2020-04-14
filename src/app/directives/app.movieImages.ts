import { Component, Input } from '@angular/core';

@Component({
    selector: 'images-directive',
    template: `
        <img src='{{posterPath}}' alt={{altText}}/>
        <div class="star-rating">
            <img class="star" src="../../assets/images/star.svg" alt="Star rating">
            <span>{{rating}}</span>
        </div>`,
    styleUrls: ['app.movieImages.scss']
})

export class MovieImages {
    @Input()
    posterPath: string;

    @Input()
    altText: string;

    @Input()
    rating: string;
}
