import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { CreateDirective, injectCrud, provideCrud } from '@smartcrud/smartcrud';
import { of, tap } from 'rxjs';
import { JsonPipe } from '@angular/common';

interface Person {
  id: string;
  name: string;
  age: number;
}

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, JsonPipe, CreateDirective],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    provideCrud({
      createSource: () => {
        return of({
          id: '3',
          name: 'Jack',
          age: 35
        }).pipe(
          tap(() => console.log('Creating person...'))
        );
      },
      connectSource: () => {
        const persons: Person[] = [
          { id: '1', name: 'John', age: 30 },
          { id: '2', name: 'Jane', age: 25 }
        ];

        return of(persons);
      }
    })
  ]
})
export class AppComponent {
  private readonly crudService = injectCrud<{
    id: string;
    name: string;
    age: number;
  }>();

  readonly persons = this.crudService.entities;

  constructor() {
    this.crudService.create({
      id: '4',
      name: 'Jill',
      age: 40
    });
  }
}
