import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MemberManagementComponent } from './member-management/member-management.component';
import { UsersComponent } from './member-management/users/users.component';
import { UserDetailComponent } from './member-management/user-detail/user-detail.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ])
  ],
  exports: [
    MemberManagementComponent
  ],
  declarations: [MemberManagementComponent, UsersComponent, UserDetailComponent]
})
export class MemberManagementFeatureModule {}
