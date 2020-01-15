import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { ToolbarUserComponent } from './toolbar-user/toolbar-user.component';
import { SharedUiActionsModule } from '@nimb3s/shared/ui/actions';
import { ToolbarNotificationsComponent } from '../toolbar/toolbar-notifications/toolbar-notifications.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    ToolbarUserComponent,
    ToolbarNotificationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedUiActionsModule
  ],
  exports: [
    ToolbarComponent,
    ToolbarNotificationsComponent
  ]
})
export class ToolbarModule { }
