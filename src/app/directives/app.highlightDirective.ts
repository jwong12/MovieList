import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[myMovieHighlight]'
})

export class HighlightDirective {
    constructor(private el: ElementRef) { }

    @HostListener('mouseenter') 
    onMouseEnter() {
        this.highlight("2px solid rgb(92,92,92)", "5px 9px", "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", "#1584ce", "brightness(110%)", "rgba(220, 220, 220, 0.9)");
    }

    @HostListener('mouseleave') 
    onMouseLeave() {
        this.highlight("1px solid rgb(167, 165, 165)", "6px 10px", "0 3px 5px 0 rgb(0, 0, 0, 0.2)", "rgba(19, 33, 113, 0.93)", "brightness(90%)", "rgba(220, 220, 220, 0.7)");
    }

    private highlight(attr: string, margin: string, shadow: string, color: string, brightness: string, starBackground: string) {
        const imgHtml = this.el.nativeElement.children[0].children[0].children[0] as HTMLElement;
        const starHtml = this.el.nativeElement.children[0].children[0].children[1] as HTMLElement;
        const titleHtml = this.el.nativeElement.children[1].children[0].children[0].children[0] as HTMLElement;

        this.el.nativeElement.style.boxShadow = shadow;
        this.el.nativeElement.style.border = attr;
        this.el.nativeElement.style.margin = margin;
        titleHtml.style.color = color;
        imgHtml.style.filter = brightness;
        starHtml.style.background = starBackground;
    }
}