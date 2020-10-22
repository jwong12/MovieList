import { Component, Input } from '@angular/core';

@Component({
    selector: 'images-directive',
    template: `
        <img src='{{posterPath}}' alt={{altText}}/>
        <div class="star-rating">
            <img class="star" src="../../assets/images/star.svg" alt="Star rating">
            <span>{{formatRating(rating)}}</span>
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

    formatRating(rating) {
        if (rating == 0) {
            return '––';

        } else if (rating >= 10) {
            return '10';

        } else {
            return rating.toFixed(1);
        }
    }
}
