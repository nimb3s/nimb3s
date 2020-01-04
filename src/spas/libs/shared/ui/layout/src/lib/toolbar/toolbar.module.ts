import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';



@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
