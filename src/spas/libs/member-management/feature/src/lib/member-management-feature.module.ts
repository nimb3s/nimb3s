import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MembersComponent } from './member-management/members/members.component';
import { MemberDetailComponent } from './member-management/members/member-detail/member-detail.component';
import { MemberManagementComponent } from './member-management/member-management.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ])
  ],
  exports: [
    MemberManagementComponent
  ],
  declarations: [MemberManagementComponent, MembersComponent, MemberDetailComponent]
})
export class MemberManagementFeatureModule {}
