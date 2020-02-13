import { Component, OnInit, Input } from '@angular/core';
import { UserProfile } from '@nimb3s/member-management/domain';
@Component({
  selector: 'member-management-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  @Input() user: UserProfile;

  constructor() { }

  ngOnInit() {
  }

}
