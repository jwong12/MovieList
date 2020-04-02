import { Component, HostBinding, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { fromEvent } from 'rxjs';
import { throttleTime, map, pairwise, distinctUntilChanged, share, filter } from 'rxjs/operators';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';

enum VisibilityState {
    Visible = 'visible',
    Hidden = 'hidden'
}
  
enum Direction {
    Up = 'Up',
    Down = 'Down'
}
  
@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    animations: [
        trigger('toggle', [
          state(
            VisibilityState.Hidden,
            style({ opacity: 0, transform: 'translateY(-100%)' })
          ),
          state(
            VisibilityState.Visible,
            style({  opacity: 1, transform: 'translateY(0)' })
          ),
          transition('* => *', animate('200ms ease-in'))
        ])
    ]
})

export class AppComponent implements AfterViewInit {
    private isVisible = true;

    @HostBinding('@toggle')
    get toggle(): VisibilityState {
        return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
    }

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

        scrollUp$.subscribe(() => (this.isVisible = true));
        scrollDown.subscribe(() => (this.isVisible = false));
    }
}
