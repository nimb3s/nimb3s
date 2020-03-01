import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedUiActionsModule } from '@nimb3s/shared/ui/actions';
import {MaterialModule} from '@nimb3s/shared/ui/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ToolbarComponent } from './toolbar.component';
import { ToolbarUserComponent } from './toolbar-user/toolbar-user.component';
import { ToolbarNotificationsComponent } from './toolbar-notifications/toolbar-notifications.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    ToolbarUserComponent,
    ToolbarNotificationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedUiActionsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    ToolbarComponent,
    ToolbarUserComponent,
    ToolbarNotificationsComponent
  ]
})
export class ToolbarModule { }
