import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[myMovieHighlight]'
})


export class HighlightDirective {
    constructor(private el: ElementRef) { }

    @HostListener('mouseenter') 
    onMouseEnter() {
        this.highlight("1px solid rgb(120, 120, 120)", "5px 16px 25px 4px");
    }

    @HostListener('mouseleave') 
    onMouseLeave() {
        this.highlight(null, null);
    }

    private highlight(attr: string, margin: string) {
        this.el.nativeElement.style.border = attr;
        this.el.nativeElement.style.margin = margin;
        this.el.nativeElement.style.backgroundColor = "orange";
    }
}