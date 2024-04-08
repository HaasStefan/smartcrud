import { Directive } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[crudRead]',
  standalone: true,
})
export class ReadDirective {
}
