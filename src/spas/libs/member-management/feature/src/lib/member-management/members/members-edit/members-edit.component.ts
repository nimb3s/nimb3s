import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MemberManagementService } from '@nimb3s/member-management/domain';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'member-management-members-edit',
  templateUrl: './members-edit.component.html',
  styleUrls: ['./members-edit.component.scss']
})
export class MembersEditComponent implements OnInit {
  id: number;
  editMode = false;
  memberForm: FormGroup;


  constructor(
    private memberManagementService: MemberManagementService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode =params['id'] !=null
        this.initForm();
      }
    )
  }

  onSubmit() {
    if(this.editMode) {
      this.memberManagementService.updateMember(this.id, this.memberForm.value);
    } else {
      this.memberManagementService.addMember(this.memberForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
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
      const member = this.memberManagementService.getMember(this.id);
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
