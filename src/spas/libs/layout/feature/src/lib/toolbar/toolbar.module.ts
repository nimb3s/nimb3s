import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarDefaultComponent } from './toolbar-default/toolbar-default.component';



@NgModule({
  declarations: [ToolbarDefaultComponent],
  imports: [
    CommonModule
  ],
  exports: [ToolbarDefaultComponent]
})
export class ToolbarModule { }
