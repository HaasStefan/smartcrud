import { assertInInjectionContext, inject, InjectionToken, WritableSignal } from '@angular/core';
import { Entity } from '../models/entity.model';
import { CrudOptions } from '../models/crud-options.model';
import { BehaviorSubject } from 'rxjs';

export const CRUD_OPTIONS = new InjectionToken<<T extends Entity>() => CrudOptions<T>>('CRUD_OPTIONS');

export function injectCrudOptions<T extends Entity>(): CrudOptions<T> {
  assertInInjectionContext(injectCrudOptions);
  return inject(CRUD_OPTIONS)();
}

export const CRUD_ENTITIES = new InjectionToken<WritableSignal<Entity[]>>('CRUD_ENTITIES');

export function injectCrudEntities() {
  assertInInjectionContext(injectCrudEntities);
  return inject(CRUD_ENTITIES);
}
