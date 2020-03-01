import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutFeatureComponent } from './layout-feature.component';
import { SharedUiLayoutModule } from '@nimb3s/shared/ui/layout';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedUiLayoutModule,
    RouterModule.forChild([])
  ],
  exports: [
    RouterModule,
    LayoutFeatureComponent
  ],
  declarations: [LayoutFeatureComponent]
})
export class LayoutFeatureModule {}