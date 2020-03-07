import { Component, OnInit } from '@angular/core';

import { User } from '@nimb3s/member-management/domain';

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
