import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClickedOutsideModule } from './clicked-outside/clicked-outside.module';
import { ClickedOutsideDirective } from './clicked-outside/clicked-outside.directive';

@NgModule({
  imports: [
    CommonModule,
    ClickedOutsideModule
  ],
  exports: [
    ClickedOutsideDirective
  ]
})
export class SharedUiActionsModule {}
