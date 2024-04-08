import { Directive } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[crudDelete]',
  standalone: true,
})
export class DeleteDirective {
}
