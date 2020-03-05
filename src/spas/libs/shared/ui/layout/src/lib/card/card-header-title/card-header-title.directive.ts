import { Directive } from '@angular/core';

@Directive({
  selector: 'ui-card-header-heading',
  host: { 'class': 'ui-card-header-heading' }
})
export class CardHeaderTitleDirective {

  constructor() { }

}
