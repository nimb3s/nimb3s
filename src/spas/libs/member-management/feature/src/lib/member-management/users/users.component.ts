import { Component, OnInit } from '@angular/core';
import { User } from '../user-profile';
import { UserService } from '../user.service';

@Component({
  selector: 'jwadmin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];
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
        .subscribe(users => this.users = users);
  }

}
