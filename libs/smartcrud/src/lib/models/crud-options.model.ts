import { Entity } from './entity.model';
import { Observable } from 'rxjs';
import { Identifier } from './identifier.model';

export type CrudOptions<T extends Entity> = {
  createSource: (entity: T) => Observable<T>;
  // readSource: (id: Identifier) => Observable<T>;
  // deleteSource: (id: Identifier) => Observable<void>;
  // updateSource: (entity: T) => Observable<T>;
  connectSource: () => Observable<T[]>;
};
