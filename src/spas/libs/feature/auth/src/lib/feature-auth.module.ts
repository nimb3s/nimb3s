import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiAuthModule } from '@nimb3s/ui/auth';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  imports: [
    CommonModule,
    UiAuthModule
  ],
  declarations: [SignInComponent],
  exports: [SignInComponent]
})
export class FeatureAuthModule {}
