import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarModule } from './toolbar/shared-ui-toolbar.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarUserComponent } from './toolbar/toolbar-user/toolbar-user.component';
import { ToolbarNotificationsComponent } from './toolbar/toolbar-notifications/toolbar-notifications.component';
import { CardComponent } from './card/card.component';
import { CardModule } from './card/card.module';

@NgModule({
  imports: [
    CommonModule,
    ToolbarModule,
    CardModule
  ],
  exports: [
    ToolbarComponent,
    ToolbarUserComponent,
    ToolbarNotificationsComponent,
    CardComponent
  ],
  declarations: [CardComponent]
})
export class SharedUiLayoutModule {}
