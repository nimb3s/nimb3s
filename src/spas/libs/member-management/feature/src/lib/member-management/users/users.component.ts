import { Component, OnInit } from '@angular/core';

import { User } from '../../../../../domain/src/lib/models/user-profile';
import { UserService } from '../../../../../domain/src/lib/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'jwadmin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: Observable<User[]>;
  selectedUser: User;

  constructor(private userService: UserService) { }

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
