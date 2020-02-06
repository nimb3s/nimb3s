import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarDefaultComponent } from './toolbar-default/toolbar-default.component';
import { SharedUiLayoutModule}  from '@nimb3s/shared/ui/layout'


@NgModule({
  declarations: [ToolbarDefaultComponent],
  imports: [
    CommonModule,
    SharedUiLayoutModule
  ],
  exports: [
    ToolbarDefaultComponent
  ]
})
export class ToolbarModule { }
