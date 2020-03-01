import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutFeatureComponent } from './layout-feature.component';
import { SharedUiLayoutModule } from '@nimb3s/shared/ui/layout';

@NgModule({
  imports: [
    CommonModule,
    SharedUiLayoutModule
  ],
  exports: [
    LayoutFeatureComponent
  ],
  declarations: [LayoutFeatureComponent]
})
export class LayoutFeatureModule {}
