import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Member, MemberManagementService } from '@nimb3s/member-management/domain';


@Component({
  selector: 'members-management-detail',
  templateUrl: './members-detail.component.html',
  styleUrls: ['./members-detail.component.scss']
})
export class MembersDetailComponent implements OnInit {
  member: Member;
  id: number

  constructor(
    private memberManagementService: MemberManagementService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.member = this.memberManagementService.getMember(this.id);
      }
    )
  }

  onEditMember() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteMember() {
    this.memberManagementService.deleteMember(this.id);
    this.router.navigate(['/members']);
  }

}
