import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MembersComponent } from './member-management/members/members.component';
import { MembersDetailComponent } from './member-management/members/members-detail/members-detail.component';
import { MemberManagementComponent } from './member-management/member-management.component';
import { MembersEditComponent } from './member-management/members/members-edit/members-edit.component';
import { MembersStartComponent } from './member-management/members/members-start/members-start.component';
import { MembersListComponent } from './member-management/members/members-list/members-list.component';
import { MemberComponent } from './member-management/members/members-list/member/member.component';
import { MemberManagementRoutingModule } from './member-management/member-management-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MemberManagementRoutingModule
    // RouterModule.forChild([
    //   {path: '', pathMatch: 'full', component: MembersComponent},
    // ])
  ],
  exports: [
    MemberManagementComponent
  ],
  declarations: [
    MemberManagementComponent,
    MembersComponent,
    MembersDetailComponent,
    MembersEditComponent,
    MembersStartComponent,
    MembersListComponent,
    MemberComponent]
})
export class MemberManagementFeatureModule {}
