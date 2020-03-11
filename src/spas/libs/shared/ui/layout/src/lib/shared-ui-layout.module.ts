import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from './toolbar/shared-ui-toolbar.module';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarUserComponent } from './toolbar/toolbar-user/toolbar-user.component';
import { ToolbarNotificationsComponent } from './toolbar/toolbar-notifications/toolbar-notifications.component';
import { CardModule } from './card/card.module';
import { CardComponent } from './card/card.component';
import { CardHeaderComponent } from './card/card-header/card-header.component';
import { CardContentComponent } from './card/card-content/card-content.component';
import { CardHeaderTitleDirective } from './card/card-header-title/card-header-title.directive';
import { CardHeaderSubTitleDirective } from './card/card-header-sub-title/card-header-sub-title.directive';
import { CardHeaderActionsDirective } from './card/card-header-actions/card-header-actions.directive';
import { CardActionsDirective } from './card/card-actions/card-actions.directive';
import { ScrollbarModule } from './scrollbar/scrollbar.module';

@NgModule({
  imports: [
    CommonModule,
    ToolbarModule,
    CardModule,
    ScrollbarModule
  ],
  exports: [
    ToolbarComponent,
    ToolbarUserComponent,
    ToolbarNotificationsComponent,
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardHeaderTitleDirective,
    CardHeaderSubTitleDirective,
    CardHeaderActionsDirective,
    CardActionsDirective
  ]
})
export class SharedUiLayoutModule {}
