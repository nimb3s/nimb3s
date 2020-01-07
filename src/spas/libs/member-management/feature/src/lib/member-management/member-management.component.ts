import { Component, OnInit } from '@angular/core';
import { User } from './user-profile'

@Component({
  selector: 'jwadmin-member-management',
  templateUrl: './member-management.component.html',
  styleUrls: ['./member-management.component.scss']
})
export class MemberManagementComponent implements OnInit {
  title = 'Member Management';

  constructor() { }

  ngOnInit() {
  }

}
