import { Injectable } from '@angular/core';
import { catchError, defer, EMPTY, map, mergeMap, Subject, tap } from 'rxjs';
import { Identifier } from '../models/identifier.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Entity } from '../models/entity.model';
import { injectCrudEntities, injectCrudOptions } from './crud.util';


@Injectable()
export class CreateService<TEntity extends Entity> {
  private readonly options = injectCrudOptions();
  private readonly entities = injectCrudEntities();

  readonly createAction$ = new Subject<TEntity>();
  private readonly createError$ = new Subject<Error>();
  private readonly createSuccess$ = new Subject<Identifier>();

  private readonly createHandler$ = this.createAction$.pipe(
    mergeMap(entity => defer(() => this.options.createSource(entity)).pipe(
      map(() => entity),
      catchError((error) => {
        this.createError$.next(error);
        return EMPTY;
      })
    )),
    tap(entity => this.entities.update(entities => [...entities, entity])),
    takeUntilDestroyed()
  );

  constructor() {
    this.createHandler$.subscribe(id => this.createSuccess$.next(id));
  }
}
