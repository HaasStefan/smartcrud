import {
  assertInInjectionContext,
  computed,
  DestroyRef,
  inject,
  Injectable,
  Provider,
  signal
} from '@angular/core';
import { Entity } from '../models/entity.model';
import { CrudOptions } from '../models/crud-options.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { Identifier } from '../models/identifier.model';
import { CRUD_ENTITIES, CRUD_OPTIONS, injectCrudEntities, injectCrudOptions } from './crud.util';
import { CreateService } from './create.service';
import { ReadService } from './read.service';

export function provideCrud<T extends Entity>(crudOptions: CrudOptions<T>): Provider {
  return [
    {
      provide: CRUD_OPTIONS,
      useFactory: () => () => crudOptions
    },
    {
      provide: CRUD_ENTITIES,
      useFactory: () => signal<T[]>([])
    },
    CreateService,
    ReadService,
    CrudService
  ];
}

export function injectCrud<T extends Entity>() {
  assertInInjectionContext(injectCrud);
  const service = inject(CrudService<T>);
  const options = injectCrudOptions<T>();

  service.connect(options.connectSource());

  return service as Omit<typeof service, 'connect'>;
}

@Injectable()
class CrudService<TEntity extends Entity> {
  private readonly options = injectCrudOptions();
  private readonly destroyRef = inject(DestroyRef);

  private readonly createService = inject(CreateService<TEntity>);
  private readonly readService = inject(ReadService<TEntity>);

  private readonly _entities = injectCrudEntities();
  readonly entities = computed(() => this._entities());

  create(entity: TEntity): void {
    this.createService.createAction$.next(entity);
  }

  read(id: Identifier): void {
    // this.readService.readAction$.next(id, this.entities);
  }

  connect(source$: Observable<TEntity[]>) {
    source$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (entities) => this._entities.set(entities),
      error: (error) => console.error(error)
    });
  }
}
