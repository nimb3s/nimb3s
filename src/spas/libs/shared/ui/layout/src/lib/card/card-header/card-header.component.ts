import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // host: { 'class': 'ui-card-header' },
})
export class CardHeaderComponent implements OnInit {
  @HostBinding('class.ui-card-header') isCardHeader = true;

  constructor() { }

  ngOnInit() {
  }

}
