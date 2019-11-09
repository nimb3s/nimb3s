import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthServiceModule } from '@nimb3s/services/auth-service';
import { UiAuthModule } from '@nimb3s/ui/auth';

import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  imports: [
    CommonModule,
    UiAuthModule,
    AuthServiceModule
  ],
  declarations: [SignInComponent],
  exports: [SignInComponent]
})
export class FeatureAuthModule {}
