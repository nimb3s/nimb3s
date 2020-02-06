import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarDefaultComponent } from './toolbar/toolbar-default/toolbar-default.component';
import { ToolbarModule } from './toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    ToolbarModule
  ],
  exports: [
    ToolbarDefaultComponent
  ]
})
export class LayoutFeatureModule {}
