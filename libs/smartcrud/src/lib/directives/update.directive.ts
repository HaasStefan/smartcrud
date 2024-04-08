import { Directive } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[crudUpdate]',
  standalone: true,
})
export class UpdateDirective {
}
