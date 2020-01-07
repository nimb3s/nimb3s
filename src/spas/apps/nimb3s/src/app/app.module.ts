import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { MemberManagementFeatureModule } from '@nimb3s/member-management/feature'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    MemberManagementFeatureModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
