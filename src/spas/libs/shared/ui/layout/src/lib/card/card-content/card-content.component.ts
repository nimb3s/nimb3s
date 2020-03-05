import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.scss']
})
export class CardContentComponent implements OnInit {

  @HostBinding('class.ui-card-content') isCardContent = true;
  
  constructor() { }

  ngOnInit() {
  }

}
