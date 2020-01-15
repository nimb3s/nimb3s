import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { ToolbarUserComponent } from './toolbar-user/toolbar-user.component';
import { SharedUiActionsModule } from '@nimb3s/shared/ui/actions';

@NgModule({
  declarations: [
    ToolbarComponent,
    ToolbarUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedUiActionsModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule { }
