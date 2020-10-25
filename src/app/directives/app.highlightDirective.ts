import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[myMovieHighlight]'
})

export class HighlightDirective {
    constructor(private el: ElementRef) { }

    @HostListener('mouseenter') 
    onMouseEnter() {
        this.highlight("0 6px 20px 0 rgba(0, 0, 0, 0.19)", "#1584ce", "brightness(110%)", "rgba(220, 220, 220, 0.9)", "invert(42%) sepia(48%) saturate(1366%) hue-rotate(171deg) brightness(90%) contrast(94%)");
    }

    @HostListener('mouseleave') 
    onMouseLeave() {
        this.highlight("0 3px 5px 0 rgb(0, 0, 0, 0.2)", "rgba(43, 54, 115, 0.93)", "brightness(90%)", "rgba(220, 220, 220, 0.7)", "invert(6%) sepia(55%) saturate(6098%) hue-rotate(199deg) brightness(107%) contrast(89%)");
    }

    private highlight(shadow: string, color: string, brightness: string, starBackground: string, starFilter: string) {
        const imgEl = this.el.nativeElement.children[0].children[0].children[0] as HTMLElement;
        const starContainerEl = this.el.nativeElement.children[0].children[0].children[1] as HTMLElement;
        const starEl = this.el.nativeElement.children[0].children[0].children[1].children[0] as HTMLElement;
        const ratingEl = this.el.nativeElement.children[0].children[0].children[1].children[1] as HTMLElement;
        const titleEl = this.el.nativeElement.children[1].children[0].children[0].children[0] as HTMLElement;

        this.el.nativeElement.style.boxShadow = shadow;
        titleEl.style.color = color;
        imgEl.style.filter = brightness;
        starContainerEl.style.background = starBackground;
        starEl.style.filter = starFilter;
        ratingEl.style.color = color;
    }
}