import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarModule } from './toolbar/toolbar.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarUserComponent } from './toolbar/toolbar-user/toolbar-user.component';
import { SharedUiActionsModule } from '@nimb3s/shared/ui/actions';

@NgModule({
  imports: [
    CommonModule,
    ToolbarModule,
    SharedUiActionsModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class SharedUiLayoutModule {}
