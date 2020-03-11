import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CardComponent } from './card.component';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardContentComponent } from './card-content/card-content.component';
import { CardHeaderTitleDirective } from './card-header-title/card-header-title.directive';
import { CardHeaderSubTitleDirective } from './card-header-sub-title/card-header-sub-title.directive';
import { CardHeaderActionsDirective } from './card-header-actions/card-header-actions.directive';
import { CardActionsDirective } from './card-actions/card-actions.directive';

@NgModule({
  declarations: [
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardHeaderTitleDirective,
    CardHeaderSubTitleDirective,
    CardHeaderActionsDirective,
    CardActionsDirective
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardHeaderTitleDirective,
    CardHeaderSubTitleDirective,
    CardHeaderActionsDirective,
    CardActionsDirective
  ]
})
export class CardModule { }
