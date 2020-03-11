import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  editMode = false;

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
    this.initForm();
  }

  onSubmit() {
    this.memberManagementService.addMember(this.memberForm.value);
    this.addingNewMember = false;
  }

  initForm() {
    let firstName = '';
    let lastName = '';
    let emailAddress = '';
    let phoneNumber: number;
    let homeAddress = '';
    let emergencyContactName = '';
    let emergencyContactPhone: number;
    let signUpDate = '';
    let congregationName = '';
    let groupNumber: number;

    if (this.editMode) {
      const member = this.memberManagementService.getMember(this.memberIndex);
      firstName = member.firstName;
      lastName = member.lastName;
      emailAddress = member.emailAddress;
      phoneNumber = member.phoneNumber;
      homeAddress = member.homeAddress;
      emergencyContactName = member.emergencyContactName;
      emergencyContactPhone = member.emergencyContactPhone;
      signUpDate = member.signUpDate;
      congregationName = member.congregationName;
      groupNumber = member.groupNumber
    }

    this.memberForm = new FormGroup({
      'firstName': new FormControl(firstName, Validators.required),
      'lastName': new FormControl(lastName, Validators.required),
      'emailAddress': new FormControl(emailAddress, Validators.required),
      'phoneNumber': new FormControl(phoneNumber, Validators.required),
      'homeAddress': new FormControl(homeAddress, Validators.required),
      'emergencyContactName': new FormControl(emergencyContactName, Validators.required),
      'emergencyContactPhone': new FormControl(emergencyContactPhone),
      'signUpDate': new FormControl(signUpDate, Validators.required),
      'congregationName': new FormControl(congregationName, Validators.required),
      'groupNumber': new FormControl(groupNumber, Validators.required)
    })
  }

}
