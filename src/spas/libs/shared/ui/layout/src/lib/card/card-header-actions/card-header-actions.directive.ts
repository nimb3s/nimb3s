import { Directive } from '@angular/core';

@Directive({
  selector: 'ui-card-header-actions',
  host: { 'class': 'ui-card-header-actions' }
})
export class CardHeaderActionsDirective {

  constructor() { }

}
