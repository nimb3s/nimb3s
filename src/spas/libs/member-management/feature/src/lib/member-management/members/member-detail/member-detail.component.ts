import { Component, OnInit, Input } from '@angular/core';

import { Member, MemberManagementService } from '@nimb3s/member-management/domain';

@Component({
  selector: 'member-management-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {

  @Input() member: Member;
  @Input() index: number;
  editMode = false;

  constructor(private memberManagementService: MemberManagementService) { }

  ngOnInit() {
  }

  onEditMember() {
    this.editMode = true;
    this.member = null;
  }

  onDeleteMember() {
    this.memberManagementService.deleteMember(this.index);
  }

}
