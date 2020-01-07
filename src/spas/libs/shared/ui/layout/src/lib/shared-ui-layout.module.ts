import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from './toolbar/toolbar.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarUserComponent } from './toolbar/toolbar-user/toolbar-user.component';

@NgModule({
  imports: [
    CommonModule,
    ToolbarModule
  ],
  exports: [
    ToolbarComponent,
    ToolbarUserComponent
  ]
})
export class SharedUiLayoutModule {}
