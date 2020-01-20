import { Component, OnInit } from '@angular/core';

import { User } from '../../../../domain/src/lib/models/user-profile'

@Component({
  selector: 'member-management',
  templateUrl: './member-management.component.html',
  styleUrls: ['./member-management.component.scss']
})
export class MemberManagementComponent implements OnInit {
  title = 'Member Management';

  constructor() { }

  ngOnInit() {
  }

}
