import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInButtonComponent } from './sign-in-button/sign-in-button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SignInButtonComponent],
  exports: [SignInButtonComponent]
})
export class UiAuthModule {}
