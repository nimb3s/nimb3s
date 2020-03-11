import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MemberManagementService, Member } from '@nimb3s/member-management/domain';
import { Observable } from 'rxjs';

@Component({
  selector: 'member-management-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnInit {
  members: Member[];

  constructor(
    private memberManagementService: MemberManagementService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.members = this.memberManagementService.mockMembers;
  }

  onNewMember() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
