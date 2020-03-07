import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Member } from '@nimb3s/member-management/domain';
import { MemberManagementService } from '@nimb3s/member-management/domain';
import { Observable } from 'rxjs';


@Component({
  selector: 'member-management',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  members: Observable<Member[]>;
  selectedMember: Member;
  memberIndex: number;
  addingNewMember = false;
  memberForm: FormGroup;

  constructor(private memberManagementService: MemberManagementService) { }

  ngOnInit() {
    this.getMembers();
  }

  onSelect(member: Member) {
    this.selectedMember = member;
    this.memberIndex = this.memberManagementService.mockMembers.indexOf(this.selectedMember);
  }

  getMembers(): void {
    this.members = this.memberManagementService.getMembers();
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
    this.addingNewMember = false;
  }

}
