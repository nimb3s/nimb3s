import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

// noinspection TsLint
@Component({
  selector: 'ui-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: { 'class': 'ui-card' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuryCard {
}
