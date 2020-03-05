import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'ui-card-actions',
  host: {
    'class': 'ui-card-actions',
    '[class.ui-card-actions-align-end]': 'align === "end"',
  }
})
export class CardActionsDirective {

  /** Position of the actions inside the card. */
  @Input() align: 'start' | 'end' = 'start';
  
  constructor() { }

}
