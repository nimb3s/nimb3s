import { Component, OnInit } from '@angular/core';

import { User } from '../../../../../domain/src/lib/models/user-profile';
import { UserMockService } from '../../../../../domain/src/lib/user.mock.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'jwadmin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: Observable<User[]>;
  selectedUser: User;

  constructor(private userService: UserMockService) { }

  ngOnInit() {
    this.getUsers();
  }

  onSelect(user: User) {
    this.selectedUser = user;
  }

  getUsers(): void {
    this.userService.getUsers()
        this.users = this.userService.getUsers();
  }

}
