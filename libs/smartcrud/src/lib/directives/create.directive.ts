import { Directive, HostListener, input } from '@angular/core';
import { injectCrud } from '../services/crud.service';
import { Entity } from '../models/entity.model';
import { filter, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[crudCreate]',
  standalone: true
})
export class CreateDirective<T extends Entity> {
  private readonly crudService = injectCrud();

  entity = input.required<T>();
  beforeEachFn = input<() => Observable<boolean> | boolean>(() => true);

  private readonly clickAction$ = new Subject<void>();
  private readonly clickHandler$ = this.clickAction$.pipe(
    switchMap(() => {
      const beforeEach = this.beforeEachFn()();
      if (beforeEach instanceof Observable) {
        return beforeEach;
      } else {
        return of(beforeEach);
      }
    }),
    filter(beforeEach => !!beforeEach),
    tap(() => this.crudService.create(this.entity())),
    takeUntilDestroyed()
  );

  constructor() {
    this.clickHandler$.subscribe();
  }

  @HostListener('click')
  onClick(): void {
    this.clickAction$.next();
  }
}
