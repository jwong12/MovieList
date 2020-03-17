import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[myMovieHighlight]'
})


export class HighlightDirective {
    constructor(private el: ElementRef) { }

    @HostListener('mouseenter') 
    onMouseEnter() {
        this.highlight("2px solid rgb(92,92,92)", "5px 9px", "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)");
    }

    @HostListener('mouseleave') 
    onMouseLeave() {
        this.highlight("1px solid rgb(167, 165, 165)", "6px 10px", "0 3px 5px 0 rgb(0, 0, 0, 0.2)");
    }

    private highlight(attr: string, margin: string, shadow: string) {
        this.el.nativeElement.style.boxShadow = shadow;
        // this.el.nativeElement.style.transition = "all 200ms ease-out";
        this.el.nativeElement.style.border = attr;
        this.el.nativeElement.style.margin = margin;
        // this.el.nativeElement.style.backgroundColor = "rgb(92,92,92)";
    }
}