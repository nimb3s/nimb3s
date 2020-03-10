import { Component, OnInit, Input } from '@angular/core';

import { Member } from '@nimb3s/member-management/domain';

@Component({
  selector: 'member-management-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  @Input() member: Member;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
