import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MembersComponent } from './members/members.component';
import { MembersStartComponent } from './members/members-start/members-start.component';
import { MembersEditComponent } from './members/members-edit/members-edit.component';
import { MembersDetailComponent } from './members/members-detail/members-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/members', pathMatch: 'full' },
  { path: 'members', component: MembersComponent, children: [
    { path: '', component: MembersStartComponent},
    { path: 'new', component: MembersEditComponent },
    { path: ':id', component: MembersDetailComponent },
    { path: ':id/edit', component: MembersEditComponent }
  ]}
]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberManagementRoutingModule { }
