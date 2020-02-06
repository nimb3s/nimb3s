import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-toolbar-notifications',
  templateUrl: './toolbar-notifications.component.html',
  styleUrls: ['./toolbar-notifications.component.scss']
})
export class ToolbarNotificationsComponent implements OnInit {

  @Input()
  notifications: any[] = []; //use an interface with a read prop instead of using any

  isOpened: boolean;

  constructor() { }

  ngOnInit() {
    
  }

  dimiss(notification, e: Event) {
    e.stopPropagation();

    this.notifications.splice(this.notifications.indexOf(notification))
  }

  onClickedOutside() {
    this.isOpened = false;
  }

  toggleDropdown() {
    this.isOpened = !this.isOpened;
  }

  read(notification) {
    notification.read = true;
  }

  allRead() {
    this.notifications.forEach(i => i.read = true)
  }

}
