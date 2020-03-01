import { Component, OnInit } from '@angular/core';

import { UserProfile } from '@nimb3s/member-management/domain';
import { MemberManagementMockService } from '@nimb3s/member-management/domain';
import { Observable } from 'rxjs';

@Component({
  selector: 'member-management-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: Observable<UserProfile[]>;
  selectedUser: UserProfile;

  constructor(private userService: MemberManagementMockService) { }

  ngOnInit() {
    this.getUsers();
  }

  onSelect(user: UserProfile) {
    this.selectedUser = user;
  }

  getUsers(): void {
    this.userService.getUsers()
        this.users = this.userService.getUsers();
  }

}
