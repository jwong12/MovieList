import { Component, HostBinding, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { fromEvent } from 'rxjs';
import { throttleTime, map, pairwise, distinctUntilChanged, share, filter } from 'rxjs/operators';
  
enum Direction {
    Up = 'Up',
    Down = 'Down'
}

@Component({
    selector: 'app-sticky-header',
    template: `<ng-content></ng-content>`,
    styles: [
        `
          :host {
            position: fixed;
            top: 0;
            width: 100%;
          }
        `
      ]
  })

  export class StickyHeaderComponent implements AfterViewInit {
    private isVisible = true;

    ngAfterViewInit() {
        const scroll$ = fromEvent(window, 'scroll').pipe(
            throttleTime(10),
            map(() => window.pageYOffset),
            pairwise(),
            map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
            distinctUntilChanged(),
            share()
        );
  
        const scrollUp$ = scroll$.pipe(
            filter(direction => direction === Direction.Up)
        );
    
        const scrollDown = scroll$.pipe(
            filter(direction => direction === Direction.Down)
        );
    
        scrollUp$.subscribe(() => (
            this.isVisible = true,
            this.changeVisibility()
        ));
        scrollDown.subscribe(() => (
            this.isVisible = false,
            this.changeVisibility()
        ));
    }

    changeVisibility() {
        const headerHtml = document.getElementById('header') as HTMLElement;
        
        if(!this.isVisible) {
            headerHtml.style.pointerEvents = 'none';
            headerHtml.style.opacity = '0';
            headerHtml.style.transform = 'translateY(-100%)';
            headerHtml.style.transitionProperty = 'opacity, transform';
            headerHtml.style.transitionDuration = '200ms';
            headerHtml.style.transitionTimingFunction = 'ease-in';

        } else {
            headerHtml.style.pointerEvents = 'initial';
            headerHtml.style.opacity = '1';
            headerHtml.style.transform = 'translateY(0)';
            headerHtml.style.transitionProperty = 'opacity, transform';
            headerHtml.style.transitionDuration = '200ms';
            headerHtml.style.transitionTimingFunction = 'ease-in';
        }
    }
}