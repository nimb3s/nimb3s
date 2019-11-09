import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseModuleWrapper } from '@nimb3s/module-wrappers/firebase'

@NgModule({
  imports: [
    CommonModule,
    FirebaseModuleWrapper
  ]
})
export class AuthServiceModule {}
