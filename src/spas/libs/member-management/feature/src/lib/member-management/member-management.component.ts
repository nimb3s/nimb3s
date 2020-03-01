import { Component, OnInit } from '@angular/core';

import { UserProfile } from '@nimb3s/member-management/domain';

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
