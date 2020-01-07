import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from './toolbar/toolbar.module';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    ToolbarModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class SharedUiLayoutModule {}
