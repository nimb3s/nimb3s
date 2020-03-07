import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Member } from '@nimb3s/member-management/domain';
import { MemberManagementService } from '@nimb3s/member-management/domain';
import { Observable } from 'rxjs';


@Component({
  selector: 'member-management-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: Observable<Member[]>;
  selectedMember: Member;
  memberIndex: number;
  addingNewMember = false;
  memberForm: FormGroup;

  constructor(private memberManagementService: MemberManagementService) { }

  ngOnInit() {
    this.getUsers();
  }

  onSelect(user: Member) {
    this.selectedMember = user;
    this.memberIndex = this.memberManagementService.mockUsers.indexOf(this.selectedMember);
  }

  getUsers(): void {
    this.users = this.memberManagementService.getUsers();
  }

  onNewMember() {
    this.addingNewMember = true;

    this.memberForm = new FormGroup({
      'firstName': new FormControl(),
      'lastName': new FormControl(),
      'emailAddress': new FormControl(),
      'phoneNumber': new FormControl(),
      'homeAddress': new FormControl(),
      'emergencyContactName': new FormControl(),
      'emergencyContactPhone': new FormControl(),
      'signUpDate': new FormControl(),
      'congregationName': new FormControl(),
      'groupNumber': new FormControl()
    })
  }

  onSubmit() {
    this.memberManagementService.addMember(this.memberForm.value);
  }

}
