import { Injectable, Query } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import {
  startWith,
  map,
  distinctUntilChanged,
  shareReplay,
} from 'rxjs/operators';
import { ScreenSize } from '../utils/screen-size.enum';

const QUERY: Map<string, string> = new Map([
  ['xl', '(min-width: 1800px)'],
  ['lg', '(min-width: 1280px)'],
  ['md', '(min-width: 768px)'],
  ['sm', '(min-width: 480px)'],
  ['xs', '(min-width: 0px)'],
]);

@Injectable({
  providedIn: 'root',
})
export class BreakPointService {
  private _size$: Observable<string>;

  isLargeScreen$: Observable<boolean>;

  isSmallScreen$: Observable<boolean>;

  constructor() {
    this._size$ = fromEvent(window, 'resize').pipe(
      startWith(this.getScreenSize()),
      map(() => this.getScreenSize()),
      distinctUntilChanged(),
      shareReplay(1)
    );

    this.isLargeScreen$ = this._size$.pipe(
      map(() => {
        return this.matches([ScreenSize.XL, ScreenSize.LG]);
      })
    );

    this.isSmallScreen$ = this._size$.pipe(
      map(() => this.matches([ScreenSize.MD, ScreenSize.SM, ScreenSize.XS]))
    );
  }

  private getScreenSize(): ScreenSize {
    const [[newSize = 'never']] = Array.from(QUERY.entries()).filter(
      ([size, mediaQuery]) => window.matchMedia(mediaQuery).matches
    );
    return newSize as ScreenSize;
  }

  private matches(sizes: ScreenSize[]): boolean {
    return sizes.includes(this.getScreenSize());
  }
}