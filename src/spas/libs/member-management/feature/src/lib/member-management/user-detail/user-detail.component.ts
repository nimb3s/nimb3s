import { Component, OnInit, Input } from '@angular/core';

import { Member, MemberManagementService } from '@nimb3s/member-management/domain';
import { runInDebugContext } from 'vm';

@Component({
  selector: 'member-management-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  @Input() user: Member;
  @Input() index: number;

  constructor(private memberManagementService: MemberManagementService) { }

  ngOnInit() {
  }

  onDeleteMember() {
    this.memberManagementService.deleteMember(this.index);
  }

}
