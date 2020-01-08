import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss']
})
export class ToolbarUserComponent implements OnInit {

  isOpened: boolean;

  constructor() { }

  ngOnInit() {
  }

  onDropdownToggled(){
    this.isOpened = !this.isOpened;
  }

  onClickedOutside(){
    this.isOpened = false;
  }

}
