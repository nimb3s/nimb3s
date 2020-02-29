import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@nimb3s/shared/ui/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ToolbarModule } from './toolbar/shared-ui-toolbar.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarUserComponent } from './toolbar/toolbar-user/toolbar-user.component';
import { ToolbarNotificationsComponent } from './toolbar/toolbar-notifications/toolbar-notifications.component';




@NgModule({
  imports: [
    CommonModule,
    ToolbarModule,
    MaterialModule,
    FlexLayoutModule 
  ],
  exports: [
    ToolbarComponent,
    ToolbarUserComponent,
    ToolbarNotificationsComponent
  ]
})
export class SharedUiLayoutModule {}
